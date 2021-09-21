const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-To-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
        console.log(joke);
    } catch (error) {
        // Catch Errors Here
        console.log("Fetching joke error: ", error);
    }
}

function tellMe(text) {
    VoiceRSS.speech({
        key: '9afc17a8ddd547a588f928b97ed703ae',
        src: text,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// EVENT LISTENERS
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

// ON LOAD
