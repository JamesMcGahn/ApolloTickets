import TEISchemaGenerator from './TEISchemaGenerator.mjs';

const userSchema = {
  id: {
    type: 'ID!',
    description: 'The ID of the User',
  },
  name: {
    type: 'String!',
    description: 'The full name of the User',
  },
  email: {
    type: 'String!',
    description: 'The email name of the User',
  },
  role: {
    type: 'RolesType!',
    description: 'RolesType enum',
  },
  isActive: {
    type: 'Boolean!',
    description: 'The active status of the User',
  },
};

const user = new TEISchemaGenerator('userInfo', 'type', userSchema);
const userInfo = user.getSchemaString();
export default userInfo;
