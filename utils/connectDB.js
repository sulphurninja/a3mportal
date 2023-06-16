import mongoose from 'mongoose';

// Update your connectDB function
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://aditya4sure:RiseAbove@a3mportal.jthdt9a.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

// Call the updated connectDB function
connectDB();
