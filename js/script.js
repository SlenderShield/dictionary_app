const wrapper = document.querySelector(".wrapper");
searchInput = wrapper.querySelector("input")
synonyms = wrapper.querySelector(".synonyms .list")
const infoText = wrapper.querySelector(".info-text")
volumeIcon = wrapper.querySelector(".word i")

let audio;

// Function to handle the data sent by the api call
function data(result, word) {
    if (result.title) {
        infoText.innerHTML = `Can't find the meaning of <span>${word}</span>. Please, try another word`
    } else {
        console.log(result)
        wrapper.classList.add("active");

        let definitions = result[0].meanings[0].definitions[0];

        let phonetics = `${result[0].meanings[0].partOfSpeech}  ${result[0].phonetics[0].text}`
        //    Add data to its particular place
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        // audio of the word
        audio = new Audio("https:" + result[0].phonetics.audio)

        document.querySelector(".meaning span").innerText = definitions.definition;

        if (definitions.example == undefined) {
            document.querySelector(".example").style.display = "none";
        } else {
            document.querySelector(".example").style.display = "block";
            document.querySelector(".example span").innerText = definitions.example;
        }
        // If there is no synonyms then remove the synonyms block
        if (definitions.synonyms[0] == undefined) {
            synonyms.parentElement.style.display = "none";
        } else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                // if any value is undefined then continue to another
                if (definitions.synonyms[i] == undefined) {
                    continue
                }
                let tag = `<span>${definitions.synonyms[i]}</span>`
                // Add synonyms beforehand
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
}


// Function for handling api calls
function fetchApi(word) {
    infoText.style.color = '#000'
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`

    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    // Fetch the result and send the result for the handling
    fetch(url).then(res => res.json()).then(result => data(result, word))

}

searchInput.addEventListener("keyup", event => {
    if (event.key == "Enter" && event.target.value) {

        fetchApi(event.target.value)

    }
})