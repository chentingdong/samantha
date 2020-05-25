variable "server_image_tag" {
  description = "The samantha-server image tag to deploy."
  type        = string
}

variable "web_image_tag" {
  description = "The samantha-web image tag to deploy."
  type        = string
}

variable "server_port" {
  description = "The server port."
  type        = number
  default     = 4000
}

variable "web_port" {
  description = "The web port"
  type        = number
  default     = 2000
}

variable "whitelist_cidrs" {
  description = "Home IPs to whitelist in the security groups"
  type = list
  default = ["67.180.84.92/32"]
}