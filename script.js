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
