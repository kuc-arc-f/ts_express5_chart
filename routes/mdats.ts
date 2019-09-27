import {NextFunction, Request, Response} from "express";
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
    res.render('mdats/index', {});
});
/******************************** 
* 
*********************************/
router.get('/new', function(req: Request, res: Response, next: NextFunction) {
    res.render('mdats/new', {});
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req: Request, res: Response, next: NextFunction) {
//console.log(req.params.id  );
    res.render('mdats/show', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.get('/edit/:id', function(req: Request, res: Response, next: NextFunction) {
    res.render('mdats/edit', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.get('/chart', function(req: Request, res: Response, next: NextFunction) {
    res.render('mdats/chart', {"params_id": req.params.id });
});

export {router as mdatsRouter}
