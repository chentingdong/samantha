terraform {
  backend "s3" {
    bucket = "bellhop-terraform-states"
    key    = "fargate"
    region = "us-east-1"
  }
}
