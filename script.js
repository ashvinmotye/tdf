var days = 6;
var distance = 65;
var speed = 24.8;
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
