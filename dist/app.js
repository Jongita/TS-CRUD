import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
const markInput = document.getElementById("mark");
const modelInput = document.getElementById("model");
const yearInput = document.getElementById("year");
const regNumberInput = document.getElementById("regNumber");
const phoneInput = document.getElementById("phone");
const addRegistrationButton = document.getElementById("addRegistration");
const loadDataButton = document.getElementById("loadData");
export const registrationData = [];
addRegistrationButton.onclick = () => {
    let lytis = document.querySelector('input[name="sex"]:checked');
    if (lytis != null) {
        console.log(lytis.value);
    }
    const reg = {
        mark: markInput.value,
        model: modelInput.value,
        year: yearInput.valueAsNumber,
        regNumber: regNumberInput.value,
        phone: phoneInput.value,
    };
    fetchRegistrations('registrations', 'POST', reg)
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        console.log("Įrašas pridėtas");
        console.log(data);
    });
};
loadDataButton.onclick = loadData;
loadData();
