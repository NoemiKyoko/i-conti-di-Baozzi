const libro = document.querySelector("#libro-baozzi");

let aperto = false;

libro.addEventListener("click", () => {

    if (aperto) return;

    aperto = true;

    document.body.classList.add("apertura");

});
