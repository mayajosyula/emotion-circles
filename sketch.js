var emotion_data; 
var N = 500;
var sentence = "Fear is a strange soil. It grows obedience like corn, which grow in straight lines to make weeding easier. But sometimes it grows the potatoes of defiance, which flourish underground."

var emotions = {
  anger: 0,
  anticipation: 0,
  disgust: 0,
  fear: 0,
  joy: 0,
  sadness: 0,
  surprise: 0,
  trust: 0,
  positive: 0,
  negative: 0
};

var emotion_hue_range = {
  anger: [340, 370], // red
  anticipation: [20, 40], // orange
  disgust: [270, 290], // purple
  fear: [150, 170], // turquoise
  joy: [45, 75], // yellow
  sadness: [230, 250], // dark blue
  surprise: [190, 210], // light blue
  trust: [90, 120], // green
  positive: [85, 100], // high brightness
  negative: [60, 80] // low brightness
};


var punctuationless = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
var finalString = punctuationless.replace(/\s{2,}/g," ");
var s = finalString.trim().toLowerCase().split(" ");

function preload() {
  emotion_data = loadJSON('emotions.json'); 
}

function setup() {
  update_emotions();
  createCanvas(windowWidth, windowHeight);
  noLoop()
}

function draw() {
  noStroke();
  colorMode(HSB);
  draw_circles();
}

function update_emotions() {
  for (var j = 0; j < s.length; j++) {
    if (emotion_data.hasOwnProperty(s[j])) {
      // console.log(s[j]);
      var e = emotion_data[s[j]]; 
      for (var k = 0; k < e.length; k++) {
        emotions[e[k]] += 1; 
      }
    }
  }
  console.log(emotions);
}

function get_normalize_factor() {
  var sum = 0; 
  for (var el in emotions) {
    if (!(el === "positive" || el === "negative")) {
      if (emotions.hasOwnProperty( el )) {
        sum += parseFloat(emotions[el]); 
      }
    }
  }
  return sum;
}

function get_emotion_count() {
  var count = 0; 
  for (var el in emotions) {
    if (!(el === "positive" || el === "negative")) {
      if (emotions[el] > 0) {
         count += 1; 
      }
    }
  }
  return count;
}

function draw_circles() {
  var b = 80; // todo: change to non-hardcoded
  if (emotions.negative > emotions.positive) {
    b = random(20) + 60;
  }
  if (emotions.positive > emotions.negative) {
    b = random(15) + 85;
  }
  for (var el in emotions) {
    if (!(el === "positive" || el === "negative")) {
      if (emotions[el] > 0) {
        var ratio = emotions[el] / get_normalize_factor();
        var ncircles = Math.floor(N / get_emotion_count());
        for (let i=0; i < ncircles; i++) {
          var h_range = emotion_hue_range[el]; 
          var h = random(h_range[1] - h_range[0]) + h_range[0];
          var a = random(0.5)
          if (ratio > 0.5) {
            a += 0.5;
          }
          fill(h, random(75)+25, b, a);
          ellipse(random(windowWidth), random(windowHeight), random(100));
        }
      }
    }
  }
}

