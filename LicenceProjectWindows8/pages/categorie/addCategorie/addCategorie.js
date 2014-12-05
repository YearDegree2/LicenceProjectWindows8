(function () {
    "use strict";

    WinJS.UI.Pages.define(addCategorie, {
        ready: function (element, options) {
            var hashedKey = "";
            if (WinJS.Navigation.state.key) {
                hashedKey = WinJS.Navigation.state.key;
            }

            WinJS.UI.processAll().done(function () {
                var sendCategorie = document.getElementById("sendCategorie");
                sendCategorie.addEventListener("click", function () {
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
            function success(result) {
                if (200 === result.status) {
                    Windows.UI.Popups.MessageDialog("Catégorie ajoutée").showAsync();
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
                    Windows.UI.Popups.MessageDialog("Attributs name_fr ou name_en manquant").showAsync();
                    return;
                }
                Windows.UI.Popups.MessageDialog("Cet ID est déjà présent dans la base de données").showAsync();
                
            }
        );
    }
})();
