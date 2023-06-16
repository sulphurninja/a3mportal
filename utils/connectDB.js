import mongoose from 'mongoose';

const connectDB = () => {
    if (mongoose.connections[0].readyState) {
        console.log('Already connected!');
        return;
    }
    mongoose.set('strictQuery', false);
    const mongodbURI = 'mongodb+srv://aditya4sure:RiseAbove@a3mportal.jthdt9a.mongodb.net/?retryWrites=true&w=majority';
    mongoose.connect(mongodbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) throw err;
        console.log('Connected to MongoDB!');
    });
};

export default connectDB;
