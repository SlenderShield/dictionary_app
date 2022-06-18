const wrapper = document.querySelector(".wrapper");
searchInput = wrapper.querySelector("input")
const infoText = wrapper.querySelector(".info-text")

// Function to handle the data sent by the api call
function data(result, word) {
    if (result.title) {
        infoText.innerHTML = `Can't find the meaning of <span>${word}</span>. Please, try another word`
    } else {
        console.log(result)
        wrapper.classList.add("active");

        let definitions = result[0].meanings[0].definitions[0];

        phonetics = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[0].text}`
        //    Add data to its particular place
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;

        document.querySelector(".word span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
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