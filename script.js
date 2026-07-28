const libro = document.querySelector("#libro-baozzi");
const libroInMovimento = document.querySelector("#libro-in-movimento");

let aperturaInCorso = false;

libro.addEventListener("click", () => {
    if (aperturaInCorso) {
        return;
    }

    aperturaInCorso = true;

    /* Prima facciamo apparire la copia esattamente sopra il libro. */
    libroInMovimento.style.opacity = "1";

    /*
     * Aspettiamo due fotogrammi:
     * il browser registra prima la posizione iniziale,
     * poi può animarla verso il centro.
     */
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.add("apertura");
        });
    });
});
