#!/usr/bin/env bash

source ../helpers/initialise-helm.sh
source ./download.sh

# secrets

kubectl apply -f kiali-secret.yml
kubectl apply -f grafana-secret.yml

# istio

helm upgrade \
    --namespace "istio-system" \
    --install istio-init "./lib/install/kubernetes/helm/istio-init" \
    --wait

sleep 60

helm upgrade \
    --namespace "istio-system" \
    --install istio "./lib/install/kubernetes/helm/istio" \
    --set kiali.enabled=true \
    --set grafana.enabled=true
