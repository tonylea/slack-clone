import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default () => (
  <Query
    query={gql`
      {
        allUsers {
          id
          email
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.allUsers.map(({ id, email }) => (
        <div key={id}>
          <h1>{email}</h1>
        </div>
      ));
    }}
  </Query>
);
