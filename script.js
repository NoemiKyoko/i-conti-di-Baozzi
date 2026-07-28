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
        nome: "Altro",
        icona: "🪴",
        gruppo: "straordinaria",
        messaggio:
            "Non hai ancora registrato altre spese per la casa."
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
   ELEMENTI DEL MOTORE
   ======================================== */

const pagine =
    document.querySelectorAll(".pagina");

const pulsantiNavigazione =
    document.querySelectorAll("[data-vai]");


/* ========================================
   ELEMENTI DELLA CASA
   ======================================== */

const pulsantiCategorie =
    document.querySelectorAll(".sezione-casa");

const iconaCategoria =
    document.querySelector("#icona-categoria");

const titoloCategoria =
    document.querySelector("#titolo-categoria");

const iconaStatoVuoto =
    document.querySelector("#icona-stato-vuoto");

const messaggioVuoto =
    document.querySelector("#messaggio-vuoto");

const statoVuoto =
    document.querySelector("#stato-vuoto");

const elencoRegistrazioni =
    document.querySelector("#elenco-registrazioni");

const righeRegistrazioni =
    document.querySelector("#righe-registrazioni");

const contenitoreModulo =
    document.querySelector("#contenitore-modulo");

const moduloRegistrazione =
    document.querySelector("#modulo-registrazione");

const bottoneAggiungiPrima =
    document.querySelector("#aggiungi-prima-voce");

const bottoneAggiungiAltra =
    document.querySelector("#aggiungi-altra-voce");

const bottoneAggiungiAlto =
    document.querySelector("#apri-modulo-alto");

const bottoneAnnulla =
    document.querySelector("#annulla-registrazione");

const campoData =
    document.querySelector("#campo-data");

const campoDescrizione =
    document.querySelector("#campo-descrizione");

const campoImporto =
    document.querySelector("#campo-importo");

const campoNota =
    document.querySelector("#campo-nota");


/* ========================================
   STATO DELL’APPLICAZIONE
   ======================================== */

let statoIngresso =
    "scaffale";

let paginaCorrente =
    null;

let categoriaCorrente =
    null;


/* ========================================
   ARCHIVIO
   ======================================== */

const chiaveArchivio =
    "conti-baozzi-casa-v1";

let archivioCasa =
    caricaArchivio();


function creaArchivioVuoto() {
    const archivio = {};

    Object.keys(categorieCasa)
        .forEach((categoria) => {
            archivio[categoria] = [];
        });

    return archivio;
}


function caricaArchivio() {
    const archivioVuoto =
        creaArchivioVuoto();

    try {
        const contenuto =
            localStorage.getItem(
                chiaveArchivio
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
            "Errore durante la lettura dei dati:",
            errore
        );

        return archivioVuoto;
    }
}


function salvaArchivio() {
    try {
        localStorage.setItem(
            chiaveArchivio,
            JSON.stringify(archivioCasa)
        );

    } catch (errore) {
        console.error(
            "Errore durante il salvataggio:",
            errore
        );

        window.alert(
            "Non è stato possibile salvare i dati."
        );
    }
}


/* ========================================
   FORMATO DEI DATI
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
        new Date(
            `${dataISO}T12:00:00`
        );

    return new Intl.DateTimeFormat(
        "it-IT"
    ).format(data);
}


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
        `${Math.random()
            .toString(16)
            .slice(2)}`
    );
}


/* ========================================
   MOTORE DEL LIBRO
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

        statoIngresso =
            "libro";

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
   NAVIGAZIONE GENERALE
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
   APERTURA DELLE CATEGORIE
   ======================================== */

pulsantiCategorie.forEach(
    (pulsante) => {

        pulsante.addEventListener(
            "click",
            () => {

                const categoria =
                    pulsante.dataset
                        .categoria;

                apriCategoria(
                    categoria
                );
            }
        );
    }
);


function apriCategoria(categoria) {
    const configurazione =
        categorieCasa[categoria];

    if (!configurazione) {
        return;
    }

    categoriaCorrente =
        categoria;

    iconaCategoria.textContent =
        configurazione.icona;

    titoloCategoria.textContent =
        configurazione.nome;

    iconaStatoVuoto.textContent =
        configurazione.icona;

    messaggioVuoto.textContent =
        configurazione.messaggio;

    aggiornaPaginaCategoria();

    vaiAllaPagina(
        "casa-sezione"
    );
}


/* ========================================
   VISUALIZZAZIONE DELLA CATEGORIA
   ======================================== */

function aggiornaPaginaCategoria() {
    if (!categoriaCorrente) {
        return;
    }

    chiudiModulo();

    const registrazioni =
        archivioCasa[
            categoriaCorrente
        ];

    righeRegistrazioni.innerHTML =
        "";

    if (
        registrazioni.length === 0
    ) {
        statoVuoto.classList.remove(
            "nascosto"
        );

        elencoRegistrazioni
            .classList.add(
                "nascosto"
            );

        return;
    }

    statoVuoto.classList.add(
        "nascosto"
    );

    elencoRegistrazioni
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
                creaRigaRegistrazione(
                    registrazione
                );

            righeRegistrazioni
                .appendChild(riga);
        }
    );
}


function creaRigaRegistrazione(
    registrazione
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

    const testoDescrizione =
        document.createElement(
            "span"
        );

    testoDescrizione.textContent =
        registrazione.descrizione;

    cellaDescrizione.appendChild(
        testoDescrizione
    );

    if (registrazione.nota) {
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

    const elimina =
        document.createElement(
            "button"
        );

    elimina.className =
        "pulsante-elimina";

    elimina.type =
        "button";

    elimina.textContent =
        "✕";

    elimina.setAttribute(
        "aria-label",
        "Elimina registrazione"
    );

    elimina.addEventListener(
        "click",
        () => {

            eliminaRegistrazione(
                registrazione.id
            );
        }
    );

    cellaAzioni.appendChild(
        elimina
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
   MODULO
   ======================================== */

function apriModulo() {
    if (!categoriaCorrente) {
        return;
    }

    statoVuoto.classList.add(
        "nascosto"
    );

    elencoRegistrazioni
        .classList.add(
            "nascosto"
        );

    contenitoreModulo
        .classList.remove(
            "nascosto"
        );

    moduloRegistrazione.reset();

    campoData.value =
        dataOggi();
}


function chiudiModulo() {
    contenitoreModulo
        .classList.add(
            "nascosto"
        );
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

    return (
        `${anno}-${mese}-${giorno}`
    );
}


bottoneAggiungiPrima
    .addEventListener(
        "click",
        apriModulo
    );

bottoneAggiungiAltra
    .addEventListener(
        "click",
        apriModulo
    );

bottoneAggiungiAlto
    .addEventListener(
        "click",
        apriModulo
    );


bottoneAnnulla.addEventListener(
    "click",
    () => {

        aggiornaPaginaCategoria();
    }
);


/* ========================================
   SALVATAGGIO
   ======================================== */

moduloRegistrazione.addEventListener(
    "submit",
    (evento) => {

        evento.preventDefault();

        if (!categoriaCorrente) {
            return;
        }

        const data =
            campoData.value;

        const descrizione =
            campoDescrizione
                .value
                .trim();

        const importo =
            Number(
                campoImporto.value
            );

        const nota =
            campoNota
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
            id: creaId(),
            data,
            descrizione,
            importo,
            nota
        };

        archivioCasa[
            categoriaCorrente
        ].push(
            nuovaRegistrazione
        );

        salvaArchivio();

        aggiornaPaginaCategoria();

        aggiornaRiepilogoCasa();
    }
);


/* ========================================
   ELIMINAZIONE
   ======================================== */

function eliminaRegistrazione(id) {
    if (!categoriaCorrente) {
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
        categoriaCorrente
    ] =
        archivioCasa[
            categoriaCorrente
        ].filter(
            (registrazione) =>
                registrazione.id !== id
        );

    salvaArchivio();

    aggiornaPaginaCategoria();

    aggiornaRiepilogoCasa();
}


/* ========================================
   RIEPILOGO
   ======================================== */

function totaleCategoria(categoria) {
    return archivioCasa[
        categoria
    ].reduce(
        (totale, registrazione) =>
            totale +
            Number(
                registrazione.importo
            ),
        0
    );
}


function aggiornaRiepilogoCasa() {
    let sommaRicorrenti = 0;
    let sommaStraordinarie = 0;

    Object.entries(
        categorieCasa
    ).forEach(
        ([
            chiave,
            configurazione
        ]) => {

            const totale =
                totaleCategoria(
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
                sommaRicorrenti +=
                    totale;

            } else {
                sommaStraordinarie +=
                    totale;
            }
        }
    );

    document.querySelector(
        "#totale-ricorrenti"
    ).textContent =
        formattaEuro(
            sommaRicorrenti
        );

    document.querySelector(
        "#totale-straordinarie"
    ).textContent =
        formattaEuro(
            sommaStraordinarie
        );

    document.querySelector(
        "#totale-casa"
    ).textContent =
        formattaEuro(
            sommaRicorrenti +
            sommaStraordinarie
        );
}


/* ========================================
   AVVIO
   ======================================== */

aggiornaRiepilogoCasa();
