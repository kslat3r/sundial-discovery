#!/usr/bin/env bash

SDK_VERSION="248.0.0"
SDK_INSTALLER="https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-${SDK_VERSION}-darwin-x86_64.tar.gz"

gcloud version &> /dev/null || {
    pushd /tmp
    curl -sSLfO "${SDK_INSTALLER}"
    tar -xvzf google-cloud-sdk-${SDK_VERSION}-darwin-x86_64.tar.gz
    ./google-cloud-sdk/install.sh
    popd
}