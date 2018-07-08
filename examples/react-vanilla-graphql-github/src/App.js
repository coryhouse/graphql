import React, { Component } from "react";
import axios from "axios";

function post(query) {
  return axios.post("https://api.github.com/graphql", query, {
    headers: {
      authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
  });
}

// Plain fetch example.
// To use this, need to switch lines in resolveIssuesQuery below as noted in the comment.
// function post(query) {
//   return fetch("https://api.github.com/graphql", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
//     },
//     body: JSON.stringify(query)
//   }).then(response => response.json());
// }

// This query accepts variables so we don't have to do cheezy
// string interpolation and escaping.
// Note that cursor is optional since it's not passed for the first query.
const GET_ISSUES_OF_REPOSITORY = `
  query ($organization: String!, $repository: String! $cursor: String) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        id
        name
        url
        stargazers {
          totalCount
        }
        viewerHasStarred
        issues(first: 5, after: $cursor, states: [OPEN]) {
          edges {
            node {
              id
              title
              url
              reactions(last: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

const ADD_STAR = `
  mutation ($repositoryId: ID!) {
    addStar(input:{starrableId:$repositoryId}) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

const getIssuesOfRepository = (path, cursor) => {
  const [organization, repository] = path.split("/");

  return post({
    query: GET_ISSUES_OF_REPOSITORY,
    variables: { organization, repository, cursor }
  });
};

const addStarToRepository = repositoryId => {
  return post({
    query: ADD_STAR,
    variables: { repositoryId }
  });
};

const resolveAddStarMutation = mutationResult => state => {
  const { viewerHasStarred } = mutationResult.data.data.addStar.starrable;
  const { totalCount } = state.organization.repository.stargazers;

  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        viewerHasStarred,
        stargazers: {
          // Of course, to support removing stars, need to add logic.
          totalCount: totalCount + 1
        }
      }
    }
  };
};

// Extracting setState body to a pure func. 👍
// Using currying so setState is returned as a func
// that closes over the queryResult.
const resolveIssuesQuery = (queryResult, cursor) => state => {
  // Use this line instead if using fetch
  // const { data, errors } = queryResult;
  const { data, errors } = queryResult.data;

  if (!cursor) {
    // Since initial request, can simply return the state
    return {
      organization: data.organization,
      errors
    };
  }

  // Since subsequent request, must merge new and old state.
  const { edges: oldIssues } = state.organization.repository.issues;
  const { edges: newIssues } = data.organization.repository.issues;
  const updatedIssues = [...oldIssues, ...newIssues];

  // Clone nested objects to update in an immutable manner.
  // Only updating the updated issues, but they're deeply nested
  // Could try using immer here instead. Apollo makes this easier too.
  return {
    organization: {
      ...data.organization,
      repository: {
        ...data.organization.repository,
        issues: {
          ...data.organization.repository.issues,
          edges: updatedIssues
        }
      }
    },
    errors
  };
};

const Organization = ({
  organization,
  errors,
  onFetchMoreIssues,
  onStarRepository
}) => {
  if (errors) {
    return (
      <p>
        <strong>Something went wrong:</strong>
        {errors.map(error => error.message).join(" ")}
      </p>
    );
  }
  return (
    <div>
      <p>
        <strong>Issues from Organization:</strong>
        <a href={organization.url}>{organization.name}</a>
      </p>
      <Repository
        repository={organization.repository}
        onFetchMoreIssues={onFetchMoreIssues}
        onStarRepository={onStarRepository}
      />
    </div>
  );
};

const Repository = ({ repository, onFetchMoreIssues, onStarRepository }) => (
  <div>
    <p>
      <strong>In Repository: </strong>
      <a href={repository.url}>{repository.name}</a>
      <button
        type="button"
        onClick={() =>
          onStarRepository(repository.id, repository.viewerHasStarred)
        }
      >
        {repository.stargazers.totalCount}
        {repository.viewerHasStarred ? "Unstar" : "Star"}
      </button>
    </p>

    <ul>
      {repository.issues.edges.map(issue => (
        <li key={issue.node.id}>
          <a href={issue.node.url}>{issue.node.title}</a>

          <ul>
            {issue.node.reactions.edges.map(reaction => (
              <li key={reaction.node.id}>{reaction.node.content}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>

    <hr />
    {repository.issues.pageInfo.hasNextPage && (
      <button onClick={onFetchMoreIssues}>More</button>
    )}
  </div>
);

class App extends Component {
  state = {
    path: "facebook/react",
    organization: null,
    errors: null
  };

  onChange = event => {
    this.setState({ path: event.target.value });
  };

  onSubmit = event => {
    this.onFetchFromGitHub(this.state.path);
    event.preventDefault();
  };

  onFetchFromGitHub = (path, cursor) => {
    getIssuesOfRepository(path, cursor).then(queryResult =>
      this.setState(resolveIssuesQuery(queryResult, cursor))
    );
  };

  onFetchMoreIssues = () => {
    // Pass the cursor so we know the next records to grab.
    const { endCursor } = this.state.organization.repository.issues.pageInfo;
    this.onFetchFromGitHub(this.state.path, endCursor);
  };

  onStarRepository = (repositoryId, viewerHasStarred) => {
    addStarToRepository(repositoryId).then(mutationResult =>
      this.setState(resolveAddStarMutation(mutationResult))
    );
  };

  render() {
    return (
      <div>
        <h1>GitHub Issue Search</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Repository</label>{" "}
          <input
            id="url"
            type="text"
            value={this.state.path}
            onChange={this.onChange}
          />{" "}
          <button type="submit">Search</button>
        </form>

        <hr />

        {this.state.organization && (
          <Organization
            organization={this.state.organization}
            onFetchMoreIssues={this.onFetchMoreIssues}
            onStarRepository={this.onStarRepository}
          />
        )}
      </div>
    );
  }
}

export default App;
