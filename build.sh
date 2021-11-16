# run and commit build in main
git submodule update --init --recursive
git submodule update --recursive --remote
yarn install
yarn run build
git rm -r build/client-protocol
rm -rf .git/modules/build/client-protocol
rm -rf build/client-protocol
cp -r public/client-protocol/ build/
rm -r build/client-protocol/.git
git add .
git commit -m "Built Page"
git push