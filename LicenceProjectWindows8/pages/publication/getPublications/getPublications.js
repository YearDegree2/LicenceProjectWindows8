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
                                var publications = document.getElementById("publications");
                                var publication = document.createElement("div");
                                publication.className = "publication";
                                var publicationValue = [];
                                publicationValue.push("[", element.reference, "] ", element.auteurs, ", <i>", element.titre, "</i>");
                                if ("" !== element.journal && null !== element.journal) {
                                    publicationValue.push(", <strong>In ", element.journal, "</strong>");
                                }
                                if ("" !== element.editor && null !== element.editor) {
                                    publicationValue.push(", ", element.editor);
                                }
                                if ("" !== element.pages && null !== element.pages) {
                                    publicationValue.push(", ", element.pages);
                                }
                                if ("" !== element.publisher && null !== element.publisher) {
                                    publicationValue.push(", ", element.publisher);
                                }
                                if ("" !== element.date && null !== element.date) {
                                    publicationValue.push(", ", element.date);
                                }
                                publicationValue.push("<br/>");
                                if ("" !== element.note && null !== element.note) {
                                    publicationValue.push(element.note, "<br/>");
                                }
                                if ("" !== element.keywords && null !== element.keywords) {
                                    publicationValue.push("<h6>Mots clés : ", element.keywords, "</h6>");
                                }
                                publication.innerHTML = publicationValue.join("");
                                publications.appendChild(publication);
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
                if (400 === err.status) {
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
