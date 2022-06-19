var hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]

function bgChange() {
    let hexColor = '#';
    for (let i = 0; i <= 5; i++) {
        hexColor += hex[Math.floor(Math.random() * hex.length)]
    }
    document.body.style.backgroundColor = hexColor;
}

window.onload = bgChange;