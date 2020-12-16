#!/usr/bin/env bash

find ../*/manifests/*.yml -exec kubectl apply -f {} \;
