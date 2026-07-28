/* =========================
   ELEMENTI
   ========================= */

const bottone = document.querySelector("#apri-libro");

const libro = document.querySelector("#libro");

const dedica = document.querySelector("#dedica");


/* =========================
   STATI
   ========================= */

let stato = "scaffale";


/* =========================
   PRIMO TOCCO
   ========================= */

bottone.addEventListener("click", () => {

    if (stato !== "scaffale") return;

    stato = "libro";

    document.body.classList.add("libro-aperto");

});


/* =========================
   SECONDO TOCCO
   ========================= */

libro.addEventListener("click", () => {

    if (stato !== "libro") return;

    stato = "dedica";

    document.body.classList.add("dedica-aperta");

});


/* =========================
   TERZO TOCCO
   (preparazione indice)
   ========================= */

dedica.addEventListener("click", () => {

    if (stato !== "dedica") return;

    stato = "indice";

    console.log("Prossima pagina: indice.");

});
