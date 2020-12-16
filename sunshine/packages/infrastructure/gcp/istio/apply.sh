#!/usr/bin/env bash

source ../helpers/install-gcp-sdk.sh
source ../helpers/check-credentials.sh

PROJECT=${1}
ISTIO_INGRESS_IP=${2}

# checks

if [ -z "$ISTIO_INGRESS_IP" ]
then
    echo "You must set ISTIO_INGRESS_IP environment variable as non empty"
    exit 1
fi

source ../helpers/initialise-helm.sh

# secrets

kubectl apply -f kiali-secret.yml
kubectl apply -f grafana-secret.yml

# istio

helm upgrade \
    --namespace "istio-system" \
    --install istio-init "../lib/istio/install/kubernetes/helm/istio-init"

sleep 60
helm upgrade \
    --namespace "istio-system" \
    --install istio "../lib/istio/install/kubernetes/helm/istio" \
    --set kiali.enabled=true \
    --set grafana.enabled=true \
    --set gateways.istio-ingressgateway.loadBalancerIP=${ISTIO_INGRESS_IP}
