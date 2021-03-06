FROM node:alpine

# Add vim for editing things if needed
# RUN apt-get update && apt-get install -y vim
# RUN ["apt-get", "update"]
# RUN ["apt-get", "install", "-y", "vim"]

# Add a work directory
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

USER node

# Copy files
COPY --chown=node:node . .

# Copy specific package.json to docker build
COPY --chown=node:node ./dockerfiles/* .

# bypass ssh (DANGEROUS), i have wsl2 issues with ssh luls
RUN npm config set registry http://registry.npmjs.org/

# install deps
RUN npm install

# generate production build
RUN npm run build

#Expose port used by vite serve
EXPOSE 5010

# serve the files generated by the build
CMD [ "npm","run", "serve", "--", "--port", "5010", "--host"]
