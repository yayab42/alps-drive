const path = require("path");
const fs = require("fs");
const os = require("os");

const ALPS_DRIVE_ROOT = path.join(os.tmpdir(), "coucou/");

console.log("Mon dossier racine est:" + ALPS_DRIVE_ROOT);

function createRootFolder() {
  const promise = fs.promises
    .access(ALPS_DRIVE_ROOT)
    .then(() => {
      console.log("OK le dossier existe");
    })
    .catch(() => {
      return fs.mkdir(ALPS_DRIVE_ROOT);
    });

  return promise;
}

/*function listDir(){
    let file = fs.promises.readdir(ALPS_DRIVE_ROOT, err, file)
    return file;
}*/

function listDir(path) {
  return fs.promises.readdir(path, { withFileTypes: true }).then((result) => {
    console.log(result);
    const list = [];
    result.forEach((e) => {
      list.push({ name: e.name, isFolder: e.isDirectory() });
    });
    return list;
  });
}

function readFile(fileName) {
  /*let file = fs.readFileSync(ALPS_DRIVE_ROOT)
    return file;*/
  return fs.promises
    .readFile(path.join(ALPS_DRIVE_ROOT, fileName))
    .then((result) => {
      return result;
    });
}

function isFile(file) {
  let stat = fs.statSync(path.join(ALPS_DRIVE_ROOT, file));
  return stat.isFile();
}

function deleteFolder(fileName) {
  const deletePath = path.join(ALPS_DRIVE_ROOT, fileName);
  return fs.promises
    .rmdir(deletePath, { recursive: true })
    .then(() => {
      console.log("Dossier supprimé : " + fileName);
    })
    .catch(() => {
      console.log("Impossible de supprimer : " + fileName);
    });
}

function createFolder(queryName) {
  const pathToCreate = path.join(ALPS_DRIVE_ROOT, queryName);
  return fs.promises
    .mkdir(pathToCreate)
    .then(() => {
      console.log("dossier" + queryName + "créé");
    })
    .catch(() => {
      console.log("Echec de la création");
    });
}

exports.createRootFolder = createRootFolder;
exports.readFile = readFile;
exports.isFile = isFile;
exports.listDir = listDir;
exports.ALPS_DRIVE_ROOT = ALPS_DRIVE_ROOT;
exports.deleteFolder = deleteFolder;
exports.createFolder = createFolder;
