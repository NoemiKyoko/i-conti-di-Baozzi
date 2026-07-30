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


    if (
        idPagina ===
        "riepilogo-desideri"
    ) {

        aggiornaRiepilogoDesideri();

aggiornaPaginaObiettivi();
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
/* ========================================
   PARTE 2 — CAPITOLO CASA
   ======================================== */


/* ========================================
   CONFIGURAZIONE DELLE CATEGORIE
   ======================================== */

const categorieCasa = {

    luce: {
        nome: "Luce",
        icona: "💡",
        messaggio:
            "Non hai ancora registrato nessuna bolletta della luce."
    },

    acqua: {
        nome: "Acqua",
        icona: "💧",
        messaggio:
            "Non hai ancora registrato nessuna bolletta dell’acqua."
    },

    gas: {
        nome: "Gas",
        icona: "🔥",
        messaggio:
            "Non hai ancora registrato nessuna bolletta del gas."
    },

    internet: {
        nome: "Internet",
        icona: "📶",
        messaggio:
            "Non hai ancora registrato nessuna spesa per Internet."
    },

    condominio: {
        nome: "Condominio",
        icona: "🏢",
        messaggio:
            "Non hai ancora registrato nessuna spesa condominiale."
    },

    tasse: {
        nome: "Tasse",
        icona: "🧾",
        messaggio:
            "Non hai ancora registrato nessuna tassa legata alla casa."
    },

    manutenzione: {
        nome: "Manutenzione",
        icona: "🛠️",
        messaggio:
            "Non hai ancora registrato nessun intervento di manutenzione."
    },

    altro: {
        nome: "Acquisti per la casa",
        icona: "🪴",
        messaggio:
            "Non hai ancora registrato nessun acquisto per la casa."
    }
};


/* ========================================
   ARCHIVIO DELLA CASA
   ======================================== */

const chiaveArchivioCasa =
    "conti-baozzi-casa-v1";

let archivioCasa =
    caricaArchivio(
        chiaveArchivioCasa,
        categorieCasa
    );

let categoriaCasaCorrente =
    null;


/* ========================================
   ELEMENTI DEL CAPITOLO CASA
   ======================================== */

const pulsantiCategorieCasa =
    document.querySelectorAll(
        "[data-categoria-casa]"
    );


const casaIconaCategoria =
    document.querySelector(
        "#casa-icona-categoria"
    );

const casaTitoloCategoria =
    document.querySelector(
        "#casa-titolo-categoria"
    );


const casaIconaStatoVuoto =
    document.querySelector(
        "#casa-icona-stato-vuoto"
    );

const casaMessaggioVuoto =
    document.querySelector(
        "#casa-messaggio-vuoto"
    );

const casaStatoVuoto =
    document.querySelector(
        "#casa-stato-vuoto"
    );


const casaElencoRegistrazioni =
    document.querySelector(
        "#casa-elenco-registrazioni"
    );

const casaRigheRegistrazioni =
    document.querySelector(
        "#casa-righe-registrazioni"
    );


const casaContenitoreModulo =
    document.querySelector(
        "#casa-contenitore-modulo"
    );

const casaModuloRegistrazione =
    document.querySelector(
        "#casa-modulo-registrazione"
    );


const casaCampoData =
    document.querySelector(
        "#casa-campo-data"
    );

const casaCampoDescrizione =
    document.querySelector(
        "#casa-campo-descrizione"
    );

const casaCampoImporto =
    document.querySelector(
        "#casa-campo-importo"
    );

const casaCampoNota =
    document.querySelector(
        "#casa-campo-nota"
    );


const casaAggiungiPrimaVoce =
    document.querySelector(
        "#casa-aggiungi-prima-voce"
    );

const casaAggiungiAltraVoce =
    document.querySelector(
        "#casa-aggiungi-altra-voce"
    );

const casaApriModuloAlto =
    document.querySelector(
        "#casa-apri-modulo-alto"
    );

const casaAnnullaRegistrazione =
    document.querySelector(
        "#casa-annulla-registrazione"
    );


/* ========================================
   APERTURA DELLE CATEGORIE
   ======================================== */

pulsantiCategorieCasa.forEach(
    (pulsante) => {

        pulsante.addEventListener(
            "click",
            () => {

                const categoria =
                    pulsante.dataset
                        .categoriaCasa;


                apriCategoriaCasa(
                    categoria
                );
            }
        );
    }
);


function apriCategoriaCasa(
    categoria
) {

    const configurazione =
        categorieCasa[categoria];


    if (!configurazione) {

        console.warn(
            `La categoria Casa "${categoria}" non esiste.`
        );

        return;
    }


    categoriaCasaCorrente =
        categoria;


    casaIconaCategoria.textContent =
        configurazione.icona;

    casaTitoloCategoria.textContent =
        configurazione.nome;


    casaIconaStatoVuoto.textContent =
        configurazione.icona;

    casaMessaggioVuoto.textContent =
        configurazione.messaggio;


    aggiornaPaginaCasa();


    vaiAllaPagina(
        "casa-sezione"
    );
}


/* ========================================
   VISUALIZZAZIONE DELLA CATEGORIA
   ======================================== */

function aggiornaPaginaCasa() {

    if (!categoriaCasaCorrente) {

        return;
    }


    chiudiModuloCasa();


    const registrazioni =
        archivioCasa[
            categoriaCasaCorrente
        ];


    casaRigheRegistrazioni.innerHTML =
        "";


    if (
        registrazioni.length === 0
    ) {

        casaStatoVuoto.classList.remove(
            "nascosto"
        );


        casaElencoRegistrazioni
            .classList.add(
                "nascosto"
            );


        return;
    }


    casaStatoVuoto.classList.add(
        "nascosto"
    );


    casaElencoRegistrazioni
        .classList.remove(
            "nascosto"
        );


    const registrazioniOrdinate =
        [...registrazioni].sort(
            (prima, seconda) =>

                seconda.data.localeCompare(
                    prima.data
                )
        );


    registrazioniOrdinate.forEach(
        (registrazione) => {

            const riga =
                creaRigaTabella(

                    registrazione,

                    () => {

                        eliminaRegistrazioneCasa(
                            registrazione.id
                        );
                    }
                );


            casaRigheRegistrazioni
                .appendChild(
                    riga
                );
        }
    );
}


/* ========================================
   APERTURA E CHIUSURA DEL MODULO
   ======================================== */

function apriModuloCasa() {

    if (!categoriaCasaCorrente) {

        return;
    }


    casaStatoVuoto.classList.add(
        "nascosto"
    );


    casaElencoRegistrazioni
        .classList.add(
            "nascosto"
        );


    casaContenitoreModulo
        .classList.remove(
            "nascosto"
        );


    casaModuloRegistrazione.reset();


    casaCampoData.value =
        dataOggi();
}


function chiudiModuloCasa() {

    casaContenitoreModulo
        .classList.add(
            "nascosto"
        );
}


/* ========================================
   PULSANTI DEL MODULO
   ======================================== */

casaAggiungiPrimaVoce.addEventListener(
    "click",
    apriModuloCasa
);


casaAggiungiAltraVoce.addEventListener(
    "click",
    apriModuloCasa
);


casaApriModuloAlto.addEventListener(
    "click",
    apriModuloCasa
);


casaAnnullaRegistrazione.addEventListener(
    "click",
    () => {

        aggiornaPaginaCasa();
    }
);


/* ========================================
   SALVATAGGIO DI UNA REGISTRAZIONE
   ======================================== */

casaModuloRegistrazione.addEventListener(
    "submit",
    (evento) => {

        evento.preventDefault();


        if (!categoriaCasaCorrente) {

            return;
        }


        const data =
            casaCampoData.value;


        const descrizione =
            casaCampoDescrizione
                .value
                .trim();


        const importo =
            Number(
                casaCampoImporto.value
            );


        const nota =
            casaCampoNota
                .value
                .trim();


        if (
            !data ||
            !descrizione ||
            !Number.isFinite(importo) ||
            importo <= 0
        ) {

            window.alert(
                "Inserisci data, descrizione e importo."
            );

            return;
        }


        const nuovaRegistrazione = {

            id:
                creaId(),

            data:
                data,

            descrizione:
                descrizione,

            importo:
                importo,

            nota:
                nota
        };


        archivioCasa[
            categoriaCasaCorrente
        ].push(
            nuovaRegistrazione
        );


        salvaArchivio(
            chiaveArchivioCasa,
            archivioCasa
        );


        aggiornaPaginaCasa();

        aggiornaRiepilogoCasa();
    }
);


/* ========================================
   ELIMINAZIONE DI UNA REGISTRAZIONE
   ======================================== */

function eliminaRegistrazioneCasa(
    id
) {

    if (!categoriaCasaCorrente) {

        return;
    }


    const conferma =
        window.confirm(
            "Eliminare questa registrazione?"
        );


    if (!conferma) {

        return;
    }


    archivioCasa[
        categoriaCasaCorrente
    ] =
        archivioCasa[
            categoriaCasaCorrente
        ].filter(

            (registrazione) =>

                registrazione.id !== id
        );


    salvaArchivio(
        chiaveArchivioCasa,
        archivioCasa
    );


    aggiornaPaginaCasa();

    aggiornaRiepilogoCasa();
}


/* ========================================
   RIEPILOGO DELLA CASA
   ======================================== */

function aggiornaRiepilogoCasa() {

    let totaleCasa =
        0;


    Object.keys(
        categorieCasa
    ).forEach(
        (categoria) => {

            const totale =
                totaleCategoria(

                    archivioCasa,

                    categoria
                );


            totaleCasa +=
                totale;


            const elementoTotale =
                document.querySelector(
                    `#totale-${categoria}`
                );


            if (elementoTotale) {

                elementoTotale.textContent =
                    formattaEuro(
                        totale
                    );
            }
        }
    );


    const elementoTotaleCasa =
        document.querySelector(
            "#totale-casa"
        );


    if (elementoTotaleCasa) {

        elementoTotaleCasa.textContent =
            formattaEuro(
                totaleCasa
            );
    }
}
/* ========================================
   PARTE 3 — CAPITOLO ENTRATE
   ======================================== */


/* ========================================
   CONFIGURAZIONE DELLE CATEGORIE
   ======================================== */

const categorieEntrate = {

    stipendio: {
        nome: "Stipendio",
        icona: "💼",

        descrizioneObbligatoria: false,
        descrizionePredefinita:
            "Stipendio",

        messaggio:
            "Non hai ancora registrato nessuno stipendio."
    },

    extra: {
        nome: "Entrate extra",
        icona: "🎁",

        descrizioneObbligatoria: true,
        descrizionePredefinita:
            "",

        messaggio:
            "Non hai ancora registrato nessuna entrata extra."
    }
};


/* ========================================
   ARCHIVIO DELLE ENTRATE
   ======================================== */

const chiaveArchivioEntrate =
    "conti-baozzi-entrate-v1";

let archivioEntrate =
    caricaArchivio(
        chiaveArchivioEntrate,
        categorieEntrate
    );

let categoriaEntrateCorrente =
    null;


/* ========================================
   ELEMENTI DEL CAPITOLO ENTRATE
   ======================================== */

const pulsantiCategorieEntrate =
    document.querySelectorAll(
        "[data-categoria-entrate]"
    );


const entrateIconaCategoria =
    document.querySelector(
        "#entrate-icona-categoria"
    );

const entrateTitoloCategoria =
    document.querySelector(
        "#entrate-titolo-categoria"
    );


const entrateIconaStatoVuoto =
    document.querySelector(
        "#entrate-icona-stato-vuoto"
    );

const entrateMessaggioVuoto =
    document.querySelector(
        "#entrate-messaggio-vuoto"
    );

const entrateStatoVuoto =
    document.querySelector(
        "#entrate-stato-vuoto"
    );


const entrateElencoRegistrazioni =
    document.querySelector(
        "#entrate-elenco-registrazioni"
    );

const entrateRigheRegistrazioni =
    document.querySelector(
        "#entrate-righe-registrazioni"
    );


const entrateContenitoreModulo =
    document.querySelector(
        "#entrate-contenitore-modulo"
    );

const entrateModuloRegistrazione =
    document.querySelector(
        "#entrate-modulo-registrazione"
    );


const entrateCampoData =
    document.querySelector(
        "#entrate-campo-data"
    );

const entrateLabelDescrizione =
    document.querySelector(
        "#entrate-label-descrizione"
    );

const entrateCampoDescrizione =
    document.querySelector(
        "#entrate-campo-descrizione"
    );

const entrateCampoImporto =
    document.querySelector(
        "#entrate-campo-importo"
    );

const entrateCampoNota =
    document.querySelector(
        "#entrate-campo-nota"
    );


const entrateAggiungiPrimaVoce =
    document.querySelector(
        "#entrate-aggiungi-prima-voce"
    );

const entrateAggiungiAltraVoce =
    document.querySelector(
        "#entrate-aggiungi-altra-voce"
    );

const entrateApriModuloAlto =
    document.querySelector(
        "#entrate-apri-modulo-alto"
    );

const entrateAnnullaRegistrazione =
    document.querySelector(
        "#entrate-annulla-registrazione"
    );


/* ========================================
   APERTURA DELLE CATEGORIE
   ======================================== */

pulsantiCategorieEntrate.forEach(
    (pulsante) => {

        pulsante.addEventListener(
            "click",
            () => {

                const categoria =
                    pulsante.dataset
                        .categoriaEntrate;


                apriCategoriaEntrate(
                    categoria
                );
            }
        );
    }
);


function apriCategoriaEntrate(
    categoria
) {

    const configurazione =
        categorieEntrate[categoria];


    if (!configurazione) {

        console.warn(
            `La categoria Entrate "${categoria}" non esiste.`
        );

        return;
    }


    categoriaEntrateCorrente =
        categoria;


    entrateIconaCategoria.textContent =
        configurazione.icona;

    entrateTitoloCategoria.textContent =
        configurazione.nome;


    entrateIconaStatoVuoto.textContent =
        configurazione.icona;

    entrateMessaggioVuoto.textContent =
        configurazione.messaggio;


    aggiornaPaginaEntrate();


    vaiAllaPagina(
        "entrate-sezione"
    );
}


/* ========================================
   VISUALIZZAZIONE DELLA CATEGORIA
   ======================================== */

function aggiornaPaginaEntrate() {

    if (!categoriaEntrateCorrente) {

        return;
    }


    chiudiModuloEntrate();


    const registrazioni =
        archivioEntrate[
            categoriaEntrateCorrente
        ];


    entrateRigheRegistrazioni.innerHTML =
        "";


    if (
        registrazioni.length === 0
    ) {

        entrateStatoVuoto
            .classList.remove(
                "nascosto"
            );


        entrateElencoRegistrazioni
            .classList.add(
                "nascosto"
            );


        return;
    }


    entrateStatoVuoto.classList.add(
        "nascosto"
    );


    entrateElencoRegistrazioni
        .classList.remove(
            "nascosto"
        );


    const registrazioniOrdinate =
        [...registrazioni].sort(
            (prima, seconda) =>

                seconda.data.localeCompare(
                    prima.data
                )
        );


    registrazioniOrdinate.forEach(
        (registrazione) => {

            const riga =
                creaRigaTabella(

                    registrazione,

                    () => {

                        eliminaRegistrazioneEntrate(
                            registrazione.id
                        );
                    }
                );


            entrateRigheRegistrazioni
                .appendChild(
                    riga
                );
        }
    );
}


/* ========================================
   APERTURA E CHIUSURA DEL MODULO
   ======================================== */

function apriModuloEntrate() {

    if (!categoriaEntrateCorrente) {

        return;
    }


    const configurazione =
        categorieEntrate[
            categoriaEntrateCorrente
        ];


    entrateStatoVuoto.classList.add(
        "nascosto"
    );


    entrateElencoRegistrazioni
        .classList.add(
            "nascosto"
        );


    entrateContenitoreModulo
        .classList.remove(
            "nascosto"
        );


    entrateModuloRegistrazione.reset();


    entrateCampoData.value =
        dataOggi();


    entrateCampoDescrizione.required =
        configurazione
            .descrizioneObbligatoria;


    entrateLabelDescrizione
        .classList.toggle(
            "nascosto",
            !configurazione
                .descrizioneObbligatoria
        );
}


function chiudiModuloEntrate() {

    entrateContenitoreModulo
        .classList.add(
            "nascosto"
        );
}


/* ========================================
   PULSANTI DEL MODULO
   ======================================== */

entrateAggiungiPrimaVoce
    .addEventListener(
        "click",
        apriModuloEntrate
    );


entrateAggiungiAltraVoce
    .addEventListener(
        "click",
        apriModuloEntrate
    );


entrateApriModuloAlto
    .addEventListener(
        "click",
        apriModuloEntrate
    );


entrateAnnullaRegistrazione
    .addEventListener(
        "click",
        () => {

            aggiornaPaginaEntrate();
        }
    );


/* ========================================
   SALVATAGGIO DI UN’ENTRATA
   ======================================== */

entrateModuloRegistrazione
    .addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();


            if (
                !categoriaEntrateCorrente
            ) {

                return;
            }


            const configurazione =
                categorieEntrate[
                    categoriaEntrateCorrente
                ];


            const data =
                entrateCampoData.value;


            const descrizioneScritta =
                entrateCampoDescrizione
                    .value
                    .trim();


            const descrizione =
                configurazione
                    .descrizioneObbligatoria
                    ? descrizioneScritta
                    : configurazione
                        .descrizionePredefinita;


            const importo =
                Number(
                    entrateCampoImporto.value
                );


            const nota =
                entrateCampoNota
                    .value
                    .trim();


            if (
                !data ||
                !descrizione ||
                !Number.isFinite(importo) ||
                importo <= 0
            ) {

                window.alert(
                    "Inserisci i dati richiesti e l’importo."
                );

                return;
            }


            const nuovaRegistrazione = {

                id:
                    creaId(),

                data:
                    data,

                descrizione:
                    descrizione,

                importo:
                    importo,

                nota:
                    nota
            };


            archivioEntrate[
                categoriaEntrateCorrente
            ].push(
                nuovaRegistrazione
            );


            salvaArchivio(
                chiaveArchivioEntrate,
                archivioEntrate
            );


            aggiornaPaginaEntrate();

            aggiornaRiepilogoEntrate();
        }
    );


/* ========================================
   ELIMINAZIONE DI UN’ENTRATA
   ======================================== */

function eliminaRegistrazioneEntrate(
    id
) {

    if (!categoriaEntrateCorrente) {

        return;
    }


    const conferma =
        window.confirm(
            "Eliminare questa registrazione?"
        );


    if (!conferma) {

        return;
    }


    archivioEntrate[
        categoriaEntrateCorrente
    ] =
        archivioEntrate[
            categoriaEntrateCorrente
        ].filter(

            (registrazione) =>

                registrazione.id !== id
        );


    salvaArchivio(
        chiaveArchivioEntrate,
        archivioEntrate
    );


    aggiornaPaginaEntrate();

    aggiornaRiepilogoEntrate();
}


/* ========================================
   RIEPILOGO DELLE ENTRATE
   ======================================== */

function aggiornaRiepilogoEntrate() {

    const totaleStipendio =
        totaleCategoria(
            archivioEntrate,
            "stipendio"
        );


    const totaleExtra =
        totaleCategoria(
            archivioEntrate,
            "extra"
        );


    const elementoStipendio =
        document.querySelector(
            "#totale-stipendio"
        );


    const elementoExtra =
        document.querySelector(
            "#totale-extra"
        );


    const elementoTotaleEntrate =
        document.querySelector(
            "#totale-entrate"
        );


    if (elementoStipendio) {

        elementoStipendio.textContent =
            formattaEuro(
                totaleStipendio
            );
    }


    if (elementoExtra) {

        elementoExtra.textContent =
            formattaEuro(
                totaleExtra
            );
    }


    if (elementoTotaleEntrate) {

        elementoTotaleEntrate.textContent =
            formattaEuro(
                totaleStipendio +
                totaleExtra
            );
    }
}
/* ========================================
   PARTE 4 — CAPITOLO SPESE QUOTIDIANE
   ======================================== */


/* ========================================
   CONFIGURAZIONE DELLE CATEGORIE
   ======================================== */

const categorieSpese = {

    alimentari: {
        nome: "Spesa alimentare",
        icona: "🛒",

        messaggio:
            "Non hai ancora registrato nessuna spesa alimentare."
    },

    trasporti: {
        nome: "Auto e trasporti",
        icona: "🚗",

        messaggio:
            "Non hai ancora registrato nessuna spesa per auto o trasporti."
    },

    salute: {
        nome: "Salute",
        icona: "💊",

        messaggio:
            "Non hai ancora registrato nessuna spesa per la salute."
    },

    greta: {
        nome: "Greta",
        icona: "👶",

        messaggio:
            "Non hai ancora registrato nessuna spesa per Greta."
    },

    regali: {
        nome: "Regali",
        icona: "🎁",

        messaggio:
            "Non hai ancora registrato nessuna spesa per i regali."
    }
};


/* ========================================
   ARCHIVIO DELLE SPESE
   ======================================== */

const chiaveArchivioSpese =
    "conti-baozzi-spese-v1";

let archivioSpese =
    caricaArchivio(
        chiaveArchivioSpese,
        categorieSpese
    );

let categoriaSpeseCorrente =
    null;


/* ========================================
   ELEMENTI DEL CAPITOLO
   ======================================== */

const pulsantiCategorieSpese =
    document.querySelectorAll(
        "[data-categoria-spese]"
    );


const speseIconaCategoria =
    document.querySelector(
        "#spese-icona-categoria"
    );

const speseTitoloCategoria =
    document.querySelector(
        "#spese-titolo-categoria"
    );


const speseIconaStatoVuoto =
    document.querySelector(
        "#spese-icona-stato-vuoto"
    );

const speseMessaggioVuoto =
    document.querySelector(
        "#spese-messaggio-vuoto"
    );

const speseStatoVuoto =
    document.querySelector(
        "#spese-stato-vuoto"
    );


const fraseGreta =
    document.querySelector(
        "#frase-greta"
    );


const speseElencoRegistrazioni =
    document.querySelector(
        "#spese-elenco-registrazioni"
    );

const speseRigheRegistrazioni =
    document.querySelector(
        "#spese-righe-registrazioni"
    );


const speseContenitoreModulo =
    document.querySelector(
        "#spese-contenitore-modulo"
    );

const speseModuloRegistrazione =
    document.querySelector(
        "#spese-modulo-registrazione"
    );


const speseCampoData =
    document.querySelector(
        "#spese-campo-data"
    );

const speseCampoDescrizione =
    document.querySelector(
        "#spese-campo-descrizione"
    );

const speseCampoImporto =
    document.querySelector(
        "#spese-campo-importo"
    );

const speseCampoNota =
    document.querySelector(
        "#spese-campo-nota"
    );


const speseAggiungiPrimaVoce =
    document.querySelector(
        "#spese-aggiungi-prima-voce"
    );

const speseAggiungiAltraVoce =
    document.querySelector(
        "#spese-aggiungi-altra-voce"
    );

const speseApriModuloAlto =
    document.querySelector(
        "#spese-apri-modulo-alto"
    );

const speseAnnullaRegistrazione =
    document.querySelector(
        "#spese-annulla-registrazione"
    );


/* ========================================
   APERTURA DELLE CATEGORIE
   ======================================== */

pulsantiCategorieSpese.forEach(
    (pulsante) => {

        pulsante.addEventListener(
            "click",
            () => {

                const categoria =
                    pulsante.dataset
                        .categoriaSpese;


                apriCategoriaSpese(
                    categoria
                );
            }
        );
    }
);


function apriCategoriaSpese(
    categoria
) {

    const configurazione =
        categorieSpese[categoria];


    if (!configurazione) {

        console.warn(
            `La categoria Spese "${categoria}" non esiste.`
        );

        return;
    }


    categoriaSpeseCorrente =
        categoria;


    speseIconaCategoria.textContent =
        configurazione.icona;

    speseTitoloCategoria.textContent =
        configurazione.nome;


    speseIconaStatoVuoto.textContent =
        configurazione.icona;

    speseMessaggioVuoto.textContent =
        configurazione.messaggio;


    fraseGreta.classList.toggle(
        "nascosto",
        categoria !== "greta"
    );


    aggiornaPaginaSpese();


    vaiAllaPagina(
        "spese-sezione"
    );
}


/* ========================================
   VISUALIZZAZIONE DELLA CATEGORIA
   ======================================== */

function aggiornaPaginaSpese() {

    if (!categoriaSpeseCorrente) {

        return;
    }


    chiudiModuloSpese();


    const registrazioni =
        archivioSpese[
            categoriaSpeseCorrente
        ];


    speseRigheRegistrazioni.innerHTML =
        "";


    if (
        registrazioni.length === 0
    ) {

        speseStatoVuoto
            .classList.remove(
                "nascosto"
            );


        speseElencoRegistrazioni
            .classList.add(
                "nascosto"
            );


        return;
    }


    speseStatoVuoto.classList.add(
        "nascosto"
    );


    speseElencoRegistrazioni
        .classList.remove(
            "nascosto"
        );


    const registrazioniOrdinate =
        [...registrazioni].sort(
            (prima, seconda) =>

                seconda.data.localeCompare(
                    prima.data
                )
        );


    registrazioniOrdinate.forEach(
        (registrazione) => {

            const riga =
                creaRigaTabella(

                    registrazione,

                    () => {

                        eliminaRegistrazioneSpese(
                            registrazione.id
                        );
                    }
                );


            speseRigheRegistrazioni
                .appendChild(
                    riga
                );
        }
    );
}


/* ========================================
   APERTURA E CHIUSURA DEL MODULO
   ======================================== */

function apriModuloSpese() {

    if (!categoriaSpeseCorrente) {

        return;
    }


    speseStatoVuoto.classList.add(
        "nascosto"
    );


    speseElencoRegistrazioni
        .classList.add(
            "nascosto"
        );


    speseContenitoreModulo
        .classList.remove(
            "nascosto"
        );


    speseModuloRegistrazione.reset();


    speseCampoData.value =
        dataOggi();
}


function chiudiModuloSpese() {

    speseContenitoreModulo
        .classList.add(
            "nascosto"
        );
}


/* ========================================
   PULSANTI DEL MODULO
   ======================================== */

speseAggiungiPrimaVoce
    .addEventListener(
        "click",
        apriModuloSpese
    );


speseAggiungiAltraVoce
    .addEventListener(
        "click",
        apriModuloSpese
    );


speseApriModuloAlto
    .addEventListener(
        "click",
        apriModuloSpese
    );


speseAnnullaRegistrazione
    .addEventListener(
        "click",
        () => {

            aggiornaPaginaSpese();
        }
    );


/* ========================================
   SALVATAGGIO DI UNA SPESA
   ======================================== */

speseModuloRegistrazione
    .addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();


            if (!categoriaSpeseCorrente) {

                return;
            }


            const data =
                speseCampoData.value;


            const descrizione =
                speseCampoDescrizione
                    .value
                    .trim();


            const importo =
                Number(
                    speseCampoImporto.value
                );


            const nota =
                speseCampoNota
                    .value
                    .trim();


            if (
                !data ||
                !descrizione ||
                !Number.isFinite(importo) ||
                importo <= 0
            ) {

                window.alert(
                    "Inserisci data, descrizione e importo."
                );

                return;
            }


            const nuovaRegistrazione = {

                id:
                    creaId(),

                data:
                    data,

                descrizione:
                    descrizione,

                importo:
                    importo,

                nota:
                    nota
            };


            archivioSpese[
                categoriaSpeseCorrente
            ].push(
                nuovaRegistrazione
            );


            salvaArchivio(
                chiaveArchivioSpese,
                archivioSpese
            );


            aggiornaPaginaSpese();

            aggiornaRiepilogoSpese();
        }
    );


/* ========================================
   ELIMINAZIONE DI UNA SPESA
   ======================================== */

function eliminaRegistrazioneSpese(
    id
) {

    if (!categoriaSpeseCorrente) {

        return;
    }


    const conferma =
        window.confirm(
            "Eliminare questa registrazione?"
        );


    if (!conferma) {

        return;
    }


    archivioSpese[
        categoriaSpeseCorrente
    ] =
        archivioSpese[
            categoriaSpeseCorrente
        ].filter(

            (registrazione) =>

                registrazione.id !== id
        );


    salvaArchivio(
        chiaveArchivioSpese,
        archivioSpese
    );


    aggiornaPaginaSpese();

    aggiornaRiepilogoSpese();
}


/* ========================================
   RIEPILOGO DELLE SPESE
   ======================================== */

function aggiornaRiepilogoSpese() {

    let totaleSpese =
        0;


    Object.keys(
        categorieSpese
    ).forEach(
        (categoria) => {

            const totale =
                totaleCategoria(

                    archivioSpese,

                    categoria
                );


            totaleSpese +=
                totale;


            const elementoTotale =
                document.querySelector(
                    `#totale-${categoria}`
                );


            if (elementoTotale) {

                elementoTotale.textContent =
                    formattaEuro(
                        totale
                    );
            }
        }
    );


    const elementoTotaleSpese =
        document.querySelector(
            "#totale-spese"
        );


    if (elementoTotaleSpese) {

        elementoTotaleSpese.textContent =
            formattaEuro(
                totaleSpese
            );
    }
}
/* ========================================
   PARTE 5 — DESIDERI E COCCOLE
   ======================================== */

const chiaveArchivioDesideri =
    "conti-baozzi-desideri-v1";

let archivioDesideri =
    caricaElenco(
        chiaveArchivioDesideri
    );

const desideriStatoVuoto =
    document.querySelector(
        "#desideri-stato-vuoto"
    );

const desideriElencoRegistrazioni =
    document.querySelector(
        "#desideri-elenco-registrazioni"
    );

const desideriRigheRegistrazioni =
    document.querySelector(
        "#desideri-righe-registrazioni"
    );

const desideriContenitoreModulo =
    document.querySelector(
        "#desideri-contenitore-modulo"
    );

const desideriModuloRegistrazione =
    document.querySelector(
        "#desideri-modulo-registrazione"
    );

const desideriCampoData =
    document.querySelector(
        "#desideri-campo-data"
    );

const desideriCampoDescrizione =
    document.querySelector(
        "#desideri-campo-descrizione"
    );

const desideriCampoImporto =
    document.querySelector(
        "#desideri-campo-importo"
    );

const desideriCampoNota =
    document.querySelector(
        "#desideri-campo-nota"
    );

const desideriAggiungiPrimaVoce =
    document.querySelector(
        "#desideri-aggiungi-prima-voce"
    );

const desideriAggiungiAltraVoce =
    document.querySelector(
        "#desideri-aggiungi-altra-voce"
    );

const desideriApriModuloAlto =
    document.querySelector(
        "#desideri-apri-modulo-alto"
    );

const desideriAnnullaRegistrazione =
    document.querySelector(
        "#desideri-annulla-registrazione"
    );


function aggiornaPaginaDesideri() {

    if (
        !desideriStatoVuoto ||
        !desideriElencoRegistrazioni ||
        !desideriRigheRegistrazioni
    ) {

        return;
    }


    chiudiModuloDesideri();

    desideriRigheRegistrazioni.innerHTML =
        "";


    if (
        archivioDesideri.length === 0
    ) {

        desideriStatoVuoto.classList.remove(
            "nascosto"
        );

        desideriElencoRegistrazioni
            .classList.add(
                "nascosto"
            );

        return;
    }


    desideriStatoVuoto.classList.add(
        "nascosto"
    );

    desideriElencoRegistrazioni
        .classList.remove(
            "nascosto"
        );


    const registrazioniOrdinate =
        [...archivioDesideri].sort(
            (prima, seconda) =>

                seconda.data.localeCompare(
                    prima.data
                )
        );


    registrazioniOrdinate.forEach(
        (registrazione) => {

            const riga =
                creaRigaTabella(
                    registrazione,
                    () => {

                        eliminaRegistrazioneDesideri(
                            registrazione.id
                        );
                    }
                );

            desideriRigheRegistrazioni
                .appendChild(
                    riga
                );
        }
    );
}


function apriModuloDesideri(
    descrizionePrecompilata = ""
) {

    if (
        !desideriModuloRegistrazione ||
        !desideriContenitoreModulo
    ) {

        return;
    }


    vaiAllaPagina(
        "acquisti-desideri"
    );


    desideriStatoVuoto.classList.add(
        "nascosto"
    );

    desideriElencoRegistrazioni
        .classList.add(
            "nascosto"
        );

    desideriContenitoreModulo
        .classList.remove(
            "nascosto"
        );


    desideriModuloRegistrazione.reset();

    desideriCampoData.value =
        dataOggi();

    desideriCampoDescrizione.value =
        descrizionePrecompilata;


    window.setTimeout(
        () => {

            if (descrizionePrecompilata) {

                desideriCampoImporto.focus();

                return;
            }

            desideriCampoDescrizione.focus();
        },
        120
    );
}


function chiudiModuloDesideri() {

    if (desideriContenitoreModulo) {

        desideriContenitoreModulo
            .classList.add(
                "nascosto"
            );
    }
}


[
    desideriAggiungiPrimaVoce,
    desideriAggiungiAltraVoce,
    desideriApriModuloAlto
].forEach(
    (pulsante) => {

        if (pulsante) {

            pulsante.addEventListener(
                "click",
                () => {

                    apriModuloDesideri();
                }
            );
        }
    }
);


if (desideriAnnullaRegistrazione) {

    desideriAnnullaRegistrazione
        .addEventListener(
            "click",
            aggiornaPaginaDesideri
        );
}


if (desideriModuloRegistrazione) {

    desideriModuloRegistrazione
        .addEventListener(
            "submit",
            (evento) => {

                evento.preventDefault();


                const data =
                    desideriCampoData.value;

                const descrizione =
                    desideriCampoDescrizione
                        .value
                        .trim();

                const importo =
                    Number(
                        desideriCampoImporto.value
                    );

                const nota =
                    desideriCampoNota
                        .value
                        .trim();


                if (
                    !data ||
                    !descrizione ||
                    !Number.isFinite(importo) ||
                    importo <= 0
                ) {

                    window.alert(
                        "Inserisci data, descrizione e importo."
                    );

                    return;
                }


                archivioDesideri.push({

                    id:
                        creaId(),

                    data:
                        data,

                    descrizione:
                        descrizione,

                    importo:
                        importo,

                    nota:
                        nota
                });


                salvaArchivio(
                    chiaveArchivioDesideri,
                    archivioDesideri
                );


                aggiornaPaginaDesideri();

                aggiornaRiepilogoDesideri();
            }
        );
}


function eliminaRegistrazioneDesideri(
    id
) {

    const conferma =
        window.confirm(
            "Eliminare questo acquisto?"
        );


    if (!conferma) {

        return;
    }


    archivioDesideri =
        archivioDesideri.filter(
            (registrazione) =>

                registrazione.id !== id
        );


    salvaArchivio(
        chiaveArchivioDesideri,
        archivioDesideri
    );


    aggiornaPaginaDesideri();

    aggiornaRiepilogoDesideri();
}


function aggiornaRiepilogoDesideri() {

    const numeroAcquisti =
        archivioDesideri.length;

    const totale =
        archivioDesideri.reduce(
            (somma, registrazione) =>

                somma +
                Number(
                    registrazione.importo
                ),
            0
        );


    const elementoNumero =
        document.querySelector(
            "#numero-acquisti-desideri"
        );

    const elementoTotale =
        document.querySelector(
            "#totale-desideri"
        );


    if (elementoNumero) {

        elementoNumero.textContent =
            String(numeroAcquisti);
    }


    if (elementoTotale) {

        elementoTotale.textContent =
            formattaEuro(
                totale
            );
    }
}


window.apriModuloDesideri =
    apriModuloDesideri;


/* ========================================
   PARTE 5 — SERVIZI CONDIVISI
   Formattazione, archivi, tabelle e avvio
   ======================================== */


/* ========================================
   FORMATTAZIONE DEGLI IMPORTI
   ======================================== */

function formattaEuro(
    importo
) {

    return new Intl.NumberFormat(
        "it-IT",
        {
            style:
                "currency",

            currency:
                "EUR"
        }
    ).format(
        Number(importo) || 0
    );
}


/* ========================================
   FORMATTAZIONE DELLE DATE
   ======================================== */

function formattaData(
    dataISO
) {

    if (!dataISO) {

        return "";
    }


    const data =
        new Date(
            `${dataISO}T12:00:00`
        );


    return new Intl.DateTimeFormat(
        "it-IT"
    ).format(
        data
    );
}


/* ========================================
   DATA DI OGGI
   ======================================== */

function dataOggi() {

    const oggi =
        new Date();


    const anno =
        oggi.getFullYear();


    const mese =
        String(
            oggi.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const giorno =
        String(
            oggi.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        `${anno}-${mese}-${giorno}`
    );
}


/* ========================================
   CREAZIONE DI UN IDENTIFICATIVO
   ======================================== */

function creaId() {

    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID ===
            "function"
    ) {

        return crypto.randomUUID();
    }


    return (
        `${Date.now()}-` +
        Math.random()
            .toString(16)
            .slice(2)
    );
}


/* ========================================
   CREAZIONE DI UN ARCHIVIO VUOTO
   ======================================== */

function creaArchivioVuoto(
    configurazione
) {

    const archivio =
        {};


    Object.keys(
        configurazione
    ).forEach(
        (categoria) => {

            archivio[categoria] =
                [];
        }
    );


    return archivio;
}


/* ========================================
   LETTURA DAL LOCALSTORAGE
   ======================================== */

function caricaArchivio(
    chiave,
    configurazione
) {

    const archivioVuoto =
        creaArchivioVuoto(
            configurazione
        );


    try {

        const contenuto =
            localStorage.getItem(
                chiave
            );


        if (!contenuto) {

            return archivioVuoto;
        }


        const dati =
            JSON.parse(
                contenuto
            );


        if (
            !dati ||
            typeof dati !== "object"
        ) {

            return archivioVuoto;
        }


        Object.keys(
            archivioVuoto
        ).forEach(
            (categoria) => {

                if (
                    !Array.isArray(
                        dati[categoria]
                    )
                ) {

                    dati[categoria] =
                        [];
                }
            }
        );


        return {

            ...archivioVuoto,

            ...dati
        };

    } catch (errore) {

        console.error(
            `Errore nella lettura di ${chiave}:`,
            errore
        );


        return archivioVuoto;
    }
}


/* ========================================
   CARICAMENTO DI UN ELENCO
   ======================================== */

function caricaElenco(
    chiave
) {

    try {

        const datiSalvati =
            localStorage.getItem(
                chiave
            );


        if (!datiSalvati) {

            return [];
        }


        const dati =
            JSON.parse(
                datiSalvati
            );


        return Array.isArray(dati)
            ? dati
            : [];

    } catch (errore) {

        console.warn(
            `Impossibile caricare l’elenco "${chiave}".`,
            errore
        );

        return [];
    }
}


/* ========================================
   SALVATAGGIO NEL LOCALSTORAGE
   ======================================== */

function salvaArchivio(
    chiave,
    archivio
) {

    try {

        localStorage.setItem(
            chiave,
            JSON.stringify(
                archivio
            )
        );

    } catch (errore) {

        console.error(
            `Errore nel salvataggio di ${chiave}:`,
            errore
        );


        window.alert(
            "Non è stato possibile salvare i dati."
        );
    }
}


/* ========================================
   TOTALE DI UNA CATEGORIA
   ======================================== */

function totaleCategoria(
    archivio,
    categoria
) {

    const registrazioni =
        archivio[categoria];


    if (
        !Array.isArray(
            registrazioni
        )
    ) {

        return 0;
    }


    return registrazioni.reduce(
        (
            totale,
            registrazione
        ) => {

            const importo =
                Number(
                    registrazione.importo
                );


            if (
                !Number.isFinite(
                    importo
                )
            ) {

                return totale;
            }


            return totale +
                importo;
        },
        0
    );
}


/* ========================================
   CREAZIONE DI UNA RIGA DELLA TABELLA
   ======================================== */

function creaRigaTabella(
    registrazione,
    funzioneElimina
) {

    const riga =
        document.createElement(
            "tr"
        );


    const cellaData =
        document.createElement(
            "td"
        );


    const cellaDescrizione =
        document.createElement(
            "td"
        );


    const cellaImporto =
        document.createElement(
            "td"
        );


    const cellaAzioni =
        document.createElement(
            "td"
        );


    cellaData.textContent =
        formattaData(
            registrazione.data
        );


    const descrizione =
        document.createElement(
            "span"
        );


    descrizione.textContent =
        registrazione.descrizione;


    cellaDescrizione.appendChild(
        descrizione
    );


    if (
        registrazione.nota
    ) {

        const nota =
            document.createElement(
                "small"
            );


        nota.className =
            "nota-riga";


        nota.textContent =
            registrazione.nota;


        cellaDescrizione.appendChild(
            nota
        );
    }


    cellaImporto.textContent =
        formattaEuro(
            registrazione.importo
        );


    const pulsanteElimina =
        document.createElement(
            "button"
        );


    pulsanteElimina.className =
        "pulsante-elimina";


    pulsanteElimina.type =
        "button";


    pulsanteElimina.textContent =
        "✕";


    pulsanteElimina.setAttribute(
        "aria-label",
        "Elimina registrazione"
    );


    pulsanteElimina.addEventListener(
        "click",
        funzioneElimina
    );


    cellaAzioni.appendChild(
        pulsanteElimina
    );


    riga.append(
        cellaData,
        cellaDescrizione,
        cellaImporto,
        cellaAzioni
    );


    return riga;
}




/* ========================================
   PARTE 6 — RISPARMI E OBIETTIVI
   ======================================== */

const chiaveObiettivi =
    "conti-baozzi-obiettivi-v1";

const obiettivoCasaPredefinito = {
    id: "casa",
    nome: "La nostra casa",
    raggiunto: 0,
    traguardo: 0,
    fisso: true,
    traguardoFesteggiato: 0
};

let obiettivi =
    caricaObiettivi();

let obiettivoInModifica =
    null;

const elencoObiettivi =
    document.querySelector(
        "#elenco-obiettivi"
    );

const aggiungiObiettivo =
    document.querySelector(
        "#aggiungi-obiettivo"
    );

const contenitoreModuloObiettivo =
    document.querySelector(
        "#contenitore-modulo-obiettivo"
    );

const moduloObiettivo =
    document.querySelector(
        "#modulo-obiettivo"
    );

const titoloModuloObiettivo =
    document.querySelector(
        "#titolo-modulo-obiettivo"
    );

const campoNomeObiettivo =
    document.querySelector(
        "#campo-nome-obiettivo"
    );

const campoRaggiuntoObiettivo =
    document.querySelector(
        "#campo-raggiunto-obiettivo"
    );

const campoTraguardoObiettivo =
    document.querySelector(
        "#campo-traguardo-obiettivo"
    );

const annullaObiettivo =
    document.querySelector(
        "#annulla-obiettivo"
    );

const pioggiaDenaro =
    document.querySelector(
        "#pioggia-denaro"
    );


function caricaObiettivi() {

    try {

        const contenuto =
            localStorage.getItem(
                chiaveObiettivi
            );

        if (!contenuto) {

            return [
                {
                    ...obiettivoCasaPredefinito
                }
            ];
        }

        const dati =
            JSON.parse(
                contenuto
            );

        if (!Array.isArray(dati)) {

            return [
                {
                    ...obiettivoCasaPredefinito
                }
            ];
        }

        const datiPuliti =
            dati.filter(
                (obiettivo) =>
                    obiettivo &&
                    typeof obiettivo ===
                        "object"
            );

        const casaEsistente =
            datiPuliti.find(
                (obiettivo) =>
                    obiettivo.id === "casa"
            );

        if (!casaEsistente) {

            datiPuliti.unshift(
                {
                    ...obiettivoCasaPredefinito
                }
            );
        }

        return datiPuliti;

    } catch (errore) {

        console.error(
            "Errore nella lettura degli obiettivi:",
            errore
        );

        return [
            {
                ...obiettivoCasaPredefinito
            }
        ];
    }
}


function salvaObiettivi() {

    try {

        localStorage.setItem(
            chiaveObiettivi,
            JSON.stringify(
                obiettivi
            )
        );

    } catch (errore) {

        console.error(
            "Errore nel salvataggio degli obiettivi:",
            errore
        );

        window.alert(
            "Non è stato possibile salvare gli obiettivi."
        );
    }
}


function calcolaPercentualeObiettivo(
    obiettivo
) {

    const raggiunto =
        Number(
            obiettivo.raggiunto
        );

    const traguardo =
        Number(
            obiettivo.traguardo
        );

    if (
        !Number.isFinite(raggiunto) ||
        !Number.isFinite(traguardo) ||
        traguardo <= 0
    ) {

        return 0;
    }

    return Math.min(
        100,
        Math.max(
            0,
            raggiunto /
            traguardo * 100
        )
    );
}


function aggiornaPaginaObiettivi() {

    if (!elencoObiettivi) {

        return;
    }

    elencoObiettivi.innerHTML =
        "";

    obiettivi.forEach(
        (obiettivo) => {

            const scheda =
                document.createElement(
                    "article"
                );

            scheda.className =
                "scheda-obiettivo";

            const testata =
                document.createElement(
                    "div"
                );

            testata.className =
                "testata-obiettivo";

            const nome =
                document.createElement(
                    "h2"
                );

            nome.className =
                "nome-obiettivo";

            nome.textContent =
                `${obiettivo.id === "casa" ? "🏠 " : ""}${obiettivo.nome}`;

            const azioni =
                document.createElement(
                    "div"
                );

            azioni.className =
                "azioni-obiettivo";

            const modifica =
                document.createElement(
                    "button"
                );

            modifica.type =
                "button";

            modifica.className =
                "pulsante-mini-obiettivo";

            modifica.textContent =
                "Modifica";

            modifica.addEventListener(
                "click",
                () => {

                    apriModuloObiettivo(
                        obiettivo.id
                    );
                }
            );

            azioni.appendChild(
                modifica
            );

            if (!obiettivo.fisso) {

                const elimina =
                    document.createElement(
                        "button"
                    );

                elimina.type =
                    "button";

                elimina.className =
                    "pulsante-mini-obiettivo";

                elimina.textContent =
                    "Elimina";

                elimina.addEventListener(
                    "click",
                    () => {

                        eliminaObiettivo(
                            obiettivo.id
                        );
                    }
                );

                azioni.appendChild(
                    elimina
                );
            }

            testata.append(
                nome,
                azioni
            );

            const percorso =
                document.createElement(
                    "div"
                );

            percorso.className =
                "percorso-obiettivo";

            const percentuale =
                calcolaPercentualeObiettivo(
                    obiettivo
                );

            percorso.style.setProperty(
                "--progresso",
                `${percentuale}%`
            );

            const pista =
                document.createElement(
                    "div"
                );

            pista.className =
                "pista-obiettivo";

            const baozzi =
                document.createElement(
                    "img"
                );

            baozzi.className =
                "baozzi-obiettivo";

            baozzi.src =
                "assets/baozzi-obiettivo.png";

            baozzi.alt =
                "Baozzi lungo il percorso dell’obiettivo";

            const bandierina =
                document.createElement(
                    "span"
                );

            bandierina.className =
                "bandierina-obiettivo";

            bandierina.textContent =
                "🏁";

            percorso.append(
                pista,
                baozzi,
                bandierina
            );

            const valori =
                document.createElement(
                    "div"
                );

            valori.className =
                "valori-obiettivo";

            const raggiunto =
                document.createElement(
                    "strong"
                );

            raggiunto.textContent =
                formattaEuro(
                    Number(
                        obiettivo.raggiunto
                    ) || 0
                );

            const traguardo =
                document.createElement(
                    "strong"
                );

            traguardo.textContent =
                Number(
                    obiettivo.traguardo
                ) > 0
                    ? formattaEuro(
                        Number(
                            obiettivo.traguardo
                        )
                    )
                    : "Imposta il traguardo";

            valori.append(
                raggiunto,
                traguardo
            );

            scheda.append(
                testata,
                percorso,
                valori
            );

            elencoObiettivi.appendChild(
                scheda
            );
        }
    );
}


function apriModuloObiettivo(
    id = null
) {

    if (
        !contenitoreModuloObiettivo ||
        !moduloObiettivo
    ) {

        return;
    }

    obiettivoInModifica =
        id;

    const obiettivo =
        id
            ? obiettivi.find(
                (voce) =>
                    voce.id === id
            )
            : null;

    titoloModuloObiettivo.textContent =
        obiettivo
            ? "Modifica obiettivo"
            : "Nuovo obiettivo";

    campoNomeObiettivo.value =
        obiettivo
            ? obiettivo.nome
            : "";

    campoRaggiuntoObiettivo.value =
        obiettivo
            ? obiettivo.raggiunto
            : "";

    campoTraguardoObiettivo.value =
        obiettivo &&
        Number(obiettivo.traguardo) > 0
            ? obiettivo.traguardo
            : "";

    contenitoreModuloObiettivo
        .classList.remove(
            "nascosto"
        );

    aggiungiObiettivo
        .classList.add(
            "nascosto"
        );

    window.setTimeout(
        () => {

            campoNomeObiettivo.focus();
        },
        100
    );
}


function chiudiModuloObiettivo() {

    if (!contenitoreModuloObiettivo) {

        return;
    }

    contenitoreModuloObiettivo
        .classList.add(
            "nascosto"
        );

    aggiungiObiettivo
        .classList.remove(
            "nascosto"
        );

    moduloObiettivo.reset();

    obiettivoInModifica =
        null;
}


function eliminaObiettivo(
    id
) {

    const obiettivo =
        obiettivi.find(
            (voce) =>
                voce.id === id
        );

    if (
        !obiettivo ||
        obiettivo.fisso
    ) {

        return;
    }

    const conferma =
        window.confirm(
            `Eliminare l’obiettivo “${obiettivo.nome}”?`
        );

    if (!conferma) {

        return;
    }

    obiettivi =
        obiettivi.filter(
            (voce) =>
                voce.id !== id
        );

    salvaObiettivi();

    aggiornaPaginaObiettivi();
}


function festeggiaObiettivo() {

    if (!pioggiaDenaro) {

        return;
    }

    pioggiaDenaro.innerHTML =
        "";

    const simboli =
        ["🪙", "🪙", "🪙", "💶"];

    const quantita =
        30;

    for (
        let indice = 0;
        indice < quantita;
        indice += 1
    ) {

        const elemento =
            document.createElement(
                "span"
            );

        elemento.className =
            "denaro-cadente";

        elemento.textContent =
            simboli[
                Math.floor(
                    Math.random() *
                    simboli.length
                )
            ];

        elemento.style.setProperty(
            "--x",
            `${Math.random() * 100}%`
        );

        elemento.style.setProperty(
            "--dimensione",
            `${22 + Math.random() * 22}px`
        );

        elemento.style.setProperty(
            "--durata",
            `${2.2 + Math.random() * 1.5}s`
        );

        elemento.style.setProperty(
            "--ritardo",
            `${Math.random() * .8}s`
        );

        elemento.style.setProperty(
            "--deriva",
            `${-55 + Math.random() * 110}px`
        );

        elemento.style.setProperty(
            "--rotazione",
            `${-240 + Math.random() * 480}deg`
        );

        pioggiaDenaro.appendChild(
            elemento
        );
    }

    window.setTimeout(
        () => {

            pioggiaDenaro.innerHTML =
                "";
        },
        4800
    );
}


if (aggiungiObiettivo) {

    aggiungiObiettivo.addEventListener(
        "click",
        () => {

            apriModuloObiettivo();
        }
    );
}


if (annullaObiettivo) {

    annullaObiettivo.addEventListener(
        "click",
        chiudiModuloObiettivo
    );
}


if (moduloObiettivo) {

    moduloObiettivo.addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();

            const nome =
                campoNomeObiettivo
                    .value
                    .trim();

            const raggiunto =
                Number(
                    campoRaggiuntoObiettivo
                        .value
                );

            const traguardo =
                Number(
                    campoTraguardoObiettivo
                        .value
                );

            if (
                !nome ||
                !Number.isFinite(raggiunto) ||
                raggiunto < 0 ||
                !Number.isFinite(traguardo) ||
                traguardo <= 0
            ) {

                return;
            }

            let deveFesteggiare =
                false;

            if (obiettivoInModifica) {

                const indice =
                    obiettivi.findIndex(
                        (voce) =>
                            voce.id ===
                            obiettivoInModifica
                    );

                if (indice === -1) {

                    return;
                }

                const precedente =
                    obiettivi[indice];

                const traguardoFesteggiato =
                    Number(
                        precedente
                            .traguardoFesteggiato
                    ) || 0;

                deveFesteggiare =
                    raggiunto >= traguardo &&
                    traguardoFesteggiato !==
                        traguardo;

                obiettivi[indice] = {
                    ...precedente,
                    nome,
                    raggiunto,
                    traguardo,
                    traguardoFesteggiato:
                        deveFesteggiare
                            ? traguardo
                            : traguardoFesteggiato
                };

            } else {

                deveFesteggiare =
                    raggiunto >= traguardo;

                obiettivi.push({
                    id: creaId(),
                    nome,
                    raggiunto,
                    traguardo,
                    fisso: false,
                    traguardoFesteggiato:
                        deveFesteggiare
                            ? traguardo
                            : 0
                });
            }

            salvaObiettivi();

            chiudiModuloObiettivo();

            aggiornaPaginaObiettivi();

            if (deveFesteggiare) {

                festeggiaObiettivo();
            }
        }
    );
}
/* ========================================
   PARTE 7 — DOCUMENTI
   ======================================== */

const chiaveArchivioDocumenti =
    "conti-baozzi-documenti-v1";

let archivioDocumenti =
    caricaElenco(
        chiaveArchivioDocumenti
    );

let documentoInModifica =
    null;


/* ========================================
   ELEMENTI DEL CAPITOLO
   ======================================== */

const documentiStatoVuoto =
    document.querySelector(
        "#documenti-stato-vuoto"
    );

const documentiElenco =
    document.querySelector(
        "#documenti-elenco"
    );

const documentiSchede =
    document.querySelector(
        "#documenti-schede"
    );


const documentiAggiungiPrimo =
    document.querySelector(
        "#documenti-aggiungi-primo"
    );

const documentiAggiungiAltro =
    document.querySelector(
        "#documenti-aggiungi-altro"
    );


const documentiContenitoreModulo =
    document.querySelector(
        "#documenti-contenitore-modulo"
    );

const documentiModulo =
    document.querySelector(
        "#documenti-modulo"
    );

const documentiTitoloModulo =
    document.querySelector(
        "#documenti-titolo-modulo"
    );


const documentiCampoTitolo =
    document.querySelector(
        "#documenti-campo-titolo"
    );

const documentiCampoCategoria =
    document.querySelector(
        "#documenti-campo-categoria"
    );

const documentiCampoData =
    document.querySelector(
        "#documenti-campo-data"
    );

const documentiCampoScadenza =
    document.querySelector(
        "#documenti-campo-scadenza"
    );

const documentiCampoLink =
    document.querySelector(
        "#documenti-campo-link"
    );

const documentiCampoNote =
    document.querySelector(
        "#documenti-campo-note"
    );

const documentiAnnulla =
    document.querySelector(
        "#documenti-annulla"
    );


/* ========================================
   VISUALIZZAZIONE DEI DOCUMENTI
   ======================================== */

function aggiornaPaginaDocumenti() {

    if (
        !documentiStatoVuoto ||
        !documentiElenco ||
        !documentiSchede
    ) {

        return;
    }


    chiudiModuloDocumenti();


    documentiSchede.innerHTML =
        "";


    if (
        archivioDocumenti.length === 0
    ) {

        documentiStatoVuoto
            .classList.remove(
                "nascosto"
            );

        documentiElenco
            .classList.add(
                "nascosto"
            );

        return;
    }


    documentiStatoVuoto
        .classList.add(
            "nascosto"
        );

    documentiElenco
        .classList.remove(
            "nascosto"
        );


    const documentiOrdinati =
        [...archivioDocumenti].sort(
            (primo, secondo) => {

                const confrontoCategoria =
                    primo.categoria.localeCompare(
                        secondo.categoria,
                        "it"
                    );


                if (
                    confrontoCategoria !== 0
                ) {

                    return confrontoCategoria;
                }


                return primo.titolo.localeCompare(
                    secondo.titolo,
                    "it"
                );
            }
        );


    documentiOrdinati.forEach(
        (documento) => {

            const scheda =
                creaSchedaDocumento(
                    documento
                );


            documentiSchede.appendChild(
                scheda
            );
        }
    );
}


/* ========================================
   CREAZIONE DI UNA SCHEDA
   ======================================== */

function creaSchedaDocumento(
    documento
) {

    const scheda =
        document.createElement(
            "article"
        );

    scheda.className =
        "scheda-documento";


    const testata =
        document.createElement(
            "div"
        );

    testata.className =
        "testata-documento";


    const intestazione =
        document.createElement(
            "div"
        );

    intestazione.className =
        "intestazione-documento";


    const titolo =
        document.createElement(
            "h2"
        );

    titolo.className =
        "titolo-documento";

    titolo.textContent =
        documento.titolo;


    const categoria =
        document.createElement(
            "span"
        );

    categoria.className =
        "categoria-documento";

    categoria.textContent =
        documento.categoria;


    intestazione.append(
        titolo,
        categoria
    );


    testata.appendChild(
        intestazione
    );


    const dettagli =
        document.createElement(
            "div"
        );

    dettagli.className =
        "dettagli-documento";


    if (documento.data) {

        const data =
            document.createElement(
                "span"
            );

        data.className =
            "data-documento";

        data.textContent =
            `Data: ${formattaData(
                documento.data
            )}`;


        dettagli.appendChild(
            data
        );
    }


    if (documento.scadenza) {

        const scadenza =
            document.createElement(
                "span"
            );

        scadenza.className =
            "scadenza-documento";

        scadenza.textContent =
            `Scadenza: ${formattaData(
                documento.scadenza
            )}`;


        dettagli.appendChild(
            scadenza
        );
    }


    if (documento.note) {

        const note =
            document.createElement(
                "span"
            );

        note.className =
            "note-documento";

        note.textContent =
            documento.note;


        dettagli.appendChild(
            note
        );
    }


    const azioni =
        document.createElement(
            "div"
        );

    azioni.className =
        "azioni-documento";


    const apri =
        document.createElement(
            "a"
        );

    apri.className =
        "pulsante-documento";

    apri.href =
        documento.link;

    apri.target =
        "_blank";

    apri.rel =
        "noopener noreferrer";

    apri.textContent =
        "Apri documento";


    const modifica =
        document.createElement(
            "button"
        );

    modifica.className =
        "pulsante-documento";

    modifica.type =
        "button";

    modifica.textContent =
        "Modifica";


    modifica.addEventListener(
        "click",
        () => {

            apriModuloDocumenti(
                documento.id
            );
        }
    );


    const elimina =
        document.createElement(
            "button"
        );

    elimina.className =
        "pulsante-documento";

    elimina.type =
        "button";

    elimina.textContent =
        "Elimina";


    elimina.addEventListener(
        "click",
        () => {

            eliminaDocumento(
                documento.id
            );
        }
    );


    azioni.append(
        apri,
        modifica,
        elimina
    );


    scheda.append(
        testata,
        dettagli,
        azioni
    );


    return scheda;
}


/* ========================================
   APERTURA DEL MODULO
   ======================================== */

function apriModuloDocumenti(
    id = null
) {

    if (
        !documentiContenitoreModulo ||
        !documentiModulo
    ) {

        return;
    }


    documentoInModifica =
        id;


    const documento =
        id
            ? archivioDocumenti.find(
                (voce) =>

                    voce.id === id
            )
            : null;


    documentiTitoloModulo.textContent =
        documento
            ? "Modifica documento"
            : "Nuovo documento";


    documentiModulo.reset();


    documentiCampoTitolo.value =
        documento
            ? documento.titolo
            : "";

    documentiCampoCategoria.value =
        documento
            ? documento.categoria
            : "";

    documentiCampoData.value =
        documento
            ? documento.data
            : "";

    documentiCampoScadenza.value =
        documento
            ? documento.scadenza
            : "";

    documentiCampoLink.value =
        documento
            ? documento.link
            : "";

    documentiCampoNote.value =
        documento
            ? documento.note
            : "";


    documentiStatoVuoto
        .classList.add(
            "nascosto"
        );

    documentiElenco
        .classList.add(
            "nascosto"
        );

    documentiContenitoreModulo
        .classList.remove(
            "nascosto"
        );


    window.setTimeout(
        () => {

            documentiCampoTitolo.focus();
        },
        120
    );
}


/* ========================================
   CHIUSURA DEL MODULO
   ======================================== */

function chiudiModuloDocumenti() {

    if (
        documentiContenitoreModulo
    ) {

        documentiContenitoreModulo
            .classList.add(
                "nascosto"
            );
    }


    documentoInModifica =
        null;
}


/* ========================================
   PULSANTI DEL MODULO
   ======================================== */

[
    documentiAggiungiPrimo,
    documentiAggiungiAltro
].forEach(
    (pulsante) => {

        if (pulsante) {

            pulsante.addEventListener(
                "click",
                () => {

                    apriModuloDocumenti();
                }
            );
        }
    }
);


if (documentiAnnulla) {

    documentiAnnulla.addEventListener(
        "click",
        aggiornaPaginaDocumenti
    );
}


/* ========================================
   SALVATAGGIO DEL DOCUMENTO
   ======================================== */

if (documentiModulo) {

    documentiModulo.addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();


            const titolo =
                documentiCampoTitolo
                    .value
                    .trim();

            const categoria =
                documentiCampoCategoria
                    .value;

            const data =
                documentiCampoData
                    .value;

            const scadenza =
                documentiCampoScadenza
                    .value;

            const linkScritto =
                documentiCampoLink
                    .value
                    .trim();

            const note =
                documentiCampoNote
                    .value
                    .trim();


            if (
                !titolo ||
                !categoria ||
                !linkScritto
            ) {

                window.alert(
                    "Inserisci titolo, categoria e link del documento."
                );

                return;
            }


            let linkValido =
                null;


            try {

                linkValido =
                    new URL(
                        linkScritto
                    );

            } catch (errore) {

                window.alert(
                    "Il collegamento inserito non è valido."
                );

                return;
            }


            if (
                ![
                    "http:",
                    "https:"
                ].includes(
                    linkValido.protocol
                )
            ) {

                window.alert(
                    "Il collegamento deve iniziare con http o https."
                );

                return;
            }


            const datiDocumento = {

                titolo:
                    titolo,

                categoria:
                    categoria,

                data:
                    data,

                scadenza:
                    scadenza,

                link:
                    linkValido.href,

                note:
                    note
            };


            if (documentoInModifica) {

                const indice =
                    archivioDocumenti
                        .findIndex(
                            (documento) =>

                                documento.id ===
                                documentoInModifica
                        );


                if (indice === -1) {

                    return;
                }


                archivioDocumenti[
                    indice
                ] = {

                    ...archivioDocumenti[
                        indice
                    ],

                    ...datiDocumento
                };

            } else {

                archivioDocumenti.push({

                    id:
                        creaId(),

                    ...datiDocumento
                });
            }


            salvaArchivio(
                chiaveArchivioDocumenti,
                archivioDocumenti
            );


            aggiornaPaginaDocumenti();
        }
    );
}


/* ========================================
   ELIMINAZIONE DEL DOCUMENTO
   ======================================== */

function eliminaDocumento(
    id
) {

    const documento =
        archivioDocumenti.find(
            (voce) =>

                voce.id === id
        );


    if (!documento) {

        return;
    }


    const conferma =
        window.confirm(
            `Eliminare “${documento.titolo}”?`
        );


    if (!conferma) {

        return;
    }


    archivioDocumenti =
        archivioDocumenti.filter(
            (voce) =>

                voce.id !== id
        );


    salvaArchivio(
        chiaveArchivioDocumenti,
        archivioDocumenti
    );


    aggiornaPaginaDocumenti();
}
/* ========================================
   PARTE 8 — ABBONAMENTI
   ======================================== */

const chiaveArchivioAbbonamenti =
    "conti-baozzi-abbonamenti-v1";

let archivioAbbonamenti =
    caricaElenco(
        chiaveArchivioAbbonamenti
    );

let abbonamentoInModifica =
    null;


/* ========================================
   ELEMENTI DEL CAPITOLO
   ======================================== */

const abbonamentiStatoVuoto =
    document.querySelector(
        "#abbonamenti-stato-vuoto"
    );

const abbonamentiElenco =
    document.querySelector(
        "#abbonamenti-elenco"
    );

const abbonamentiSchede =
    document.querySelector(
        "#abbonamenti-schede"
    );


const abbonamentiAggiungiPrimo =
    document.querySelector(
        "#abbonamenti-aggiungi-primo"
    );

const abbonamentiAggiungiAltro =
    document.querySelector(
        "#abbonamenti-aggiungi-altro"
    );


const abbonamentiContenitoreModulo =
    document.querySelector(
        "#abbonamenti-contenitore-modulo"
    );

const abbonamentiModulo =
    document.querySelector(
        "#abbonamenti-modulo"
    );

const abbonamentiTitoloModulo =
    document.querySelector(
        "#abbonamenti-titolo-modulo"
    );


const abbonamentiCampoNome =
    document.querySelector(
        "#abbonamenti-campo-nome"
    );

const abbonamentiCampoCosto =
    document.querySelector(
        "#abbonamenti-campo-costo"
    );

const abbonamentiFrequenzaMensile =
    document.querySelector(
        "#abbonamenti-frequenza-mensile"
    );

const abbonamentiFrequenzaAnnuale =
    document.querySelector(
        "#abbonamenti-frequenza-annuale"
    );

const abbonamentiCampoGiorno =
    document.querySelector(
        "#abbonamenti-campo-giorno"
    );

const abbonamentiLabelMese =
    document.querySelector(
        "#abbonamenti-label-mese"
    );

const abbonamentiCampoMese =
    document.querySelector(
        "#abbonamenti-campo-mese"
    );

const abbonamentiAnnulla =
    document.querySelector(
        "#abbonamenti-annulla"
    );


const abbonamentiTotaleMensile =
    document.querySelector(
        "#abbonamenti-totale-mensile"
    );

const abbonamentiTotaleAnnuale =
    document.querySelector(
        "#abbonamenti-totale-annuale"
    );


/* ========================================
   NOMI DEI MESI
   ======================================== */

const mesiAbbonamenti = [
    "",
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre"
];


/* ========================================
   VISUALIZZAZIONE DELLA PAGINA
   ======================================== */

function aggiornaPaginaAbbonamenti() {

    if (
        !abbonamentiStatoVuoto ||
        !abbonamentiElenco ||
        !abbonamentiSchede
    ) {

        return;
    }


    chiudiModuloAbbonamenti();


    abbonamentiSchede.innerHTML =
        "";


    if (
        archivioAbbonamenti.length === 0
    ) {

        abbonamentiStatoVuoto
            .classList.remove(
                "nascosto"
            );

        abbonamentiElenco
            .classList.add(
                "nascosto"
            );

        aggiornaTotaliAbbonamenti();

        return;
    }


    abbonamentiStatoVuoto
        .classList.add(
            "nascosto"
        );

    abbonamentiElenco
        .classList.remove(
            "nascosto"
        );


    const abbonamentiOrdinati =
        [...archivioAbbonamenti].sort(
            (primo, secondo) =>

                primo.nome.localeCompare(
                    secondo.nome,
                    "it"
                )
        );


    abbonamentiOrdinati.forEach(
        (abbonamento) => {

            const scheda =
                creaSchedaAbbonamento(
                    abbonamento
                );


            abbonamentiSchede.appendChild(
                scheda
            );
        }
    );


    aggiornaTotaliAbbonamenti();
}


/* ========================================
   CREAZIONE DI UNA SCHEDA
   ======================================== */

function creaSchedaAbbonamento(
    abbonamento
) {

    const scheda =
        document.createElement(
            "article"
        );

    scheda.className =
        "scheda-abbonamento";


    const titolo =
        document.createElement(
            "h2"
        );

    titolo.className =
        "titolo-abbonamento";

    titolo.textContent =
        abbonamento.nome;


    const costo =
        document.createElement(
            "strong"
        );

    costo.className =
        "costo-abbonamento";

    costo.textContent =
        abbonamento.frequenza ===
            "annuale"
            ? `${formattaEuro(
                abbonamento.costo
            )} / anno`
            : `${formattaEuro(
                abbonamento.costo
            )} / mese`;


    const rinnovo =
        document.createElement(
            "div"
        );

    rinnovo.className =
        "rinnovo-abbonamento";


    const etichettaRinnovo =
        document.createElement(
            "span"
        );

    etichettaRinnovo.textContent =
        "Rinnovo";


    const valoreRinnovo =
        document.createElement(
            "strong"
        );


    if (
        abbonamento.frequenza ===
        "annuale"
    ) {

        const mese =
            mesiAbbonamenti[
                Number(
                    abbonamento.mese
                )
            ] || "";


        valoreRinnovo.textContent =
            `${abbonamento.giorno} ${mese}`;

    } else {

        valoreRinnovo.textContent =
            `${abbonamento.giorno} di ogni mese`;
    }


    rinnovo.append(
        etichettaRinnovo,
        valoreRinnovo
    );


    const azioni =
        document.createElement(
            "div"
        );

    azioni.className =
        "azioni-abbonamento";


    const modifica =
        document.createElement(
            "button"
        );

    modifica.className =
        "pulsante-abbonamento";

    modifica.type =
        "button";

    modifica.textContent =
        "Modifica";


    modifica.addEventListener(
        "click",
        () => {

            apriModuloAbbonamenti(
                abbonamento.id
            );
        }
    );


    const elimina =
        document.createElement(
            "button"
        );

    elimina.className =
        "pulsante-abbonamento";

    elimina.type =
        "button";

    elimina.textContent =
        "Elimina";


    elimina.addEventListener(
        "click",
        () => {

            eliminaAbbonamento(
                abbonamento.id
            );
        }
    );


    azioni.append(
        modifica,
        elimina
    );


    scheda.append(
        titolo,
        costo,
        rinnovo,
        azioni
    );


    return scheda;
}


/* ========================================
   TOTALE MENSILE E ANNUALE
   ======================================== */

function aggiornaTotaliAbbonamenti() {

    let totaleMensile =
        0;

    let totaleAnnuale =
        0;


    archivioAbbonamenti.forEach(
        (abbonamento) => {

            const costo =
                Number(
                    abbonamento.costo
                );


            if (
                !Number.isFinite(costo)
            ) {

                return;
            }


            if (
                abbonamento.frequenza ===
                "annuale"
            ) {

                totaleAnnuale +=
                    costo;

            } else {

                totaleMensile +=
                    costo;

                totaleAnnuale +=
                    costo * 12;
            }
        }
    );


    if (abbonamentiTotaleMensile) {

        abbonamentiTotaleMensile
            .textContent =
            formattaEuro(
                totaleMensile
            );
    }


    if (abbonamentiTotaleAnnuale) {

        abbonamentiTotaleAnnuale
            .textContent =
            formattaEuro(
                totaleAnnuale
            );
    }
}


/* ========================================
   MESE VISIBILE SOLO PER GLI ANNUALI
   ======================================== */

function aggiornaCampoMeseAbbonamento() {

    if (
        !abbonamentiLabelMese ||
        !abbonamentiCampoMese ||
        !abbonamentiFrequenzaAnnuale
    ) {

        return;
    }


    const annuale =
        abbonamentiFrequenzaAnnuale
            .checked;


    abbonamentiLabelMese
        .classList.toggle(
            "nascosto",
            !annuale
        );


    abbonamentiCampoMese.required =
        annuale;


    if (!annuale) {

        abbonamentiCampoMese.value =
            "";
    }
}


/* ========================================
   APERTURA DEL MODULO
   ======================================== */

function apriModuloAbbonamenti(
    id = null
) {

    if (
        !abbonamentiContenitoreModulo ||
        !abbonamentiModulo
    ) {

        return;
    }


    abbonamentoInModifica =
        id;


    const abbonamento =
        id
            ? archivioAbbonamenti.find(
                (voce) =>

                    voce.id === id
            )
            : null;


    abbonamentiModulo.reset();


    abbonamentiTitoloModulo.textContent =
        abbonamento
            ? "Modifica abbonamento"
            : "Nuovo abbonamento";


    abbonamentiCampoNome.value =
        abbonamento
            ? abbonamento.nome
            : "";

    abbonamentiCampoCosto.value =
        abbonamento
            ? abbonamento.costo
            : "";

    abbonamentiCampoGiorno.value =
        abbonamento
            ? abbonamento.giorno
            : "";

    abbonamentiCampoMese.value =
        abbonamento
            ? abbonamento.mese || ""
            : "";


    if (
        abbonamento &&
        abbonamento.frequenza ===
            "annuale"
    ) {

        abbonamentiFrequenzaAnnuale
            .checked =
            true;

    } else {

        abbonamentiFrequenzaMensile
            .checked =
            true;
    }


    aggiornaCampoMeseAbbonamento();


    abbonamentiStatoVuoto
        .classList.add(
            "nascosto"
        );

    abbonamentiElenco
        .classList.add(
            "nascosto"
        );

    abbonamentiContenitoreModulo
        .classList.remove(
            "nascosto"
        );


    window.setTimeout(
        () => {

            abbonamentiCampoNome.focus();
        },
        120
    );
}


/* ========================================
   CHIUSURA DEL MODULO
   ======================================== */

function chiudiModuloAbbonamenti() {

    if (
        abbonamentiContenitoreModulo
    ) {

        abbonamentiContenitoreModulo
            .classList.add(
                "nascosto"
            );
    }


    abbonamentoInModifica =
        null;
}


/* ========================================
   PULSANTI
   ======================================== */

[
    abbonamentiAggiungiPrimo,
    abbonamentiAggiungiAltro
].forEach(
    (pulsante) => {

        if (pulsante) {

            pulsante.addEventListener(
                "click",
                () => {

                    apriModuloAbbonamenti();
                }
            );
        }
    }
);


if (abbonamentiAnnulla) {

    abbonamentiAnnulla.addEventListener(
        "click",
        aggiornaPaginaAbbonamenti
    );
}


if (abbonamentiFrequenzaMensile) {

    abbonamentiFrequenzaMensile
        .addEventListener(
            "change",
            aggiornaCampoMeseAbbonamento
        );
}


if (abbonamentiFrequenzaAnnuale) {

    abbonamentiFrequenzaAnnuale
        .addEventListener(
            "change",
            aggiornaCampoMeseAbbonamento
        );
}


/* ========================================
   SALVATAGGIO
   ======================================== */

if (abbonamentiModulo) {

    abbonamentiModulo.addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();


            const nome =
                abbonamentiCampoNome
                    .value
                    .trim();

            const costo =
                Number(
                    abbonamentiCampoCosto
                        .value
                );

            const frequenza =
                abbonamentiFrequenzaAnnuale
                    .checked
                    ? "annuale"
                    : "mensile";

            const giorno =
                Number(
                    abbonamentiCampoGiorno
                        .value
                );

            const mese =
                frequenza === "annuale"
                    ? Number(
                        abbonamentiCampoMese
                            .value
                    )
                    : null;


            if (
                !nome ||
                !Number.isFinite(costo) ||
                costo <= 0 ||
                !Number.isInteger(giorno) ||
                giorno < 1 ||
                giorno > 31
            ) {

                window.alert(
                    "Inserisci nome, costo e giorno del rinnovo."
                );

                return;
            }


            if (
                frequenza === "annuale" &&
                (
                    !Number.isInteger(mese) ||
                    mese < 1 ||
                    mese > 12
                )
            ) {

                window.alert(
                    "Scegli il mese del rinnovo."
                );

                return;
            }


            const datiAbbonamento = {

                nome:
                    nome,

                costo:
                    costo,

                frequenza:
                    frequenza,

                giorno:
                    giorno,

                mese:
                    mese
            };


            if (abbonamentoInModifica) {

                const indice =
                    archivioAbbonamenti
                        .findIndex(
                            (abbonamento) =>

                                abbonamento.id ===
                                abbonamentoInModifica
                        );


                if (indice === -1) {

                    return;
                }


                archivioAbbonamenti[
                    indice
                ] = {

                    ...archivioAbbonamenti[
                        indice
                    ],

                    ...datiAbbonamento
                };

            } else {

                archivioAbbonamenti.push({

                    id:
                        creaId(),

                    ...datiAbbonamento
                });
            }


            salvaArchivio(
                chiaveArchivioAbbonamenti,
                archivioAbbonamenti
            );


            aggiornaPaginaAbbonamenti();
        }
    );
}


/* ========================================
   ELIMINAZIONE
   ======================================== */

function eliminaAbbonamento(
    id
) {

    const abbonamento =
        archivioAbbonamenti.find(
            (voce) =>

                voce.id === id
        );


    if (!abbonamento) {

        return;
    }


    const conferma =
        window.confirm(
            `Eliminare “${abbonamento.nome}”?`
        );


    if (!conferma) {

        return;
    }


    archivioAbbonamenti =
        archivioAbbonamenti.filter(
            (voce) =>

                voce.id !== id
        );


    salvaArchivio(
        chiaveArchivioAbbonamenti,
        archivioAbbonamenti
    );


    aggiornaPaginaAbbonamenti();
}
/* ========================================
   PARTE 9 — RIEPILOGO ANNUALE
   ======================================== */

const chiaveNoteAnnuali =
    "conti-baozzi-note-annuali-v1";

let noteAnnuali =
    caricaNoteAnnuali();


/* ========================================
   ELEMENTI DEL CAPITOLO
   ======================================== */

const riepilogoAnno =
    document.querySelector(
        "#riepilogo-anno"
    );

const riepilogoEntrate =
    document.querySelector(
        "#riepilogo-entrate"
    );

const riepilogoSpese =
    document.querySelector(
        "#riepilogo-spese"
    );

const riepilogoRisparmio =
    document.querySelector(
        "#riepilogo-risparmio"
    );

const riepilogoObiettivi =
    document.querySelector(
        "#riepilogo-obiettivi"
    );

const riepilogoAbbonamenti =
    document.querySelector(
        "#riepilogo-abbonamenti"
    );

const riepilogoDocumenti =
    document.querySelector(
        "#riepilogo-documenti"
    );

const riepilogoNota =
    document.querySelector(
        "#riepilogo-nota"
    );

const salvaRiepilogoAnnuale =
    document.querySelector(
        "#salva-riepilogo-annuale"
    );


/* ========================================
   ANNO VISUALIZZATO
   ======================================== */

function annoRiepilogoCorrente() {

    return new Date()
        .getFullYear();
}


/* ========================================
   CARICAMENTO DELLE NOTE ANNUALI
   ======================================== */

function caricaNoteAnnuali() {

    try {

        const contenuto =
            localStorage.getItem(
                chiaveNoteAnnuali
            );


        if (!contenuto) {

            return {};
        }


        const dati =
            JSON.parse(
                contenuto
            );


        if (
            !dati ||
            typeof dati !== "object" ||
            Array.isArray(dati)
        ) {

            return {};
        }


        return dati;

    } catch (errore) {

        console.warn(
            "Impossibile caricare le note annuali.",
            errore
        );


        return {};
    }
}


/* ========================================
   SALVATAGGIO DELLE NOTE ANNUALI
   ======================================== */

function salvaNoteAnnuali() {

    try {

        localStorage.setItem(
            chiaveNoteAnnuali,
            JSON.stringify(
                noteAnnuali
            )
        );

    } catch (errore) {

        console.error(
            "Impossibile salvare la nota annuale.",
            errore
        );


        window.alert(
            "Non è stato possibile salvare la nota."
        );
    }
}


/* ========================================
   CONTROLLO DELL’ANNO DI UNA REGISTRAZIONE
   ======================================== */

function appartieneAllAnno(
    registrazione,
    anno
) {

    if (
        !registrazione ||
        !registrazione.data
    ) {

        return false;
    }


    return String(
        registrazione.data
    ).startsWith(
        `${anno}-`
    );
}


/* ========================================
   TOTALE ANNUALE DI UN ARCHIVIO
   CON CATEGORIE
   ======================================== */

function totaleAnnualeArchivio(
    archivio,
    anno
) {

    if (
        !archivio ||
        typeof archivio !== "object"
    ) {

        return 0;
    }


    return Object.values(
        archivio
    ).reduce(
        (
            totaleArchivio,
            registrazioni
        ) => {

            if (
                !Array.isArray(
                    registrazioni
                )
            ) {

                return totaleArchivio;
            }


            const totaleCategoria =
                registrazioni.reduce(
                    (
                        totale,
                        registrazione
                    ) => {

                        if (
                            !appartieneAllAnno(
                                registrazione,
                                anno
                            )
                        ) {

                            return totale;
                        }


                        const importo =
                            Number(
                                registrazione.importo
                            );


                        return Number.isFinite(
                            importo
                        )
                            ? totale + importo
                            : totale;
                    },
                    0
                );


            return (
                totaleArchivio +
                totaleCategoria
            );
        },
        0
    );
}


/* ========================================
   TOTALE ANNUALE DI UN ELENCO
   ======================================== */

function totaleAnnualeElenco(
    elenco,
    anno
) {

    if (!Array.isArray(elenco)) {

        return 0;
    }


    return elenco.reduce(
        (
            totale,
            registrazione
        ) => {

            if (
                !appartieneAllAnno(
                    registrazione,
                    anno
                )
            ) {

                return totale;
            }


            const importo =
                Number(
                    registrazione.importo
                );


            return Number.isFinite(
                importo
            )
                ? totale + importo
                : totale;
        },
        0
    );
}


/* ========================================
   CONTEGGIO DEGLI OBIETTIVI RAGGIUNTI
   ======================================== */

function contaObiettiviRaggiunti() {

    if (
        typeof obiettivi === "undefined" ||
        !Array.isArray(obiettivi)
    ) {

        return 0;
    }


    return obiettivi.filter(
        (obiettivo) => {

            const raggiunto =
                Number(
                    obiettivo.raggiunto
                );

            const traguardo =
                Number(
                    obiettivo.traguardo
                );


            return (
                Number.isFinite(raggiunto) &&
                Number.isFinite(traguardo) &&
                traguardo > 0 &&
                raggiunto >= traguardo
            );
        }
    ).length;
}


/* ========================================
   AGGIORNAMENTO DEL RIEPILOGO
   ======================================== */

function aggiornaRiepilogoAnnuale() {

    if (!riepilogoAnno) {

        return;
    }


    const anno =
        annoRiepilogoCorrente();


    /*
       Entrate dell’anno.
    */

    const totaleEntrate =
        typeof archivioEntrate !==
            "undefined"
            ? totaleAnnualeArchivio(
                archivioEntrate,
                anno
            )
            : 0;


    /*
       Le spese comprendono:

       - La nostra casa
       - Spese quotidiane
       - Desideri e coccole

       Gli abbonamenti non vengono sommati qui,
       perché non possiedono una data di pagamento
       effettivamente registrata.
    */

    const speseCasa =
        typeof archivioCasa !==
            "undefined"
            ? totaleAnnualeArchivio(
                archivioCasa,
                anno
            )
            : 0;


    const speseQuotidiane =
        typeof archivioSpese !==
            "undefined"
            ? totaleAnnualeArchivio(
                archivioSpese,
                anno
            )
            : 0;


    const speseDesideri =
        typeof archivioDesideri !==
            "undefined"
            ? totaleAnnualeElenco(
                archivioDesideri,
                anno
            )
            : 0;


    const totaleSpese =
        speseCasa +
        speseQuotidiane +
        speseDesideri;


    const risparmio =
        totaleEntrate -
        totaleSpese;


    const numeroObiettivi =
        contaObiettiviRaggiunti();


    const numeroAbbonamenti =
        typeof archivioAbbonamenti !==
            "undefined" &&
        Array.isArray(
            archivioAbbonamenti
        )
            ? archivioAbbonamenti.length
            : 0;


    const numeroDocumenti =
        typeof archivioDocumenti !==
            "undefined" &&
        Array.isArray(
            archivioDocumenti
        )
            ? archivioDocumenti.length
            : 0;


    riepilogoAnno.textContent =
        String(anno);


    riepilogoEntrate.textContent =
        formattaEuro(
            totaleEntrate
        );


    riepilogoSpese.textContent =
        formattaEuro(
            totaleSpese
        );


    riepilogoRisparmio.textContent =
        formattaEuro(
            risparmio
        );


    riepilogoObiettivi.textContent =
        String(
            numeroObiettivi
        );


    riepilogoAbbonamenti.textContent =
        String(
            numeroAbbonamenti
        );


    riepilogoDocumenti.textContent =
        String(
            numeroDocumenti
        );


    if (riepilogoNota) {

        riepilogoNota.value =
            noteAnnuali[anno] || "";
    }
}


/* ========================================
   SALVATAGGIO DELLA NOTA
   ======================================== */

if (
    salvaRiepilogoAnnuale &&
    riepilogoNota
) {

    salvaRiepilogoAnnuale
        .addEventListener(
            "click",
            () => {

                const anno =
                    annoRiepilogoCorrente();


                noteAnnuali[anno] =
                    riepilogoNota
                        .value
                        .trim();


                salvaNoteAnnuali();


                const testoOriginale =
                    salvaRiepilogoAnnuale
                        .textContent;


                salvaRiepilogoAnnuale
                    .textContent =
                    "Salvato";


                window.setTimeout(
                    () => {

                        salvaRiepilogoAnnuale
                            .textContent =
                            testoOriginale;
                    },
                    1200
                );
            }
        );
}
/* ========================================
   AVVIO DELL’APPLICAZIONE
   ======================================== */

aggiornaRiepilogoCasa();

aggiornaRiepilogoEntrate();

aggiornaRiepilogoSpese();

aggiornaPaginaDesideri();

aggiornaPaginaObiettivi();

aggiornaPaginaDocumenti();

aggiornaPaginaAbbonamenti();

aggiornaRiepilogoAnnuale();


aggiornaRiepilogoDesideri();

aggiornaPaginaObiettivi();


/* ========================================
   FINE DEL FILE
   ======================================== */
