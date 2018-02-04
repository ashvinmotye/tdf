var days = 5;
var distance = 50;
var speed = 25.7;
var data = [days, distance, speed];

window.onload = function() {
  var headings = document.querySelectorAll("h3");
  var completed = document.getElementById("distance");

  for(i=0; i<headings.length; i++) {
    headings[i].innerHTML = data[i];
  }

  var w = Number(((distance/3500)*100).toFixed(2));
  completed.style.width = w+"%";
}