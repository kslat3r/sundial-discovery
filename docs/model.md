* foreach service inside time window:
  * observe:
    * number of requests (1) `istio_requests_total`
        * `rate(istio_requests_total{destination_service_namespace="api", response_code="200", reporter="destination"}[30s])`

    * cpu (2) `container_cpu_usage_seconds_total`
        * `rate(container_cpu_usage_seconds_total{namespace="api", container_name=~".*-service"}[30s])`

    * used memory(3) `container_memory_usage_bytes`
        * `rate(container_memory_usage_bytes{namespace="api", container_name=~".*-service"}[30s])`

    * latency (4) `istio_request_duration_seconds_sum/istio_request_duration_seconds_count`
        * `rate(istio_request_duration_seconds_sum{destination_service_namespace="api", reporter="destination", response_code="200"}[30s])/rate(istio_request_duration_seconds_count{destination_service_namespace="api", reporter="destination", response_code="200"}[30s]) * 1000`

    * error count (5) (just 5xx weighted towards timeouts)
        * `rate(istio_requests_total{destination_service_namespace="api", response_code=~"5.*", reporter="destination"}[30s])`

    * current state of infra

* then:
  * aim for target of all ()
