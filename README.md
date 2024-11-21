# Front End Example by Thomas Stein

This is an example project showing off some of my front end skills, project organization, and microservice knowledge.

---

## Table of Contents
- [Front End Example by Thomas Stein](#front-end-example-by-thomas-stein)
  - [Table of Contents](#table-of-contents)
  - [Run Project Locally](#run-project-locally)
    - [Local Requirements](#local-requirements)
    - [Run the Project Locally](#run-the-project-locally)
  - [Run Project within Docker](#run-project-within-docker)
    - [Docker Requirements](#docker-requirements)
    - [Run the Project in Docker](#run-the-project-in-docker)
  - [Running Frontend Project](#running-frontend-project)
  - [Easter Egg](#easter-egg)

---

## Run Project Locally

If you meet the requirements, you may run the project locally.

### Local Requirements

* Node version 20.18.
  * __NOTE:__ Tested on this specific version of node. Other versions may also work but are untested at this time.

### Run the Project Locally

1. Continue to the [Running Frontend Project](#running-frontend-project).

---

## Run Project within Docker

To make development easier, i provide a docker image that the project can be run within, so you do not have to install any project specific requirements (node, etc.).
The project directory is mounted into the docker container so any changes made are persisted to your host machine.

### Docker Requirements

* Docker Engine CLI instlled either from [Docker Desktop](https://docs.docker.com/get-started/get-docker/) or [Rancher Desktop](https://rancherdesktop.io/).
* [VSCode](https://code.visualstudio.com/) installed.
*  VSCode extension [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) installed.

### Run the Project in Docker

1. Pull this git repo locally onto your machine.
2. Ensure the Docker Engine is running on your machine.
3. If this is your first time running the project, or if you made changes to `Dockerfile` or `docker-compose.yml`, you need to first build the docker image.
   - Open a bash terminal at the project root directory, and run the script `buildDocker.sh`.
   - Alternatively, you can manually run the command `docker-compose build --no-cache`.
4. Start the docker container.
   - Open a bash terminal at the project root directory, and run the script `startDocker.sh`.
   - Alternatively, you can manually run the command `docker-compose up -d`.
5. Once the container is running, connect VSCode to it by:
   1. Opening the Remote Development Extension.
   2. Ensure you have `Dev Containers` selected.
   3. On the container `frontend` select `Attach in Current Window` or `Attach in new window`.
6. Now that VSCode is attached to the running container, continue to the [Running Frontend Project](#running-frontend-project).
   - The first time this is opened you might need to tell the containerized VSCode instance to open the codebase, which is located at `/code`.
7. To stop the running docker container:
   - Open a bash terminal at the project root directory, and run the script `stopDocker.sh`.
   - Alternatively, you can manually run the command `docker-compose down`.

---

## Running Frontend Project

1. You must first install **node modules** by opening a bash terminal at the project root directory, and running `npm install`. If you previously installed **node modules** then you can skip this step, unless you meet the following criteria:
   - __NOTE:__ If `package.json` was updated, you will to install the **node modules** again to get the new packages.
   - __NOTE:__ If you updated your node version and have previously installed **node modules**, you must first delete the `node_modules` folder before installing.
   - __NOTE:__ If you previously installed **node modules** locally, and want to use the docker container instead, you must first delete the `node_modules` folder before installing.
2. Next start the **React/Vite** app:
   1. Open a bash terminal at the project root directory, and run `npm run dev`.
   2. Once started, you can open a web browser at [localhost:5000](http://localhost:5000) to view the running application.

---

## Easter Egg

There is an easter egg that you can type into the sign in input.

[Since you are reading the docs, you get to know the easter egg password: NICE]: #

---
