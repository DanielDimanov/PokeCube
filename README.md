#PokeCube
This project intends to:
1. Allow users to browse Pokemons
2. Allow users to read and visualise Pokemon statistics
3. Allow users to compare Pokemon statistics for different Pokemons
4. Allows the user to login with Google and store his/hers favourite Pokemons

The project uses [PokeAPI](https://pokeapi.co/docs/v2.html) . All data displayed is collected with API calls to the API and is not stored in order to comply to the API [Fair Use Policy and limitations](https://pokeapi.co/docs/v2.html) the project caches all resources using [Firebase](https://console.firebase.google.com/). The limit of the API calls is 100 per minute from host, so the calls are limited to just one when the site loads to update for potential new Pokemons and if there are newfounds, then API calls for each new Pokemon are made JUST ONCE to update the records in Firebase. 

If a pokemon is fetched form the [PokeAPI](https://pokeapi.co/docs/v2.html) and is not present in the current cache (Firebase), then it is automatically stored and displayed from the [PokeAPI](https://pokeapi.co/docs/v2.html).

#DISCLAIMERS and Limitations

The application currently uses free-tier Firebase backend service for caching and information storage, as well as authentication, which only allows for 50k reads per DAY. A read is done in the following instances:
1. Getting cached Pokemon (if 850 Pokemons are displayed => 850 reads are made. If the Compare panel is filled with 1700 Pokemons => 1700 requests are made)
2. Getting favourite Pokemons => once per state change in Favourite page

There are limits for data writes as well, which is 20k writes, but the writes are expected to be relatively very low compare to the reads. A write in the datastore is made in the following instances:
1. User liked/disliked a Pokemon
2. Pokemon was not cached and was fetched from the PokeAPI and is cached in Firebase

Displaying 800+ pokemons requires lots of memory and some browsers (Like `Google Chrome`) throw an error, because of the predefined limitations, since the application is suspected of memory leakage. Work is currently being done to address this issue.

# Run the project
To successfully run the project first please install node and react and then run:
### `npm install`
To install dependencies. This application was developped using:
Node v12.2.0
npm  6.9.0

All other dependencies are listed in package.json and should be installed using "npm install"

###Notice:
Please notice that the firebase api keys and credentials are stored using `process.env.REACT_APP` variables. To run the applications without errors you need to:

1. Create `.env` file in the root directory of the project

2. Add all corresponding fields following this template (also available as txt file called `envPlaceholder.txt`):
REACT_APP_API_KEY=[your_api_key]
REACT_APP_AUTH_DOMAIN=[your_auth_domain]
REACT_APP_DATABASE_URL=[your_database_url]
REACT_APP_PROJECT_ID=[your_project_id]
REACT_APP_STORAGE_BUCKET=[your_storage_bucket]
REACT_APP_MESSAGING_SENDER_ID=[your_app_messaging_sender_id]

3. If you use the template file you might want to rename the file and the extension to [blankName].env, so : `.env`.

4. Happy hacking



## Deploying the application

Use `npm start` 
for local start of the app, which will serve it on localhost:3000


 For deplyment with Docker you can use :

`docker build -t pokecube-react .` 

 to create a container and then :

 `docker run -it -p 8080:80 pokecube-react` 
 
 to run in on localhost:8080. For further redirections, please refer to original documentation of the image used in the Dockerfile at: https://github.com/mhart/alpine-node 



# Credits

### Create React App
This project was initially bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Little to none of this styling is left in the project, so please refer to the issue section of this repository and not to any third-party library or dependency such as [Create React App](https://github.com/facebook/create-react-app) if any problems araise with styling or functionality of this application.

### Alphine Node
This project uses the [Alphine Node](https://github.com/mhart/alpine-node) project as part of the included Dockerfile to allow continious integration and easier deployment.

### React Request
This project uses [React Request](https://www.npmjs.com/package/react-request), which allows for structured, easy and clear API calls and boosts the readability of the code.



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
