# microservice-ui-nuxt-js
Example project showing how to create &amp; deploy a Nuxt.js / Vue.js based frontend and how to interact with a Spring Boot microservice

![npm-run-dev](screenshots/npm-run-dev.png)

> The purpose of this project is elaborate the differences of a Nuxt.js / SSR or Static Site Generation based project to https://github.com/jonashackt/spring-boot-vuejs

## Universal Web Apps?

https://m.heise.de/developer/artikel/Interaktive-Websites-mit-Nuxt-js-fuer-Geschwindigkeit-SEO-und-Social-Media-4516901.html?seite=all

"Universal Webapps" --> faster loading of web sites!

> How? server does pre-rendering of the "start" HTML & CSS on server-side - and then loads JavaScript & dynamic CSS in the background, but user can already scroll and read.

All 3 popular web frameworks support Universal Web Apps:

* Angular: https://angular.io/guide/universal
* React: https://nextjs.org/ and https://www.gatsbyjs.com/
* Vue.js: https://nuxtjs.org/



## Nuxt.js

For all concepts see https://nuxtjs.org/docs/2.x/concepts/views

There are 3 modes: normal SPA (like Vue), Server Side Rendering (SSR) & Static Side Generation

* __SPA__: In this mode, Nuxt.js behaves just like a normal Vue.js application
* __[Server Side Rendering (SSR)](https://nuxtjs.org/docs/2.x/concepts/server-side-rendering)__: SSR sends fully rendered page from server to the client -> which then gets hydrated (https://ssr.vuejs.org/guide/hydration.html), which means that Vue.js turns the server rendered page into dynamic DOM that can react to client-side data changes
* __[Static Side Generation](https://nuxtjs.org/docs/2.x/concepts/static-site-generation)__: the application gets rendered during build phase and can then be deployed to any static hosting service (Netlify, GitHub Pages, AWS S3 static site hosting, Static hosting on Azure Storage Accounts etc.). There's no server needed for deployment & the content is delivered via Content Delivery Networks (CDNs). Additionally in Static Side Generation mode there's also [a SPA Fallback for sites that should be rendered on client side and won't be served through the CDN](https://nuxtjs.org/docs/2.x/concepts/static-site-generation#spa-fallback).


## Getting Started

See https://nuxtjs.org/docs/2.x/get-started/installation

```shell
npm init nuxt-app microservice-ui-nuxt-js
```

Now we need to choose something - I opted for TypeScript (is already used in https://github.com/jonashackt/spring-boot-vuejs with Vue.js 3.x).

Then a huge list of UI frameworks pops up:

![nuxt-js-create-ui-frameworks](screenshots/nuxt-js-create-ui-frameworks.png)

There are lot's of options, be it:

* Element https://element-plus.org/#/en-US
* Framevuerk https://framevuerk.com/
* Chakra UI https://github.com/chakra-ui/chakra-ui/ (which seems to be more on the React side of things)
* Bootstrap Vue (which prevents us from using Vue.js 3.x/next (see https://github.com/jonashackt/spring-boot-vuejs#bootstrap-support-for-vuejs-3next))

I went with Element, since it seemed to be widely used (nearly 10k GH stars) and is build with TypeScript + Vue.js 3.x (incl. Composition API) support.

Additionally I chose Axios as HTTP framework, Jest for unit testing and finally chose:

```shell
? Rendering mode:
Universal (SSR / SSG)
```

over the `Single Page App` possibility (since we want to be able to grasp the differences to a standard SPA with Vue).

Also I chose the`Deployment target` to be `Static (Static/Jamstack hosting)` (we'll have a look onto the `Server (Node.js hosting)` later).

Impressively Nuxt.js also asks which Development (dependabot, jsconfig, Semantic Pull Requests) or CI/CD tools you want to use.

This is my full configuration:

```shell
create-nuxt-app v3.6.0
✨  Generating Nuxt.js project in microservice-ui-nuxt-js
? Project name: microservice-ui-nuxt-js
? Programming language: TypeScript
? Package manager: Npm
? UI framework: Element
? Nuxt.js modules: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Linting tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Testing framework: Jest
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Static (Static/Jamstack hosting)
? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Continuous integration: GitHub Actions (GitHub only)
? What is your GitHub username? jonashackt
? Version control system: Git
```

After project generation has finished, let's finally run our project skelleton with:

```shell
npm run dev
```


## Links

Nuxt.js TypeScript Components cookbook: https://typescript.nuxtjs.org/cookbook/components/

VSCode with Vetur Plugin: https://marketplace.visualstudio.com/items?itemName=octref.vetur
