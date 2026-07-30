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
   AVVIO DELL’APPLICAZIONE
   ======================================== */

aggiornaRiepilogoCasa();

aggiornaRiepilogoEntrate();

aggiornaRiepilogoSpese();

aggiornaPaginaDesideri();

aggiornaRiepilogoDesideri();


/* ========================================
   FINE DEL FILE
   ======================================== */
