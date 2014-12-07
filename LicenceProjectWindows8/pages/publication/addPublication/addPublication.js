(function () {
    "use strict";

    WinJS.UI.Pages.define(addPublication, {
        ready: function (element, options) {
            var hashedKey = "";
            if (WinJS.Navigation.state.key) {
                hashedKey = WinJS.Navigation.state.key;
            }

            WinJS.UI.processAll().done(function () {
                var sendPublication = document.getElementById("sendPublication");
                sendPublication.addEventListener("click", function () {
                    clickEventHandlerToAddPublication(hashedKey);
                });
            });
        }
    });

    function clickEventHandlerToAddPublication(hashedKey) {
        var objData = {};
        objData.a = hashedKey;
        if (document.getElementById("id").value != "") {
            objData.ID = document.getElementById("id").value;
        }
        if (document.getElementById("reference").value != "") {
            objData.reference = document.getElementById("reference").value;
        }
        if (document.getElementById("auteurs").value != "") {
            objData.auteurs = document.getElementById("auteurs").value;
        }
        if (document.getElementById("titre").value != "") {
            objData.titre = document.getElementById("titre").value;
        }
        if (document.getElementById("date").value != "") {
            objData.date = document.getElementById("date").value;
        }
        if (document.getElementById("journal").value != "") {
            objData.journal = document.getElementById("journal").value;
        }
        if (document.getElementById("volume").value != "") {
            objData.volume = document.getElementById("volume").value;
        }
        if (document.getElementById("number").value != "") {
            objData.number = document.getElementById("number").value;
        }
        if (document.getElementById("pages").value != "") {
            objData.pages = document.getElementById("pages").value;
        }
        if (document.getElementById("note").value != "") {
            objData.note = document.getElementById("note").value;
        }
        if (document.getElementById("abstract").value != "") {
            objData.abstract = document.getElementById("abstract").value;
        }
        if (document.getElementById("keywords").value != "") {
            objData.keywords = document.getElementById("keywords").value;
        }
        if (document.getElementById("series").value != "") {
            objData.series = document.getElementById("series").value;
        }
        if (document.getElementById("localite").value != "") {
            objData.localite = document.getElementById("localite").value;
        }
        if (document.getElementById("publisher").value != "") {
            objData.publisher = document.getElementById("publisher").value;
        }
        if (document.getElementById("editor").value != "") {
            objData.editor = document.getElementById("editor").value;
        }
        if (document.getElementById("date_display").value != "") {
            objData.date_display = document.getElementById("date_display").value;
        }
        if (document.getElementById("categorie_id").value != "") {
            objData.categorie_id = document.getElementById("categorie_id").value;
        }
        var options = {
            url: beginAddress + "/admin/publication",
            type: "POST",
            data: JSON.stringify(objData),
            headers: { "Content-Type": "application/json;charset=utf-8" },
            responseType: 'json'
        }
        WinJS.xhr(options).done(
            function success(result) {
                if (200 === result.status) {
                    Windows.UI.Popups.MessageDialog("Publication ajoutée").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                }
            }
            ,
            function error(err) {
                if (403 === err.status) {
                    Windows.UI.Popups.MessageDialog("Admin non connecté").showAsync();
                    return;
                }
                if (404 === err.status) {
                    Windows.UI.Popups.MessageDialog("Attributs reference, auteurs, titre ou name_en manquant").showAsync();
                    return;
                }
                Windows.UI.Popups.MessageDialog("Cet ID est déjà présent dans la base de données ou le categorie_id n'est associé à aucune catégorie").showAsync();

            }
        );
    }
})();
