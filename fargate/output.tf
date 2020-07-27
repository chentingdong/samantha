output "service_security_group" {
  value = aws_security_group.service_security_group.id
}

output "load_balancer_security_group" {
  value = aws_security_group.load_balancer_security_group.id
}

output "load_balancer_dns" {
  value = aws_alb.application_load_balancer.dns_name
}

output "server_url" {
  value = "https://${aws_route53_record.poc.fqdn}:${var.server_port}"
}

output "admin_url" {
  value = "https://${aws_route53_record.poc.fqdn}:${var.admin_port}"
}

output "web_url" {
  value = "https://${aws_route53_record.poc.fqdn}"
}

