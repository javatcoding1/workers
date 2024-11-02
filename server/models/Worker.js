import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Cook', 'Maid', 'Driver', 'Nanny', 'Gardener', 'Elder Care']
  },
  experience: {
    type: Number,
    required: true
  },
  location: {
    city: String,
    state: String,
    pincode: String
  },
  languages: [{
    type: String,
    enum: ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam']
  }],
  skills: [String],
  salary: {
    amount: Number,
    type: {
      type: String,
      enum: ['Monthly', 'Daily', 'Hourly']
    }
  },
  availability: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Live-in']
  },
  documents: {
    aadhar: String,
    police_verification: String,
    reference: String
  },
  rating: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Worker', workerSchema);