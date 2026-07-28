/* =========================
   ELEMENTI
   ========================= */

const bottoneLibro =
    document.querySelector("#apri-libro");

const libro =
    document.querySelector("#libro");

const paginaDedica =
    document.querySelector("#pagina-dedica");

const bottoneIndice =
    document.querySelector("#vai-indice");

const paginaIndice =
    document.querySelector("#pagina-indice");

const vociIndice =
    document.querySelectorAll(".voce-indice");


/* =========================
   STATO DEL LIBRO
   ========================= */

let stato = "scaffale";


/* =========================
   SCAFFALE → LIBRO
   ========================= */

bottoneLibro.addEventListener("click", () => {

    if (stato !== "scaffale") {
        return;
    }

    stato = "libro";

    document.body.classList.add(
        "libro-davanti"
    );
});


/* =========================
   LIBRO → DEDICA
   ========================= */

libro.addEventListener("click", () => {

    if (stato !== "libro") {
        return;
    }

    stato = "dedica";

    document.body.classList.add(
        "dedica-visibile"
    );

    paginaDedica.setAttribute(
        "aria-hidden",
        "false"
    );
});


/* =========================
   DEDICA → INDICE
   ========================= */

bottoneIndice.addEventListener("click", () => {

    if (stato !== "dedica") {
        return;
    }

    stato = "giro-pagina";

    document.body.classList.add(
        "pagina-in-giro"
    );

    /*
     * Aspettiamo il piccolo frfff
     * della pagina prima di mostrare l’indice.
     */
    window.setTimeout(() => {

        stato = "indice";

        document.body.classList.add(
            "indice-visibile"
        );

        paginaDedica.setAttribute(
            "aria-hidden",
            "true"
        );

        paginaIndice.setAttribute(
            "aria-hidden",
            "false"
        );

    }, 650);
});


/* =========================
   VOCI DELL’INDICE
   ========================= */

vociIndice.forEach((voce) => {

    voce.addEventListener("click", () => {

        const capitolo =
            voce.dataset.capitolo;

        console.log(
            `Apriremo il capitolo: ${capitolo}`
        );

    });

});
