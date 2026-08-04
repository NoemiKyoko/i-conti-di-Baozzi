/* ========================================
   AGGIORNAMENTI DEL LIBRO
   ======================================== */

(() => {

    "use strict";


    const avvisoAggiornamento =
        document.querySelector(
            "#avviso-aggiornamento"
        );


    if (
        !avvisoAggiornamento ||
        !("serviceWorker" in navigator)
    ) {

        return;
    }


    let registrazioneCorrente =
        null;

    let aggiornamentoRichiesto =
        false;

    let ricaricamentoGiaAvviato =
        false;


    function mostraAvviso() {

        avvisoAggiornamento
            .classList.remove(
                "nascosto"
            );
    }


    function nascondiAvviso() {

        avvisoAggiornamento
            .classList.add(
                "nascosto"
            );
    }


    function osservaWorker(
        worker
    ) {

        if (!worker) {

            return;
        }


        worker.addEventListener(
            "statechange",
            () => {

                if (
                    worker.state ===
                    "installed" &&
                    navigator.serviceWorker
                        .controller
                ) {

                    mostraAvviso();
                }
            }
        );
    }


    async function controllaAggiornamenti() {

        if (!registrazioneCorrente) {

            return;
        }


        try {

            await registrazioneCorrente
                .update();

        } catch (errore) {

            console.warn(
                "Controllo aggiornamenti non riuscito.",
                errore
            );
        }
    }


    navigator.serviceWorker
        .addEventListener(
            "controllerchange",
            () => {

                if (
                    !aggiornamentoRichiesto ||
                    ricaricamentoGiaAvviato
                ) {

                    return;
                }


                ricaricamentoGiaAvviato =
                    true;


                window.location.reload();
            }
        );


    avvisoAggiornamento
        .addEventListener(
            "click",
            () => {

                const workerInAttesa =
                    registrazioneCorrente &&
                    registrazioneCorrente
                        .waiting;


                if (!workerInAttesa) {

                    nascondiAvviso();

                    controllaAggiornamenti();

                    return;
                }


                aggiornamentoRichiesto =
                    true;


                avvisoAggiornamento
                    .textContent =
                        "Aggiornamento in corso…";


                workerInAttesa.postMessage({
                    tipo:
                        "ATTIVA_AGGIORNAMENTO"
                });
            }
        );


    window.addEventListener(
        "load",
        async () => {

            try {

                registrazioneCorrente =
                    await navigator
                        .serviceWorker
                        .register(
                            "./service-worker.js"
                        );


                if (
                    registrazioneCorrente
                        .waiting &&
                    navigator.serviceWorker
                        .controller
                ) {

                    mostraAvviso();
                }


                registrazioneCorrente
                    .addEventListener(
                        "updatefound",
                        () => {

                            osservaWorker(
                                registrazioneCorrente
                                    .installing
                            );
                        }
                    );


                window.setTimeout(
                    controllaAggiornamenti,
                    2200
                );

            } catch (errore) {

                console.warn(
                    "Registrazione aggiornamenti non riuscita.",
                    errore
                );
            }
        }
    );


    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "visible"
            ) {

                controllaAggiornamenti();
            }
        }
    );

})();
