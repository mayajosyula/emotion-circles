var emotion_data; // json data is stored in here
var N = 500; // number of circles drawn
var sentence = "Fear is a strange soil. It grows obedience like corn, which grow in straight lines to make weeding easier. But sometimes it grows the potatoes of defiance, which flourish underground."

var emotions = {
  anger: 0, // negative
  anticipation: 0, // positive
  disgust: 0, // negative
  fear: 0, // negative
  joy: 0, // positive
  sadness: 0, // negative
  surprise: 0, // positive
  trust: 0, // positive
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

var positive_emotions = ["anticipation", "joy", "surprise", "trust"];


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
  console.log(JSON.stringify(emotions, null, 4));
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

function draw_circle(h, s, b, a) {
  fill(h, s, b, a);
  ellipse(random(windowWidth), random(windowHeight), random(100));
}

function draw_circles() {
  var used = [];
  var ratios = [];
  for (var el in emotions) {
    if (!(el === "positive" || el === "negative")) {
      if (emotions[el] > 0) {
        let ratio = emotions[el] / get_normalize_factor();
        // add emotion : ratio to list
        used.push(el);
        ratios.push(ratio);
      }
    }
  }
  for (let i = 0; i < N; i++) {
    var idx = i % used.length;
    el = used[idx];
    let ratio = ratios[idx];
    var h_range = emotion_hue_range[el]; 
    var h = random(h_range[1] - h_range[0]) + h_range[0];
    var a = random(0.5)
    if (ratio > 0.333) {
      a += 0.5;
    }
    var b = 80;
    if (emotions.negative > emotions.positive) {
      b = random(20) + 60;
    }
    if (emotions.positive > emotions.negative) {
      b = random(15) + 85;
    }
    if (!(positive_emotions.includes(el))) {
      b -= 10;
    } else {
      b += 10;
    }
    draw_circle(h, random(75)+25, b, a);
  }
}
