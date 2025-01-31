#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下 
cd build

# 部署到自定义域名，没有自定义域名可注释掉
echo 'blog.celestial-cosmic.top' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
git push -f git@github.com:CelestialCosmic/CelestialCosmic.github.io.git master

cd -




