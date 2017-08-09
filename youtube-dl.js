const { spawn } = require('child_process');
var pjson = require('./package.json');
var uuid = require('uuid');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var async = require('async');
var mime = require('mime-types');
var dateFormat = require('dateformat');
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.hour = 23;
rule.minute = 0;

schedule.scheduleJob(rule, function(){
    var todayFormat = dateFormat(new Date(), "dd-mm-yyyy");
    var filesFormat =  "*" + todayFormat.slice(2) + '-*.mp3';
    glob(filesFormat, function(error, files) {
        console.log(error || '');
        files = files.filter(filename => {
          return filename.indexOf(todayFormat) !== 0;
        });
        async.map(files, fs.unlink, function(error) {
          console.error(error || '');
        });
    });
});

var app = express();

app.use(bodyParser.json());

app.post('/youtube-dl/download', function(req, res) {
  var youtube_url = req.body.url;
  if (!youtube_url) {
    res.status(400);
    return res.end("BAD_REQUEST");
  }
  var id = uuid.v4();
  var fileFormat = dateFormat(new Date(), "dd-mm-yyyy") + '-' + id + '.(ext)s';
  var download = spawn("youtube-dl", ['-o', fileFormat, '-x', '--audio-format', 'mp3', youtube_url])

  download.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  download.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  download.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  res.status(202);
  return res.end(id);
});

app.get('/youtube-dl/:id', function(req, res) {
  var id = req.params.id;
  if (!id) {
    res.status(400);
    return res.end("BAD_REQUEST");
  }

  var filePath = path.join(__dirname, dateFormat(new Date(), "dd-mm-yyyy") + '-' + id + '.mp3');
  fs.stat(filePath, function (error, stat) {
      if(error) {
        res.status(404);
        res.set('Content-Type', mime.lookup('json'));
        return res.end(JSON.stringify(error, null, 2));
      }
      if(!stat) {
        res.status(404);
        res.set('Content-Type', mime.lookup('json'));
        return res.end(JSON.stringify(new Error("NOT_FOUND"), null, 2));
      }
      res.status(200);
      return res.sendFile(filePath);
  });
});

app.get('/youtube-dl/', function(req, res) {
    res.status(200);
    res.set('Content-Type', mime.lookup('json'));
    return res.end(JSON.stringify({
      application: "Small service to convert youtube videos to mp3 and download them",
      sideInfo: "Mp3 files are keeped on server for only one day",
      up: process.uptime()
    }, null, 2));
});

function youtubeDl(cb) {
  var listener = app.listen(process.env.PORT || pjson.config.port || 9990, function(error){
    console.log('Youtube Downloader listening on port', listener.address().port);
    return cb(error);
  });
}

module.exports = youtubeDl;

youtubeDl(function() {
  spawn("npm", ['start'])
})
