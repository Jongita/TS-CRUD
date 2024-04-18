import { loginExec, registerExec } from "./auth.js";
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

export const userInfo={
    email:"",
    idToken:"",
    loggedin:false,
};

// Paslėpiame duomenų sekciją ir įjungiame rodyti prisijungimo sekciją
(<HTMLElement>document.getElementById("loginSection")).style.display="block";
(<HTMLElement>document.getElementById("dataSection")).style.display="none";
(<HTMLElement>document.getElementById("loginError")).style.display="none";



loadDataButton.onclick=loadData;

//Registracijos URL
//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZuYggKgrCTnZfT9yn6NIeRFV0LmgY8tg

//Prisijungimui URL
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZuYggKgrCTnZfT9yn6NIeRFV0LmgY8tg

//Registracijos išbandymas
/*
(<HTMLButtonElement>document.getElementById("login")).onclick=()=>{
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZuYggKgrCTnZfT9yn6NIeRFV0LmgY8tg",{
        method:"POST",
        headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email:"g.gricius@ituostas.lt",
            password:"LabasRytas",
            returnSecureToken:true,
    
        })
    })
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
     console.log(data);
     userInfo.email=data.email;
     userInfo.idToken=data.idToken;
     userInfo.loggedin=true;
     (<HTMLElement>document.getElementById("loginSection")).style.display="none";
     (<HTMLElement>document.getElementById("dataSection")).style.display="block";
     loadData();
    });
}

*/
//
// Mygtukam login ir register priskiriame f-jas iš auth.ts failo
(<HTMLButtonElement>document.getElementById("login")).onclick=loginExec;
(<HTMLButtonElement>document.getElementById("register")).onclick=registerExec;