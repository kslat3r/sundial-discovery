resource "google_compute_network" "sundial_vpc" {
  name = "sundial-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "sundial_cluster_subnet" {
  provider = "google-beta"
  name = "sundial-cluster-subnet"
  ip_cidr_range = "10.200.0.0/16"
  network = "${google_compute_network.sundial_vpc.self_link}"
  private_ip_google_access = true
  depends_on = ["google_compute_network.sundial_vpc"]
}

resource "google_compute_firewall" "sundial_http_only" {
  name = "sundial-http-only"
  network = "${google_compute_network.sundial_vpc.name}"

  allow {
    protocol = "tcp"
    ports = ["80"]
  }

  source_tags = ["${var.fw_http_tag}"]
  source_ranges = ["${var.source_ip_ranges[1]}","${var.source_ip_ranges[2]}"]
}

resource "google_compute_firewall" "sundial_https_only" {
  name    = "sundial-https-only"
  network = "${google_compute_network.sundial_vpc.name}"

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  source_tags   = ["${var.fw_https_tag}"]
  source_ranges = ["${var.source_ip_ranges[0]}","${var.source_ip_ranges[1]}","${var.source_ip_ranges[2]}"]
}

resource "google_compute_address" "sundial_external_static_ip" {
  name = "sundial-external-static-ip"
}