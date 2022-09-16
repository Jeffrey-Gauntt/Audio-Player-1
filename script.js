const player = document.querySelector("audio");
const backBtn = document.getElementById("backBtn");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const nextBtn = document.getElementById("nextBtn");



function playAudio() {
	playBtn.style.display = "none";
	pauseBtn.style.display = "block";
	playBtn.setAttribute('title', 'Pause');
	player.play();
}

function pauseAudio() {
	pauseBtn.style.display = "none";
	playBtn.style.display = "block";
	player.pause();
}



playBtn.addEventListener("click", playAudio);
pauseBtn.addEventListener("click", pauseAudio);
player.addEventListener("ended", pauseAudio);