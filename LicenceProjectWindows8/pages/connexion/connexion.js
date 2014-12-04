// Pour obtenir une présentation du modèle Contrôle de page, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define(connexion, {
        // Cette fonction est appelée chaque fois qu'un utilisateur accède à cette page. Elle
        // remplit les éléments de la page avec les données d'application.
        ready: function (element, options) {
            WinJS.UI.processAll().done(function () {
                // Cette fonction est appelée une fois la page chargé (processAll()).
                var anchor = document.getElementById("sendFormConnexion");
                anchor.addEventListener("click", clickEventHandlerToAdminHome);
                document.getElementById("_username").addEventListener("keypress", function (e) {
                    var key = e.which || e.keyCode;
                    if (key == 13) {
                        clickEventHandlerToAdminHome();
                    }
                });
                document.getElementById("_password").addEventListener("keypress", function (e) {
                    var key = e.which || e.keyCode;
                    if (key == 13) { 
                        clickEventHandlerToAdminHome();
                    }
                });
            });
        }
    });

    function clickEventHandlerToAdminHome () {
        // Cette fonction est appelée lors d'un click sur
        // le bouton Envoyer ou d'un appui sur la touche Enter.
        var objData = {};
        objData.username = document.getElementById("_username").value;
        objData.password = document.getElementById("_password").value;
        var options = {
            url: beginAddress + "/login",
            type: "POST",
            data: JSON.stringify(objData),
            headers: { "Content-Type": "application/json;charset=utf-8" },
            responseType: 'json'
        }
        WinJS.xhr(options).done(
            function success(req) {
                var hashedKey = req.response;
                WinJS.Navigation.navigate(adminHome, { key: hashedKey });
            }
            ,
            function error(err) {
                var statusCode = err.status;
                if (statusCode != 200) {
                    Windows.UI.Popups.MessageDialog("Identifiant ou mot de passe invalide").showAsync();
                }
                return;
            }
        );
    }
})();
