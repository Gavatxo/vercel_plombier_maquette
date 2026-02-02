import mongoose, { Schema, models } from 'mongoose';

const AppointmentSchema = new Schema({
  id: { type: String, required: true, unique: true },
  client_name: { type: String, required: true },
  client_phone: { type: String, required: true },
  client_email: { type: String },
  intervention_type: {
    type: String,
    enum: ['depannage_urgence', 'fuite_eau', 'chaudiere_panne', 'entretien_chaudiere', 'installation', 'renovation_sdb', 'autre'],
    required: true
  },
  urgency: {
    type: String,
    enum: ['urgence', 'rapide', 'normal'],
    required: true
  },
  city: { type: String, required: true },
  preferred_date: { type: String, required: true },
  preferred_time: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  google_calendar_event_id: { type: String },
  created_at: { type: Date, default: Date.now }
});

export default models.Appointment || mongoose.model('Appointment', AppointmentSchema);
