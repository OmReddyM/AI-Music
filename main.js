song1 = ""; song2 = "";
leftWristX = 0; rightWristX = 0;
leftWristY = 0; rightWristY = 0;
scoreLeftWrist = 0; scoreRightWrist = 0;
function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(video, 0, 0, 600, 500);
    if (scoreLeftWrist > 0.2) {
        if(song1.isPlaying() == false){
            song2.stop();
            song1.play();
            document.getElementById("songName").innerHTML = "Playing - Harry Potter Theme Song";
        }
    }
    if (scoreRightWrist > 0.2) {
        if (song2.isPlaying() == false) {
            song1.stop();
            song2.play();
            document.getElementById("songName").innerHTML = "Playing - Peter Pan Theme Song";
        }
    }
}
function modelLoaded() {
    console.log("Model Loaded!");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x; leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + ", Left Wrist Y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x; rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + ", Right Wrist Y = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score; scoreRightWrist = results[0].pose.keypoints[10].score; 
    }
}