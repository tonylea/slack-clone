export default `
  type Team {
    id: Int!
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }
`;
