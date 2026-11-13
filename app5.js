"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});


app.get("/janken2", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken2', display );
});

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = {id: id, code: code, name: name };
  station.push( newdata );
  res.render('db1', { data: station});
});

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
});

app.get("/keiyo2_add", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  let id = Number( req.query.id );
  let code = req.query.code;
  let name = req.query.name;
  let change = req.query.change;
  let passengers = Number( req.query.passengers );
  let distance = Number( req.query.distance );
  let newdata = { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance };
  station2.push( newdata );
  res.render('keiyo2', {data: station2} );
});


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
