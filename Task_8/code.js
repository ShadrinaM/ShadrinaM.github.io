$(document).ready(function () {
    const form = document.getElementById("feedbackForm");
    const fullNameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const organizationInput = document.getElementById("organization");
    const messageInput = document.getElementById("message");
    const consentCheckbox = document.getElementById("consent");
    const overlay = document.getElementById("overlay");
    const formUrl = "#popup";
    var formData = new FormData();

    function openForm() {
        document.getElementById("popup").style.display = "block";
        document.getElementById("overlay").style.display = "block";
        document.getElementById("knop").style.display = "none";
        history.pushState({ popupOpen: true }, "", formUrl);
    }

    function closeForm() {
        document.getElementById("popup").style.display = "none";
        document.getElementById("knop").style.display = "block";
        history.back();
    }

    function sendData() {
        var form = document.getElementById("feedbackForm");
        var formData = new FormData(form);

        fetch("https://formcarry.com/s/0n4nb-ySHI", {
            body: formData,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        }).then(function (response) {
            if (response.ok) {
                document.getElementById("result").innerHTML =
                    "Данные формы успешно отправлены на сервер";
            } else {
                document.getElementById("result").innerHTML =
                    "Ошибка при отправке данных формы на сервер";
            }
        }).catch(function (error) {
            document.getElementById("result").innerHTML = "Произошла ошибка:" + error;
        });

        document.getElementById("feedbackForm").reset();
    }

    document.getElementById("feedbackForm").addEventListener("submit", function (event) {
        event.preventDefault();
        sendData();
    });

    window.addEventListener("popstate", function (event) {
        if (document.getElementById("popup").style.display === "block") {
            closeForm();
        }
    });

    const formDataLoad = JSON.parse(localStorage.getItem("formData"));
    var formDataSave;

    function loadFormData() {
        if (formDataLoad) {
            fullNameInput.value = formDataLoad.fullName;
            emailInput.value = formDataLoad.email;
            phoneInput.value = formDataLoad.phone;
            organizationInput.value = formDataLoad.organization;
            messageInput.value = formDataLoad.message;
            consentCheckbox.checked = formDataLoad.consent;
        }
    }

    function saveFormData() {
        formDataSave = {
            consent: consentCheckbox.checked,
            email: emailInput.value,
            fullName: fullNameInput.value,
            message: messageInput.value,
            organization: organizationInput.value,
            phone: phoneInput.value
        };
        localStorage.setItem("formData", JSON.stringify(formDataSave));
    }

    document.getElementById("knop").addEventListener("click", openForm);
    loadFormData();

    fullNameInput.addEventListener("blur", saveFormData);
    emailInput.addEventListener("blur", saveFormData);
    phoneInput.addEventListener("blur", saveFormData);
    organizationInput.addEventListener("blur", saveFormData);
    messageInput.addEventListener("blur", saveFormData);
    consentCheckbox.addEventListener("change", saveFormData);

});
