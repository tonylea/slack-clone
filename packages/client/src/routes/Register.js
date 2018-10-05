import React, { Component } from 'react';
import { Container, Header, Input, Button } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';

const registerUserMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password)
  }
`;

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onClick = () => {
    console.log(this.state);
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <Mutation mutation={registerUserMutation}>
        <Container text>
          <Header as="h2">Register</Header>
          <Input
            name="username"
            onChange={this.onChange}
            value={username}
            placeholder="username"
            fluid
          />
          <Input
            name="email"
            onChange={this.onChange}
            value={email}
            placeholder="email"
            fluid
          />
          <Input
            name="password"
            onChange={this.onChange}
            value={password}
            placeholder="password"
            fluid
            type="password"
          />
          <Button onClick={this.onClick}>Submit</Button>
        </Container>
      </Mutation>
    );
  }
}

export default Register;
