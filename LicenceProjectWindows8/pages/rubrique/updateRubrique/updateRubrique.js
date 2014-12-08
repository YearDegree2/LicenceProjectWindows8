(function () {
    "use strict";

    WinJS.UI.Pages.define(updateRubrique, {
        ready: function (element, options) {
            var hashedKey = "";
            if (WinJS.Navigation.state.key) {
                hashedKey = WinJS.Navigation.state.key;
            }
            var idRubrique = "";
            if (WinJS.Navigation.state.idRubrique) {
                idRubrique = WinJS.Navigation.state.idRubrique;
            }

            var objData = {};
            var options = {
                url: beginAddress + "/rubriques/" + idRubrique,
                type: "GET",
                data: JSON.stringify(objData),
                headers: { "Content-Type": "application/json;charset=utf-8" },
                responseType: 'json'
            }
            WinJS.xhr(options).done(
                function success(result) {
                    var jsonDocument = result.responseText;
                    var rubrique = JSON.parse(jsonDocument);
                    var titreFR = document.getElementById("titre_fr");
                    titreFR.value += rubrique.titre_fr;
                    var titreEN = document.getElementById("titre_en");
                    titreEN.value += rubrique.titre_en;
                    var contentFR = document.getElementById("content_fr");
                    contentFR.value += rubrique.content_fr;
                    var contentEN = document.getElementById("content_en");
                    contentEN.value += rubrique.content_en;
                    var actif = document.getElementById("actif");
                    actif.value += rubrique.actif;
                    var position = document.getElementById("position");
                    position.value += rubrique.position;
                    var sendRubrique = document.getElementById("sendRubrique");
                    sendRubrique.addEventListener("click", function () {
                        clickEventHandlerToUpdateRubrique(idRubrique, hashedKey);
                    });
                    titreFR.addEventListener("keypress", function (e) {
                        var key = e.which || e.keyCode;
                        if (key == 13) {
                            clickEventHandlerToUpdateRubrique(idRubrique, hashedKey);
                        }
                    });
                    titreEN.addEventListener("keypress", function (e) {
                        var key = e.which || e.keyCode;
                        if (key == 13) {
                            clickEventHandlerToUpdateRubrique(idRubrique, hashedKey);
                        }
                    });
                    contentFR.addEventListener("keypress", function (e) {
                        var key = e.which || e.keyCode;
                        if (key == 13) {
                            clickEventHandlerToUpdateRubrique(idRubrique, hashedKey);
                        }
                    });
                    contentEN.addEventListener("keypress", function (e) {
                        var key = e.which || e.keyCode;
                        if (key == 13) {
                            clickEventHandlerToUpdateRubrique(idRubrique, hashedKey);
                        }
                    });
                    actif.addEventListener("keypress", function (e) {
                        var key = e.which || e.keyCode;
                        if (key == 13) {
                            clickEventHandlerToUpdateRubrique(idRubrique, hashedKey);
                        }
                    });
                    position.addEventListener("keypress", function (e) {
                        var key = e.which || e.keyCode;
                        if (key == 13) {
                            clickEventHandlerToUpdateRubrique(idRubrique, hashedKey);
                        }
                    });

                },

                function error(err) {
                    if (400 === err.status) {
                        Windows.UI.Popups.MessageDialog("La rubrique n'existe pas").showAsync();
                        WinJS.Navigation.back();
                        return;
                    }
                    Windows.UI.Popups.MessageDialog("Une erreur s'est produite.").showAsync();
                    WinJS.Navigation.back();
                }
            );
        }
    });

    function clickEventHandlerToUpdateRubrique(idRubrique, hashedKey) {
        var objData = {};
        objData.a = hashedKey;
        if (document.getElementById("titre_fr").value != "") {
            objData.titre_fr = document.getElementById("titre_fr").value;
        }
        if (document.getElementById("titre_en").value != "") {
            objData.titre_en = document.getElementById("titre_en").value;
        }
        objData.actif = document.getElementById("actif").value;
        objData.position = document.getElementById("position").value;
        if (document.getElementById("content_fr").value != null) {
            objData.content_fr = document.getElementById("content_fr").value;
        }
        if (document.getElementById("content_en").value != null) {
            objData.content_en = document.getElementById("content_en").value;
        }
        var options = {
            url: beginAddress + "/admin/rubriques/" + idRubrique,
            type: "PUT",
            data: JSON.stringify(objData),
            headers: { "Content-Type": "application/json;charset=utf-8" },
            responseType: 'json'
        }
        WinJS.xhr(options).done(
            function success(result) {
                if (200 === result.status) {
                    Windows.UI.Popups.MessageDialog("Rubrique modifiée").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                }
            },

            function error(err) {
                if (400 === err.status) {
                    Windows.UI.Popups.MessageDialog("La rubrique n'existe pas").showAsync();
                    WinJS.Navigation.back();
                    return;
                }
                if (404 === err.status) {
                    Windows.UI.Popups.MessageDialog("Attributs titre_fr or titre_en manquants").showAsync();
                    return;
                }
                Windows.UI.Popups.MessageDialog("Une erreur s'est produite.").showAsync();
                WinJS.Navigation.navigate(adminHome, { key: hashedKey });
            }
        );
    }
})();
