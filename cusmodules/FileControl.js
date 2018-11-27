var {
  readFile
} = require('fs').promises;
var {
  appendFile
} = require('fs').promises;

var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');


async function readjson(FilePath) {
  try {
    var data = await readFile(FilePath, 'utf8');
    var obj = JSON.parse(data);
    return obj;
  } catch (e) {
    console.log("FileControl.js readjson() Error !!!");
    console.log(e);
  }
}

function readjsonSync(FilePath) {
  try {
    var data = fs.readFileSync(FilePath);
    var obj = JSON.parse(data);
    return obj;
  } catch (e) {
    console.log("FileControl.js readjsonSync() Error !!!");
    console.log(e);
  }
}

function Exists(FilePath) {
  try {
    var exist = fs.existsSync(FilePath);
    return exist;
  } catch (e) {
    console.log("FileControl.js Exists() Error !!!");
    console.log(e);
  }
}

function Remove(path) {
  rimraf(path, function (err) {
    if (err) {
      console.log("FileControl.js Remove() has an error !!!")
    } else {
      console.log(path + "刪除");

    }
  })

}

async function AppendFile(FileName, content) {
  try {
    await appendFile(FileName, content)
  } catch (e) {
    console.log("FileControl.js AppendFile() has an error !!!")
    console.log(e);
  }
}

async function ReadFile(FilePath) {
  try {
    var htmlcode = await readFile(FilePath, 'utf8');
    return htmlcode;
  } catch (e) {
    console.log("FileControl.js ReadFile() has an error !!!");
    console.log(e);
  }
}

function ReadFileSync(FilePath) {
  try {
    var file = fs.readFileSync(FilePath, 'utf8');
    return file;
  } catch (e) {
    console.log("FileControl.js ReadFileSync() has an error !!!");
    console.log(e);
  }
}

function MkdirSync(Path) {
  try {
    fs.mkdirSync(Path);
  } catch (e) {
    console.log("FileControl.js MkdirSync() has an error !!!");
    console.log(e);
  }
}

function copyFile(src, dist) {
  console.log("COPY " + dist);

  fs.writeFileSync(dist, fs.readFileSync(src));
}

function writeFileSync(dist, data) {
  try {
    fs.writeFileSync(dist, data);
  } catch (e) {
    console.log("FileControl.js writeFileSync() has an error !!!");
    console.log(e);
  }

}


function copyFolder(srcDir, tarDir, cb) {
  if(fs.existsSync(tarDir) == false){
    fs.mkdirSync(tarDir)
  }
  fs.readdir(srcDir, function (err, files) {
    var count = 0
    var checkEnd = function () {
      ++count == files.length && cb && cb()
    }

    if (err) {
      checkEnd()
      return
    }

    files.forEach(function (file) {
      var srcPath = path.join(srcDir, file)
      var tarPath = path.join(tarDir, file)

      fs.stat(srcPath, function (err, stats) {
        if (stats.isDirectory()) {
          console.log('mkdir', tarPath)
          fs.mkdir(tarPath, function (err) {
            if (err) {
              console.log(err)
              return
            }

            copyFolder(srcPath, tarPath, checkEnd)
          })
        } else {
          copyFile(srcPath, tarPath, checkEnd)
        }
      })
    })
    files.length === 0 && cb && cb()
  })
}
module.exports = {
  readjson: readjson,
  Exists: Exists,
  Remove: Remove,
  AppendFile: AppendFile,
  ReadFile: ReadFile,
  readjsonSync: readjsonSync,
  ReadFileSync: ReadFileSync,
  MkdirSync: MkdirSync,
  copyFile: copyFile,
  writeFileSync: writeFileSync,
  copyFolder:copyFolder
}
