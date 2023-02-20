let bodyNode = document.getElementsByTagName("body")[0];

let terninger = Array.from(bodyNode.querySelectorAll("img"));
let button = document.getElementById("knap-rul");

button.addEventListener("click", () => {
    rulTerninger(terninger);
})

function rulTerninger(terninger) {

    for (const i in terninger) {
        let rand = Math.trunc((Math.random()*6) + 1);
        terninger[i].src = `/images/Dice${rand}.png`;
    }
}
