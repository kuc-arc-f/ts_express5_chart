const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
import {NextFunction, Request, Response} from "express";
//
import {indexRouter} from "./routes/index";
import {tasksRouter} from "./routes/tasks";
import {mdatsRouter} from "./routes/mdats";
//
import {apiRouter} from "./routes/api";
import {apiMdatsRouter} from "./routes/api_mdats";
var sqlite3 = require('sqlite3')
var dbfileName = "./app1.sqlite"
let db = new sqlite3.Database( dbfileName )

const app = express();
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* 
interface RequestEx extends Request {
    db: any;
}
*/
app.use(function(req: Request, res: Response, next: NextFunction){
    next();
});
//
app.use('/', indexRouter );
app.use('/tasks', tasksRouter );
app.use('/mdats', mdatsRouter );
//api
app.use('/api', apiRouter );
app.use('/api_mdats', apiMdatsRouter );

export {app}
