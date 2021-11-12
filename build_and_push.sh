git submodule update --recursive --remote
yarn run build
git rm --cached build/client-protocol
rm -rf .git/modules/build/client-protocol
rm -rf build/client-protocol
git clone https://github.com/open-contracts/client-protocol build/client-protocol

# push build to main
git subtree push --prefix build origin gh-pages
