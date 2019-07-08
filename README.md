<h1 align="center">Welcome to 🔨 B-fine GraphQL API 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/@MarlairB">
    <img alt="Twitter: @MarlairB" src="https://img.shields.io/twitter/follow/@MarlairB.svg?style=social" target="_blank" />
  </a>
</p>

> -&gt; Apollo -&gt; GraphQL -&gt; PostGres -&gt; Redis -&gt; Docker. 

* * *

## About

We have many sources of data inside BFine, for many purposes 

For the moment, all data are fake and this project is just a structure

The goal of this project is to have a GraphQL API to query/manipulate all these data in one place, securely, to make future projects easier.

## Install

The GraphQL API is developed in `node.js`.  
The code is written with `ES2015` standards.  
It use **PostgreSQL** as database.

To run it locally for testing and/or improve the codebase, enter the following commands:

1. Ask a maintainer (for now, [@bertrandmarlair](https://github.com/bertrandmarlair)) to give you the local `/env/server.env` file, which contains the credentials for the API uses by the project
1. `npm install` (install project's dependencies)
1. `npm run build` (first-time build of code) 
1. using two different terminal instances, launch the following commands:
	1. `docker-compose up` (launch db and server - the **node-inspector** is binded to [http://localhost:5000](chrome://inspect))  
	1. `npm run work` (launch babel's *watch mode* to rebuild the code as it changes)

> ⚠️ **WARNING:** if you had a new **dependency** in the `package.json` file, you **need** to re-run the `docker-compose build` command.

### Endpoints

Then, you can access the following endpoints.

#### GraphQL endpoints

- [localhost:5000](http://localhost:5000) is the **main entrypoint** for the GraphQL API.
- [localhost:5000/explore](http://localhost:5000/explore) is a GUI GraphQL Client to explore/test the GraphQL API more easily.
- [localhost:5000/map](http://localhost:5000/map) is a GUI GraphQL Client to see the schemas connections

### Browsing the database
 
You can access by using DBeaver 
The **root** account (in local development env) is:

- **username:** `postgres`
- **password:** `postgres`
- **post:** `5001`
- **database:** `slack`

#### Git Workflow

We use the [*gitflow* model](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for this repository.

![GitFlow schema](https://static.becode.xyz/misc/gitflow.png)

The **master** branch is our *production* branch. Its protected and only *production maintainers* of the project can push on it.

The **release** branch is our *staging* branch. Its also protected and only *maintainers* of the project can push on it.

The **develop** branch is our main development branch.  
Its not protected (at least until the first production release) but please, try to use *feature branches* to develop new features.

The **feature branches** must be named `feature/name-of-the-feature`.  
When ending a feature, **avoid merging it directly to develop**. Create a **pull request** instead, so it can be reviewed by the maintainers.

> ☝️ **NOTE:** if you want to *mess around* and tests things without harm, please create a **playground branch**, named like this: `playground/your-name`

## Author

👤 **Bertrand Marlair**

* Twitter: [@MarlairB](https://twitter.com/@MarlairB)
* Github: [@BertrandMarlair](https://github.com/BertrandMarlair)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_