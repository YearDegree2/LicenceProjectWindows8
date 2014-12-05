(function () {
    "use strict";

    WinJS.UI.Pages.define(home, {
        ready: function (element, options) {
            WinJS.Utilities.query("#connexion").listen("click", clickEventHandlerToConnexion, false);
        }
    });

    function clickEventHandlerToConnexion() {
        WinJS.Navigation.navigate(connexion);
    }
})();
