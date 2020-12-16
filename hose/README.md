# sundial-hose

docker buildx build --platform linux/arm/v7,linux/amd64 . --push -t newlinelabs/sundial-hose:latest

## Useful Prometheus queries

http://localhost:9090/graph?g0.range_input=12h&g0.expr=rate(istio_requests_total%7Breporter%3D%22destination%22%2C%20destination_service_namespace%3D%22api%22%2C%20response_code%3D%22200%22%7D%5B30s%5D)&g0.tab=0&g1.range_input=1h&g1.expr=sum(rate(container_cpu_user_seconds_total%7Bnamespace%3D%22api%22%2C%20container_name%3D~%22.*-service%22%7D%5B30s%5D)%20*%20100)%20by%20(container_name)&g1.tab=0&g2.range_input=2h&g2.expr=count(container_memory_usage_bytes%7Bcontainer_name%3D~%22.*-service%22%2C%20namespace%3D%22api%22%7D)%20by%20(container_name)&g2.tab=0
