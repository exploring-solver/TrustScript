const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const verificationRoutes = require('./routes/verificationRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const Verification = require('./models/Verification');
const Document = require('./models/Document');
const User = require('./models/User');

// const { admin, adminRouter } = require('./admin/admin');

dotenv.config();
// connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res) => {
  res.json("Welcome to JalSync API by team ramanujan (sih-2024)!!")
})
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/analytics', analyticsRoutes);

const start = async () => {
  connectDB();
  
  // Dynamically import AdminJS and @adminjs/mongoose
  const { default: AdminJS } = await import('adminjs');
  const AdminJSMongoose = await import('@adminjs/mongoose');
  const { buildRouter } = await import('@adminjs/express');
  
  // Import the models
  
  // Register AdminJS Mongoose adapter
  AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  });

  // Configure AdminJS
  const adminOptions = {
    resources: [
      { resource: User, options: { parent: { name: 'User Management' } } },
      { resource: Document, options: { parent: { name: 'Document Management' } } },
      { resource: Verification, options: { parent: { name: 'Verification Management' } } },
    ],
    rootPath: '/admin',  // Path to access the admin panel
  };
  
  const admin = new AdminJS(adminOptions);
  const adminRouter = buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();