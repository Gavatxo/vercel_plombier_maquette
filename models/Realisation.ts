import mongoose, { Schema, models } from 'mongoose';

const RealisationSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ['Salle de bain', 'Chauffage', 'Dépannage', 'Plomberie'],
    required: true
  },
  location: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  tags: [{ type: String }],
  published: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default models.Realisation || mongoose.model('Realisation', RealisationSchema);
