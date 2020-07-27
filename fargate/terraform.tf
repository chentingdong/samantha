provider "aws" {
  version = "~> 2.63"
  region  = "us-east-1"
}

data "aws_ecr_repository" "samantha-server" {
  name = "samantha-server"
}

data "aws_ecr_repository" "samantha-admin" {
  name = "samantha-admin"
}

data "aws_ecr_repository" "samantha-web" {
  name = "samantha-web"
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnet_ids" "all" {
  vpc_id = data.aws_vpc.default.id
}

data "aws_subnet_ids" "private" {
  vpc_id = data.aws_vpc.default.id
  filter {
    name   = "tag:Name"
    values = ["Private"]
  }
}

data "aws_subnet_ids" "public" {
  vpc_id = data.aws_vpc.default.id
  filter {
    name   = "tag:Name"
    values = ["Public"]
  }
}


resource "aws_ecs_cluster" "samantha" {
  name = "samantha"
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# data "template_file" "container_definitions" {
#   template = "${file("${path.module}/container-definitions.json")}"

#   vars = {
#     server_image = "${data.aws_ecr_repository.samantha-server.repository_url}:${var.server_image_tag}"
#     web_image    = "${data.aws_ecr_repository.samantha-web.repository_url}:${var.web_image_tag}"
#     DATABASE_URL = "${file("${path.module}/.env")}"
#   }
# }

# # # ecs task created from `ecs-cli compose create`
# resource "aws_ecs_task_definition" "samantha" {
#   container_definitions    = data.template_file.container_definitions.rendered
#   family                   = "samantha"
#   requires_compatibilities = ["FARGATE"]
#   network_mode             = "awsvpc"
#   cpu                      = 2048
#   memory                   = 4096
#   execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn
# }

# resource "aws_ecs_service" "samantha_service" {
#   name            = "samantha_service"                   # Naming our first service
#   cluster         = aws_ecs_cluster.samantha.id          # Referencing our created Cluster
#   task_definition = aws_ecs_task_definition.samantha.arn # Referencing the task our service will spin up
#   launch_type     = "FARGATE"
#   desired_count   = 1

#   load_balancer {
#     target_group_arn = aws_lb_target_group.target_group_web.arn # Referencing our target group
#     container_name   = "web"
#     container_port   = var.web_port # Specifying the container port
#   }
#   load_balancer {
#     target_group_arn = aws_lb_target_group.target_group_server.arn # Referencing our target group
#     container_name   = "server"
#     container_port   = var.server_port # Specifying the container port
#   }
#   load_balancer {
#     target_group_arn = aws_lb_target_group.target_group_hasura.arn # Referencing our target group
#     container_name   = "hasura"
#     container_port   = var.hasura_port # Specifying the container port
#   }
#   network_configuration {
#     subnets          = data.aws_subnet_ids.public.ids
#     assign_public_ip = true # Providing our containers with public IPs
#     security_groups  = [aws_security_group.service_security_group.id]
#   }
# }

# iam role
resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "ecsTaskExecutionRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# security group of the fargate service should open to the load balancer only
resource "aws_security_group" "service_security_group" {
  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    # Only allowing traffic in from the load balancer security group
    security_groups = [
      aws_security_group.load_balancer_security_group.id,
      "sg-e25dbbb4"
    ]
    cidr_blocks = var.whitelist_cidrs
  }

  egress {
    from_port   = 0             # Allowing any incoming port
    to_port     = 0             # Allowing any outgoing port
    protocol    = "-1"          # Allowing any outgoing protocol 
    cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
  }
}


resource "aws_alb" "application_load_balancer" {
  name               = "samantha-lb-tf" # Naming our load balancer
  load_balancer_type = "application"
  subnets            = data.aws_subnet_ids.public.ids
  # Referencing the security group
  security_groups = [aws_security_group.load_balancer_security_group.id]
}

# Creating a security group for the load balancer:
resource "aws_security_group" "load_balancer_security_group" {
  ingress {
    from_port       = 443 # Allowing traffic in from port 80
    to_port         = 443
    protocol        = "tcp"
    cidr_blocks     = var.whitelist_cidrs # Allowing traffic in from all sources
    security_groups = ["sg-e25dbbb4"]
  }
  ingress {
    from_port       = var.server_port # Allowing traffic in from port 80
    to_port         = var.server_port
    protocol        = "tcp"
    cidr_blocks     = var.whitelist_cidrs # Allowing traffic in from all sources
    security_groups = ["sg-e25dbbb4"]
  }
  ingress {
    from_port       = var.admin_port # Allowing traffic in from port 80
    to_port         = var.admin_port
    protocol        = "tcp"
    cidr_blocks     = var.whitelist_cidrs # Allowing traffic in from all sources
    security_groups = ["sg-e25dbbb4"]
  }
  ingress {
    from_port       = var.hasura_port # Allowing traffic in from port 80
    to_port         = var.hasura_port
    protocol        = "tcp"
    cidr_blocks     = var.whitelist_cidrs # Allowing traffic in from all sources
    security_groups = ["sg-e25dbbb4"]
  }
  egress {
    from_port   = 0             # Allowing any incoming port
    to_port     = 0             # Allowing any outgoing port
    protocol    = "-1"          # Allowing any outgoing protocol 
    cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
  }
}

resource "aws_lb_target_group" "target_group_web" {
  name        = "samantha-target-group-web"
  port        = var.web_port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = data.aws_vpc.default.id # Referencing the default VPC
  deregistration_delay = 120
}

resource "aws_lb_target_group" "target_group_server" {
  name        = "samantha-target-group-server"
  port        = var.server_port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = data.aws_vpc.default.id # Referencing the default VPC
  deregistration_delay = 120
}

resource "aws_lb_target_group" "target_group_admin" {
  name        = "samantha-target-group-admin"
  port        = var.admin_port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = data.aws_vpc.default.id # Referencing the default VPC
  deregistration_delay = 120
}

resource "aws_lb_target_group" "target_group_hasura" {
  name        = "samantha-target-group-hasura"
  port        = var.hasura_port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = data.aws_vpc.default.id # Referencing the default VPC
  deregistration_delay = 120
  health_check  {
    path = "/v1/version"
  }
}

resource "aws_lb_listener" "web_listener" {
  load_balancer_arn = aws_alb.application_load_balancer.arn # Referencing our load balancer
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "arn:aws:acm:us-east-1:079056339674:certificate/26c59fef-a5e1-4f24-90e8-a94cda70d1f3"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group_web.arn # Referencing our tagrte group
  }
}

resource "aws_lb_listener" "admin_listener" {
  load_balancer_arn = aws_alb.application_load_balancer.arn # Referencing our load balancer
  port              = var.admin_port
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "arn:aws:acm:us-east-1:079056339674:certificate/26c59fef-a5e1-4f24-90e8-a94cda70d1f3"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group_admin.arn # Referencing our tagrte group
  }
}

resource "aws_lb_listener" "server_listener" {
  load_balancer_arn = aws_alb.application_load_balancer.arn # Referencing our load balancer
  port              = var.server_port
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "arn:aws:acm:us-east-1:079056339674:certificate/26c59fef-a5e1-4f24-90e8-a94cda70d1f3"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group_server.arn # Referencing our tagrte group
  }
}

resource "aws_lb_listener" "hasura_listener" {
  load_balancer_arn = aws_alb.application_load_balancer.arn # Referencing our load balancer
  port              = var.hasura_port
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "arn:aws:acm:us-east-1:079056339674:certificate/26c59fef-a5e1-4f24-90e8-a94cda70d1f3"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group_hasura.arn # Referencing our tagrte group
  }
}

# cloudwatch
resource "aws_cloudwatch_log_group" "samantha-web" {
  name = "samantha-web"
}

resource "aws_cloudwatch_log_group" "samantha-server" {
  name = "samantha-server"
}

resource "aws_cloudwatch_log_group" "samantha-admin" {
  name = "samantha-admin"
}

resource "aws_cloudwatch_log_group" "samantha-hasura" {
  name = "samantha-hasura"
}

resource "aws_cloudwatch_log_group" "samantha-postgres" {
  name = "samantha-postgres"
}

# DNS
data "aws_route53_zone" "dev" {
  name = "dev.bellhop.io."
}

resource "aws_route53_record" "poc" {
  zone_id = data.aws_route53_zone.dev.zone_id
  name    = "poc.dev.bellhop.io"
  type    = "CNAME"
  ttl     = "60"
  records = [aws_alb.application_load_balancer.dns_name]
}

