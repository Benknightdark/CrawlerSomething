# FROM node:alpine as build

# # ENV NODE_ENV production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# #RUN npm install typescript --save-dev
# RUN npm install  --silent 
# # --production 
# COPY . .
# RUN apk add --nocache udev ttf-freefont chromium git
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# ENV CHROMIUM_PATH /usr/bin/chromium-browser
# CMD npm run build
# CMD node ./dist/index.js


# FROM  crawler:latest 
# COPY --from=build /usr/src/app/. .



FROM kinlan/puppets:latest
# Add user so we don't need --no-sandbox.
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser ./node_modules

# Run everything after as non-privileged user.
USER pptruser

# Copy the app
COPY . /app/
#COPY local.conf /etc/fonts/local.conf
WORKDIR app
RUN npm i
RUN npm run build


EXPOSE 8084
ENTRYPOINT ["dumb-init", "--"]
CMD node ./dist/index.js