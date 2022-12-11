# Node Image
FROM node:14.17.0 as builder
# working dir inside container
WORKDIR /app
#Copy dependencies files
COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build:development

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
# copy the build folder from react to the root of nginx (www)
COPY --from=builder /app/build /usr/share/nginx/html
# expose port
