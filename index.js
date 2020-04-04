// var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
// var app = express(); //express를 실행하여 app object를 초기화 합니다.
//
// // app.get('/', function(req, res) { // '/' 위치에 'get'요청을 받는 경우,
// //   res.send('Hello World!'); // "Hello World!"를 보냅니다.
// // });
// // app.use(express.static(__dirname + '/public')); // 1
//
// app.set('view engine','ejs'); // 1
// app.use(express.static(__dirname + '/public'));
//
// app.get('/hello', function(req,res){ // 2
//   res.render('hello', {name:req.query.nameQuery});
// });
//
// app.get('/hello/:nameParam', function(req,res){ // 3
//   res.render('hello', {name:req.params.nameParam});
// });
//
//
// var port = 8080; // 사용할 포트 번호를 port 변수에 넣습니다.
// app.listen(port, function(){ // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
//   console.log('server on! http://localhost:'+port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
// });
var app = require('express')();
//var app=require('express')();''
var http = require('http').Server(app); //1
var io = require('socket.io')(http);    //1

// app.get('/',function(req, res){  //2
//   res.sendFile(__dirname + '/client.html');
// });

//var count=1;
io.on('connection', function(socket){ //3
  console.log('user connected: ', socket.id);  //3-1
  //var name = "user" + count++;                 //3-1
  //io.to(socket.id).emit('change name',name);   //3-1
  //내가 특정한곳에
  socket.on('disconnect', function(){ //3-2
    console.log('user disconnected: ', socket.id);
  });
  //내가 받을때

  socket.on('send message1', function(name,text){ //3-3
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message1', msg);
    //socket.emit 메세지를 전송한 클라이언트에게만 전송
    //socket.broadcast.emit 메세지를 전송한 클라이언트 제외 모든 클라이언트에게
    //io.to(socket.id).emit() 특정 클라이언트에게만 메세지 전송
    //전체 클라이언트에게 전송
  })
  socket.on('send message2', function(name,text){ //3-3
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message2', msg);
  });

});

http.listen(3000, function(){ //4
  console.log('server on!');
});
