// Pour obtenir une présentation du modèle Contrôle de page, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define(adminHome, {
        // Cette fonction est appelée chaque fois qu'un utilisateur accède à cette page. Elle
        // remplit les éléments de la page avec les données d'application.
        ready: function (element, options) {
            var hashedKey = "";
            if (WinJS.Navigation.state.key) {
                hashedKey = WinJS.Navigation.state.key;
            }

            var listView = element.querySelector('#basicListView').winControl;
            function itemInvokedHandler(eventObject) {
                eventObject.detail.itemPromise.done(function (invokedItem) {
                    invokedItem.data.link;
                    WinJS.Navigation.navigate(invokedItem.data.link, { key: hashedKey });
                });
            }

            listView.addEventListener("iteminvoked", itemInvokedHandler, false);
        },

        unload: function () {
            // TODO: répondre aux navigations en dehors de cette page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: répondez aux modifications de la disposition.
        }
    });
    var dataArray = [
  { title: "Ajouter une catégorie", text: "Ajouter une catégorie", picture: "/images/60banana.png", link: addCategorie },
  { title: "Lister les catégories", text: "Lister les catégories", picture: "/images/60banana.png", link: getCategories },
  { title: "Brilliant citron", text: "Frozen custard", picture: "/images/60Lemon.png", link: "/pages/page3/page3.html" },
  { title: "Orange surprise", text: "Sherbet", picture: "/images/60orange.png", link: "/pages/page1/page1.html" },
  { title: "Original orange", text: "Sherbet", picture: "/images/60orange.png", link: "/pages/page1/page1.html" },
  { title: "Vanilla", text: "Ice cream", picture: "/images/60vanilla.png", link: "/pages/page1/page1.html" },
  { title: "Very vanilla", text: "Frozen custard", picture: "/images/60vanilla.png", link: "/pages/page1/page1.html" },
  { title: "Marvelous mint", text: "Gelato", picture: "/images/60mint.png", link: "/pages/page1/page1.html" },
  { title: "Basic banana", text: "Low-fat frozen yogurt", picture: "/images/60banana.png", link: "/pages/page1/page1.html" },
  { title: "Banana blast", text: "Ice cream", picture: "/images/60banana.png", link: "/pages/page1/page1.html" },
  { title: "Brilliant citron", text: "Frozen custard", picture: "/images/60Lemon.png", link: "/pages/page1/page1.html" },
  { title: "Orange surprise", text: "Sherbet", picture: "/images/60orange.png", link: "/pages/page1/page1.html" },
    ];

    var dataList = new WinJS.Binding.List(dataArray);
    var publicMembers =
    {
        itemList: dataList
    };
    WinJS.Namespace.define("DataExample", publicMembers);
})();
