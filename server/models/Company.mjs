import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    notes: {
      type: String,
    },
    level: {
      type: String,
      enum: ['Small', 'Medium', 'Large', 'Enterprise'],
      default: 'small',
    },
  },
  { timestamps: true },
);

const Company = mongoose.model('Company', CompanySchema);

export default Company;
