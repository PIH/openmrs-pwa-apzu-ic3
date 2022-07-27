#!/bin/bash
#
# This versions the repo to its release version, preparing it for a Maven deploy.
# It accepts the environment variables
#   `RELEASE_VERSION`
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

CURRENT_RELEASE_TARGET=$(grep -m 1 "<version>" pom.xml | sed 's/.*version>\(.*\)-SNAPSHOT<\/version.*/\1/')

if [ -z "${RELEASE_VERSION}" ]; then
    RELEASE_VERSION=$CURRENT_RELEASE_TARGET
fi

echo RELEASE_VERSION ${RELEASE_VERSION}

### Do release

set -x  # print all commands

# Update version to release version
sed -i "0,/<\/version>/{s/version>.*-SNAPSHOT<\/version/version>${RELEASE_VERSION}<\/version/}" pom.xml
git add pom.xml
git commit -m "${RELEASE_VERSION} release"
git tag ${RELEASE_VERSION}
git push central main --tags
