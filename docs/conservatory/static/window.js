var breakfastLink, lunchLink, dinnerLink;
var breakfast, lunch, dinner;
function init() {
  var graph = new joint.dia.Graph();

  var paper = new joint.dia.Paper({
    el: document.getElementById("myholder"),
    model: graph,
    width: 500,
    height: 400,
    gridSize: 1,
    gridSize: 10,
    drawGrid: true,
    background: {
      color: "rgba(0, 255, 0, 0.3)"
    }
  });
  var cloud = new joint.shapes.standard.Circle();
  cloud.position(240, 20);
  cloud.resize(20, 20);
  cloud.addTo(graph);

  recipe = new joint.shapes.standard.Rectangle();
  recipe.position(200, 100);
  recipe.resize(100, 40);
  recipe.attr({
    body: {
      fill: "blue",
      rx: 5,
      ry: 5
    },
    label: {
      text: "Recipe",
      fill: "white"
    }
  });
  recipe.addTo(graph);

  breakfast = recipe.clone();
  breakfast.translate(-150, 200);
  breakfast.attr("label/text", "Breakfast");
  breakfast.addTo(graph);

  lunch = recipe.clone();
  lunch.translate(0, 200);
  lunch.attr("label/text", "Lunch");
  lunch.addTo(graph);

  dinner = recipe.clone();
  dinner.translate(150, 200);
  dinner.attr("label/text", "Dinner");
  dinner.addTo(graph);

  breakfastLink = new joint.shapes.standard.Link();
  breakfastLink.source(recipe);
  breakfastLink.target(breakfast);
  breakfastLink.addTo(graph);

  lunchLink = new joint.shapes.standard.Link();
  lunchLink.source(recipe);
  lunchLink.target(lunch);
  lunchLink.addTo(graph);

  dinnerLink = new joint.shapes.standard.Link();
  dinnerLink.source(recipe);
  dinnerLink.target(dinner);
  dinnerLink.addTo(graph);

  recipeLink = new joint.shapes.standard.Link();
  recipeLink.source(cloud);
  recipeLink.target(recipe);
  recipeLink.addTo(graph);
}

function toHHMMSS(secondsIn) {
  var sec_num = parseInt(secondsIn, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}

function getSeconds() {
  var seconds = (86400 * (slider.value)) / 100;
  return seconds
}

function showSeconds() {
  var seconds = getSeconds()
  // breakfast height
  breakfastTraffic = getNormal(seconds,500,7,7200)
  breakfastTraffic += getNormal(seconds,500,31,7200)
  // lunch height
  lunchTraffic = getNormal(seconds,1000,12,7200)
  // dinner height
  dinnerTraffic = getNormal(seconds,2000,19,7200)
  dinnerTraffic += getNormal(seconds,2000,-5,7200)
  total = breakfastTraffic + lunchTraffic + dinnerTraffic;
  time = toHHMMSS(seconds)
  output.innerHTML = "" + time + " "  + Math.round(total); // Display the default slider value
  recipeLink.labels([{ attrs: { text: { text: "50% - " + Math.round(total) } } }]);
  total *= 2;
  recipe.attr("label/text", "Recipe " + getPods(total));
  lunch.attr("label/text", "Lunch " + getPods(lunchTraffic));
  breakfast.attr("label/text", "Breakfast " + getPods(breakfastTraffic));
  dinner.attr("label/text", "Dinner " + getPods(dinnerTraffic));
  setLabels(
    "" + Math.round(100*breakfastTraffic/total) +"% - " + Math.round(breakfastTraffic),
    "" + Math.round(100*lunchTraffic/total) + "% - " + Math.round(lunchTraffic),
    "" + Math.round(100*dinnerTraffic/total) + "% - " + Math.round(dinnerTraffic)
    );
}

function getPods (traffic) {
  return (Math.ceil(traffic/200) || 1)
}

function setLabels(breakfastPercent, lunchPercent, dinnerPercent) {
  breakfastLink.labels([{ attrs: { text: { text: breakfastPercent } } }]);
  lunchLink.labels([{ attrs: { text: { text: lunchPercent } } }]);
  dinnerLink.labels([{ attrs: { text: { text: dinnerPercent } } }]);
}

function getNormal(x, peak, peakHour, stdev) {
    mean = peakHour * 3600;
    var y = peak/Math.pow(Math.E, (Math.pow(x-mean, 2))/(2*stdev*stdev));
    return y;
}
