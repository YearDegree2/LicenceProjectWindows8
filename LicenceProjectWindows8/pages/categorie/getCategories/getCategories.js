// Pour obtenir une présentation du modèle Contrôle de page, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkId=232511
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
                    if (result.status === 200) {
                        var jsonDocument = result.responseText;
                        var arrayCategorie = JSON.parse(jsonDocument);
                        var numberLines = -1;
                        arrayCategorie.forEach(
                            function displayCategories(element, index, array) {
                                var table = document.getElementById("tbodyCategorie");
                                var line = table.insertRow(numberLines);
                                var columnID = line.insertCell(0);
                                columnID.innerHTML += element.ID;
                                var columnNameFr = line.insertCell(1);
                                columnNameFr.innerHTML += element.name_fr;
                                var columnNameEn = line.insertCell(2);
                                columnNameEn.innerHTML += element.name_en;
                                var columnUpdate = line.insertCell(3);
                                var columnDelete = line.insertCell(4);
                            }
                        );
                    }
                },
                function error(err) {
                    if (400 === err.status) {
                        Windows.UI.Popups.MessageDialog("Pas de categories").showAsync();
                        WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                    }
                }
            );
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
