document.addEventListener("DOMContentLoaded", function () {
    function isNumber(value) {
        return /^[0-9]+$/.test(value);
    }

    var calculateButton = document.getElementById("calculate");

    calculateButton.addEventListener("click", function () {
        var quantityInput = document.getElementById("quantity");
        var productSelect = document.getElementById("product");
        var result = document.getElementById("result");

        var quantity = parseInt(quantityInput.value);
        var product = productSelect.value;

        if (!isNumber(quantityInput.value)) {
            result.innerHTML = "Ошибка: введите корректное количество товара.";
        } else {
            var price;
            if (product === "product1") {
                price = 100;
            } else if (product === "product2") {
                price = 200;
            } else if (product === "product3") {
                price = 300;
            }

            var total = quantity * price;
            result.innerHTML = "Стоимость заказа: " + total;
        }
    });
});