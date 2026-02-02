import mongoose, { Schema, models } from 'mongoose';

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin'
  },
  created_at: { type: Date, default: Date.now }
});

export default models.User || mongoose.model('User', UserSchema);
