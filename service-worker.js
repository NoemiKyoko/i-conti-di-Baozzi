/* ========================================
   I CONTI DI BAOZZI — SERVICE WORKER
   Ogni nuovo pacchetto dovrà cambiare
   VERSIONE_LIBRO per segnalare l'aggiornamento.
   ======================================== */

const VERSIONE_LIBRO =
    "1.0.0";


self.addEventListener(
    "install",
    () => {

        /*
           Non usiamo skipWaiting qui:
           la nuova versione resta in attesa
           finché l'utente non tocca la scritta.
        */
    }
);


self.addEventListener(
    "activate",
    (evento) => {

        evento.waitUntil(
            self.clients.claim()
        );
    }
);


self.addEventListener(
    "message",
    (evento) => {

        if (
            evento.data &&
            evento.data.tipo ===
            "ATTIVA_AGGIORNAMENTO"
        ) {

            self.skipWaiting();
        }
    }
);
