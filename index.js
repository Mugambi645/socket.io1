const app = require("express") ();
const http = require("http").Server(app);
const io = require("socket.io") (http);
const port = 3000;
app.set("view engine", "ejs");
app.get("/", (request,response) => {
    response.render("index");
});
users = [];
io.on("connection", socket => {
  console.log("User connected");
  socket.on("setUsername", data => {
    console.log(data);
    

    if (users.indexOf(data) > -1) {
      socket.emit(
        "userExists",
        data + " username is taken! Try some other username."
      );
    } else {
      users.push(data);
      socket.emit("userSet", { username: data });
    }
  });

  socket.on("msg", data => {
    io.sockets.emit("newmsg", data);
  });
});
http.listen(process.env.PORT || port, () => {
    console.log(`Server listening at port ${port}`)
})