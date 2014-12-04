// Pour obtenir une présentation du modèle Contrôle de page, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define(addCategorie, {
        // Cette fonction est appelée chaque fois qu'un utilisateur accède à cette page. Elle
        // remplit les éléments de la page avec les données d'application.
        ready: function (element, options) {
            var hashedKey = "";
            if (WinJS.Navigation.state.key) {
                hashedKey = WinJS.Navigation.state.key;
            }

            WinJS.UI.processAll().done(function () {
                // Cette fonction est appelée une fois la page chargé (processAll()).
                var bt_sendAddCategorie = document.getElementById("sendAddCategorie");
                bt_sendAddCategorie.addEventListener("click", function () {
                    clickEventHandlerToAddCategorie(hashedKey);
                });
                document.getElementById("id").addEventListener("keypress", function (e) {
                    var key = e.which || e.keyCode;
                    if (key == 13) {
                        clickEventHandlerToAddCategorie(hashedKey);
                    }
                });
                document.getElementById("name_fr").addEventListener("keypress", function (e) {
                    var key = e.which || e.keyCode;
                    if (key == 13) {
                        clickEventHandlerToAddCategorie(hashedKey);
                    }
                });
                document.getElementById("name_en").addEventListener("keypress", function (e) {
                    var key = e.which || e.keyCode;
                    if (key == 13) {
                        clickEventHandlerToAddCategorie(hashedKey);
                    }
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
    function clickEventHandlerToAddCategorie(hashedKey) {
        var objData = {};
        objData.a = hashedKey;
        if (document.getElementById("id").value != "") {
            objData.ID = document.getElementById("id").value;
        }
        if (document.getElementById("name_fr").value != "") {
            objData.name_fr = document.getElementById("name_fr").value;
        }
        if (document.getElementById("name_en").value != "") {
            objData.name_en = document.getElementById("name_en").value;
        }
        var options = {
            url: beginAddress + "/admin/categorie",
            type: "POST",
            data: JSON.stringify(objData),
            headers: { "Content-Type": "application/json;charset=utf-8" },
            responseType: 'json'
        }
        WinJS.xhr(options).done(
            function success(req) {
                var statusCode = req.status;
                if (statusCode == 200) {
                    Windows.UI.Popups.MessageDialog("Catégorie ajoutée").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                }
            }
            ,
            function error(err) {
                var statusCode = err.status;
                if (statusCode == 403) {
                    Windows.UI.Popups.MessageDialog("Admin non connecté").showAsync();
                }
                else {
                    if (statusCode == 404) {
                        Windows.UI.Popups.MessageDialog("Attributs name_fr ou name_en manquant").showAsync();
                    }
                    else {
                        Windows.UI.Popups.MessageDialog("Cet ID est déjà présent dans la base de données").showAsync();
                    }
                }
            }
        );
    }
})();
