(function() {

    var elements = document.querySelectorAll(".input-numeric");

    for (var i = 0; i < elements.length; i++) {
        initNumberField(elements[i]);
    }

    function initNumberField(parent) {
        var input = parent.querySelector("input");
        var minus = parent.querySelector(".input-numeric__minus");
        var plus = parent.querySelector(".input-numeric__plus");

        minus.addEventListener("click", function() {
            changeNumber(false);
        });
        plus.addEventListener("click", function() {
            changeNumber(true);
        });

        function changeNumber(operation) {
            var value = Number(input.value);

            if (isNaN(value)) {
                value = 0;
            }
            if (operation) {
                input.value = value + 1;
            } else  {
                if (value  > 0 ) {
                    input.value = value - 1;
                }
            }
        }
    }
})();