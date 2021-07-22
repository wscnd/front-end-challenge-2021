FROM node:alpine

# Add vim for editing things if needed
# RUN apt-get update && apt-get install -y vim
# RUN ["apt-get", "update"]
# RUN ["apt-get", "install", "-y", "vim"]

# Add a work directory
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Copy files
COPY . .
# Copy specific package.json to docker build
COPY ./dockerfiles/* .

# bypass ssh (DANGEROUS), i have wsl2 issues with ssh luls
# RUN npm config set registry http://registry.npmjs.org/
# install deps, run vite build
# RUN npm install \
# && npm run build

#Expose port used by vite serve
EXPOSE 5010

# run vite preview from dist/ created by the build command
CMD npm run serve -- --port 5010 --host