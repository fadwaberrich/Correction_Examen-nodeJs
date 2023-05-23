var mongoose =require("mongoose")
var ConfigDB= require ("./database.json")
const express = require ("express")
var router=express.Router()
const abonneRoutes = require('./routes/abonneRoutes')
const bodyparser= require("body-parser")
const http = require('http')
const path = require('path')
const { Abonne } = require("./models/Abonne")
const app = express()
app.use(express.static(path.join(__dirname, "public")));


app.use(express.json())
app.use(abonneRoutes)

/* GET home page. */


const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", async (socket) => {
  const id=socket.id
  socket.emit("userConnected",id)


socket.on("removeAbonne", async(abonneId) => {
  let obj= await Abonne.findById(abonneId)
  if(obj)
  {
      await Abonne.findByIdAndDelete(abonneId)
      socket.emit("abonneRemoved",obj.Nom)
      console.log(obj.Nom)

  }


});

});




module.exports = router;

server.listen(3200, () => {
    console.log("app is running on port 3200");
  });
  
mongoose.connect(ConfigDB.mongo.uri).then(()=>console.log('connected'))