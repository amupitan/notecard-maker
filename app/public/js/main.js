let note = document.getElementById('notecards');
var notes;

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
        next.onclick = () => {
          let next_num;
          do{
             next_num = Math.floor((Math.random() * notes.length));
          } while (rand_num == next_num);
          rand_num = next_num;
          document.getElementById('question').className = "que";
          document.getElementById('question').innerHTML = notes[rand_num][0];
          document.getElementById('side').innerHTML = "Title";
          console.log("NEXT");
        };
        document.getElementById('seeAnswer').onclick = () => {
          document.getElementById('question').className = "sol";
          document.getElementById('question').innerHTML = notes[rand_num][1];
          document.getElementById('side').innerHTML = "Description";
        };
      }
});

// document.getElementById('back').onclick=function(){
//   location.href = "/";
// };
