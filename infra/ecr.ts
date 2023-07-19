import * as awsx from "@pulumi/awsx";

const repository = new awsx.ecr.Repository("printer-repository", {});

export const image = new awsx.ecr.Image("image", {
    repositoryUrl: repository.url,
    path: "./handlers/docker-build",
    env: {
        "DOCKER_DEFAULT_PLATFORM": "linux/amd64" // I have to do this because I have Mac M1. 
    }
});

export const url = repository.url;