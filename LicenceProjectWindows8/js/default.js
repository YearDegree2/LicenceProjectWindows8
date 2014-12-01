// Pour obtenir une présentation du modèle Navigation, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: cette application vient d'être lancée. Initialisez
                // votre application ici.
            } else {
                // TODO: cette application a été réactivée après avoir été suspendue.
                // Restaurez l'état de l'application ici.
            }

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Optimisez la charge de l'application et lorsque l'écran de démarrage s'affiche, exécutez le travail planifié de haute priorité.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: cette application est sur le point d'être suspendue. Enregistrez tout état
        // devant être conservé lors des suspensions ici. Si vous devez 
        // effectuer une opération asynchrone avant la suspension de 
        // l'application, appelez args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
