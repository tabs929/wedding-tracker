import mongoose, { Schema, Document } from 'mongoose';

export interface IMember {
  name: string;
  gender: 'male' | 'female';
  attending: boolean;
}

export interface IFamily extends Document {
  familyName: string;
  event: 'Engagement' | 'Devkarya' | 'Sangeet' | 'Marriage morning' | 'Marriage afternoon';
  members: IMember[];
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<IMember>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  attending: {
    type: Boolean,
    default: true
  }
});

const FamilySchema = new Schema<IFamily>(
  {
    familyName: {
      type: String,
      required: true,
      trim: true
    },
    event: {
      type: String,
      enum: ['Engagement', 'Devkarya', 'Sangeet', 'Marriage morning', 'Marriage afternoon'],
      required: true
    },
    members: [MemberSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IFamily>('Family', FamilySchema);
