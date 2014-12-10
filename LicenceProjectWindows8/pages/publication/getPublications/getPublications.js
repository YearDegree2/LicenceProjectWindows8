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
                                idValues.push(element.ID);
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
                                if ("0000-00-00" !== element.date && null !== element.date) {
                                    publicationValue.push(", ", element.date);
                                }
                                publicationValue.push("<br/>");
                                if ("" !== element.note && null !== element.note) {
                                    publicationValue.push(element.note, "<br/>");
                                }
                                if ("" !== element.keywords && null !== element.keywords) {
                                    publicationValue.push("<h6>Mots clés : ", element.keywords, "</h6>");
                                }
                                publicationValue.push("<br/>");
                                publicationValue.push("<a id=\"bibtex" + element.ID + "\"><img class=\"bibtex\" src=\"/images/bibtex.png\"/></a>",
                                    "<input id=\"modify" + element.ID + "\" type=\"button\" value=\"Modifier\"",
                                    "<input id=\"delete" + element.ID + "\" type=\"button\" value=\"Supprimer\"");
                                publication.innerHTML = publicationValue.join("");
                                publications.appendChild(publication);
                            }
                        );
                    }
                    WinJS.UI.processAll().done(function () {
                        idValues.forEach(
                            function getID(element, index, array) {
                                var anchorBibTeX = document.getElementById("bibtex" + element);
                                anchorBibTeX.addEventListener("click", function () {
                                    clickEventHandlerToDisplayBibTeX(element, hashedKey);
                                })
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

    function clickEventHandlerToDisplayBibTeX(id, hashedKey) {
        var objData = {};
        objData.a = hashedKey;
        var options = {
            url: beginAddress + "/publications/" + id,
            type: "GET",
            data: JSON.stringify(objData),
            headers: { "Content-Type": "application/json;charset=utf-8" },
            responseType: 'json'
        }
        WinJS.xhr(options).done(
            function success(result) {
                var jsonDocument = result.responseText;
                var publication = JSON.parse(jsonDocument);
                var publicationBibTeX = [];
                publicationBibTeX.push("@inproceedings { ", publication.reference, ",\n",
                    "    AUTHOR = {", publication.auteurs, "},\n",
                    "    TITLE = {", publication.titre, "},\n");
                if ("" !== publication.journal && null !== publication.journal) {
                    publicationBibTeX.push("    BOOKTITLE = {", publication.journal, "},\n");
                }
                var date = publication.date.split("-");
                publicationBibTeX.push("    YEAR = {", date[0], "},\n");
                if ("" !== publication.volume && null !== publication.volume) {
                    publicationBibTeX.push("    volume = {", publication.volume, "},\n");
                }
                if ("" !== publication.number && null !== publication.number) {
                    publicationBibTeX.push("    number = {", publication.number, "},\n");
                }
                if ("" !== publication.pages && null !== publication.pages) {
                    publicationBibTeX.push("    pages = {", publication.pages, "},\n");
                }
                if ("00" !== date[1] && null !== date[1]) {
                    publicationBibTeX.push("    month = {", date[1], "},\n");
                }
                if ("" !== publication.note && null !== publication.note) {
                    publicationBibTeX.push("    note = {", publication.note, "},\n");
                }
                if ("" !== publication.abstract && null !== publication.abstract) {
                    publicationBibTeX.push("    abstract = {", publication.abstract, "},\n");
                }
                if ("" !== publication.keywords && null !== publication.keywords) {
                    publicationBibTeX.push("    keywords = {", publication.keywords, "},\n");
                }
                if ("" !== publication.series && null !== publication.series) {
                    publicationBibTeX.push("    series = {", publication.series, "},\n");
                }
                if ("" !== publication.localite && null !== publication.localite) {
                    publicationBibTeX.push("    localite = {", publication.localite, "},\n");
                }
                if ("" !== publication.publisher && null !== publication.publisher) {
                    publicationBibTeX.push("    publisher = {", publication.publisher, "},\n");
                }
                if ("" !== publication.editor && null !== publication.editor) {
                    publicationBibTeX.push("    editor = {", publication.editor, "},\n");
                }
                if ("" !== publication.date_display && null !== publication.date_display) {
                    publicationBibTeX.push("    date_display = {", publication.date_display, "},\n");
                }
                publicationBibTeX.push("}");
                Windows.UI.Popups.MessageDialog(publicationBibTeX.join("")).showAsync();
            },

            function error(err) {
                if (400 === err.status) {
                    Windows.UI.Popups.MessageDialog("La publication n'existe pas").showAsync();
                    return;
                }
                Windows.UI.Popups.MessageDialog("Une erreur s'est produite.").showAsync();
            }
        );
    }

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
