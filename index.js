const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require("crypto");
require('dotenv').config()
const secret = `secret-${crypto.randomUUID}`;

function generateToken(id){
  return crypto.createHmac("sha256",secret).update(id.toString()).digest('hex');
}

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
app.use(bodyParser.urlencoded({ extended: true }));
  console.log(generateToken(0))
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post("/submit",(req,res,next)=>{

  res.send(req.body.name)
})

app.use((req,res,next)=>{
  if(req.query.id === "0" && req.query.token === generateToken(0)){
    
    return res.send("45 53 46 53 54 7b 41 5a 59 5a 5f 4f 55 53 53 45 4d 41 5f 43 54 46 7d")
  }else{
    return res.send("invalid token")
  }
})
app.listen(port);
console.log(`Server started at ${process.env.DOMAINNAME}:` + port);