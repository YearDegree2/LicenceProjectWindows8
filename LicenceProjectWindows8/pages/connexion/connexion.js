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
                anchor.addEventListener("click", function () {
                    // Cette fonction est appelée lors d'un click sur
                    // le bouton envoyer.
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
                        //success and error handlers
                        function success(req) {
                            var cleCrypte = req.response;
                            window.location.href = adminHome;
                        }
                        ,
                        function error(err) {
                            //var erreur = err.response;
                            var statusCode = err.status;
                            if (statusCode != 200) {
                                Windows.UI.Popups.MessageDialog("Identifiant ou Mot de passe invalide").showAsync();
                            }
                            return;
                        }
                    );
                });
            });
        },

        unload: function () {
            // TODO: répondre aux navigations en dehors de cette page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: répondez aux modifications de la disposition.
        }
    });
})();
