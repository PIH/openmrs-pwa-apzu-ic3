#!/bin/bash

usage () {
    echo -e "Expects one of the following arguments: "
    echo -e "ci - runs npm ci"
    echo -e "test - runs npm run test"
    echo -e "cypress-test - runs npm run cypress-test.  For this option, expects username, password, and url to be passed as subsequent arguments.  eg. admin Admin123 localhost:8080/"
    echo -e "build - runs npm run build.  For this option, the build number should be passed in as the second argument"
    echo -e "If no argument is passed, executes ci, followed by test, followed by build"
}

npminstall() {
  docker run --rm \
    -v $(pwd):/data \
    -w="/data" \
    node:14 \
    npm install
}

npmci() {
  docker run --rm \
    -v $(pwd):/data \
    -w="/data" \
    node:14 \
    npm ci
}

npmtest() {
  docker run --rm \
    -v $(pwd):/data \
    -w="/data" \
    -e CI=true \
    node:14 \
    npm run test
}

npmcypresstest() {
  docker run --rm \
    -v $(pwd):/data \
    -w="/data" \
    -e cypress_username=$2 \
    -e cypress_password=$3 \
    -e REACT_APP_SERVER_ADDRESS=$4 \
    -e REACT_APP_SERVER_CONTEXT_PATH=/openmrs \
    cypress/base:14.17.3 \
    npm run test-cypress
}

npmbuild() {
  docker run --rm \
    -v $(pwd):/data \
    -w="/data" \
    -e CI=true \
    -e REACT_APP_SERVER_ADDRESS= \
    -e REACT_APP_SERVER_CONTEXT_PATH=/openmrs \
    -e REACT_APP_CONTEXT_PATH=/workflow \
    -e REACT_APP_BUILD_NUMBER=$2 \
    node:14 \
    npm run build
}

npmstart() {
  docker run --rm \
    -v $(pwd):/data \
    -w="/data" \
    -e CI=true \
    -e REACT_APP_SERVER_ADDRESS=http://localhost:8080 \
    -e REACT_APP_SERVER_CONTEXT_PATH=/openmrs \
    -e REACT_APP_CONTEXT_PATH=/workflow \
    -e REACT_APP_BUILD_NUMBER=$2 \
    node:14 \
    npm start
}

if [ "$1" = "ci" ]; then
  npmci
elif [ "$1" = "test" ]; then
  npmtest
elif [ "$1" = "cypress-test" ]; then
  npmcypresstest
elif [ "$1" = "build" ]; then
  npmbuild
elif [ "$1" = "install" ]; then
  npminstall
elif [ "$1" = "start" ]; then
  npmstart
else
  npminstall
  npmci
  npmtest
  npmbuild
fi
