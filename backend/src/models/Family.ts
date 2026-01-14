import mongoose, { Schema, Document } from 'mongoose';

export interface IMember {
  name: string;
  gender: 'male' | 'female';
  attending: boolean;
}

export interface IFamily extends Document {
  familyName: string;
  events: Array<'Engagement' | 'Devkarya' | 'Sangeet' | 'Marriage morning' | 'Marriage afternoon reception' | 'Night reception'>;
  event?: 'Engagement' | 'Devkarya' | 'Sangeet' | 'Marriage morning' | 'Marriage afternoon reception' | 'Night reception'; // Deprecated, for backward compatibility
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
    events: {
      type: [String],
      enum: ['Engagement', 'Devkarya', 'Sangeet', 'Marriage morning', 'Marriage afternoon reception', 'Night reception'],
      default: []
    },
    event: {
      type: String,
      enum: ['Engagement', 'Devkarya', 'Sangeet', 'Marriage morning', 'Marriage afternoon reception', 'Night reception'],
      required: false
    },
    members: [MemberSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IFamily>('Family', FamilySchema);
