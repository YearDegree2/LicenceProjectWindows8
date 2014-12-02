(function () {
    "use strict";

    WinJS.UI.Pages.define(home, {
        // Cette fonction est appelée chaque fois qu'un utilisateur accède à cette page. Elle
        // remplit les éléments de la page avec les données d'application.
        ready: function (element, options) {
            WinJS.Utilities.query("#connexion").listen("click", clickEventHandlerToConnexion, false);
        }
    });

    function clickEventHandlerToConnexion() {
        WinJS.Navigation.navigate(connexion);
    }
})();
