const mongoose = require('mongoose');

const ExperienceSchema = mongoose.Schema({
  type: String,
  name: String,
  role: String,
  team: String,
  date: {
    start: String,
    end: String,
  },
  responsiblities: {
    type: String,
    required: false,
  }
})

module.exports = mongoose.model('Experiences', ExperienceSchema);