import { gql } from '@apollo/client';

const createATicket = gql`
  mutation Mutation($newTicket: newTicket) {
    createTicket(newTicket: $newTicket) {
      group {
        id
        name
      }
      assignee {
        email
        name
        id
        role
      }
      comments {
        author {
          id
          name
          email
          role
        }
        content
        createdAt
        updatedAt
        id
        private
      }
      createdAt
      description
      id
      requester {
        email
        id
        name
        role
      }
      priority
      status
      title
      updatedAt
    }
  }
`;

export default createATicket;
