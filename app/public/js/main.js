let note = document.getElementById('notecards');
// var notes = [["over 200 countries", "which is all the countries in the world"], ["include", "mango, apple, oranges, ..."], ["Soccer", "best"], ["Soccer", "over 200 countries"], ["Basketball", "Cyclones"]];
var notes;

// document.getElementById("sub").innerHTML = notes.Subject;/*TODO: get subject here*/
var rand_num; //Question number
$.ajax({
  url : "/notecards/",
  data: {"course" : true},
  success : function(res){
    document.getElementById("sub").innerHTML = res;
  }
});
let next = document.getElementById('nextQ');
$.ajax({
      url : "/notecards/",
      data : {"name" : "notecards"},
      success : function(res){
        notes = res;
        console.log(res);
        next.onclick = () => {
          let a;
          do{
             a = Math.floor((Math.random() * notes.length));
          } while (rand_num == a);
          rand_num = a;
          document.getElementById('question').className = "que";
          document.getElementById('question').innerHTML = notes[rand_num][0];
          document.getElementById('side').innerHTML = "Question";
        };
        document.getElementById('seeAnswer').onclick = () => {
          document.getElementById('question').className = "sol";
          document.getElementById('question').innerHTML = notes[rand_num][1];
          document.getElementById('side').innerHTML = "Answer";
        };
      }
});

document.getElementById('back').onclick=function(){
  location.href = "/";
};
