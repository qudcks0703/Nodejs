var app=require("express")();
var http=require("http");

var server=http.createServer(app);
server.listen(3000,()=>{
  console.log('접속 성공했습니다요');
});

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/chat.html');
});

var io=require('socket.io').listen(webserver,{
  log:false,
  origins:'*:*',
  pingInterval:3000,
  pingTimeoutt:5000
})
io.on('connect',(socket)=>{
  console.log('클라이언트 접속');
  //console.log(socket);

  socket.on('disconnect',()=>{
    console.log('클라이언트 서버 종류');
  });
  setInterval(()=>{
    socket.emit('message','메세지');
  },3000);
});
function e(){
  alert('ㅋㅋㅋㅋ');
}
//var app=require('express')();''
// var http = require('http').Server(app); //1
// var io = require('socket.io')(http);    //1
