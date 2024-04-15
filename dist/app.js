const markInput = document.getElementById("mark");
const modelInput = document.getElementById("model");
const yearInput = document.getElementById("year");
const regNumberInput = document.getElementById("regNumber");
const phoneInput = document.getElementById("phone");
const addRegistrationButton = document.getElementById("addRegistration");
addRegistrationButton.onclick = () => {
    const reg = {
        mark: markInput.value,
        model: modelInput.value,
        year: yearInput.valueAsNumber,
        regNumber: regNumberInput.value,
        phone: phoneInput.value
    };
    fetch("https://registracija-fa201-default-rtdb.europe-west1.firebasedatabase.app/registrations.json", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reg)
    })
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        console.log("Įrašas pridėtas");
        console.log(data);
    });
};
export {};
