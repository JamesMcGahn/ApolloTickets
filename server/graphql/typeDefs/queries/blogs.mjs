import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const blogsSchema = new QMSchemaGenerator(
  'blogs',
  {
    category: {
      type: 'String',
      description: 'The category of the blogs.',
    },
    tag: {
      type: 'String',
      description: 'The tag of the blogs.',
    },
    page: {
      type: 'Int',
      description: 'The page number of blogs returned',
    },
    status: {
      type: 'postStatusType',
      description: 'Draft or Published posts. Restricted to Agents.',
    },
  },
  {
    type: 'posts',
    description: 'The blog information',
  },
);

const blogs = blogsSchema.getSchemaString();

export default blogs;
