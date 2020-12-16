#!/usr/bin/env bash

source ../helpers/install-gcp-sdk.sh
source ../helpers/check-credentials.sh
source ../helpers/authenticate-cluster.sh

kubectl create ns api || true
kubectl create ns sundial || true
kubectl create ns istio-system || true
kubectl label namespace api istio-injection=enabled --overwrite
kubectl label namespace default sundial istio-injection=disabled --overwrite