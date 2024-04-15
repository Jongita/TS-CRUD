import { Registration } from "./registraion";

const markInput=<HTMLInputElement>document.getElementById("mark");
const modelInput=<HTMLInputElement>document.getElementById("model");
const yearInput=<HTMLInputElement>document.getElementById("year");
const regNumberInput=<HTMLInputElement>document.getElementById("regNumber");
const phoneInput=<HTMLInputElement>document.getElementById("phone");
const addRegistrationButton=<HTMLButtonElement>document.getElementById("addRegistration");

addRegistrationButton.onclick=()=>{
    const reg:Registration={
        mark:markInput.value,
        model:modelInput.value,
        year:yearInput.valueAsNumber,
        regNumber:regNumberInput.value,
        phone:phoneInput.value
    }
    fetch("https://registracija-fa201-default-rtdb.europe-west1.firebasedatabase.app/registrations.json",{
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(reg)
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log("Įrašas pridėtas");
        console.log(data);
    })

};