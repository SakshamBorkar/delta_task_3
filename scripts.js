let currentSong = new Audio();
let songs = [];
let currFolder;
let currIndex = 0;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function fetchSongs(playlistname) {
    const songsCollection = await db.collection(playlistname).get();
    songs = songsCollection.docs.map(doc => doc.data());

    // Show all the songs in the playlist
    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML += `<li data-url="${song.url}">
                                <img class="invert" src="music.svg" alt="">
                                <div class="info">
                                    <div>${song.title}</div>
                                    <div>${song.artist}</div>
                                </div>
                                <div class="playnow">
                                    <span>Play Now</span>
                                    <img class="invert" src="play.svg" alt="">
                                </div>
                             </li>`;
    }

    // Add an event listener to each song 
    Array.from(document.querySelectorAll(".songList li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.dataset.url, e.querySelector(".info div").innerHTML.trim());
        });
    });
}

const playMusic = (url, title, pause = false) => {
    currentSong.src = url;
    if (!pause) {
        currentSong.play();
        document.getElementById("play").src = "pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = title;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

const playNext = () => {
    currIndex = (currIndex + 1) % songs.length;
    playMusic(songs[currIndex].url, songs[currIndex].title);
}

const playPrev = () => {
    currIndex = (currIndex - 1 + songs.length) % songs.length;
    playMusic(songs[currIndex].url, songs[currIndex].title);
}

async function main() {

    // Add an event listener to play/pause button
    document.getElementById("play").addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            document.getElementById("play").src = "pause.svg";
        } else {
            currentSong.pause();
            document.getElementById("play").src = "play.svg";
        }
    });

    // Add an event listener to next button
    document.getElementById("next").addEventListener("click", playNext);

    // Add an event listener to previous button
    document.getElementById("previous").addEventListener("click", playPrev);

    // Event listener for time update in the playbar
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `
        ${secondsToMinutesSeconds(currentSong.currentTime)} /
         ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    //  // Add an event listener for previous
    //  previous.addEventListener("click", () => {
    //     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    //     console.log("Previous: Current index is ", index); // Debug log
    //     if ((index - 1) >= 0) {
    //         playMusic(songs[index - 1]);
    //     }
    // });

    // // Add an event listener for next
    // next.addEventListener("click", () => {
    //     let index = songs.indexOf(currentSong.src);
    //     // console.log("Next: Current index is ", index); // Debug log
    //     if ((index + 1) < songs.length) {
    //         playMusic(songs[index + 1]);
    //     }
    // });

    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    // Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
    });

    // Add an event listener for close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Add an event listener to volume control
    document.querySelector("input[type='range']").addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
    });

    // Add an event listener to mute the track
    // document.querySelector(".volume").addEventListener("click", e => {
    //     if (e.target.src.includes("volume.svg")) {
    //         e.target.src = e.target.src.replace("volume.svg", "mute.svg");
    //         currentSong.volume = 0;
    //         document.querySelector("input[type='range']").value = 0;
    //     } else {
    //         e.target.src = e.target.src.replace("mute.svg", "volume.svg");
    //         currentSong.volume = 1;
    //         document.querySelector("input[type='range']").value = 100;
    //     }
    // });

    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 40;
        }
    })
}

const playlistFolders = document.querySelectorAll('.cardContainer .card')
playlistFolders.forEach(card => {
    card.addEventListener('click', async () => {
        // Find the h2 element with the class songTitle within the clicked card
        const songTitleElement = card.querySelector('.songTitle');

        if (songTitleElement) {
            const playlistName = songTitleElement.textContent.trim(); // Get the text content and trim any extra whitespace
            console.log(playlistName);
            await fetchSongs(playlistName); // Assuming fetchSongs is a defined function
        } else {
            console.error('Song title not found');
        }
    });
});

let sign_up = "./signup.html";

//  Authentication using login and signup buttons
document.querySelector(".signupbtn").onclick = function () {
    window.location.replace(sign_up);
}

let add_new = "./upload.html";

// Enable user to add their own songs
document.querySelector(".bttn").onclick = function () {
    window.location.replace(add_new);
}


main();
