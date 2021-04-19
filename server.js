const fs = require('fs/promises');
const drive = require('./drive');
console.log("hello c'moi l'serveur")
const path = require('path')

let express = require('express');
let app = express();

app.use(express.static('frontend'))

let port = 3000

function start() {
  console.log('Trkl jsuis lancé')
    app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}


app.get('/api/drive', function(req,res){
drive.listDir(drive.ALPS_DRIVE_ROOT).then((result) =>{
  res.send(result)
})
})


app.get('/api/drive/:name', function(req, res){

  const fileName = req.params.name;
  
  if (drive.isFile(fileName)) {
    const file = drive.readFile(fileName).then((result)=>{
    
    res.send(result);
  });
  } else {
    const dir = drive.listDir(path.join(drive.ALPS_DRIVE_ROOT, fileName));
    res.send(dir);
  }
})


  module.exports = {
    start : start 
}