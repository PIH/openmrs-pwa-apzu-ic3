#!/bin/bash
#
# This versions a config repo to the next SNAPSHOT version.
#
# It accepts the environment variable
#   `DEVELOPMENT_VERSION`
#

set -e  # die on error
set -o pipefail  # die on error within pipes

### Configure Github

git config --global user.email "pihinformatics@gmail.com"
git config --global user.name "pihinformatics"

git remote remove central || true
git remote add central git@github.com:PIH/openmrs-pwa-apzu-ic3.git
git fetch central

### Clean up

# For these to work, it's important that the Bamboo has git repository caching disabled for this repo/job.
# Reset
git reset --hard central/main
# Clean up stray local tags that didn't get pushed
git tag -l | xargs git tag -d
git fetch central --tags

### Figure out versions

# POM should currently have release version from `release-prepare.sh`
RELEASE_VERSION=$(grep -m 1 "<version>" pom.xml | sed 's/.*version>\(.*\)<\/version.*/\1/')

if [ -z "${DEVELOPMENT_VERSION}" ]; then
    MAJOR=$(echo "${RELEASE_VERSION#v}" | cut -f1 -d.)
    MINOR=$(echo "${RELEASE_VERSION#v}" | cut -f2 -d.)
    PATCH=$(echo "${RELEASE_VERSION#v}" | cut -f3 -d.)
    NEW_MINOR="$(( ${MINOR} + 1 ))"
    DEVELOPMENT_VERSION="${MAJOR}.${NEW_MINOR}.0-SNAPSHOT"
fi

echo DEVELOPMENT_VERSION ${DEVELOPMENT_VERSION}

### Prep for next development cycle
sed -i "0,/<\/version>/{s/version>.*<\/version/version>${DEVELOPMENT_VERSION}<\/version/}" pom.xml
git add pom.xml
if ! git diff --cached --exit-code; then
  git commit -m "update to ${DEVELOPMENT_VERSION}"
  git push central main
fi
