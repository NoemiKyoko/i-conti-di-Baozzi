/* ========================================
   DIALOGO DI BAOZZI
   Capitolo "Desideri e coccole"
   ======================================== */


/* ========================================
   STATI DELLA CONVERSAZIONE
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


/* ========================================
   STATO ATTUALE
   ======================================== */

let statoDialogo =
    STATI_DIALOGO.PANCHINA;


/* ========================================
   DESIDERIO SCRITTO DALL'UTENTE
   ======================================== */

let desiderio =
    "";


/* ========================================
   RISPOSTE DELLE DOMANDE
   ======================================== */

let rispostaDomanda1 =
    null;

let rispostaDomanda2 =
    null;
/* ========================================
   COPIONE DI BAOZZI
   ======================================== */

const COPIONE = {

    panchina: {

        testo:
            "Ti va di sederti qui un attimo?",

        pulsante:
            "Mi siedo"
    },


    desiderio: {

        testo:
            "Allora...\n\nChe cosa avevi in mente?",

        placeholder:
            "Vorrei regalarmi...",

        pulsante:
            "Continua"
    },


    permesso: {

        testo:
            "Posso farti alcune domande?",

        pulsante:
            "Ok"
    },


    domanda1: {

        testo:
            "Questa cosa ti renderà davvero felice oppure pensi che sia un desiderio che potrebbe passare tra qualche giorno?",

        risposte: [

            "Mi renderà davvero felice",

            "Potrebbe essere un desiderio passeggero"

        ]
    },


    domanda2: {

        testo:
            "Se decidessi di comprarla, riusciresti comunque a continuare a risparmiare per i tuoi obiettivi?",

        risposte: [

            "Sì, senza problemi",

            "Preferirei aspettare"

        ]
    },


    sereno: {

        testo:
            "Secondo me ci hai pensato con calma.\n\nSe rientra nel budget, concederti una coccola ogni tanto non rovinerà nulla.",

        pulsante:
            "Annota l'acquisto"
    },


    attesa: {

        testo:
            "Secondo me hai già trovato la risposta.\n\nSe tra qualche giorno lo vorrai ancora...\n\nprobabilmente sarà una scelta ancora più consapevole.",

        pulsante:
            "Torno alla panchina"
    }

};
