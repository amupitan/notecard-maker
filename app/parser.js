var fs = require('fs');
var path = require('path');

var filePath = "data/test_note.txt";

class NoteParser{
  constructor(note_data){
    this.pointer = 0;
    this.headerRef;
    this.topic;
    this.note = {};
    this.note._meta = {};
    this.note.header = [];
    this.note.highlight = {};
    this.lines = note_data.split('\n').filter((line) => {
      return line.trim().length > 0 && !line.startsWith('//');
    });
    this.grammar = {
      '!' : (data) => {
        return this.note._meta[data.substring(1, data.indexOf(':'))] = data.substr(data.indexOf(':') + 1).trim();
      },
      '#' : (data, lineNum) => {
        let i;
        for (i = 0; (i < data.length && data.charAt(i) == '#'); i++);
        if (this.note.header[i] === undefined) this.note.header[i] = [];
        let dataObj = {};
        this.topic = data.substr(i);
        dataObj[data.substr(i)] = lineNum;
        this.note.header[i].push(dataObj);
        this.note.header[i][this.note.header[i].length - 1] = {};
        this.headerRef= this.note.header[i][this.note.header[i].length - 1];
      },
      '$' : (data) => {
        this.topic = data.substr(1);
        this.headerRef[this.topic] = {};
        this.headerRef= this.headerRef[this.topic];
      },
      '*' : (data) => {
        let highlight;
        for (let i = data.indexOf('*'); i < data.length && i != -1; ){
          let nxt_idx = data.indexOf('*', i + 1);
          
          if (nxt_idx == -1){
            nxt_idx = data.indexOf(' ', i + 1);
            if (nxt_idx == -1) nxt_idx = data.length;
          }
          highlight = data.substring(i + 1, nxt_idx);
          if (highlight.indexOf("(") !== -1){
            //parse parenthesis
          }
          this.note.highlight[highlight] = this.topic;
          i = data.indexOf('*', nxt_idx + 1);
        }
        return highlight;
      },
      ':' : (data) => {
        return true;
      }
    };
  }//constructor
  makeNotes(){
    
  }
  parseMeta(){
    this.pointer = 0;//TODO should this method reset the pointer member?
    let next = this.lines[this.pointer];
    while(next.charAt(0) == '!'){
      this.grammar['!'](next);
      next = this.lines[++this.pointer];
    }
  }
  parseHeaders(){
    let idx = this.pointer;
    let next = this.lines[this.pointer];
    while(this.pointer < this.lines.length){
      if (next.charAt(0) == '#'){
        this.grammar['#'](next, this.pointer);
      }else if (next.charAt(0) == '$'){
        this.grammar['$'](next, this.pointer);
      }else if (this.headerRef){
        this.grammar['*'](next);
        //call other grammars
      }
      
      next = this.lines[++this.pointer];
    }
  }
  parseTopics(){
    for (let i = this.pointer; i < this.lines.length; i++){
      
    }
  }
}


var contents;
fs.readFile(filePath, 'UTF-8', (err, data) => {
  if (err)
    console.error(err);
  contents = data;
  // let firstline = contents.split("\n")[0];
  let temp = "Soccer is a wonderful sport which is pretty much the *best sport in the world. It is played by *over 200 countries*(which is all the countries in the world).";
  let np = new NoteParser(contents);
  // console.log(np.grammar['#'](temp));
  np.parseMeta();
  np.parseHeaders();
  // console.log(np.grammar['*'](temp));
  console.log(np.note.highlight);
  // console.log(np.note.header);
  console.log(np);

});



// console.log(`you know it`);
