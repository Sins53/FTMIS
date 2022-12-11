# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Package Manager and Node lock

The project is specifically locked for Node version greater than 14. Node 10 and 12 are nearing the EOL. The release information can be accessed throught this [⚰️ link](https://nodejs.org/en/about/releases/).

Furthermore, due to inconsistency with the package manager, YARN will only be specifically used for the proects. The project is also locked for only using YARN.

[🗃️ Documentation](docs/engine-lock.md)

## Profiling application performance

Performance plays major role in any application. With web-vitals integrated in Create React App, why-did-you-render has also been integrated for better notification on performance issues related with the application.

[🗃️ Documentation](docs/react-profiling.md)

## Changelog generation and application versioning `yarn release`

Application versioning and CHANGELOG generation powered by Conventional Commits.

[🗃️ Documentation](https://github.com/conventional-changelog/standard-version)

## 📌 Pinned References

- [Execute commands using an environment from an env file or json file.](https://github.com/toddbluhm/env-cmd)
- [Environment variables available in Create React App](https://create-react-app.dev/docs/advanced-configuration/)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
