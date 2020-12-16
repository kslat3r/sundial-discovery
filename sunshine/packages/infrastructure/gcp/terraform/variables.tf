variable "gcp_project_id" {
  description = "ID of the GCP Project"
  type = "string"
  default = "hs-api-channel"
}

variable "gcp_region" {
  type = "string"
  default = "europe-west3"
}

variable "gcp_zone" {
  type = "string"
  default = "europe-west3-a"
}

variable "fw_ssh_tag" {
  description = "Tag for SSH firewall rule"
  type = "string"
  default = "fw-ssh-only"
}

variable "fw_http_tag" {
  description = "Tag for HTTP firewall rule"
  type = "string"
  default = "fw-http-only"
}

variable "fw_https_tag" {
  description = "Tag for HTTPS firewall rule"
  type = "string"
  default = "fw-https-only"
}

variable "cluster_size" {
  description = "Size of the cluster"
  type = "string"
  default = 3
}

variable "min_cluster_size" {
  description = "Min size of the Cluster"
  type = "string"
  default = 1
}

variable "max_cluster_size" {
  description = "Max size of the Cluster"
  type = "string"
  default = 5
}

variable "machine_type" {
  description = "Type of VM instance"
  type = "string"
  default	= "n1-standard-2"
}

variable "source_ip_ranges" {
  type = "list"
  default = ["0.0.0.0/0", "10.200.0.0/16", "192.168.0.0/29"]
}
