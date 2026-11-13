"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

// 時間割・履修科目のデータ（本来ならDBに保存する）
let timetable = [
  { id:1, name:"Webプログラミング", teacher:"千葉太郎", day:"金", period:1, credit:2, room:"7号館 7301" },
  { id:2, name:"データベース", teacher:"習志野花子", day:"月", period:2, credit:2, room:"6号館 6201" },
  { id:3, name:"線形代数", teacher:"津田沼一郎", day:"火", period:3, credit:2, room:"2号館 2101" },
  { id:4, name:"英語コミュニケーション", teacher:"幕張次郎", day:"水", period:1, credit:1, room:"4号館 4302" },
  { id:5, name:"アルゴリズムとデータ構造", teacher:"新木場三郎", day:"木", period:4, credit:2, room:"7号館 7202" },
];

// 一覧表示
app.get("/timetable", (req, res) => {
  res.render('timetable', { data: timetable });
});

// 追加（フォームは /public/timetable_add.html）
app.get("/timetable_add", (req, res) => {
  const newdata = {
    id: Number( req.query.id ),
    name: req.query.name,
    teacher: req.query.teacher,
    day: req.query.day,
    period: Number( req.query.period ),
    credit: Number( req.query.credit ),
    room: req.query.room,
  };
  timetable.push( newdata );
  res.redirect('/timetable');
});

// 詳細表示
app.get("/timetable/:number", (req, res) => {
  const number = req.params.number;
  const detail = timetable[ number ];
  if( detail === undefined ) return res.status(404).send("科目が見つかりません");
  res.render('timetable_detail', { data: detail, number: number });
});

// 編集画面
app.get("/timetable_edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = timetable[ number ];
  if( detail === undefined ) return res.status(404).send("科目が見つかりません");
  res.render('timetable_edit', { data: detail, number: number });
});

// 更新
app.get("/timetable_update/:number", (req, res) => {
  const number = req.params.number;
  if( timetable[ number ] === undefined ) return res.status(404).send("科目が見つかりません");
  timetable[ number ] = {
    id: Number( req.query.id ),
    name: req.query.name,
    teacher: req.query.teacher,
    day: req.query.day,
    period: Number( req.query.period ),
    credit: Number( req.query.credit ),
    room: req.query.room,
  };
  res.redirect('/timetable');
});

// 削除
app.get("/timetable_delete/:number", (req, res) => {
  const number = Number( req.params.number );
  if( timetable[ number ] === undefined ) return res.status(404).send("科目が見つかりません");
  timetable.splice( number, 1 );
  res.redirect('/timetable');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
