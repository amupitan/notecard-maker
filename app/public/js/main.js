window.onload=function(){

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
          };
          document.getElementById('seeAnswer').onclick = () => {
            let card_flip;
            if(notes[rand_num][1] === document.getElementById('question').innerHTML){
              document.getElementById('question').className = "que";
              card_flip = notes[rand_num][0];
              document.getElementById('side').innerHTML="Title";
            }
            else{
              document.getElementById('question').className = "sol";
              card_flip=notes[rand_num][1];
              document.getElementById('side').innerHTML="Description";
            }

            if (typeof card_flip === "object"){
              let temp = card_flip;
              card_flip = document.createElement('ol');
              for (let item of temp){
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(item));
                card_flip.appendChild(li);
              }
              document.getElementById('question').appendChild(card_flip);
            }else{
              document.getElementById('question').innerHTML = card_flip;
            }
          };
        }
  });

}
