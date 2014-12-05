(function () {
    "use strict";

    WinJS.UI.Pages.define(updateCategorie, {
        ready: function (element, options) {
            var hashedKey = "";
            if (WinJS.Navigation.state.key) {
                hashedKey = WinJS.Navigation.state.key;
            }
            var idCategorie = "";
            if (WinJS.Navigation.state.idCategorie) {
                idCategorie = WinJS.Navigation.state.idCategorie;
            }

            var objData = {};
            var options = {
                url: beginAddress + "/categories/" + idCategorie,
                type: "GET",
                data: JSON.stringify(objData),
                headers: { "Content-Type": "application/json;charset=utf-8" },
                responseType: 'json'
            }
            WinJS.xhr(options).done(
                function success(result) {
                    var jsonDocument = result.responseText;
                    var categorie = JSON.parse(jsonDocument);
                    var nameFr = document.getElementById("name_fr");
                    name_fr.value += categorie.name_fr;
                    var nameEn = document.getElementById("name_en");
                    name_en.value += categorie.name_en;
                    var sendCategorie = document.getElementById("sendCategorie");
                    sendCategorie.addEventListener("click", function () {
                        clickEventHandlerToUpdateCategorie(idCategorie, hashedKey);
                    });
                    document.getElementById("name_fr").addEventListener("keypress", function (e) {
                        var key = e.which || e.keyCode;
                        if (key == 13) {
                            clickEventHandlerToUpdateCategorie(idCategorie, hashedKey);
                        }
                    });
                    document.getElementById("name_en").addEventListener("keypress", function (e) {
                        var key = e.which || e.keyCode;
                        if (key == 13) {
                            clickEventHandlerToUpdateCategorie(idCategorie, hashedKey);
                        }
                    });
                },

                function error(err) {
                    if (400 === err.status) {
                        Windows.UI.Popups.MessageDialog("La catégorie n'existe pas").showAsync();
                        WinJS.Navigation.back();
                        return;
                    }
                    Windows.UI.Popups.MessageDialog("Une erreur s'est produite.").showAsync();
                    WinJS.Navigation.back();
                }
            );
        }
    });

    function clickEventHandlerToUpdateCategorie(idCategorie, hashedKey) {
        var objData = {};
        objData.a = hashedKey;
        if (document.getElementById("name_fr").value != "") {
            objData.name_fr = document.getElementById("name_fr").value;
        }
        if (document.getElementById("name_en").value != "") {
            objData.name_en = document.getElementById("name_en").value;
        }
        var options = {
            url: beginAddress + "/admin/categories/" + idCategorie,
            type: "PUT",
            data: JSON.stringify(objData),
            headers: { "Content-Type": "application/json;charset=utf-8" },
            responseType: 'json'
        }
        WinJS.xhr(options).done(
            function success(result) {
                if (200 === result.status) {
                    Windows.UI.Popups.MessageDialog("Catégorie modifiée").showAsync();
                    WinJS.Navigation.navigate(adminHome, { key: hashedKey });
                }
            },

            function error(err) {
                if (400 === err.status) {
                    Windows.UI.Popups.MessageDialog("La catégorie n'existe pas").showAsync();
                    WinJS.Navigation.back();
                    return;
                }
                if (404 === err.status) {
                    Windows.UI.Popups.MessageDialog("Attributs name_fr ou name_en manquant").showAsync();
                    return;
                }
                Windows.UI.Popups.MessageDialog("Une erreur s'est produite.").showAsync();
                WinJS.Navigation.navigate(adminHome, { key: hashedKey });
            }
        );
    }
})();
