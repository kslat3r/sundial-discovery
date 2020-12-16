#!/usr/bin/env bash

CREDS=${GOOGLE_APPLICATION_CREDENTIALS}
PROJECT=${1}

gcloud auth activate-service-account --key-file=${CREDS}
gcloud container clusters get-credentials sundial-cluster \
    --zone europe-west3-a \
    --project "${PROJECT}"