var app=require("express")(),
  http=require("http"),
  util=require('util');

var server=http.createServer(app);
server.listen(3000,()=>{
  console.log('접속 성공했습니다요');
});

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index1.html');
});

var io=require('socket.io').listen(server,{
  log:false,
  origins:'*:*',
  pingInterval:3000,
  pingTimeoutt:5000
})
io.on('connect',(socket)=>{
  console.log('클라이언트 접속');
  //console.log(socket);
  socket.emit('message',{msg:'welcome'+" "+socket.id});

  util.log("connection>>",socket.id,socket.handshake.query);
  //util.log("connection>>",socket.id,socket.handshake.query.aaa);
  //query는 get방식 값을 받음.
  socket.on('join',(roomId,fn)=>{
    socket.join(roomId,()=>{
      util.log("Join",roomId,Object.keys(socket.rooms))
      if(fn)
        fn();
    });
  });

  socket.on('leave',(roomId,fn)=>{
    socket.leave(roomId,()=>{
      if(fn)
        fn();
    }); //fn적으면 콜백함수받을수있음.
  });

  socket.on('rooms',(fn)=>{
    if(fn){
      fn(Object.keys(socket.rooms));
    }
  });

  socket.on('message',(data,fn)=>{
    util.log("메세지>>",data.msg,Object.keys(socket.rooms))
  });//룸안의 아이디.
  socket.on('disconnecting',(data)=>{
    util.log("disconnecting>>",socket.id,Object.keys(socket.rooms));
  });
  //나가기전에
  socket.on('disconnect',(data)=>{
    util.log("disconnect>>",socket.id,Object.keys(socket.rooms));
  });
  //딱나가고
});
