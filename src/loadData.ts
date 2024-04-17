import { registrationData } from "./app.js";
import { fetchRegistrations } from "./fetchData.js";
import { Registration } from "./registration.js";
import { showData } from "./showData.js";

export const loadData=()=>{
    fetchRegistrations(`registrations`, "GET", null)
    .then((response)=>{
        return response.json();
    })
    .then((data: {[key:string]:Registration})=>{
        // Object.keys(data) - gražina objekto raktų masyvą

        //Masyvas su duomenimis
        registrationData.splice(0, registrationData.length);//=[];

        //Sukame ciklą per visus objekto raktus
        Object.keys(data).forEach((k)=>{
            //Kiekvieną registraciją įkeliame į registrationData masyvą
           // data[k].id=k; id -priskirimas
           // {id:k , ... data[k]}  - paimame visus atributus iš objekto data[k] ir pridedame atributą id kurio reikšmė k
            registrationData.push({id:k,...data[k]});
        })

        showData(registrationData);
    });
}