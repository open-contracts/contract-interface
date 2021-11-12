git submodule update --recursive --remote
yarn run build
git rm -r build/client-protocol
rm -rf .git/modules/build/client-protocol
rm -rf build/client-protocol
git clone https://github.com/open-contracts/client-protocol build/client-protocol
git add .
git commit -m "Building"

# push build to main
git subtree push --prefix build origin gh-pages
# git push origin `git subtree split --prefix build main`:gh-pages --force 