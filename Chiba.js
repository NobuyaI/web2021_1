const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const message = "こんにちは😃";
  res.render('show', {mes:message});
});

app.get("/db", (req, res) => {
    db.serialize( () => {
        db.all("select id, 市町村名 , 人口 , 面積 from chiba;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select2', {data:row});
        })
    })
})

app.get("/top", (req, res) => {
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 市町村名, 人口 from chiba order by 人口" + desc + " limit " + req.query.pop + ";";
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select2', {data:data});
        })
    })
})

app.get("/top2", (req, res) => {
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 市町村名, 面積 from chiba order by 面積" + desc + " limit " + req.query.pop + ";";
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select2', {data:data});
        })
    })
})

app.get("/db2", (req, res) => {
    db.serialize( () => {
        db.all("select id, 一次産業人口 , 二次産業人口 , 三次産業人口 from chiba2;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select4', {data:row});
        })
    })
})

app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
