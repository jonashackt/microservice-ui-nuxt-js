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

## Generate Static Site from Nuxt.js application 

Now we should generate our Nuxt.js static site. So inside our project's root directory let's run:

```shell
npm run generate
```

This will result in a normal NPM build, followed by the static site generation:

```shell
ℹ Full static generation activated                                                                                                                                                  10:42:26
ℹ Generating output directory: dist/                                                                                                                                                10:42:26
ℹ Generating pages with full static mode                                                                                                                                            10:42:26
✔ Generated route "/"                                                                                                                                                               10:42:27
✔ Client-side fallback created: 200.html                                                                                                                                            10:42:27
✔ Static manifest generated
```

Have a look into the `dist` folder - it should contain all files necessary for your site to host in a static hosting service like AWS S3 (or GitHub Pages etc.).


## Deploy Static Site Generated Nuxt.js app to AWS S3 with Pulumi

https://www.pulumi.com/docs/reference/pkg/aws/s3/bucket/

https://www.pulumi.com/docs/reference/pkg/aws/s3/bucketobject/

https://www.pulumi.com/docs/tutorials/aws/s3-website/

Let's create a separate `deployment` directory for our Pulumi sources (since we can't override our `package.json` etc. of our root project):

```shell
mkdir deployment && cd deployment
pulumi new aws-typescript
```

I named the Pulumi project after my root project `microservice-ui-nuxt-js`

Now inside our [deployment/index.ts](deployment/index.ts) Pulumi TypeScript program let's create an S3 Bucket for static website hosting:

```javascript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create an AWS resource (S3 Bucket)
const nuxtBucket = new aws.s3.Bucket("microservice-ui-nuxt-js-hosting-bucket", {
  acl: "public-read",
  website: {
    indexDocument: "index.html",
  }
});

// S3 Objects from Nuxt.js static site generation will be added through aws CLI instead of Pulumi like this
// (see https://www.pulumi.com/docs/tutorials/aws/aws-ts-static-website/#deployment-speed):
// aws s3 sync ../dist/ s3://$(pulumi stack output bucketName) --acl public-read

// Export the name of the bucket
export const bucketName = nuxtBucket.id;
export const bucketUrl = nuxtBucket.websiteEndpoint;
```

And for every file inside the Nuxt.js target dir `dist` we create a new S3 object inside the S3 Bucket.

> But this shouldn't be done using Pulumi's `BucketObject` for multiple files really - see this so Q&A for more details: https://stackoverflow.com/questions/67318524/pulumi-typescript-aws-how-to-upload-multiple-files-to-s3-incl-nested-files

Instead we should use AWS CLI directly to copy (and later incrementally sync, when new builds ran) our static website files to our S3 Bucket like this:

```shell
aws s3 sync ../dist/ s3://$(pulumi stack output bucketName) --acl public-read
```

Using $(pulumi stack output bucketName) we simply get the S3 Bucket name that was created by Pulumi. Mind the --acl public-read parameter at the end, since you have to enable public read access on each of your static web files in S3, although the Bucket itself already has public read access!

> Before we finally run our Pulumi program, make sure to have an apropriate AWS `ACCESS_KEY_ID` and `ACCESS_KEY_SECRET` configured.
If you don't have them, you can generate them inside the `IAM` service for your AWS user in the AWS management console.
Make sure to run `aws configure` to configure both to your local terminal.

Now it's time to run our Pulumi deployment. `cd` into `deployment` and run:

```shell
pulumi stack select dev
pulumi up
```


## Use Pulumi with GitHub Actions CI





## Links

Nuxt.js TypeScript Components cookbook: https://typescript.nuxtjs.org/cookbook/components/

VSCode with Vetur Plugin: https://marketplace.visualstudio.com/items?itemName=octref.vetur
