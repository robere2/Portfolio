
# Portfolio &middot; [![Deploy to Azure](https://github.com/robere2/Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/robere2/Portfolio/actions/workflows/deploy.yml) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/robere2/Portfolio/blob/master/LICENSE)
> Personal portfolio for Erik Roberts

## Installing / Getting started

This project is designed to have as few dependencies as possible. The dependencies it does have are, for the most part, build dependencies.

This project is also ready to be deployed to Azure Static Web Apps with CD.

## Developing

### Built With

Vite is used for bundle the application. The only runtime dependencies are:
- [FontAwesome](https://fontawesome.com/) is used as a source for icons.
- [Google reCAPTCHA](https://www.google.com/recaptcha/about/) is used to protect against contact form spam.

As few dependencies as possible are used, and new dependencies should be installed sparingly.


### Prerequisites

You should have [Node.JS and NPM](https://nodejs.org/en/download/) installed on your computer. Node.js v20 is currently the latest supported runtime in Azure. If you have [nvm](https://github.com/nvm-sh/nvm) installed, you can switch to the correct Node.js version by running:

```shell
nvm use
```

If you intend to develop and run Azure Functions locally, you also need to install the Azure SWA CLI:

```shell
npm install -g @azure/static-web-apps-cli azure-functions-core-tools@4
```


### Setting up Dev

Here are the steps to set up a local development environment.

First clone the repository locally.

```shell
git clone https://github.com/robere2/Portfolio.git
cd Portfolio/
```

Install the dependencies for the client.

```shell
cd client
npm install
cd ..
```

Optionally, if you want to run the Azure Functions locally (as opposed to just the frontend), also install the backend dependencies.

```shell
cd api
npm install
cd ..
```

If you do intend on running the Azure Functions, you also need to create a `local.settings.json` file.

```shell
cp api/sample.local.settings.json api/local.settions.json
```

And then edit `local.settings.json` to contain the proper configuration values. These values should be kept secret and not committed to version control.

#### Running with Functions

To run with functions enabled, simply run:
```shell
swa start
```
Open the application at http://localhost:4280/

#### Running without Functions

To run without functions enabled, simply run:
```shell
cd client
npm run dev
```
Open the application at http://localhost:3000/

### Building

#### Client

The client can be built via:
```shell
npm run build
```
This will output the built project to `/client/dist`. You can then start up a simple HTTP server to serve your built application via:
```shell
npm run preview
```

#### API

The Azure Functions do not have any build steps.

### Deploying / Publishing

This project has full continuous deployment support for Azure Functions. Take a look at the [GitHub Workflow file](./.github/workflows/deploy.yml) to see how it works.

## Configuration

No configuration is required for the client.

For the Azure Functions, you must set up `local.settings.json` to develop locally, as mentioned in the "Setting up Dev" section. Once deployed to Azure, instead of using a `local.settings.json` file, you will configure your application settings in the Azure Portal.

If you intend to deploy this application on a domain other than [https://ecr.dev/](https://ecr.dev/), you will need to create your own FontAwesome kit with the custom icons:

* `fa-azure`
* `fa-cpp`
* `fa-electron`
* `fa-graphql`
* `fa-mongodb`
* `fa-nestjs`
* `fa-postgres`
* `fa-redis`
* `fa-rabbitmq`
* `fa-minecraft`
* `fa-lua`

More information available on [FontAwesome's website](https://fontawesome.com/docs/web/setup/use-kit).

You will also need to set up a custom reCAPTCHA profile for your domain. More information available on [Google's website](https://developers.google.com/recaptcha/docs/v3).

## Tests

No test suite is currently available.

Refer to issue [#24](https://github.com/robere2/Portfolio/issues/24).

## Style guide

This project follows the code guidelines found at [https://github.com/elsewhencode/project-guidelines](https://github.com/elsewhencode/project-guidelines).

Pull requests must be linted before being merged. You can lint locally via `npm run lint` in both `api/` and `client/`. `npm run fix` will attempt to fix any linter issues.

If development environment setup instructions were followed correctly, then a pre-commit hook should have been installed to automatically lint your staged files before committing. If your changes have any linting issues, then the commit will abort. Even if this is not set up, the GitHub Action will notice the issues for you. 

## Api Reference

`/api/SubmitContact`

Submit a "Contact Me" form.

- POST
- Requires body parameters: `name`, `email`, `subject`, `body`, `token`.
- Content-Type `application/json`.

## Licensing

[This project is licensed under the MIT license.](./LICENSE)
