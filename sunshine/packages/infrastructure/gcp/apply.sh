#!/usr/bin/env bash

PROJECT=${1}

if [ -z "$PROJECT" ]
then
    printf "Usage: $0 <project_id>\n"
    exit 1
fi

pushd terraform
source ./apply.sh ${PROJECT}
ISTIO_INGRESS_IP=`terraform output sundial_external_static_ip`
popd

pushd kubernetes
source ./apply.sh ${PROJECT}
popd

pushd istio
source ./apply.sh ${PROJECT} ${ISTIO_INGRESS_IP}
popd

pushd metrics-server
source ./apply.sh ${PROJECT}
popd
