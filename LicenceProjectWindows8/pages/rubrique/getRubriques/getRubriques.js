(function () {
    "use strict";

    WinJS.UI.Pages.define(getRubriques, {
        ready: function (element, options) {
            var hashedKey = "";
            if (WinJS.Navigation.state.key) {
                hashedKey = WinJS.Navigation.state.key;
            }

            var objData = {};
            var options = {
                url: beginAddress + "/rubriques",
                type: "GET",
                data: JSON.stringify(objData),
                headers: { "Content-Type": "application/json;charset=utf-8" },
                responseType: 'json'
            }
            WinJS.xhr(options).done(
                function success(result) {
                    if (200 === result.status) {
                        var jsonDocument = result.responseText;
                        var arrayRubrique = JSON.parse(jsonDocument);
                        var idValues = [];
                        arrayRubrique.forEach(
                            function displayRubriques(element, index, array) {
                                var table = document.getElementById("tbodyRubrique");
                                var line = table.insertRow(-1);
                                var columnID = line.insertCell(0);
                                columnID.innerHTML += element.menu_id;
                                idValues.push(element.menu_id);
                                var columnTitreFr = line.insertCell(1);
                                columnTitreFr.innerHTML += element.titre_fr;
                                var columnContentFr = line.insertCell(2);
                                columnContentFr.innerHTML += element.content_fr;
                                var columnTitreEn = line.insertCell(3);
                                columnTitreEn.innerHTML += element.titre_en;
                                var columnContentEn = line.insertCell(4);
                                columnContentEn.innerHTML += element.content_en;
                                var columnDateCreation = line.insertCell(5);
                                columnDateCreation.innerHTML += element.date_creation;
                                var columnDateModification = line.insertCell(6);
                                columnDateModification.innerHTML += element.date_modification;
                                var columnActif = line.insertCell(7);
                                columnActif.innerHTML += element.actif;
                                var columnPosition = line.insertCell(8);
                                columnPosition.innerHTML += element.position;
                                var columnUpdate = line.insertCell(9);
                                columnUpdate.innerHTML += "<input id=\"modify" + element.menu_id + "\" type=\"button\" value=\"Modifier\"";
                                var columnDelete = line.insertCell(10);
                                columnDelete.innerHTML += "<input id=\"delete" + element.menu_id + "\" type=\"button\" value=\"Supprimer\"";
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
                        Windows.UI.Popups.MessageDialog("Pas de rubriques").showAsync();
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
        WinJS.Navigation.navigate(updateRubrique, { key: hashedKey, idCategorie: id });
    }

    function clickEventHandlerToDelete(id, hashedKey) {
        var objData = {};
        objData.a = hashedKey;
        var options = {
            url: beginAddress + "/admin/rubriques/" + id,
            type: "DELETE",
            data: JSON.stringify(objData),
            headers: { "Content-Type": "application/json;charset=utf-8" },
            responseType: 'json'
        }
        WinJS.xhr(options).done(
            function success(result) {
                if (200 === result.status) {
                    Windows.UI.Popups.MessageDialog("Rubrique supprimée").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                }
            },

            function error(err) {
                if (400 === statusCode) {
                    Windows.UI.Popups.MessageDialog("La rubrique n'existe pas").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                    return;
                }
                Windows.UI.Popups.MessageDialog("Une erreur s'est produite.").showAsync();
                WinJS.Navigation.navigate(adminHome, { key: hashedKey });
            }
        );
    }
})();
