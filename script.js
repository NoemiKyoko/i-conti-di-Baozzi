const zonaLibro = document.querySelector("#libro-baozzi");
const libroAnimato = document.querySelector("#libro-animato");

let statoLibro = "scaffale";

zonaLibro.addEventListener("click", () => {
    if (statoLibro !== "scaffale") {
        return;
    }

    statoLibro = "davanti";
    document.body.classList.add("apertura");

    /*
     * L'animazione CSS dura 900 millisecondi.
     * Quando il libro arriva al centro,
     * diventa lui stesso cliccabile.
     */
    window.setTimeout(() => {
        libroAnimato.classList.add("cliccabile");
    }, 900);
});

libroAnimato.addEventListener("click", () => {
    if (statoLibro !== "davanti") {
        return;
    }

    statoLibro = "aperto";
    document.body.classList.add("libro-aperto");
});
