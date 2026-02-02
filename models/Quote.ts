import mongoose, { Schema, models } from 'mongoose';

const QuoteSchema = new Schema({
  id: { type: String, required: true, unique: true },
  client_name: { type: String, required: true },
  client_phone: { type: String, required: true },
  client_email: { type: String },
  intervention_type: {
    type: String,
    enum: ['depannage_urgence', 'fuite_eau', 'chaudiere_panne', 'entretien_chaudiere', 'installation', 'renovation_sdb', 'autre'],
    required: true
  },
  city: { type: String, required: true },
  description: { type: String, required: true },
  photos_urls: [{ type: String }],
  status: {
    type: String,
    enum: ['pending', 'sent', 'accepted', 'rejected'],
    default: 'pending'
  },
  created_at: { type: Date, default: Date.now }
});

export default models.Quote || mongoose.model('Quote', QuoteSchema);
