
let note = document.getElementById('notecards');

let next = document.getElementById('nextQ');
next.onclick=function(){
  // let q = document.createElement('article');
  // q.setAttribute('id','question');
  let q = document.getElementById('question');
  q.innerHTML ="";
  q.innerHTML= "2+3";
  note.appendChild(q);
  console.log("Next");
}
// note.style.color = "red";
