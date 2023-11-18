const formUrl = "#popup";
const formDataLoad = JSON.parse(localStorage.getItem("formData"));
var formDataSave;

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

document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
});

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
            clearFormData();
        } else {
            document.getElementById("result").innerHTML =
                "Ошибка при отправке данных формы на сервер";
        }
    }).catch(function (error) {
        document.getElementById("result").innerHTML = "Произошла ошибка:" + error;
    });

    document.getElementById("feedbackForm").reset();

    function showMessage(message) {
        alert(message);
    }

    window.addEventListener("popstate", function (event) {
        if (document.getElementById("popup").style.display === "block") {
            closeForm();
        }
    });

}


