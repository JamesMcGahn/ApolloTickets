import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    featuredImage: {
      url: {
        type: String,
      },
      filename: {
        type: String,
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        filename: {
          type: String,
          required: true,
        },
      },
    ],
    blurb: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      lowercase: true,
      default: 'uncategorized',
    },
    tags: [
      {
        type: String,
      },
    ],
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['blog', 'article'],
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

PostSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
  });

  next();
});

PostSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', PostSchema);

export default Post;
