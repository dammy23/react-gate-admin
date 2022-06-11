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
    math: function(lvalue: string , operator: string, rvalue: string ) {
        let lval = parseFloat(lvalue);
        let rval = parseFloat(rvalue);
        return {
            "+": lval + rval,
            "-": lval - rval,
            "*": lval * rval,
            "/": lval / rval,
            "%": lval % rval
        }[operator];
    },
    formatDate: function(datetime: string, format: string) {
        if (moment) {
          // can use other formats like 'lll' too
          
          if(format=="short"){
            format = DateFormats.short;
          }else
          if(format=="long"){
            format = DateFormats.long;
          }
         
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

        customIf: function(cond1:any, cond2:any, options:any) {
          return (cond1 == cond2) ? options.fn(this) : options.inverse(this);
      }

}}));

app.set('view engine', 'handlebars');
app.set("views", "./src/views");
//console.log(__dirname.replace("/src","") + '/uploads');

app.use('/js',express.static(__dirname + '/public/js'));
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/assets',express.static(__dirname + '/public/assets'));
app.use('/uploads',express.static(__dirname.replace("/src","") + '/src/assets/uploads'));
const middleUtilities= new MiddleUtilities();

app.use(middleUtilities.checkStatus);
app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(process.env.port || 8080, () => {
    console.log('Server started!');
});

