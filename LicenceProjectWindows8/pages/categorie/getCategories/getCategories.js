(function () {
    "use strict";

    WinJS.UI.Pages.define(getCategories, {
        ready: function (element, options) {
            var hashedKey = "";
            if (WinJS.Navigation.state.key) {
                hashedKey = WinJS.Navigation.state.key;
            }

            var objData = {};
            var options = {
                url: beginAddress + "/categories",
                type: "GET",
                data: JSON.stringify(objData),
                headers: { "Content-Type": "application/json;charset=utf-8" },
                responseType: 'json'
            }
            WinJS.xhr(options).done(
                function success(result) {
                    if (200 === result.status) {
                        var jsonDocument = result.responseText;
                        var arrayCategorie = JSON.parse(jsonDocument);
                        var idValues = [];
                        arrayCategorie.forEach(
                            function displayCategories(element, index, array) {
                                var table = document.getElementById("tbodyCategorie");
                                var line = table.insertRow(-1);
                                var columnID = line.insertCell(0);
                                columnID.innerHTML += element.ID;
                                idValues.push(element.ID);
                                var columnNameFr = line.insertCell(1);
                                columnNameFr.innerHTML += element.name_fr;
                                var columnNameEn = line.insertCell(2);
                                columnNameEn.innerHTML += element.name_en;
                                var columnUpdate = line.insertCell(3);
                                columnUpdate.innerHTML += "<input id=\"modify" + element.ID + "\" type=\"button\" value=\"Modifier\"";
                                var columnDelete = line.insertCell(4);
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
                        Windows.UI.Popups.MessageDialog("Pas de catégories").showAsync();
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
        WinJS.Navigation.navigate(updateCategorie, { key: hashedKey, idCategorie: id });
    }

    function clickEventHandlerToDelete(id, hashedKey) {
        var objData = {};
        objData.a = hashedKey;
        var options = {
            url: beginAddress + "/admin/categories/" + id,
            type: "DELETE",
            data: JSON.stringify(objData),
            headers: { "Content-Type": "application/json;charset=utf-8" },
            responseType: 'json'
        }
        WinJS.xhr(options).done(
            function success(result) {
                if (200 === result.status) {
                    Windows.UI.Popups.MessageDialog("Catégorie supprimée").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                }
            },

            function error(err) {
                if (400 === err.status) {
                    Windows.UI.Popups.MessageDialog("La catégorie n'existe pas").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                    return;
                }
                Windows.UI.Popups.MessageDialog("Une erreur s'est produite.").showAsync();
                WinJS.Navigation.navigate(adminHome, { key: hashedKey });
            }
        );
    }
})();
