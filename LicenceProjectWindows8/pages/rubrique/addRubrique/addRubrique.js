(function () {
    "use strict";

    WinJS.UI.Pages.define(addRubrique, {
        ready: function (element, options) {
            var hashedKey = "";
            if (WinJS.Navigation.state.key) {
                hashedKey = WinJS.Navigation.state.key;
            }

            WinJS.UI.processAll().done(function () {
                var sendRubrique = document.getElementById("sendRubrique");
                sendRubrique.addEventListener("click", function () {
                    clickEventHandlerToAddRubrique(hashedKey);
                });
                document.getElementById("id").addEventListener("keypress", function (e) {
                    var key = e.which || e.keyCode;
                    if (key == 13) {
                        clickEventHandlerToAddRubrique(hashedKey);
                    }
                });
                document.getElementById("titre_fr").addEventListener("keypress", function (e) {
                    var key = e.which || e.keyCode;
                    if (key == 13) {
                        clickEventHandlerToAddRubrique(hashedKey);
                    }
                });
                document.getElementById("titre_en").addEventListener("keypress", function (e) {
                    var key = e.which || e.keyCode;
                    if (key == 13) {
                        clickEventHandlerToAddRubrique(hashedKey);
                    }
                });
                document.getElementById("actif").addEventListener("keypress", function (e) {
                    var key = e.which || e.keyCode;
                    if (key == 13) {
                        clickEventHandlerToAddRubrique(hashedKey);
                    }
                });
                document.getElementById("position").addEventListener("keypress", function (e) {
                    var key = e.which || e.keyCode;
                    if (key == 13) {
                        clickEventHandlerToAddRubrique(hashedKey);
                    }
                });
            });
        }
    });

    function clickEventHandlerToAddRubrique(hashedKey) {
        var objData = {};
        objData.a = hashedKey;
        if (document.getElementById("id").value != "") {
            objData.ID = document.getElementById("id").value;
        }
        if (document.getElementById("titre_fr").value != "") {
            objData.titre_fr = document.getElementById("titre_fr").value;
        }
        if (document.getElementById("titre_en").value != "") {
            objData.titre_en = document.getElementById("titre_en").value;
        }
        objData.actif = document.getElementById("actif").value;
        objData.position = document.getElementById("position").value;
        if (document.getElementById("content_fr").value != "") {
            objData.content_fr = document.getElementById("content_fr").value;
        }
        if (document.getElementById("content_en").value != "") {
            objData.content_en = document.getElementById("content_en").value;
        }
        var options = {
            url: beginAddress + "/admin/rubrique",
            type: "POST",
            data: JSON.stringify(objData),
            headers: { "Content-Type": "application/json;charset=utf-8" },
            responseType: 'json'
        }
        WinJS.xhr(options).done(
            function success(result) {
                if (200 === result.status) {
                    Windows.UI.Popups.MessageDialog("Rubrique ajoutée").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                }
            },

            function error(err) {
                if (403 === err.status) {
                    Windows.UI.Popups.MessageDialog("Admin non connecté").showAsync();
                    return;
                }
                if (404 === err.status) {
                    Windows.UI.Popups.MessageDialog("Attributs titre_fr or titre_en manquant").showAsync();
                    return;
                }
                Windows.UI.Popups.MessageDialog("Cet ID est déjà présent dans la base de données").showAsync();

            }
        );
    }
})();
