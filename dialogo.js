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
