const titre = document.querySelector(".fond");
const suivant = document.querySelector(".suivant");
const retour = document.querySelector(".retour");
const play = document.querySelector(".play_pause");
const stopper = document.querySelector(".stop");
const audio = document.querySelector("audio");
const vol = document.querySelector("#volume");
const mute = document.querySelector(".mute");
const artiste = document.querySelector(".artiste");
const current_time = document.querySelector(".current_time");
const duration_time = document.querySelector(".duration_time");
const duration_slider = document.querySelector(".duration_slider");

// console.dir(audio);

const liste = [
    {
        src: "src/Metallica-Lux_Æterna.mp3",
        nom: "Lux Æterna",
        artiste: "Metallica"
    },
    {
        src: "src/Metallica-Master_of_Puppets.mp3",
        nom: "Master of Puppets",
        artiste: "Metallica"
    },
    {
        src: "src/Nirvana-Smells_Like_Teen_Spirit.mp3",
        nom: "Smells Like Teen Spirit",
        artiste: "Nirvana"
    },
    {
        src: "src/Metallica-Enter_Sandman.mp3",
        nom: "Enter Sandman",
        artiste: "Metallica"
    },
    {
        src: "src/Metallica-Lords_of_Summer.mp3",
        nom: "Lords of Summer",
        artiste: "Metallica"
    },
    {
        src: "src/The_Offspring-The_Kids_Aren't_Alright.mp3",
        nom: "The Kids Aren't Alright",
        artiste: "The Offspring"
    }
];

let musique_play = false;

// ------- joue la musique ---------

function playMusique() {
    musique_play = true;
    audio.play();
    play.innerHTML = `<ion-icon name="pause-outline"></ion-icon>`;
}

// ------- musique en pause ---------

function pauseMusique() {
    musique_play = false;
    audio.pause();
    play.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
}

// ------- alterne entre joue la musique et musique en pause ---------

play.addEventListener("click", () => {
    musique_play ? pauseMusique() : playMusique()
});

// --------- stoppe la musique et la remet à zéro --------

stopper.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    duration_slider.value = 0;
    musique_play = false;
    play.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
})

// --------- affiche le titre, la durée de la musique et change de musique -----------

function loadMusique(liste) { 
    duration_slider.value = 0;
    artiste.textContent = liste.artiste;
    titre.textContent = liste.nom;
    audio.src = liste.src;

    // setTimeout(() => {
    //     duration_slider.max = audio.duration;
    //     duration_time.innerHTML = format_time(audio.duration);
    // }, 500);
    // current_time.innerHTML = "00:00";

    audio.onloadedmetadata = () => {
        duration_slider.max = audio.duration;
        duration_time.innerHTML = format_time(audio.duration);
    }
}

let i = 0;

loadMusique(liste[i]);

// ------- joue la musique précédente ---------

function retourMusique() {
    i--;
    if(i < 0) {
        i = liste.length - 1;
    }
    loadMusique(liste[i]);
    playMusique();
}

retour.addEventListener("click", retourMusique);

// ------- joue la musique suivante ---------

function suivantMusique() {
    i++;
    if(i > liste.length - 1) {
        i = 0;
    }
    loadMusique(liste[i]);
    playMusique();
}

suivant.addEventListener("click", suivantMusique);

// --------- choix du volume ----------

vol.addEventListener("input", () => {
    audio.volume = vol.value / 100;
})

// ----------- Couper le son ------------

let son_mute = true;

function coupeSon() {
    son_mute = false;
    audio.muted = true;
    mute.innerHTML = `<ion-icon name="volume-mute-outline"></ion-icon>`;
}

// ------------ Remettre le son ----------

function remetSon() {
    son_mute = true;
    audio.muted = false;
    mute.innerHTML = `<ion-icon name="volume-high-outline"></ion-icon>`;
}

// ---------- Couper et remettre le volume -------

mute.addEventListener("click", () => {
    son_mute ? coupeSon() : remetSon ()
});

// audio.addEventListener("ended", suivantMusique); -----  --> pour enchaîner les musiques sans se soucier de la longueur de la playlist

// ----------- Passer automatiquement à la chanson suivante en fin de chanson, arrêt de lecture à la fin de la playlist -------

audio.addEventListener("ended", () => {
    if (i === liste.length - 1) {
        i = 0;
        loadMusique(liste[i]);
        musique_play = false;
        play.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
    } else {
        suivantMusique();
    }
});

// --------------- Changer la durée de la chanson ---------------

duration_slider.addEventListener("change", e => {
    audio.currentTime = duration_slider.value;
})

// ------------------- Format durée 00:00 ---------------

const format_time = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10) {
        min = "0" + min;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10) {
        sec = "0" + sec;
    }

    return `${min}:${sec}`;
}

// ------------------ Affichage temps chanson en cours ---------

setInterval(() => {
    duration_slider.value = audio.currentTime;
    current_time.innerHTML = format_time(audio.currentTime);    
}, 1000)