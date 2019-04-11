import React from "react";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";
import "./App.css";

const GET_LIFTS_WITH_TRAIL_ACCESS = gql`
  query {
    allLifts {
      id
      name
      status
      trailAccess {
        id
        name
      }
    }
  }
`;

const SET_LIFT_STATUS = gql`
  mutation setStatus($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

function App() {
  function handleClick(e, lift, setLiftStatus) {
    e.preventDefault();
    setLiftStatus({
      variables: {
        id: lift.id,
        status: lift.status === "OPEN" ? "CLOSED" : "OPEN"
      }
    });
  }

  return (
    <>
      <h1>React Apollo Example</h1>
      <p>
        This app uses React-Apollo to call an example GraphQL endpoint that
        provides Ski lift data.
      </p>
      <Query query={GET_LIFTS_WITH_TRAIL_ACCESS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return `Error: ${error.message}`;
          return (
            <form>
              <h1>Ski Lifts</h1>
              <ul>
                {data.allLifts.map(lift => (
                  <li key={lift.id}>
                    <Mutation
                      mutation={SET_LIFT_STATUS}
                      // Optionally, could manually update Apollo cache with new lift status returned from mutation
                      // But this is commented out because it's unnecessary because we're updating a single record
                      // and returning an id in the mutation result. Apollo's cache provider is smart enough to
                      // update cache automatically when an id is returned from the mutation. 👍
                      // update={(cache, { data: { id, status } }) => {
                      //   const { allLifts } = cache.readQuery({
                      //     query: GET_LIFTS_WITH_TRAIL_ACCESS
                      //   });
                      //   cache.writeQuery({
                      //     query: GET_LIFTS_WITH_TRAIL_ACCESS,
                      //     data: {
                      //       allLifts: allLifts.map(lift =>
                      //         lift.id === id ? { ...lift, status } : lift
                      //       )
                      //     }
                      //   });
                      // }}
                    >
                      {(setLiftStatus, { loading, error }) => {
                        // The ErrorBoundary in root will handle this
                        if (error) throw new Error(error);
                        return (
                          <h2>
                            {lift.name}: {lift.status}{" "}
                            <button
                              disabled={loading}
                              onClick={e => handleClick(e, lift, setLiftStatus)}
                            >
                              {loading ? "Toggling..." : "Toggle"}
                            </button>
                          </h2>
                        );
                      }}
                    </Mutation>
                    Trail Access
                    <br />
                    <ul>
                      {lift.trailAccess.map(trail => (
                        <li key={trail.id}>{trail.name}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </form>
          );
        }}
      </Query>
    </>
  );
}

export default App;
