




// DEVELOPMENT
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectDB =require('./config/db')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var bodyParser = require('body-parser');
var cors = require('cors');
const session = require('express-session');



var app = express();
connectDB();



// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//   secret: 'mySecretKey',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 60000 }
// }));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true, // Set to true if using HTTPS
    maxAge: 600000 // Session max age in milliseconds
  }
}));

const corsOptions = {
  origin: [
    'http://localhost:3000', // Local development
    'https://bucolic-liger-6c73bd.netlify.app', // Netlify frontend-client
    'https://precious-sprinkles-87cec4.netlify.app/'// Netlify admin-frontend
   
  ],
  // credentials: true // Allow cookies and credentials to be sent
};

app.use(cors(corsOptions));


// app.use(cors({
//   origin: 'https://emenu-adminfrontent.web.app',
//   credentials: true // Allow credentials to be sent
// }));

// For production (origin: '*')
// app.use(cors({
//   origin: '*',
//   credentials: true
// }));



//for developmen-hosting
// app.use(cors({
//   origin:'http://localhost:3000',
//   credentials: true // Allow credentials to be sent
// }));



// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);


// app.use('/images', express.static(path.join(__dirname, 'images')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error as JSON response
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
