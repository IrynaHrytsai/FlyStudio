const dotenv = require('dotenv'); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();  

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;  

app.use(cors());  
app.use(express.json());  


const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);  
  }
};


if (!MONGODB_URI) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1);
} else {
  connectDB();
}


const contactRoutes = require('./routes/contact');
const registerRoutes = require('./routes/register');


app.use('/api/contact', contactRoutes);
app.use('/api/register', registerRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
