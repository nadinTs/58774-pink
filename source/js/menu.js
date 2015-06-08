(function () {
    var menuElem = document.getElementById('menu-toggle');
    var buttonElem = menuElem.querySelector('.button-menu-header__open');

    menuElem.addEventListener("click", function() {
        menuElem.classList.toggle('open');
    });
})();
