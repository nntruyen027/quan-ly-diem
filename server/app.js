const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const os = require('os');
const cors = require('cors')

const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const classRoutes = require('./routes/classRoutes');
const teachingAssignmentRoutes = require('./routes/teachingAssignmentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

const config = require('./config');
const morgan = require('morgan')
const passport = require('./passport');
const User = require('./models/User');
const bcrypt = require('bcryptjs');


const app = express();
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: '*'
}))
app.use(passport.initialize());

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected')

  User.findOne({username: 'admin'}).then(async (user) => {
    if(!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin', salt);

      const adminUser = new User({
        username: 'admin',
        fullname: 'Admin User',
        email: 'admin@gmail.com',
        password: hashedPassword,
        isAdmin: true,
        isTeacher: true,
      });

      await adminUser.save();
    }
  })
})
  .catch(err => console.log(err));

const version = 'v1'

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(`/${version}/auth`, authRoutes);
app.use(`/${version}/accounts`, accountRoutes);
app.use(`/${version}/subjects`, subjectRoutes);
app.use(`/${version}/classes`, classRoutes);
app.use(`/${version}/teaching-assignments`, teachingAssignmentRoutes);
app.use(`/${version}/grades`, gradeRoutes);
app.use(`/${version}/ratings`, ratingRoutes);
app.use(`/${version}`, express.static('uploads'));


function getServerIP() {
  const interfaces = os.networkInterfaces();
  for (const iface in interfaces) {
    for (const alias of interfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost'; 
}

const [host, port] = (process.argv[2] || '0.0.0.0:5000').split(':');

const server = app.listen(port, host, () => {
  const serverIP = getServerIP();
  console.log(`Server running at http://${serverIP}:${port}/${version}`);
});
