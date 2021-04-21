const fs = require("fs/promises");
const drive = require("./drive");
console.log("hello c'moi l'serveur");
const path = require("path");
const busboy = require("express-busboy");

let express = require("express");
let app = express();

app.use(express.static("frontend"));
busboy.extend(app, {
  upload: true,
  path: '/tmp',
});

let port = 3000;

function start() {
  console.log("Trkl jsuis lancé");
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

app.get("/api/drive", function (req, res) {
  drive.listDir(drive.ALPS_DRIVE_ROOT).then((result) => {
    res.status(200).send(result);
  });
});

app.get("/api/drive/:name", function (req, res) {
  const fileName = req.params.name;

  if (drive.isFile(fileName)) {
      drive.readFile(fileName).then((result) => {
      res.status(200).send(result);
    });
  } else {
    console.log("je rentre dans un dossier gros");
    drive.listDir(path.join(drive.ALPS_DRIVE_ROOT, fileName)).then((result) => {
      res.status(200).send(result);
    });
  }
});

app.delete("/api/drive/:name", function (req, res) {
  console.log("ouiRequête");
  const fileName = req.params.name;
  drive.deleteFolder(fileName).then((result) => {
    res.status(201).send(result);
  });
});

app.delete("/api/drive/:name/:scndName", function (req, res) {
  console.log("ouiRequête");
  const secondName = req.params.scndName;
  const fileName = req.params.name;
  drive.deleteFolder(path.join(fileName, secondName)).then((result) => {
    res.status(201).send(result);
  });
});

app.post("/api/drive", function (req, res) {
  const queryName = req.query.name;
  drive.createFolder(queryName).then((result) => {
    res.status(201).send(result);
  });
});

app.post("/api/drive/:name", function (req, res) {
  const queryName = req.query.name;
  const fileName = req.params.name;
  drive.createFolder(path.join(fileName, queryName)).then((result) => {
    res.status(201).send(result);
  });
});

app.put("/api/drive/", function (req, res) {
  const queryFile = req.files.file;
  console.log(req.files)
  drive.uploadFile(queryFile).then((result) => {
    res.status(201).send(result);
  });
});

module.exports = {
  start: start,
};
