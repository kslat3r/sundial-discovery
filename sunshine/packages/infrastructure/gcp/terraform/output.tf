output "sundial_external_static_ip" {
  value = "${google_compute_address.sundial_external_static_ip.address}"
}