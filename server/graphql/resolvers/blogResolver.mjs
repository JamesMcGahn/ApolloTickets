import { GraphQLError } from 'graphql';
import slugify from 'slugify';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../../models/Post.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const createBlog = async (parent, args, context) => {
  protectRoute(context, ['user']);
  const { newPost } = args;

  const post = await Post.create({
    ...newPost,
    type: 'blog',
    slug: slugify(newPost.title, {
      lower: true,
      trim: true,
    }),
    images: [],
    featuredImage: {
      url: null,
      filename: null,
    },
  });

  return post.populate('author');
};

const updateBlog = async (parent, args, context) => {
  protectRoute(context, ['user']);
  const { updatePost, slug, blogId } = args;
  let newSlug;

  if (!slug && !blogId) {
    throw new GraphQLError('Please provide a slug or blog ID', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  if (updatePost.title) {
    newSlug = slugify(updatePost.title, {
      lower: true,
      trim: true,
    });
  }

  const post = await Post.findOneAndUpdate(
    { $and: [{ type: 'blog' }, { $or: [{ slug: slug }, { _id: blogId }] }] },
    {
      ...updatePost,
      slug: newSlug,
      type: 'blog',
    },
    {
      returnDocument: 'after',
    },
  );

  if (!post) {
    throw new GraphQLError('We cannot find that blog post', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
  return post;
};

const getBlog = async (parent, args, context) => {
  const { user } = context;
  const { slug, blogId } = args;
  let post;
  if (!slug && !blogId) {
    throw new GraphQLError('Please provide a slug or blog ID', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
  if (!user || user.role === 'user') {
    post = await Post.findOne({
      $and: [
        { type: 'blog' },
        { isPrivate: false },
        { status: 'published' },
        { $or: [{ slug: slug }, { _id: blogId }] },
      ],
    });
    if (!user && post) {
      post = {
        ...post._doc,
        id: post._doc._id,
        author: {
          name: post._doc.author.name,
          role: post._doc.author.role,
          isActive: post._doc.author.isActive,
        },
      };
    }
  }

  if (user && user.role !== 'user') {
    post = await Post.findOne({
      $and: [{ type: 'blog' }, { $or: [{ slug: slug }, { _id: blogId }] }],
    });
  }

  if (!post) {
    throw new GraphQLError('We cannot find that blog post', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
  return post;
};

const deleteBlog = async (parent, args, context) => {
  protectRoute(context, ['user']);
  const { slug, blogId } = args;

  if (!slug && !blogId) {
    throw new GraphQLError('Please provide a slug or blog ID', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  const post = await Post.findOneAndDelete({
    $or: [{ slug: slug }, { _id: blogId }],
  });

  if (!post) {
    throw new GraphQLError('We cannot find that blog post', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  if (post.images && post.images.length > 0) {
    const delImages = [...post.images];

    const results = delImages.map(async (pic) => {
      return await cloudinary.uploader.destroy(pic.filename);
    });

    await Promise.all(results);
  }

  return post;
};

export { createBlog, getBlog, updateBlog, deleteBlog };
