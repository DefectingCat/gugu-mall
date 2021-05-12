FROM node:16-alpine as builder
WORKDIR /root
COPY ./ ./
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk update \
  && apk upgrade \
  && npm config set registry https://registry.npm.taobao.org \
  && npm install \
  && npm run build \
  && rm -rf node_modules \
  && rm -rf .git

FROM nginx:alpine
WORKDIR /root
COPY --from=builder /root/dist /usr/share/nginx/html
