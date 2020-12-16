#!/usr/bin/env bash

CREDS=${GOOGLE_APPLICATION_CREDENTIALS}
PROJECT=${1}
CREDS_PROJECT=$(jq -r .project_id < $CREDS)

if [ -z "$CREDS" ] 
then
    echo "You must set GOOGLE_APPLICATION_CREDENTIALS environment variable as non empty"
    exit 1
fi

if [ -z "$PROJECT" ] 
then
    printf "Usage: $0 <project_id>\n(Your credentials are pointed to ${CREDS_PROJECT})\n"
    exit 1
fi

if [ "$PROJECT" != "$CREDS_PROJECT" ] 
then
    printf "${PROJECT} does not match project stored project stored within credentials ${CREDS_PROJECT}\n"
    exit 1
fi