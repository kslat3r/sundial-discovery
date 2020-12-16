resource "google_container_cluster" "sundial_cluster" {
  name = "sundial-cluster"
  location = "${var.gcp_zone}"
  network = "sundial-vpc"
  subnetwork = "sundial-cluster-subnet"
  remove_default_node_pool = true
  initial_node_count = 1

  # Setting an empty username and password explicitly disables basic auth
  master_auth {
    username = ""
    password = ""
    client_certificate_config {
      issue_client_certificate = false
    }
  }

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]

    tags = ["${var.fw_ssh_tag}"]
  }

  addons_config {
    http_load_balancing {
      disabled = true
    }
    horizontal_pod_autoscaling {
      disabled = false
    }
    kubernetes_dashboard {
      disabled = true
    }
  }

  maintenance_policy {
    daily_maintenance_window {
      start_time = "21:00"
    }
  }

  ip_allocation_policy {
    use_ip_aliases = true
  }
}

resource "google_container_node_pool" "sundial_nodes" {
  name = "sundial-nodes"
  location = "${var.gcp_zone}"
  cluster = "${google_container_cluster.sundial_cluster.name}"
  depends_on = [ "google_compute_subnetwork.sundial_cluster_subnet" ]
  node_count = "${var.cluster_size}"
  autoscaling  {
  	min_node_count = "${var.min_cluster_size}"
  	max_node_count = "${var.max_cluster_size}"
  }

  node_config {
    preemptible  = false
    machine_type = "${var.machine_type}"
    image_type = "COS"

    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]

    tags = ["${var.fw_ssh_tag}"]
  }

  management {
    auto_repair = true
    auto_upgrade = true
  }
}

