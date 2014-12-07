(function () {
    "use strict";

    WinJS.UI.Pages.define(updatePublication, {
        ready: function (element, options) {
            var hashedKey = "";
            if (WinJS.Navigation.state.key) {
                hashedKey = WinJS.Navigation.state.key;
            }
            var idPublication = "";
            if (WinJS.Navigation.state.idPublication) {
                idPublication = WinJS.Navigation.state.idPublication;
            }

            var objData = {};
            objData.a = hashedKey;
            var options = {
                url: beginAddress + "/publications/" + idPublication,
                type: "GET",
                data: JSON.stringify(objData),
                headers: { "Content-Type": "application/json;charset=utf-8" },
                responseType: 'json'
            }
            WinJS.xhr(options).done(
                function success(result) {
                    var jsonDocument = result.responseText;
                    var publication = JSON.parse(jsonDocument);
                    var reference = document.getElementById("reference");
                    reference.value += publication.reference;
                    var auteurs = document.getElementById("auteurs");
                    auteurs.value += publication.auteurs;
                    var titre = document.getElementById("titre");
                    titre.value += publication.titre;
                    var date = document.getElementById("date");
                    date.value += publication.date;
                    var journal = document.getElementById("journal");
                    journal.value += publication.journal;
                    var volume = document.getElementById("volume");
                    volume.value += publication.volume;
                    var number = document.getElementById("number");
                    number.value += publication.number;
                    var pages = document.getElementById("pages");
                    pages.value += publication.pages;
                    var note = document.getElementById("note");
                    note.value += publication.note;
                    var abstract = document.getElementById("abstract");
                    abstract.value += publication.abstract;
                    var keywords = document.getElementById("keywords");
                    keywords.value += publication.keywords;
                    var series = document.getElementById("series");
                    series.value += publication.series;
                    var localite = document.getElementById("localite");
                    localite.value += publication.localite;
                    var publisher = document.getElementById("publisher");
                    publisher.value += publication.publisher;
                    var editor = document.getElementById("editor");
                    editor.value += publication.editor;
                    var date_display = document.getElementById("date_display");
                    date_display.value += publication.date_display;
                    var categorie_id = document.getElementById("categorie_id");
                    categorie_id.value += publication.categorie_id;
                    var sendPublication = document.getElementById("sendPublication");
                    sendPublication.addEventListener("click", function () {
                        clickEventHandlerToUpdatePublication(idPublication, hashedKey);
                    });
                },

                function error(err) {
                    if (400 === err.status) {
                        Windows.UI.Popups.MessageDialog("La publication n'existe pas").showAsync();
                        WinJS.Navigation.back();
                        return;
                    }
                    Windows.UI.Popups.MessageDialog("Une erreur s'est produite.").showAsync();
                    WinJS.Navigation.back();
                }
            );
        }
    });

    function clickEventHandlerToUpdatePublication(idPublication, hashedKey) {
        var objData = {};
        objData.a = hashedKey;
        if (document.getElementById("reference").value != "null") {
            objData.reference = document.getElementById("reference").value;
        }
        if (document.getElementById("auteurs").value != "null") {
            objData.auteurs = document.getElementById("auteurs").value;
        }
        if (document.getElementById("titre").value != "null") {
            objData.titre = document.getElementById("titre").value;
        }
        if (document.getElementById("date").value != "null") {
            objData.date = document.getElementById("date").value;
        }
        if (document.getElementById("journal").value != "null") {
            objData.journal = document.getElementById("journal").value;
        }
        if (document.getElementById("volume").value != "null") {
            objData.volume = document.getElementById("volume").value;
        }
        if (document.getElementById("number").value != "null") {
            objData.number = document.getElementById("number").value;
        }
        if (document.getElementById("pages").value != "null") {
            objData.pages = document.getElementById("pages").value;
        }
        if (document.getElementById("note").value != "null") {
            objData.note = document.getElementById("note").value;
        }
        if (document.getElementById("abstract").value != "null") {
            objData.abstract = document.getElementById("abstract").value;
        }
        if (document.getElementById("keywords").value != "null") {
            objData.keywords = document.getElementById("keywords").value;
        }
        if (document.getElementById("series").value != "null") {
            objData.series = document.getElementById("series").value;
        }
        if (document.getElementById("localite").value != "null") {
            objData.localite = document.getElementById("localite").value;
        }
        if (document.getElementById("publisher").value != "null") {
            objData.publisher = document.getElementById("publisher").value;
        }
        if (document.getElementById("editor").value != "null") {
            objData.editor = document.getElementById("editor").value;
        }
        if (document.getElementById("date_display").value != "null") {
            objData.date_display = document.getElementById("date_display").value;
        }
        if (document.getElementById("categorie_id").value != "null") {
            objData.categorie_id = document.getElementById("categorie_id").value;
        }
        var options = {
            url: beginAddress + "/admin/publications/" + idPublication,
            type: "PUT",
            data: JSON.stringify(objData),
            headers: { "Content-Type": "application/json;charset=utf-8" },
            responseType: 'json'
        }
        WinJS.xhr(options).done(
            function success(result) {
                if (200 === result.status) {
                    Windows.UI.Popups.MessageDialog("Publication modifiée").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                }
            },

            function error(err) {
                if (400 === err.status) {
                    Windows.UI.Popups.MessageDialog("La publication n'existe pas").showAsync();
                    WinJS.Navigation.back();
                    return;
                }
                if (404 === err.status) {
                    Windows.UI.Popups.MessageDialog("Attribut reference manquant").showAsync();
                    return;
                }
                Windows.UI.Popups.MessageDialog("Une erreur s'est produite.").showAsync();
                WinJS.Navigation.navigate(adminHome, { key: hashedKey });
            }
        );
    }
})();
