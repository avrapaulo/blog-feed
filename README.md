# blog-feed

This application allows the users to:

- Blog feed should list all posts and associated title, author, date and description, sorted by publish date from newest first
- Users can view individual blog posts in a separate page
- Users can view comments for a blog post
- Users can add and edit a comment to a blog post if Sign in
  _Sign in don't have any validation everyone can enter_

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

In the project directory, you can run:

### Install node >=10.18.1

### `yarn install`

Installs project dependencies.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
_If REST API is not running on localhost:9001 change API_URL in .env.development_
The page will reload if you make edits.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [build](https://nextjs.org/docs/api-reference/cli#build) for more information.

- [Typescript](https://www.typescriptlang.org/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)
