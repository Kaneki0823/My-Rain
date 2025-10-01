// Lyrics (replace times with real timestamps in seconds)
const lyrics = [
  { time: 18, line: "Smoking cigarettes on the roof" },
  { time: 26, line: "You look so pretty and I love this view" },
  { time: 33, line: "We fell in love in October" },
  { time: 37, line: "That's why I love fall" },
  { time: 42, line: "Looking at the stars" },
  { time: 45, line: "Admiring from afar" },
  { time: 48, line: "My girl, my girl, my girl" },
  { time: 53, line: "You will be my girl" },
  { time: 55, line: "My girl, my girl, my girl" },
  { time: 60, line: "You will be my world" },
  { time: 63, line: "My world, my world, my world" },
  { time: 68, line: "You will be my girl" },
  { time: 77, line: "Smoking cigarettes on the roof" },
  { time: 84, line: "You look so pretty and I love this view" },
  { time: 91, line: "Don't bother looking down" },
  { time: 94, line: "We're not going that way" },
  { time: 98, line: "At least I know I am here to stay" },
  { time: 107, line: "We fell in love in October" },
  { time: 111, line: "That's why I love fall" },
  { time: 115, line: "Looking at the stars" },
  { time: 119, line: "Admiring from afar" },
  { time: 125, line: "My girl, my girl, my girl" },
  { time: 142, line: "You will be my girl" },
  { time: 144, line: "My girl, my girl, my girl" },
  { time: 160, line: "You will be my girl" },
  { time: 161, line: "My girl, my girl, my girl" },
  { time: 167, line: "You will be my girl" },
  { time: 169, line: "My girl, my girl, my girl" },
  { time: 174, line: "You will be my world" },
  { time: 176, line: "My world, my world, my world" },
  { time: 181, line: "You will be my girl" }
];

// Messages to cycle on the right
const messages = [
  "Hi Love",
  "Here's my way of joining this trend since I can't post you HAHAHAHAHA.",
  "The song says 'we fell in love in October' and maybe that's true.",
  "But for me it's another month to our journey to forever.",
  "Since I've already been falling for you every month, every day, every second, everytime you smile, and even everytime you're mad.",
  "I guess this isn't just about a trend.",
  "It's about us.",
  "About how even when we can't always show it to the world.",
  "I still carry you in every prayer, in every plan, in every quiet moment when no one's looking.",
  "Everytime I hear the 'you will be my world' part of the song it reminds me of those moments",
  "when I hold your face with both hands and just stare at you",
  "and just feels like my whole world is right there in front of me.",
  "I want more months, more years, more decades with you love.",
  "So I hope we could always fought through whatever comes in our way in the future.",
  "From the first time we dared to hope for each other,",
  "up to now that we're finally here,",
  "mine and yours.",
  "You've always been my answer,",
  "my prayer,",
  "my girl,",
  "and my world.",
  "So Rain, no matter how messy, uncertain, or hard it gets,",
  "you'll always have all of me.",
  "You're not just my October.",
  "You're my always.",
  "My every season.",
  "My every day.",
  "My whole world.",
  "I love you so so so much Rain",
  "'for whither thou goest, I will go; and where thou lodgest, I will lodge' - Ruth 1:16"
];

const display = document.getElementById("lyrics-display");
lyrics.forEach(item => {
  const div = document.createElement("div");
  div.className = "lyric-line";
  div.dataset.time = item.time;
  div.textContent = item.line;
  display.appendChild(div);
});

const audio = document.getElementById("bg-audio");
const playPause = document.getElementById("play-pause");
const volume = document.getElementById("volume");
const overlay = document.getElementById("play-overlay");
const overlayPlay = document.getElementById("overlay-play");

// Start full volume
audio.volume = 1.0;

// Try autoplay
window.addEventListener("load", () => {
  audio.play().then(() => {
    playPause.textContent = "Pause";
  }).catch(() => {
    overlay.classList.remove("hidden");
  });
});

playPause.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPause.textContent = "Pause";
  } else {
    audio.pause();
    playPause.textContent = "Play";
  }
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

overlayPlay.addEventListener("click", () => {
  audio.play().then(() => {
    overlay.classList.add("hidden");
    playPause.textContent = "Pause";
  });
});

// Sync lyrics
let currentLyricIndex = -1;
audio.addEventListener("timeupdate", () => {
  const currentTime = Math.floor(audio.currentTime);
  let newIndex = -1;
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].time) newIndex = i;
  }
  if (newIndex !== currentLyricIndex) {
    document.querySelectorAll(".lyric-line").forEach(l => l.classList.remove("active"));
    if (newIndex >= 0) document.querySelectorAll(".lyric-line")[newIndex].classList.add("active");
    currentLyricIndex = newIndex;
  }
});

// Cycle messages
const messageDisplay = document.getElementById("message-display");
let messageIndex = 0;
function showMessage() {
  messageDisplay.classList.remove("active");
  setTimeout(() => {
    messageDisplay.textContent = messages[messageIndex];
    messageDisplay.classList.add("active");
    messageIndex = (messageIndex + 1) % messages.length;
  }, 500);
}
setInterval(showMessage, 6000);
showMessage();
