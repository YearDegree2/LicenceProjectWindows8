(function () {
    "use strict";

    WinJS.UI.Pages.define(adminHome, {
        ready: function (element, options) {
            var hashedKey = "";
            if (WinJS.Navigation.state.key) {
                hashedKey = WinJS.Navigation.state.key;
            }

            var listView = element.querySelector('#basicListView').winControl;
            function itemInvokedHandler(eventObject) {
                eventObject.detail.itemPromise.done(function (invokedItem) {
                    WinJS.Navigation.navigate(invokedItem.data.link, { key: hashedKey });
                });
            }

            listView.addEventListener("iteminvoked", itemInvokedHandler, false);
        }
    });

    var dataArray = [
        { title: "Ajouter une catégorie", text: "Ajouter une catégorie", picture: "/images/60banana.png", link: addCategorie },
        { title: "Lister les catégories", text: "Lister les catégories", picture: "/images/60banana.png", link: getCategories },
        { title: "Ajouter une publication", text: "Ajouter une publication", picture: "/images/60Lemon.png", link: addPublication },
        { title: "Lister les publications", text: "Lister les publications", picture: "/images/60Lemon.png", link: getPublications },
        { title: "Ajouter une rubrique", text: "Ajouter une rubrique", picture: "/images/60vanilla.png", link: addRubrique },
        { title: "Lister les rubriques", text: "Lister les rubriques", picture: "/images/60vanilla.png", link: getRubriques },
    ];

    var dataList = new WinJS.Binding.List(dataArray);
    var links = {
        itemList: dataList
    };
    WinJS.Namespace.define("Data", links);
})();
