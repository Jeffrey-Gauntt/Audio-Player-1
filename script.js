// track list
const trackList = [
	{
	  filename: 'lift.mp3',
	  imgname: "female-singer-1.jpg",
	  title: 'Elevation',
	  artist: 'Arianna Lorenzato',
	},
	{
	  filename: 'relics.mp3',
	  imgname: "manila-1.jpg",
	  title: 'Relics',
	  artist: 'Warriors of the Axe',
	},
	{
	  filename: 'jungle.mp3',
	  imgname: "waterfall-1.jpg",
	  title: 'Jungle',
	  artist: 'Sound Designers of Texas',
	},
	{
	  filename: 'guitar.mp3',
	  imgname: "guitar-classical-1.jpg",
	  title: 'Spanish Strums',
	  artist: 'Juan Arreola',
	},
];

// track variables
let trackTitle = document.getElementById("track-title");
let trackArtist = document.getElementById("track-artist");

// player variables
const player = document.querySelector("audio");
const prevBtn = document.getElementById("prevBtn");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const nextBtn = document.getElementById("nextBtn");
let isPlaying = false;
let trackIndex = 0; // initial setting

// img variables
let amountImgRotation = 360;
let imgPosition = 0; // initial setting
let trackImg = document.getElementById("track-img");
let trackImgCont = document.getElementById("track-img-container");

// Progress variables
const progressContainer = document.getElementById("progress-container");
let progress = document.getElementById("progress");
let currentTimeEl = document.getElementById('current-time');
let durationEl = document.getElementById('duration');

// load track to player
function loadTrack(track) {
	trackTitle.textContent = track.title;
	trackArtist.textContent = track.artist;
	player.src = `tracks/${track.filename}`;
	trackImg.src = `img/track/${track.imgname}`;
}

// track img rotate
function rotateTrackImgForward() { // rotate forward track img
	imgPosition += amountImgRotation;
	console.log(imgPosition);
	trackImgCont.style.transform = `rotate(${imgPosition}deg)`;
}

function rotateTrackImgBackward() { // rotate backward track img
	imgPosition -= amountImgRotation;
	console.log(imgPosition);
	trackImgCont.style.transform = `rotate(${imgPosition}deg)`;
}

// on page page load
loadTrack(trackList[trackIndex]);

// player functions
function playAudio() {
	if(!isPlaying) {
		rotateTrackImgForward();
	}
	playBtn.style.display = "none";
	pauseBtn.style.display = "block";
	isPlaying = true;
	player.play();
}

function pauseAudio() {
	pauseBtn.style.display = "none";
	playBtn.style.display = "block";
	isPlaying = false;
	player.pause();
}

function nextTrack() {
	trackIndex++;
	trackIndex < trackList.length ? trackIndex : trackIndex = 0;
	loadTrack(trackList[trackIndex]);
	if(isPlaying){
		rotateTrackImgForward();
		playAudio();		
	}else{
		pauseAudio();
	}
}

function prevTrack() {
	trackIndex--;
	trackIndex < 0 ? trackIndex = trackList.length - 1 : trackIndex;
	loadTrack(trackList[trackIndex]);
	if(isPlaying){
		playAudio();
		rotateTrackImgBackward();
	}else{
		pauseAudio();
	}
}

// progress and time functions
function updateProgressBar(e) {
	const { duration, currentTime } = e.srcElement;
	// Update progress bar width
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
	// Calculate display for duration
	const durationMinutes = Math.floor(duration / 60);
	let durationSeconds = Math.floor(duration % 60);
	if (durationSeconds < 10) {
	  durationSeconds = `0${durationSeconds}`;
	}
	// Delay switching duration Element to avoid NaN
	if (durationSeconds) {
	  durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
	}
	// Calculate display for currentTime
	const currentMinutes = Math.floor(currentTime / 60);
	let currentSeconds = Math.floor(currentTime % 60);
	if (currentSeconds < 10) {
	  currentSeconds = `0${currentSeconds}`;
	}
	currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}

function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const { duration } = player;
	player.currentTime = (clickX / width) * duration;
}


// player event listeners
playBtn.addEventListener("click", playAudio);
pauseBtn.addEventListener("click", pauseAudio);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
player.addEventListener("ended", nextTrack);

// progress and time event listeners
player.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
