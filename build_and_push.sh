git submodule update --recursive --remote
yarn run build

# push build to main
git subtree push --prefix build origin gh-pages
