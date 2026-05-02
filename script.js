// ================= AUDIO PLAYER =================
let audio = document.getElementById("audio");
let playBtn = document.getElementById("playBtn");
let progress = document.getElementById("progress");
let currentTime = document.getElementById("currentTime");
let speedBtn = document.getElementById("speed");
let muteBtn = document.getElementById("mute");

// Safe check (reading page me audio nahi hoga)
if (audio) {

    playBtn.onclick = () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    };

    audio.ontimeupdate = () => {
        let percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent;

        currentTime.innerText =
            formatTime(audio.currentTime) + " / " + formatTime(audio.duration);

        progress.style.background =
            `linear-gradient(to right, red ${percent}%, #ccc ${percent}%)`;
    };

    progress.oninput = () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    };

    speedBtn.onclick = () => {
        if (audio.playbackRate === 1) {
            audio.playbackRate = 1.5;
            speedBtn.innerText = "1.5x";
        } else if (audio.playbackRate === 1.5) {
            audio.playbackRate = 2;
            speedBtn.innerText = "2x";
        } else {
            audio.playbackRate = 1;
            speedBtn.innerText = "1x";
        }
    };

    muteBtn.onclick = () => {
        audio.muted = !audio.muted;
        muteBtn.innerHTML = audio.muted
            ? '<i class="fa-solid fa-volume-xmark"></i>'
            : '<i class="fa-solid fa-volume-high"></i>';
    };
}

// ⏳ Time format
function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}


// ================= INPUT SYSTEM =================
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("line")) {

        let line = e.target;

        if (line.querySelector("input")) return;

        let lines = document.querySelectorAll(".line");
        let index = [...lines].indexOf(line);

        let input = document.createElement("input");
        input.type = "text";
        input.className = "answer";
        input.placeholder = index + 1;

        line.innerHTML = "";
        line.appendChild(input);

        input.focus();
    }
});


// ================= ANSWER COUNT =================
function updateCount() {
    let inputs = document.querySelectorAll(".answer");
    let answered = 0;

    inputs.forEach(inp => {
        if (inp.value.trim() !== "") answered++;
    });

    let unanswered = inputs.length - answered;

    let spans = document.querySelectorAll(".col-1 p span");
    if (spans.length >= 2) {
        spans[0].innerText = `${answered} Answered`;
        spans[1].innerText = `${unanswered} Unanswered`;
    }
}


// ================= CIRCLE UPDATE =================
function updateCircles() {
    let inputs = document.querySelectorAll(".answer");
    let circles = document.querySelectorAll(".circle span");

    inputs.forEach((inp, i) => {
        if (!circles[i]) return;

        if (inp.value.trim() !== "") {
            circles[i].classList.add("done");
        } else {
            circles[i].classList.remove("done");
        }
    });
}


// 🔥 Live input event
document.addEventListener("input", function (e) {
    if (e.target.classList.contains("answer")) {
        updateCount();
        updateCircles();
    }
});


// ================= TOGGLE BOTTOM =================
function togglePlayer() {
    let bottom = document.getElementById("bottom");
    let btn = document.querySelector(".toggle-btn");

    if (!bottom || !btn) return;

    bottom.classList.toggle("hide");
    btn.innerText = bottom.classList.contains("hide") ? "⬆" : "⬇";
}


// ================= EXPLANATION =================
document.querySelectorAll(".toggle").forEach(btn => {
    btn.addEventListener("click", function () {
        let exp = this.nextElementSibling;
        if (!exp) return;

        exp.classList.toggle("show");

        this.innerText = exp.classList.contains("show")
            ? "Hide Explanation ▲"
            : "Show Explanation ▼";
    });
});


// ================= SUBMIT =================
function getAnswers() {
    let inputs = document.querySelectorAll(".answer");
    let data = [];

    inputs.forEach((inp, i) => {
        data.push({
            question: i + 1,
            answer: inp.value
        });
    });

    console.log(data);
    alert("Answers submitted!");
}