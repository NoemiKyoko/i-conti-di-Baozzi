/* ========================================
   CONFIGURAZIONE DELLA CASA
   ======================================== */

const categorieCasa = {
    luce: {
        nome: "Luce",
        icona: "💡",
        gruppo: "ricorrente",
        messaggio:
            "Non hai ancora registrato nessuna bolletta della luce."
    },

    acqua: {
        nome: "Acqua",
        icona: "💧",
        gruppo: "ricorrente",
        messaggio:
            "Non hai ancora registrato nessuna bolletta dell’acqua."
    },

    gas: {
        nome: "Gas",
        icona: "🔥",
        gruppo: "ricorrente",
        messaggio:
            "Non hai ancora registrato nessuna bolletta del gas."
    },

    internet: {
        nome: "Internet",
        icona: "📶",
        gruppo: "ricorrente",
        messaggio:
            "Non hai ancora registrato nessuna spesa per Internet."
    },

    condominio: {
        nome: "Condominio",
        icona: "🏢",
        gruppo: "ricorrente",
        messaggio:
            "Non hai ancora registrato nessuna spesa condominiale."
    },

    manutenzione: {
        nome: "Manutenzione",
        icona: "🛠️",
        gruppo: "straordinaria",
        messaggio:
            "Non hai ancora registrato nessun intervento di manutenzione."
    },

    altro: {
        nome: "Acquisti per la casa",
        icona: "🪴",
        gruppo: "straordinaria",
        messaggio:
            "Non hai ancora registrato altre spese per la casa."
    }
};


/* ========================================
   CONFIGURAZIONE DELLE ENTRATE
   ======================================== */

const categorieEntrate = {
    stipendio: {
        nome: "Stipendio",
        icona: "💼",

        descrizioneObbligatoria: false,
        descrizionePredefinita: "Stipendio",

        messaggio:
            "Non hai ancora registrato nessuno stipendio."
    },

    extra: {
        nome: "Entrate extra",
        icona: "🎁",

        descrizioneObbligatoria: true,
        descrizionePredefinita: "",

        messaggio:
            "Non hai ancora registrato nessuna entrata extra."
    }
};


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
   MOTORE DEL LIBRO
   ======================================== */

const pagine =
    document.querySelectorAll(".pagina");

const pulsantiNavigazione =
    document.querySelectorAll("[data-vai]");

let statoIngresso = "scaffale";
let paginaCorrente = null;


/* ========================================
   FUNZIONI GENERALI
   ======================================== */

function formattaEuro(importo) {
    return new Intl.NumberFormat(
        "it-IT",
        {
            style: "currency",
            currency: "EUR"
        }
    ).format(importo);
}


function formattaData(dataISO) {
    if (!dataISO) {
        return "";
    }

    const data =
        new Date(`${dataISO}T12:00:00`);

    return new Intl.DateTimeFormat(
        "it-IT"
    ).format(data);
}


function dataOggi() {
    const oggi =
        new Date();

    const anno =
        oggi.getFullYear();

    const mese =
        String(
            oggi.getMonth() + 1
        ).padStart(2, "0");

    const giorno =
        String(
            oggi.getDate()
        ).padStart(2, "0");

    return `${anno}-${mese}-${giorno}`;
}


function creaId() {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
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


function creaArchivioVuoto(configurazione) {
    const archivio = {};

    Object.keys(configurazione)
        .forEach((categoria) => {
            archivio[categoria] = [];
        });

    return archivio;
}


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
            JSON.parse(contenuto);

        Object.keys(archivioVuoto)
            .forEach((categoria) => {
                if (
                    !Array.isArray(
                        dati[categoria]
                    )
                ) {
                    dati[categoria] = [];
                }
            });

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


function salvaArchivio(
    chiave,
    archivio
) {
    try {
        localStorage.setItem(
            chiave,
            JSON.stringify(archivio)
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
   NAVIGAZIONE DEL LIBRO
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
}


/* ========================================
   INGRESSO NEL LIBRO
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

        statoIngresso = "libro";

        document.body.classList.add(
            "libro-davanti"
        );
    }
);


libro.addEventListener(
    "click",
    () => {
        if (
            statoIngresso !==
            "libro"
        ) {
            return;
        }

        statoIngresso = "dedica";

        document.body.classList.add(
            "dedica-visibile"
        );

        schermataDedica.setAttribute(
            "aria-hidden",
            "false"
        );
    }
);


bottoneGiraDedica.addEventListener(
    "click",
    () => {
        if (
            statoIngresso !==
            "dedica"
        ) {
            return;
        }

        statoIngresso = "giro";

        document.body.classList.add(
            "dedica-in-giro"
        );

        window.setTimeout(
            () => {
                statoIngresso =
                    "interno";

                document.body
                    .classList.add(
                        "libro-interno-visibile"
                    );

                schermataDedica
                    .setAttribute(
                        "aria-hidden",
                        "true"
                    );

                libroInterno
                    .setAttribute(
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
   CREAZIONE DELLE RIGHE
   ======================================== */

function creaRigaTabella(
    registrazione,
    funzioneElimina
) {
    const riga =
        document.createElement("tr");

    const cellaData =
        document.createElement("td");

    const cellaDescrizione =
        document.createElement("td");

    const cellaImporto =
        document.createElement("td");

    const cellaAzioni =
        document.createElement("td");


    cellaData.textContent =
        formattaData(
            registrazione.data
        );


    const descrizione =
        document.createElement("span");

    descrizione.textContent =
        registrazione.descrizione;

    cellaDescrizione.appendChild(
        descrizione
    );


    if (registrazione.nota) {
        const nota =
            document.createElement("small");

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
        document.createElement("button");

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
   CAPITOLO I — LA NOSTRA CASA
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


/* Elementi Casa */

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


/* Apertura categorie Casa */

pulsantiCategorieCasa.forEach(
    (pulsante) => {
        pulsante.addEventListener(
            "click",
            () => {
                apriCategoriaCasa(
                    pulsante.dataset
                        .categoriaCasa
                );
            }
        );
    }
);


function apriCategoriaCasa(categoria) {
    const configurazione =
        categorieCasa[categoria];

    if (!configurazione) {
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


/* Visualizzazione Casa */

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
        casaStatoVuoto
            .classList.remove(
                "nascosto"
            );

        casaElencoRegistrazioni
            .classList.add(
                "nascosto"
            );

        return;
    }

    casaStatoVuoto
        .classList.add(
            "nascosto"
        );

    casaElencoRegistrazioni
        .classList.remove(
            "nascosto"
        );

    const ordinate =
        [...registrazioni]
            .sort(
                (prima, seconda) =>
                    seconda.data.localeCompare(
                        prima.data
                    )
            );

    ordinate.forEach(
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
                .appendChild(riga);
        }
    );
}


/* Modulo Casa */

function apriModuloCasa() {
    if (!categoriaCasaCorrente) {
        return;
    }

    casaStatoVuoto
        .classList.add(
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
    aggiornaPaginaCasa
);


/* Salvataggio Casa */

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

        archivioCasa[
            categoriaCasaCorrente
        ].push({
            id: creaId(),
            data,
            descrizione,
            importo,
            nota
        });

        salvaArchivio(
            chiaveArchivioCasa,
            archivioCasa
        );

        aggiornaPaginaCasa();
        aggiornaRiepilogoCasa();
    }
);


/* Eliminazione Casa */

function eliminaRegistrazioneCasa(id) {
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


/* Riepilogo Casa */

function totaleCategoriaCasa(categoria) {
    return archivioCasa[categoria]
        .reduce(
            (totale, registrazione) =>
                totale +
                Number(
                    registrazione.importo
                ),
            0
        );
}


function aggiornaRiepilogoCasa() {
    let totaleRicorrenti = 0;
    let totaleStraordinarie = 0;

    Object.entries(
        categorieCasa
    ).forEach(
        ([
            chiave,
            configurazione
        ]) => {
            const totale =
                totaleCategoriaCasa(
                    chiave
                );

            const elemento =
                document.querySelector(
                    `#totale-${chiave}`
                );

            if (elemento) {
                elemento.textContent =
                    formattaEuro(
                        totale
                    );
            }

            if (
                configurazione.gruppo ===
                "ricorrente"
            ) {
                totaleRicorrenti +=
                    totale;

            } else {
                totaleStraordinarie +=
                    totale;
            }
        }
    );

    document.querySelector(
        "#totale-casa-ricorrenti"
    ).textContent =
        formattaEuro(
            totaleRicorrenti
        );

    document.querySelector(
        "#totale-casa-straordinarie"
    ).textContent =
        formattaEuro(
            totaleStraordinarie
        );

    document.querySelector(
        "#totale-casa"
    ).textContent =
        formattaEuro(
            totaleRicorrenti +
            totaleStraordinarie
        );
}


/* ========================================
   CAPITOLO II — ENTRATE
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


/* Elementi Entrate */

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


/* Apertura categorie Entrate */

pulsantiCategorieEntrate.forEach(
    (pulsante) => {
        pulsante.addEventListener(
            "click",
            () => {
                apriCategoriaEntrate(
                    pulsante.dataset
                        .categoriaEntrate
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


/* Visualizzazione Entrate */

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

    entrateStatoVuoto
        .classList.add(
            "nascosto"
        );

    entrateElencoRegistrazioni
        .classList.remove(
            "nascosto"
        );

    const ordinate =
        [...registrazioni]
            .sort(
                (prima, seconda) =>
                    seconda.data.localeCompare(
                        prima.data
                    )
            );

    ordinate.forEach(
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
                .appendChild(riga);
        }
    );
}


/* Modulo Entrate */

function apriModuloEntrate() {
    if (!categoriaEntrateCorrente) {
        return;
    }

    const configurazione =
        categorieEntrate[
            categoriaEntrateCorrente
        ];

    entrateStatoVuoto
        .classList.add(
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
        aggiornaPaginaEntrate
    );


/* Salvataggio Entrate */

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
                    entrateCampoImporto
                        .value
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

            archivioEntrate[
                categoriaEntrateCorrente
            ].push({
                id: creaId(),
                data,
                descrizione,
                importo,
                nota
            });

            salvaArchivio(
                chiaveArchivioEntrate,
                archivioEntrate
            );

            aggiornaPaginaEntrate();
            aggiornaRiepilogoEntrate();
        }
    );


/* Eliminazione Entrate */

function eliminaRegistrazioneEntrate(
    id
) {
    if (
        !categoriaEntrateCorrente
    ) {
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


/* Riepilogo Entrate */

function totaleCategoriaEntrate(
    categoria
) {
    return archivioEntrate[categoria]
        .reduce(
            (totale, registrazione) =>
                totale +
                Number(
                    registrazione.importo
                ),
            0
        );
}


function aggiornaRiepilogoEntrate() {
    const stipendio =
        totaleCategoriaEntrate(
            "stipendio"
        );

    const extra =
        totaleCategoriaEntrate(
            "extra"
        );

    document.querySelector(
        "#totale-stipendio"
    ).textContent =
        formattaEuro(
            stipendio
        );

    document.querySelector(
        "#totale-extra"
    ).textContent =
        formattaEuro(
            extra
        );

    document.querySelector(
        "#totale-entrate"
    ).textContent =
        formattaEuro(
            stipendio + extra
        );
}


/* ========================================
   AVVIO
   ======================================== */

aggiornaRiepilogoCasa();
aggiornaRiepilogoEntrate();
