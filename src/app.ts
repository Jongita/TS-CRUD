import { Registration } from "./registraion";

const markInput=<HTMLInputElement>document.getElementById("mark");
const modelInput=<HTMLInputElement>document.getElementById("model");
const yearInput=<HTMLInputElement>document.getElementById("year");
const regNumberInput=<HTMLInputElement>document.getElementById("regNumber");
const phoneInput=<HTMLInputElement>document.getElementById("phone");
const addRegistrationButton=<HTMLButtonElement>document.getElementById("addRegistration");

const loadDataButton=<HTMLButtonElement>document.getElementById("loadData");
const dataTableBody=<HTMLElement>document.getElementById("dataTableBody");

const dataTable=<HTMLElement>document.getElementById("dataTable");
const editForm=<HTMLElement>document.getElementById("editForm");

let registrationData:Registration[];

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

const showData=()=>{
    dataTableBody.innerHTML="";
    registrationData.forEach((reg)=>{
        /*
        dataTableBody.innerHTML+=`
        <tr>
            <td>${reg.mark}</td>
            <td>${reg.model}</td>
            <td>${reg.regNumber}</td>
            <td></td>
        </tr>
        `;
        */
        const tr=document.createElement("tr");
        
        const tdMark=document.createElement("td");
        tdMark.innerHTML=reg.mark;
        
        const tdModel=document.createElement("td");
        tdModel.innerHTML=reg.model;
        
        const tdNo=document.createElement("td");
        tdNo.innerHTML=reg.regNumber;

        const tdV=document.createElement("td");
       
        tr.appendChild(tdMark);
        tr.appendChild(tdModel);
        tr.appendChild(tdNo);
        tr.appendChild(tdV);

        dataTableBody.appendChild(tr);

        tr.onclick=()=>{
            dataTable.style.display="none";
            editForm.style.display="block";
            (<HTMLInputElement>document.getElementById("markEdit")).value=reg.mark;
            (<HTMLInputElement>document.getElementById("modelEdit")).value=reg.model;
            (<HTMLInputElement>document.getElementById("regNumberEdit")).value=reg.regNumber;
            (<HTMLInputElement>document.getElementById("yearEdit")).value=reg.year.toString();
            (<HTMLInputElement>document.getElementById("phoneEdit")).value=reg.phone;
            (<HTMLButtonElement>document.getElementById("updateRegistration")).onclick=()=>{
                const upReg:Registration={
                    mark:(<HTMLInputElement>document.getElementById("markEdit")).value,
                    model:(<HTMLInputElement>document.getElementById("modelEdit")).value,
                    year:(<HTMLInputElement>document.getElementById("yearEdit")).valueAsNumber,
                    regNumber:(<HTMLInputElement>document.getElementById("regNumberEdit")).value,
                    phone:(<HTMLInputElement>document.getElementById("phoneEdit")).value,
                }
                fetch(`https://registracija-fa201-default-rtdb.europe-west1.firebasedatabase.app/registrations/${reg.id}.json`,{
                    method:"PUT",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(upReg)
                })
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    console.log("Įrašas atnaujintas");
                    console.log(data);
                    dataTable.style.display="block";
                    editForm.style.display="none";
                    loadData();
                })

            }
        }
        
    })

}

const loadData=()=>{
    fetch("https://registracija-fa201-default-rtdb.europe-west1.firebasedatabase.app/registrations.json",{
        method:"GET",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then((response)=>{
        return response.json();
    })
    .then((data: {[key:string]:Registration})=>{
        // Object.keys(data) - gražina objekto raktų masyvą

        //Masyvas su duomenimis
        registrationData=[];

        //Sukame ciklą per visus objekto raktus
        Object.keys(data).forEach((k)=>{
            //Kiekvieną registraciją įkeliame į registrationData masyvą
           // data[k].id=k; id -priskirimas
           // {id:k , ... data[k]}  - paimame visus atributus iš objekto data[k] ir pridedame atributą id kurio reikšmė k
            registrationData.push({id:k,...data[k]});
        })

        showData();
        console.log(registrationData);
    });
}

loadDataButton.onclick=loadData;