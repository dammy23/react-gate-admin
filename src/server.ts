import express from 'express';
import cors from 'cors';
import routes from './routes';
import moment from 'moment';
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { engine } = require('express-handlebars');
import './database/connection';
import MiddleUtilities from '@config/utilities';

const app = express();
const oneDay = 1000 * 60 * 60 * 24;
var DateFormats = {
    short: "DD MMMM - YYYY HH:mm",
    long: "dddd DD.MM.YYYY HH:mm"
};

//session middleware
app.use(sessions({
    secret: "5drsdtrdy66fu8liksdsioi7i87",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cookieParser());
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main",helpers:{
    math: function(lvalue: string | number, operator: string | number, rvalue: string | number) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    },
    formatDate: function(datetime: string, format: string) {
        if (moment) {
          // can use other formats like 'lll' too
          format = DateFormats[format] || format;
          return moment(datetime).format(format);
        }
        else {
          return datetime;
        }
      },
    getType: function(type: string) {
        if (type=="1") {
            // can use other formats like 'lll' too
           
            return 'Administrator';
          }
          else if (type=="2") {
            // can use other formats like 'lll' too
           
            return 'Landlord';
          }
          else {
          return "Guard";
        }
      },
      getVisitStatus: function(type: string) {
        if (type=="1") {
            return 'Out';
          }
          else {
          return "In";
        }
      },
      customIf: function(cond1, cond2, options) {
        return (cond1 == cond2) ? options.fn(this) : options.inverse(this);
    }


}}));

app.set('view engine', 'handlebars');
app.set("views", "./src/views");
//console.log(__dirname.replace("/src","") + '/uploads');

app.use('/js',express.static(__dirname + '/public/js'));
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/assets',express.static(__dirname + '/public/assets'));
app.use('/uploads',express.static(__dirname.replace("/src","") + '/uploads'));
const middleUtilities= new MiddleUtilities();

app.use(middleUtilities.checkStatus);
app.use(cors());
app.use(express.json());
app.use(routes);



 
/**app.use(express.static(path.join(__dirname,'public')))
 * app.get('/', function(req,res) {
    //res.send("hello");
    res.sendFile(path.join(__dirname,'public','index.html'))
});**/



app.listen(2390, () => {
    console.log('Server started!');

    
});

