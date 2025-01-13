const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const inputWord = document.getElementById("input-word");

function fetchWord() {
    let inpWord = inputWord.value.trim();
    if (!inpWord) return;

    fetch(`${url}${inpWord}`)
        .then(res => res.json())
        .then(data => {
            result.style.display = "block";
            let audio = data[0].phonetics.find(p => p.audio)?.audio;
            let meanings = data[0].meanings.map(meaning => {
                let defs = meaning.definitions.map(def => `<li>${def.definition}</li>`).join('');
                return `<div class="details"><h4>${meaning.partOfSpeech}</h4><ul>${defs}</ul></div>`;
            }).join('');
            result.innerHTML = `
                <div>
                    <h3>${data[0].word}</h3>
                    ${audio ? `<button class="play-btn" onclick="playSound()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        </svg>
                    </button>` : '<p>No pronunciation available</p>'}
                </div>
                ${meanings}`;
            if (audio) sound.src = audio;
        })
        .catch(() => {
            result.innerHTML = `<h3>Word not found</h3>`;
        });
}

btn.addEventListener("click", fetchWord);
inputWord.addEventListener("keydown", (e) => {
    if (e.key === "Enter") fetchWord();
});

function playSound() {
    sound.play();
}
