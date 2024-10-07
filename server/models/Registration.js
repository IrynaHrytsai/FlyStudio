const mongoose = require('mongoose');

const validClassTypes = ['Aerial Silks', 'Aerial hoop', 'Aerial yoga', 'Stretching'];

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^\+380\d{9}$/.test(v); 
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  classType: { 
    type: String, 
    required: true,
    enum: validClassTypes 
  }, 
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Registration', registrationSchema);
