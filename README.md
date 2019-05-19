# Webpack Template

Create ready for production landing pages with sass, es6, responsive images and bundle optimizations.

- [Creating a Web](#creating-a-web) – How to create a new webpage.
- [User Guide] – How to develop apps bootstrapped with Webpack Template.

## Creating a Web

To create a new website just clone the repository and install the dependencies:

```sh
npm install
```

```
my-app
├── node_modules
├── package.json
├── package-lock.json
├── postcss.config.json
├── README.md
├── webpack.config.json
├── webpack.prod.json
├── .eslintrc.json
├── .gitignore
└── src
    ├── css/
    ├── images/
    ├── js/
        ├── app.js
    ├── index.html
```

No configuration or complicated folder structures, just the files you need to build your app.<br>
Once the installation is done, you can open your project folder:

Inside the newly created project, you can run some built-in commands:

### `npm run dev`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Bootstrap and Jquery in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

## User Guide

## How to use Bootstrap classes?

In order to use bootstrap classes, add the classes you want to use on the file `src/css/main.scss`.

<p>For Example</p>

```scss
  @import '~bootstrap/scss/buttons';
```

## How to use Bootstrap components?

In order to use bootstrap components, add the component you want to use on the file `src/js/app.js` between the tags `<components>` and `</components>`:

<p>For Example</p>

```js
  // <components>
  import 'bootstrap/js/dist/modal'
  // </components>
```

## How to import images?

To get your images correctly compiled for different breakpoints, import the images as it is indicated below depending the type of file:

### .scss

```scss
.my-image {
  background-image: url('../images/webpack-background.png?size=1920');
}

@media (max-width: 480px) {
  .my-image {
    background: url('../images/webpack-background.png?size=480');
  }
}
```

### .html

```html

<img
  src="<%= require('./images/webpack-background.png') %>"
  srcSet="<%= require('./images/webpack-background.png').srcSet %>"
  alt=""
>

```

## What’s Included?

Your environment will have everything you need to build a modern website with all the optimizations:

- ES6.
- Language extras beyond ES6 like the object spread operator.
- Autoprefixed CSS, so you don’t need `-webkit-` or other prefixes.
- A live development server that warns about common mistakes.
- A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps.
- An offline-first service worker.
- Critical css loader to load the early used css to a faster loading of the page.
