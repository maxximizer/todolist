
# TODO List application
Application  aggreagates TODO items into one list, every element has an option to be DONE, REMOVED or EDITED
## Getting Started
### Prerequisites
You’ll need to have Node >= 6 on your local development machine.  [Here](https://nodejs.org/en/download/package-manager/) you can find information about installing Node.js via package manager
### Installation
The easiest and the fastest way to start your project with React is to use its boilerplate  [create-react-app](https://github.com/facebook/create-react-app) .

```
npm install -g create-react-app
create-react-app to-do-app
cd to-do-app/
npm start 
```
Now your application is running on [http://localhost:3000](http://localhost:3000) . It should take you to web automatically.

### Testing and deployment
Commands  ```npm test```   and ``` npm run build``` are responsible for running tests and building the app for production respectively.  Find more information about [running tests](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests) and [deployment](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) on create-react-app repository.

### Folder Structure

After creation to-do-app project, your directory path should look like this:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
```
## Tutorial
Esentially to get started,  you edit src/App.js with already imported react components
 ```import React, { Component } from 'react';```   and a declared React component class  ```App``` with ```render()``` method that returns a React element