#Run the project
To successfully run the project first please install node and react and then run:
### `npm install`
To install dependencies. This application was developped using:
Node v12.2.0
npm  6.9.0

All other dependencies are listed in package.json and should be installed using "npm install"



## Deploying the application

### Use `npm start` 
for local start of the app, which will serve it on localhost:3000


 For deplyment with Docker you can use :

 ### `docker build -t pokecube-react .` 

 to create a container and then :

 ### `docker run -it -p 8080:80 pokecube-react` 
 
 to run in on localhost:8080. For further redirections, please refer to original documentation of the image used in the Dockerfile at: https://github.com/mhart/alpine-node 



# Credits

### Create React App
This project was initially bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Little to none of this styling is left in the project, so please refer to the issue section of this repository and not to any third-party library or dependency such as [Create React App](https://github.com/facebook/create-react-app) if any problems araise with styling or functionality of this application.

### Alphine Node
This project uses the [Alphine Node](https://github.com/mhart/alpine-node) project as part of the included Dockerfile to allow continious integration and easier deployment.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them.

## Learn More For React and Create React App

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
