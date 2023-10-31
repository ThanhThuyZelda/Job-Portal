const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
var cookieParser = require('cookie-parser')

const jobseekerRoute = require('./routes/jobseeker');
const employerRoute = require('./routes/employer');
const adminRoute = require('./routes/admin');
const app = express();


// app.use(cors())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true

}))

app.use(bodyParser.json());
//static images folder
app.use('/uploads', express.static('./uploads'));


app.use(cookieParser())

app.use(session({
    key: 'adminId',
    secret: "subscribe",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 2400
    }
}))


app.use("/nguoi-tim-viec", jobseekerRoute);
app.use("/nha-tuyen-dung", employerRoute);
app.use("/quan-tri-vien", adminRoute);


module.exports = app