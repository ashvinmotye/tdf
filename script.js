const TARGET_DISTANCE = 1000;

// FORM RELATED
var distanceForm = document.querySelector('#distanceForm');

distanceForm.addEventListener('submit', function(){
  var d = document.querySelector('input[name=\'distance\']').value;
  var t = document.querySelector('input[name=\'time\']').value;

  if (d === '0' || d === '' || Number(d) < 0) {
    alert('Come on, do some work!');
    return false;
  }

  if (isNaN(d)) {
    alert('I accept only numbers!');
    return false;
  }

  if (t === '0' || t === '' || Number(t) < 0) {
    alert('Come on, do some work!');
    return false;
  }

  if (isNaN(t)) {
    alert('I accept only numbers!');
    return false;
  }

  sendData(d, t);
});

function sendData(d, t) {
  var params = '';

  params += 'entry.27753682=' + encodeURIComponent(d);
  params += '&entry.1886953159=' + encodeURIComponent(t);

  console.log(params);

  var http = new XMLHttpRequest();
  var url = "https://docs.google.com/forms/d/e/1FAIpQLSfHbjEY5WWFu2KzbL4E3UtuyzxRwjICgsG2XWddwaUurkFBZQ/formResponse";

  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.send(params);

  setTimeout(() => {
    location.reload();
  }, 5000);

  var counter = 5;
  var msg = document.querySelector('#reloadMsg');
  var timer = setInterval(function () {
    counter--;
    msg.innerHTML = 'Updating data in '+counter+'s';
  }, 1000);
}

// SHEETS RELATED
const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1hVDcGeG4LoECPFCHk3X46JMJ50MHYtspxvjdRm1QaD8/edit?usp=sharing';

function getSheetData() {
  t = Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  });
}

function showInfo(formData, tabletop) {
  var data = formData;
  var numberOfDays = data.length;

  console.log(data);

  document.querySelector('#daysHeader').innerHTML = numberOfDays;

  var totalDistance = 0;
  var totalTime = 0;

  for(var i=0; i<data.length; i++) {
    totalDistance += Number(data[i].distance);
    totalTime += Number(data[i].time);
  }

  totalDistance = totalDistance.toFixed(1);
  document.querySelector('#distanceHeader').innerHTML = totalDistance;

  var speed = (totalDistance/totalTime) * 60;
  speed = speed.toFixed(1);
  document.querySelector('#speedHeader').innerHTML = speed;

  var w = Number(((totalDistance / TARGET_DISTANCE) * 100).toFixed(2));
  document.getElementById("distance").style.width = w + "%";
}

window.onload = getSheetData();
