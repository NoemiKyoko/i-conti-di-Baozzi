/* ========================================
   PARTE 1 — IL LIBRO
   Apertura, dedica e navigazione
   ======================================== */


/* ========================================
   ELEMENTI DI INGRESSO
   ======================================== */

const bottonePrendiLibro =
    document.querySelector("#prendi-libro");

const libro =
    document.querySelector("#libro");

const schermataDedica =
    document.querySelector("#schermata-dedica");

const bottoneGiraDedica =
    document.querySelector("#gira-dedica");

const libroInterno =
    document.querySelector("#libro-interno");


/* ========================================
   PAGINE E PULSANTI
   ======================================== */

const pagine =
    document.querySelectorAll(".pagina");

const pulsantiNavigazione =
    document.querySelectorAll("[data-vai]");


/* ========================================
   STATO DEL LIBRO
   ======================================== */

let statoIngresso =
    "scaffale";

let paginaCorrente =
    null;


/* ========================================
   NAVIGAZIONE TRA LE PAGINE
   ======================================== */

function vaiAllaPagina(idPagina) {

    const nuovaPagina =
        document.querySelector(
            `#${idPagina}`
        );

    if (!nuovaPagina) {

        console.warn(
            `La pagina "${idPagina}" non esiste.`
        );

        return;
    }


    pagine.forEach((pagina) => {

        pagina.classList.remove(
            "attiva"
        );
    });


    nuovaPagina.classList.add(
        "attiva"
    );


    paginaCorrente =
        idPagina;


    /*
       I riepiloghi vengono aggiornati
       soltanto quando vengono aperti.
    */

    if (
        idPagina ===
        "riepilogo-casa"
    ) {

        aggiornaRiepilogoCasa();
    }


    if (
        idPagina ===
        "riepilogo-entrate"
    ) {

        aggiornaRiepilogoEntrate();
    }


    if (
        idPagina ===
        "riepilogo-spese"
    ) {

        aggiornaRiepilogoSpese();
    }
}


/* ========================================
   IL LIBRO ESCE DALLO SCAFFALE
   ======================================== */

bottonePrendiLibro.addEventListener(
    "click",
    () => {

        if (
            statoIngresso !==
            "scaffale"
        ) {

            return;
        }


        statoIngresso =
            "libro";


        document.body.classList.add(
            "libro-davanti"
        );
    }
);


/* ========================================
   APERTURA DELLA COPERTINA
   ======================================== */

libro.addEventListener(
    "click",
    () => {

        if (
            statoIngresso !==
            "libro"
        ) {

            return;
        }


        statoIngresso =
            "dedica";


        document.body.classList.add(
            "dedica-visibile"
        );


        schermataDedica.setAttribute(
            "aria-hidden",
            "false"
        );
    }
);


/* ========================================
   GIRO DELLA DEDICA
   ======================================== */

bottoneGiraDedica.addEventListener(
    "click",
    () => {

        if (
            statoIngresso !==
            "dedica"
        ) {

            return;
        }


        statoIngresso =
            "giro";


        document.body.classList.add(
            "dedica-in-giro"
        );


        window.setTimeout(
            () => {

                statoIngresso =
                    "interno";


                document.body.classList.add(
                    "libro-interno-visibile"
                );


                schermataDedica.setAttribute(
                    "aria-hidden",
                    "true"
                );


                libroInterno.setAttribute(
                    "aria-hidden",
                    "false"
                );


                vaiAllaPagina(
                    "indice"
                );

            },
            1050
        );
    }
);


/* ========================================
   PULSANTI DI NAVIGAZIONE
   ======================================== */

pulsantiNavigazione.forEach(
    (pulsante) => {

        pulsante.addEventListener(
            "click",
            () => {

                const destinazione =
                    pulsante.dataset.vai;


                vaiAllaPagina(
                    destinazione
                );
            }
        );
    }
);
