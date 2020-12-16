terraform {
  required_version = "> 0.11.10"
  backend "gcs" {
    prefix = "tf-state"
    bucket = "sundial-state"
    project = "hs-api-channel"
  }
}

provider "google" {
  project = "${var.gcp_project_id}"
  region = "${var.gcp_region}"
  credentials = "${file("gcp-credentials.json")}"
}

provider "google-beta" {
  project = "${var.gcp_project_id}"
  region = "${var.gcp_region}"
  credentials = "${file("gcp-credentials.json")}"
}