# Vanilla GraphQL with React

This project calls the [GitHub GraphQL API](https://developer.github.com/v4/) using plain GraphQL with React. No libraries required.

## Quick Start

1.  [Create a GitHub Personal Access Token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). For scopes/permissions check: admin:org, repo, user, notifications.
1.  Create an .env file in the root of this project and save your GitHub Personal Access Token inside like this: `REACT_APP_GITHUB_TOKEN=YourPersonalAccessTokenHere`
1.  `npm install`
1.  `npm start`
1.  Open localhost:3000 in your browser.
1.  Check out the [GitHub GraphQL API on GraphiQL](https://developer.github.com/v4/explorer/) to get comfortable with the data structures this app is querying.

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). This app is a fork of a project based on [this post by Robin Wieruch](https://www.robinwieruch.de/react-with-graphql-tutorial/).
