import { GraphQLError } from 'graphql';
import dateScalar from './scalars/dateScalar.mjs';
import Ticket from '../models/Ticket.mjs';
import User from '../models/User.mjs';
import signToken from '../utils/signToken.mjs';

const resolvers = {
  Query: {
    Tickets: async () => {
      return await Ticket.find();
    },
    Ticket: async (_, args) => {
      const { id } = args;
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        throw new GraphQLError('We cannot find that Ticket Id', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      return ticket;
    },
  },
  Mutation: {
    createTicket: async (_, args) => {
      const { newTicket } = args;
      const ticket = await Ticket.create(newTicket);

      return ticket;
    },
    updateTicket: async (_, args) => {
      const { id, updateTicket } = args;

      const ticket = await Ticket.findByIdAndUpdate(id, updateTicket, {
        new: true,
        runValidators: true,
      });
      return ticket;
    },
    deleteTicket: async (_, args, context) => {
      const { id } = args;
      const { role } = context.user;
      console.log(role);
      if (role === 'user') {
        throw new GraphQLError('You dont have permission to delete', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      const ticket = Ticket.findByIdAndRemove(id);
      if (!ticket) {
        throw new GraphQLError('We cannot find that Ticket Id', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      return ticket;
    },
    createUser: async (_, args) => {
      const { createUser } = args;
      const newUser = await User.create(createUser);

      const createdUser = {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
        email: newUser.email,
      };

      const token = signToken(createdUser);

      return {
        ...createdUser,
        token,
      };
    },
    loginUser: async (_, args) => {
      const { password, email } = args.loginUser;
      const user = await User.findOne({ email }).select('+password');

      if (!user || !(await user.correctPassword(password, user.password))) {
        throw new GraphQLError(
          'You are not authorized to perform this action.',
          {
            extensions: {
              code: 'FORBIDDEN',
            },
          },
        );
      }

      const createdUser = {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      };

      const token = signToken(createdUser);

      return {
        ...createdUser,
        token,
      };
    },
  },
  Date: dateScalar,
};

export default resolvers;
