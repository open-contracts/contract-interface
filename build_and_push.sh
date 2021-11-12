# run and commit build in main
​git subtree pull --prefix build origin gh-pages
git submodule update --recursive --remote
yarn run build
git rm -r build/client-protocol
rm -rf .git/modules/build/client-protocol
cp -r public/client-protocol build/client-protocol
rm -r build/client-protocol/.git
git add .
git commit -m "Built Page"
git push

# push build to gh-pages
git subtree push --prefix build origin gh-pages
