let note = document.getElementById('notecards');

//These questions are only until we get the actual one passed in
var notes = {
 "Subject" : "Important facts",
 "Questions":{
   "1+1":"2",
   "Gadia's password":"Tuples",
   "Value of PI":"300 calories",
   "Best NBA player":"Georges Niange",
   "Capital of Iowa":"Ames",
   "Least liked team in NBA":"Golden State",
   "Are all CA's lame?": "Yes",
   "Shaeffer's baby is a what?": "Program written in cpp",
   "Easiest class at ISU":"COMS327"
 }
}

document.getElementById("sub").innerHTML = notes.Subject;

var questions = notes.Questions;
var quest;
var answ;
var numQuestion =0;
var rand_num; //Question number
for(let i in questions){numQuestion++}; //Get number of questions there are

let next = document.getElementById('nextQ');
next.onclick=function(){
  //TO prevent same question back to back
  let a;
  do{
     a = Math.floor((Math.random() * numQuestion));
  } while (rand_num == a);
  rand_num = a;

  var iter = -1;
  for(let i in questions){
    quest = i;
    answ = questions[i];
    iter ++;
    if(iter == rand_num) break;
  }
  let q = document.getElementById('question');
  q.className = "que"
  q.innerHTML ="";
  q.innerHTML= quest;
  document.getElementById('side').innerHTML = "Question";
}

let solution = document.getElementById('seeAnswer');
solution.onclick=function(){
  let q = document.getElementById('question');
  q.className = "sol";
  q.innerHTML ="";
  q.innerHTML= answ;
  document.getElementById('side').innerHTML = "Answer";
}

let back = document.getElementById('back');
back.onclick=function(){
  console.log("hi");
  location.href = "/"
}
