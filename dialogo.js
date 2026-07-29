/* ========================================
   DIALOGO DI BAOZZI
   Capitolo "Desideri e coccole"
   ======================================== */

const STATI_DIALOGO = {

    PANCHINA: "panchina",
    DESIDERIO: "desiderio",
    PERMESSO: "permesso",
    DOMANDA_1: "domanda1",
    DOMANDA_2: "domanda2",
    ESITO_SERENO: "sereno",
    ESITO_ATTESA: "attesa"
};


const COPIONE = {

    panchina: {

        immagine:
            "assets/baozzi-panchina.png",

        testo:
            "Perché non ti siedi un attimo?",

        pulsante:
            "Mi siedo."
    },

    desiderio: {

        immagine:
            "assets/baozzi-curioso.png",

        testo:
            "Allora...\n\nChe cosa avevi in mente?",

        placeholder:
            "Vorrei regalarmi...",

        pulsante:
            "Continua"
    },

    permesso: {

        immagine:
            "assets/baozzi-pensa.png",

        testo:
            "Posso farti alcune domande?",

        pulsante:
            "Ok"
    },

    domanda1: {

        immagine:
            "assets/baozzi-curioso.png",

        testo:
            "Questa cosa ti renderà davvero felice oppure pensi che sia un desiderio che potrebbe passare tra qualche giorno?",

        risposte: [
            {
                testo:
                    "Mi renderà davvero felice",
                valore:
                    "felice"
            },
            {
                testo:
                    "Potrebbe essere un desiderio passeggero",
                valore:
                    "passeggero"
            }
        ]
    },

    domanda2: {

        immagine:
            "assets/baozzi-pensa.png",

        testo:
            "Se decidessi di comprarla, riusciresti comunque a continuare a risparmiare per i tuoi obiettivi?",

        risposte: [
            {
                testo:
                    "Sì, senza problemi",
                valore:
                    "sereno"
            },
            {
                testo:
                    "Preferirei aspettare",
                valore:
                    "aspettare"
            }
        ]
    },

    sereno: {

        immagine:
            "assets/baozzi-sereno.png",

        testo:
            "Secondo me ci hai pensato con calma.\n\nSe rientra nel budget, concederti una coccola ogni tanto non rovinerà nulla.",

        pulsante:
            "Annota l’acquisto"
    },

    attesa: {

        immagine:
            "assets/baozzi-sereno.png",

        testo:
            "Secondo me hai già trovato la risposta.\n\nSe tra qualche giorno lo vorrai ancora…\n\nprobabilmente sarà una scelta ancora più consapevole.",

        pulsante:
            "Torno alla panchina"
    }
};


let statoDialogo =
    STATI_DIALOGO.PANCHINA;

let desiderio =
    "";

let rispostaDomanda1 =
    null;

let rispostaDomanda2 =
    null;

let timerDialogo =
    null;


const pulsanteApriDialogo =
    document.querySelector(
        "#apri-dialogo-baozzi"
    );

const immagineBaozzi =
    document.querySelector(
        "#immagine-baozzi"
    );

const fumettoBaozzi =
    document.querySelector(
        "#fumetto-baozzi"
    );

const testoBaozzi =
    document.querySelector(
        "#testo-baozzi"
    );

const azioniBaozzi =
    document.querySelector(
        "#azioni-baozzi"
    );


if (
    pulsanteApriDialogo &&
    immagineBaozzi &&
    fumettoBaozzi &&
    testoBaozzi &&
    azioniBaozzi
) {

    pulsanteApriDialogo.addEventListener(
        "click",
        apriDialogoBaozzi
    );
}


function apriDialogoBaozzi() {

    azzeraDialogo();

    vaiAllaPagina(
        "dialogo-baozzi"
    );

    mostraStatoConPausa(
        STATI_DIALOGO.PANCHINA,
        650
    );
}


function azzeraDialogo() {

    if (timerDialogo) {

        window.clearTimeout(
            timerDialogo
        );
    }

    statoDialogo =
        STATI_DIALOGO.PANCHINA;

    desiderio =
        "";

    rispostaDomanda1 =
        null;

    rispostaDomanda2 =
        null;

    fumettoBaozzi.classList.add(
        "nascosto"
    );

    fumettoBaozzi.classList.remove(
        "visibile"
    );

    azioniBaozzi.innerHTML =
        "";

    immagineBaozzi.src =
        COPIONE.panchina.immagine;
}


function mostraStatoConPausa(
    nuovoStato,
    pausa = 550
) {

    if (timerDialogo) {

        window.clearTimeout(
            timerDialogo
        );
    }

    statoDialogo =
        nuovoStato;

    const scena =
        COPIONE[nuovoStato];

    fumettoBaozzi.classList.remove(
        "visibile"
    );

    fumettoBaozzi.classList.add(
        "nascosto"
    );

    azioniBaozzi.innerHTML =
        "";

    immagineBaozzi.src =
        scena.immagine;

    timerDialogo =
        window.setTimeout(
            () => {

                mostraScena(
                    scena
                );
            },
            pausa
        );
}


function mostraScena(
    scena
) {

    testoBaozzi.textContent =
        scena.testo;

    fumettoBaozzi.classList.remove(
        "nascosto"
    );

    window.requestAnimationFrame(
        () => {

            fumettoBaozzi.classList.add(
                "visibile"
            );
        }
    );


    if (
        statoDialogo ===
        STATI_DIALOGO.DESIDERIO
    ) {

        creaCampoDesiderio(
            scena
        );

        return;
    }


    if (
        statoDialogo ===
            STATI_DIALOGO.DOMANDA_1 ||
        statoDialogo ===
            STATI_DIALOGO.DOMANDA_2
    ) {

        creaRisposte(
            scena
        );

        return;
    }


    creaPulsantePrincipale(
        scena.pulsante
    );
}


function creaPulsantePrincipale(
    etichetta
) {

    const pulsante =
        document.createElement(
            "button"
        );

    pulsante.type =
        "button";

    pulsante.className =
        "pulsante-libro";

    pulsante.textContent =
        etichetta;

    pulsante.addEventListener(
        "click",
        gestisciPulsantePrincipale
    );

    azioniBaozzi.appendChild(
        pulsante
    );
}


function gestisciPulsantePrincipale() {

    if (
        statoDialogo ===
        STATI_DIALOGO.PANCHINA
    ) {

        mostraStatoConPausa(
            STATI_DIALOGO.DESIDERIO
        );

        return;
    }


    if (
        statoDialogo ===
        STATI_DIALOGO.PERMESSO
    ) {

        mostraStatoConPausa(
            STATI_DIALOGO.DOMANDA_1
        );

        return;
    }


    if (
        statoDialogo ===
        STATI_DIALOGO.ESITO_SERENO
    ) {

        window.apriModuloDesideri(
            desiderio
        );

        return;
    }


    if (
        statoDialogo ===
        STATI_DIALOGO.ESITO_ATTESA
    ) {

        mostraStatoConPausa(
            STATI_DIALOGO.PANCHINA,
            500
        );
    }
}


function creaCampoDesiderio(
    scena
) {

    const contenitore =
        document.createElement(
            "div"
        );

    contenitore.className =
        "campo-desiderio-baozzi";


    const campo =
        document.createElement(
            "input"
        );

    campo.type =
        "text";

    campo.placeholder =
        scena.placeholder;

    campo.maxLength =
        100;

    campo.autocomplete =
        "off";


    const pulsante =
        document.createElement(
            "button"
        );

    pulsante.type =
        "button";

    pulsante.className =
        "pulsante-libro";

    pulsante.textContent =
        scena.pulsante;


    function continua() {

        const testoScritto =
            campo.value.trim();

        if (!testoScritto) {

            campo.focus();

            return;
        }

        desiderio =
            testoScritto;

        mostraStatoConPausa(
            STATI_DIALOGO.PERMESSO,
            700
        );
    }


    pulsante.addEventListener(
        "click",
        continua
    );

    campo.addEventListener(
        "keydown",
        (evento) => {

            if (evento.key === "Enter") {

                evento.preventDefault();

                continua();
            }
        }
    );

    contenitore.append(
        campo,
        pulsante
    );

    azioniBaozzi.appendChild(
        contenitore
    );

    window.setTimeout(
        () => campo.focus(),
        120
    );
}


function creaRisposte(
    scena
) {

    const contenitore =
        document.createElement(
            "div"
        );

    contenitore.className =
        "risposte-baozzi";


    scena.risposte.forEach(
        (risposta) => {

            const pulsante =
                document.createElement(
                    "button"
                );

            pulsante.type =
                "button";

            pulsante.className =
                "pulsante-risposta-baozzi";

            pulsante.textContent =
                risposta.testo;

            pulsante.addEventListener(
                "click",
                () => {

                    registraRisposta(
                        risposta.valore
                    );
                }
            );

            contenitore.appendChild(
                pulsante
            );
        }
    );

    azioniBaozzi.appendChild(
        contenitore
    );
}


function registraRisposta(
    valore
) {

    if (
        statoDialogo ===
        STATI_DIALOGO.DOMANDA_1
    ) {

        rispostaDomanda1 =
            valore;

        mostraStatoConPausa(
            STATI_DIALOGO.DOMANDA_2,
            650
        );

        return;
    }


    rispostaDomanda2 =
        valore;


    const casoSereno =
        rispostaDomanda1 ===
            "felice" &&
        rispostaDomanda2 ===
            "sereno";


    mostraStatoConPausa(
        casoSereno
            ? STATI_DIALOGO.ESITO_SERENO
            : STATI_DIALOGO.ESITO_ATTESA,
        850
    );
}
