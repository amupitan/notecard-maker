var fs = require('fs');
var path = require('path');

var filePath = "data/test_note.txt";

class NoteParser{
  constructor(note_data){
    this.pointer = 0;
    this.note = {};
    this.note._meta = {};
    this.note.header = []
    this.lines = note_data.split('\n');
    this.grammar = {
      '!' : (data) => {
        return this.note._meta[data.substring(1, data.indexOf(':'))] = data.substr(data.indexOf(':') + 1).trim();
      },
      '#' : (data, lineNum) => {
        let i;
        for (i = 0; (i < data.length && data.charAt(i) == '#'); i++);
        if (this.note.header[i] === undefined) this.note.header[i] = [];
        let dataObj = {};
        dataObj[data.substr(i)] = lineNum;
        return this.note.header[i].push(dataObj);
      },
      '$' : (data) => {
        return true;
      },
      ':' : (data) => {
        return true;
      }
    };
  }//constructor
  makeNotes(){
    
  }
  parseMeta(){
    this.pointer = 0;//TODO should this method reset the pointer?
    let next = this.lines[this.pointer];
    while(next.charAt(0) == '!'){
      this.grammar['!'](next);
      next = this.lines[++this.pointer];
    }
  }
  parseHeaders(){
    let idx = this.pointer;
    let next = this.lines[idx];
    while(idx < this.lines.length){
      // console.error(next);
      if (next.charAt(0) == '#')
      this.grammar['#'](next, idx);
      next = this.lines[++idx];
    }
  }
  parseTopics(){
    
  }
}


var contents;
fs.readFile(filePath, 'UTF-8', (err, data) => {
  if (err)
    console.error(err);
  contents = data;
  // let firstline = contents.split("\n")[0];
  let temp = "#Sports";
  let np = new NoteParser(contents);
  // console.log(np.grammar['#'](temp));
  np.parseMeta();
  np.parseHeaders();
  console.log(np.note.header);
});



// console.log(`you know it`);
