(function () {

    var elements = document.querySelectorAll(".input-numeric");

    for (var i = 0; i < elements.length; i++) {
        initNumberField(elements[i]);
    }

    function initNumberField(parent) {
        var input = parent.querySelector("input");
        var minus = parent.querySelector(".input-numeric__minus");
        var plus = parent.querySelector(".input-numeric__plus");

        minus.addEventListener("click", function () {
            changeNumber(false);
        });
        plus.addEventListener("click", function () {
            changeNumber(true);
        });

        function changeNumber(operation) {
            var value = Number(input.value);

            if (isNaN(value)) {
                value = 0;
            }
            if (operation) {
                input.value = value + 1;

            } else {
                if (value > 1) {
                    input.value = value - 1;
                }
            }
        }
    }
})();

(function () {

    var elements = document.querySelectorAll(".input-numeric-companion");

    for (var i = 0; i < elements.length; i++) {
        initNumberField(elements[i]);
    }

    function initNumberField(parent) {
        var input = parent.querySelector("input");
        var minus = parent.querySelector(".input-numeric-companion__minus");
        var plus = parent.querySelector(".input-numeric-companion__plus");
        var area = document.querySelector("#companion_list");
        var template = document.querySelector("#companion-template").innerHTML;

        minus.addEventListener("click", function () {
            changeNumber(false);
        });
        plus.addEventListener("click", function () {
            changeNumber(true);

        });

        function changeNumber(operation) {
            var value = Number(input.value);

            if (isNaN(value)) {
                value = 0;
            }
            if (operation) {
                input.value = value + 1;
                console.log(input.value);


                var html = Mustache.render(template, {
                    "number": Number(input.value)
                });

                area.innerHTML = area.innerHTML + html;


            } else {
                if (value > 1) {
                    input.value = value - 1;
                    area.removeChild(area.children[area.children.length - 1]);
                }
            }
        }
    }
})();





(function () {
    if (!("FormData" in window)) {
        return;
    }

    var form = document.querySelector(".form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var data = new FormData(form);

        request(data, function (response) {
            console.log(response);
        });
    });

    function request(data, fn) {
        var xhr = new XMLHttpRequest();
        var time = (new Date()).getTime();

        xhr.open("post", "http://simonenko.su/academy/echo?" + time);

        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState == 4) {
                fn(xhr.responseText);
            }
        });
        xhr.send(data);
    }

})();























