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
  { id:1, name:"キャリアデザイン1", teacher:"柳瀬昌孝", day:"月", period:1, period_end:2, credit:1, room:"12号館3階教室兼実習室1（新習志野）" },
  { id:2, name:"言語と文化2 ドイツ語", teacher:"岡田安樹浩", day:"月", period:3, period_end:4, credit:2, room:"7202講義室（新習志野）" },
  { id:3, name:"英語理解2 aクラス", teacher:"坂井竜太郎", day:"月", period:6, period_end:7, credit:1, room:"5204講義室（新習志野）" },
  { id:4, name:"データ通信", teacher:"水本旭洋", day:"火", period:1, period_end:2, credit:2, room:"3212演習室（新習志野）" },
  { id:5, name:"データサイエンス", teacher:"三木大輔", day:"火", period:6, period_end:7, credit:2, room:"3212演習室（新習志野）" },
  { id:6, name:"アジャイルワーク1", teacher:"三木大輔", day:"水", period:5, period_end:8, credit:2, room:"722演習室（津田沼）" },
  { id:7, name:"微分積分", teacher:"東條晃次", day:"木", period:2, period_end:3, credit:2, room:"8108講義室（新習志野）" },
  { id:8, name:"英語表現2 aクラス", teacher:"森創摩", day:"木", period:5, period_end:6, credit:1, room:"5303講義室（新習志野）" },
  { id:9, name:"環境科学概論", teacher:"星永宏", day:"木", period:7, period_end:8, credit:2, room:"5208講義室（新習志野）" },
  { id:10, name:"Webプログラミング", teacher:"須田宇宙", day:"金", period:3, period_end:4, credit:2, room:"7104演習室（新習志野）" },
  { id:11, name:"アイディアソン 補習_1年生", teacher:"須田宇宙", day:"金", period:6, period_end:7, credit:2, room:"3212演習室（新習志野）" },
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
    period_end: Number( req.query.period_end ),
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
    period_end: Number( req.query.period_end ),
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
