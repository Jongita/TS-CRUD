import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
import { Registration } from "./registration.js";
import { showData } from "./showData.js";

const markInput=<HTMLInputElement>document.getElementById("mark");
const modelInput=<HTMLInputElement>document.getElementById("model");
const yearInput=<HTMLInputElement>document.getElementById("year");
const regNumberInput=<HTMLInputElement>document.getElementById("regNumber");
const phoneInput=<HTMLInputElement>document.getElementById("phone");
const addRegistrationButton=<HTMLButtonElement>document.getElementById("addRegistration");

const loadDataButton=<HTMLButtonElement>document.getElementById("loadData");


export const registrationData:Registration[]=[];



addRegistrationButton.onclick=()=>{
    let lytis=<HTMLInputElement|null>document.querySelector('input[name="sex"]:checked');
    if (lytis!=null){
        console.log(lytis.value);
    }

    const reg:Registration={
        mark:markInput.value,
        model:modelInput.value,
        year:yearInput.valueAsNumber,
        regNumber:regNumberInput.value,
        phone:phoneInput.value,
    }
    
    fetchRegistrations('registrations','POST', reg)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log("Įrašas pridėtas");
        console.log(data);
    })

};





loadDataButton.onclick=loadData;

loadData();