const app = require("express") ();
const http = require("http").Server(app);
const io = require("socket.io") (http);
const port = 3000;
app.set("view engine", "ejs");
app.get("/", (request,response) => {
    response.render("index");
})
http.listen(process.env.PORT || port, () => {
    console.log(`Server listening at port ${port}`)
})