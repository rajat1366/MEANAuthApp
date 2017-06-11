var express = require("express"),
	path  =  require("path"),
	bodyParser = require("body-parser"),
	cors = require("cors"),
	passport = require("passport"),
	mongoose = require("mongoose"),
	config = require("./config/database");

var userRoutes = require("./routes/users");

//Connect to database
mongoose.connect(config.database);

//	On connection
mongoose.connection.on('connected',()=>{
	console.log('connected to database'+config.database);
});

//on error
mongoose.connection.on('error',(err)=>{
	console.log('database error'+config.database);
});

var app = express();
const port = process.env.PORT;

//set static folder
app.use(express.static(__dirname+"/public"));

app.use(cors());
app.use(bodyParser.json());

//passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use("/users",userRoutes);

app.get("/",(req , res) => {
 	res.send("HOME PAGE testind nodemon");
});
app.get("*",(req ,res )=>{
	res.sendFile(path.join(__dirname,'public/index.html'));
});
app.listen(port,process.env.IP,() => {
	console.log("Server started");
});