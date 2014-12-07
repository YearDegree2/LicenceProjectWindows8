(function () {
    "use strict";

    WinJS.UI.Pages.define(getPublications, {
        ready: function (element, options) {
            var hashedKey = "";
            if (WinJS.Navigation.state.key) {
                hashedKey = WinJS.Navigation.state.key;
            }

            var objData = {};
            var options = {
                url: beginAddress + "/publications",
                type: "GET",
                data: JSON.stringify(objData),
                headers: { "Content-Type": "application/json;charset=utf-8" },
                responseType: 'json'
            }
            WinJS.xhr(options).done(
                function success(result) {
                    if (200 === result.status) {
                        var jsonDocument = result.responseText;
                        var arrayPublication = JSON.parse(jsonDocument);
                        var idValues = [];
                        arrayPublication.forEach(
                            function displayPublications(element, index, array) {
                                var table = document.getElementById("tbodyPublication");
                                var line = table.insertRow(-1);
                                var columnID = line.insertCell(0);
                                columnID.innerHTML += element.ID;
                                idValues.push(element.ID);
                                var columnReference = line.insertCell(1);
                                columnReference.innerHTML += element.reference;
                                var columnAuteurs = line.insertCell(2);
                                columnAuteurs.innerHTML += element.auteurs;
                                var columnTitre = line.insertCell(3);
                                columnTitre.innerHTML += element.titre;
                                var columnDate = line.insertCell(4);
                                columnDate.innerHTML += element.date;
                                var columnJournal = line.insertCell(5);
                                columnJournal.innerHTML += element.journal;
                                var columnVolume = line.insertCell(6);
                                columnVolume.innerHTML += element.volume;
                                var columnNumber = line.insertCell(7);
                                columnNumber.innerHTML += element.number;
                                var columnPages = line.insertCell(8);
                                columnPages.innerHTML += element.pages;
                                var columnNote = line.insertCell(9);
                                columnNote.innerHTML += element.note;
                                var columnAbstract = line.insertCell(10);
                                columnAbstract.innerHTML += element.abstract;
                                var columnKeywords = line.insertCell(11);
                                columnKeywords.innerHTML += element.keywords;
                                var columnSeries = line.insertCell(12);
                                columnSeries.innerHTML += element.series;
                                var columnLocalite = line.insertCell(13);
                                columnLocalite.innerHTML += element.localite;
                                var columnPublisher = line.insertCell(14);
                                columnPublisher.innerHTML += element.publisher;
                                var columnEditor = line.insertCell(15);
                                columnEditor.innerHTML += element.editor;
                                var columnDateDisplay = line.insertCell(16);
                                columnDateDisplay.innerHTML += element.date_display;
                                var columnCategorieId = line.insertCell(17);
                                columnCategorieId.innerHTML += element.categorie_id;
                                var columnUpdate = line.insertCell(18);
                                columnUpdate.innerHTML += "<input id=\"modify" + element.ID + "\" type=\"button\" value=\"Modifier\"";
                                var columnDelete = line.insertCell(19);
                                columnDelete.innerHTML += "<input id=\"delete" + element.ID + "\" type=\"button\" value=\"Supprimer\"";
                            }
                        );
                    }
                    WinJS.UI.processAll().done(function () {
                        idValues.forEach(
                            function getID(element, index, array) {
                                var anchorModify = document.getElementById("modify" + element);
                                anchorModify.addEventListener("click", function () {
                                    clickEventHandlerToModify(element, hashedKey);
                                })
                                var anchor = document.getElementById("delete" + element);
                                anchor.addEventListener("click", function () {
                                    clickEventHandlerToDelete(element, hashedKey);
                                })
                            }
                        );
                    });
                },

                function error(err) {
                    if (400 === err.status) {
                        Windows.UI.Popups.MessageDialog("Pas de publications").showAsync();
                        WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                        return;
                    }
                    Windows.UI.Popups.MessageDialog("Une erreur s'est produite.").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                }
            );
        }
    });

    function clickEventHandlerToModify(id, hashedKey) {
        WinJS.Navigation.navigate(updatePublication, { key: hashedKey, idPublication: id });
    }

    function clickEventHandlerToDelete(id, hashedKey) {
        var objData = {};
        objData.a = hashedKey;
        var options = {
            url: beginAddress + "/admin/publications/" + id,
            type: "DELETE",
            data: JSON.stringify(objData),
            headers: { "Content-Type": "application/json;charset=utf-8" },
            responseType: 'json'
        }
        WinJS.xhr(options).done(
            function success(result) {
                if (200 === result.status) {
                    Windows.UI.Popups.MessageDialog("Publication supprimée").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                }
            },

            function error(err) {
                if (400 === statusCode) {
                    Windows.UI.Popups.MessageDialog("La publication n'existe pas").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                    return;
                }
                Windows.UI.Popups.MessageDialog("Une erreur s'est produite.").showAsync();
                WinJS.Navigation.navigate(adminHome, { key: hashedKey });
            }
        );
    }
})();
