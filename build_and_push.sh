git submodule update --recursive --remote
yarn run build
git rm -r build/client-protocol
rm -rf .git/modules/build/client-protocol
cp -r public/client-protocol build/client-protocol
rm -r build/client-protocol/.git
git add .
git commit -m "Building"

# push build to main
git subtree push --force --prefix build origin gh-pages
