#!/usr/bin/env bash

kubectl apply -f ../helpers/helm.yml
helm init --service-account tiller --upgrade --wait
helm version
