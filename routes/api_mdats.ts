import {NextFunction, Request, Response} from "express";
import {libConst } from "../include/libConst";

var express = require('express');
var router = express.Router();
let AppConst= new libConst();
var sqlite3 = require('sqlite3')

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
    res.send('respond with a resource-1234');
});
/******************************** 
* 
*********************************/
router.get('/index', function(req: Request, res: Response, next: NextFunction ) {
//console.log( AppConst.dbfileName )
    let db = new sqlite3.Database( AppConst.dbfileName )
    let items:any[] = [];
    let sql = `
    SELECT id,hnum, lnum ,date(mdate, '+9 hours') as mdate
    FROM mdats order by mdate;
    `;
    db.serialize(function() {
        db.all(sql , function(err: any, rows:any[] ) {
            rows.forEach( function (item:any[] ) {
                items.push(item  );
//                console.log(item )
            });
            var param = {"docs": items };
            res.json(param);
        });
    });
    db.close();
});
/******************************** 
* 
*********************************/
router.post('/new', (req: Request, res: Response, next: NextFunction) => {
    let data = req.body
//    console.log(data )
    let db = new sqlite3.Database( AppConst.dbfileName )
    let sql = `
    INSERT INTO mdats (mdate, hnum, lnum, up_date) VALUES 
    (CURRENT_TIMESTAMP, ?, ? , CURRENT_TIMESTAMP)
    `;
    db.serialize(function() {
        var stmt = db.prepare(sql)
        stmt.run(
            data.hnum,
            data.lnum,
        )
        stmt.finalize()
        res.json(data);        
    });
    db.close();
}); 
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req: Request, res: Response, next: NextFunction) {
    let db = new sqlite3.Database( AppConst.dbfileName )
    let sql = `
    SELECT id,hnum, lnum ,date(mdate, '+9 hours') as mdate
    FROM mdats where id=${req.params.id}
    `;
//console.log(sql);
    db.serialize(function() {
        db.all(sql, function(err: any, rows:any[]) {
           var param = {"docs": rows };
            res.json(param);
        });
    });
    db.close();
});
/******************************** 
* 
*********************************/
router.post('/update', (req: Request, res: Response, next: NextFunction) => {
    let data = req.body
//    console.log(req.body )    
    let db = new sqlite3.Database( AppConst.dbfileName )
    var sql = "update mdats set hnum= ?, lnum =? where id= ?"
    db.serialize(function() {
        var stmt = db.prepare( sql )
        stmt.run(
            data.hnum,
            data.lnum,
            data.id
        )
        stmt.finalize()
        res.json(data);
    });
    db.close();
});
/******************************** 
* 
*********************************/
router.get('/delete/:id', function(req: Request, res: Response, next: NextFunction) {
    let db = new sqlite3.Database( AppConst.dbfileName )
    db.serialize(function() {
        var stmt = db.prepare('delete from mdats where id= ?')
        stmt.run(req.params.id )
        stmt.finalize()   
        res.json({id : req.params.id})
    });
    db.close();
});

export {router as apiMdatsRouter}
