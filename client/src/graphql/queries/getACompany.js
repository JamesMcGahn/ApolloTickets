import { gql } from '@apollo/client';

const getACompany = gql`
  query Company($companyId: ID!) {
    company(id: $companyId) {
      id
      level
      name
      notes
      users {
        email
        id
        isActive
        name
        role
      }
    }
  }
`;

export default getACompany;
