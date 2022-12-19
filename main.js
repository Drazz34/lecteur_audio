const titre = document.querySelector(".fond");
const suivant = document.querySelector(".suivant");
const retour = document.querySelector(".retour");
const play = document.querySelector(".play_pause");
const stop = document.querySelector(".stop");
const audio = document.querySelector("audio");
const vol = document.querySelector("#volume");

const liste = [
    {
        src: "src/Metallica-Lux_Æterna.mp3",
        nom: "Lux Æterna"
    },
    {
        src: "src/Metallica-Master_of_Puppets.mp3",
        nom: "Master of Puppets"
    },
    {
        src: "src/Metallica-Enter_Sandman.mp3",
        nom: "Enter Sandman"
    },
    {
        src: "src/Metallica-Lords_of_Summer.mp3",
        nom: "Lords of Summer"
    }
];

let musique_play = false;

// ------- joue la musique ---------

function playMusique() {
    musique_play = true;
    audio.play();
    // play.classList.add("active");
    play.innerHTML = `<ion-icon name="pause-outline"></ion-icon>`;
}

// ------- musique en pause ---------

function pauseMusique() {
    musique_play = false;
    audio.pause();
    // play.classList.remove("active");
    play.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
}

// ------- alterne entre joue la musique et musique en pause ---------

play.addEventListener("click", () => (
    musique_play ? pauseMusique() : playMusique())
);

// --------- stoppe la musique et la remet à zéro --------

stop.addEventListener("click", e => {
    audio.pause();
    audio.currentTime = 0;
    musique_play = false;
    play.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
})

// --------- affiche le titre de la musique et change de musique -----------

function loadMusique(liste) {
    titre.textContent = liste.nom;
    audio.src = liste.src;
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

vol.addEventListener("input", e => {
    audio.volume = vol.value / 100;
})