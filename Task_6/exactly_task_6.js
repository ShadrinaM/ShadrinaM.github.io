document.addEventListener("DOMContentLoaded", function () {
    var totalfirst;
    var pricefirst;
    var calculateButton = document.getElementById("calculatefirst");
    calculateButton.addEventListener("click", function () {
        var quantityInput = document.getElementById("quantityfirst");
        var productSelect = document.getElementById("productfirst");
        var resultfirst = document.getElementById("resultfirst");
        var quantityfirst = parseInt(quantityInput.value);
        var productfirst = productSelect.value;
        if (!(/^[0-9]+$/.test(quantityInput.value))) {
            resultfirst.innerHTML = "Ошибка:не корректное количество товара.";
        } else {
            if (productfirst === "product1") {
                pricefirst = 100;
            } else if (productfirst === "product2") {
                pricefirst = 200;
            } else if (productfirst === "product3") {
                pricefirst = 300;
            }
            totalfirst = quantityfirst * pricefirst;
            resultfirst.innerHTML = "Стоимость заказа: " + totalfirst;
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    //получение элементов формы
    var quantityJS = document.getElementById("quantity");
    var serviceJS = document.getElementsByName("service");
    var optionJS = document.getElementById("option");
    var propertyJS = document.getElementById("property");
    var priceJS = document.getElementById("price");
    var i;
    // функция пересчета стоимости товара
    function calculatePrice() {
        // Получение выбранных значений
        var quantity = parseInt(quantityJS.value);
        var service = getServiceValue();
        var option = optionJS.value;
        var property = propertyJS.checked;
        var price = quantity * service;
        if (service === 200) {
            optionJS.parentElement.style.display = "block";
            if (option === "option1") {
                price += quantity * 50; //опция 1 для шаурмы
            }
            if (option === "option2") {
                price += quantity * 70; //опция 2 для шаурмы
            }
        } else {
            optionJS.parentElement.style.display = "none";
        }
        if (service === 300) {
            propertyJS.parentElement.style.display = "block";
            if (property) {
                price += quantity * 50; //свойство для пиццы
            }
        } else {
            propertyJS.parentElement.style.display = "none";
        }
        priceJS.textContent = price;// Вывод результата
    }
    //функция  получения значения выбранного типа услуги
    function getServiceValue() {
        for (i = 0; i < serviceJS.length; i += 1) {
            if (serviceJS[i].checked) {
                return parseInt(serviceJS[i].value);
            }
        }
        return 0;
    }
    //добавление обработчиков событий
    quantityJS.addEventListener("change", calculatePrice);
    for (i = 0; i < serviceJS.length; i += 1) {
        serviceJS[i].addEventListener("change", calculatePrice);
    }
    optionJS.addEventListener("change", calculatePrice);
    propertyJS.addEventListener("change", calculatePrice);
    calculatePrice();
});