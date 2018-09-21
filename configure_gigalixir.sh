#!/bin/bash
set -e
if [[ -z $1 ]] ; then
    echo 'Error! Expected an application name as an argument!'
    echo 'Usage: configure_gigalixir.sh <APP_NAME>'
    exit 0
fi

if [[ -z "${GOOGLE_OAUTH_CLIENT_ID}" ]] ; then
    echo 'Error! GOOGLE_OAUTH_CLIENT_ID not set'
    exit 0
fi

if [[ -z "${GOOGLE_OAUTH_CLIENT_SECRET}" ]] ; then
    echo 'Error! GOOGLE_OAUTH_CLIENT_SECRET not set'
    exit 0
fi

if [[ -z "${GOOGLE_OAUTH_REDIRECT_URI}" ]] ; then
    echo 'Error! GOOGLE_OAUTH_REDIRECT_URI not set'
    exit 0
fi


echo "${GOOGLE_OAUTH_CLIENT_ID}"
APP_NAME=$1

gigalixir set_config $APP_NAME GOOGLE_OAUTH_CLIENT_ID "${GOOGLE_OAUTH_CLIENT_ID}"
gigalixir set_config $APP_NAME GOOGLE_OAUTH_CLIENT_SECRET "${GOOGLE_OAUTH_CLIENT_SECRET}"
gigalixir set_config $APP_NAME GOOGLE_OAUTH_REDIRECT_URI "${GOOGLE_OAUTH_REDIRECT_URI}"

if [[ -n "${WHITELISTED_LOGINS}" ]] ; then
  echo "Logins are limited to: ${WHITELISTED_LOGINS}"
  gigalixir set_config $APP_NAME WHITELISTED_LOGINS "${WHITELISTED_LOGINS}"
fi

echo "Gigalixir environment set up"