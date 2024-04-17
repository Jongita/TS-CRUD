import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
import { Registration } from "./registration.js";

export const showData=(registrationData:Registration[])=>{
    let dataTableBody=<HTMLElement>document.getElementById("dataTableBody");
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

        
       
        tr.appendChild(tdMark);
        tr.appendChild(tdModel);
        tr.appendChild(tdNo);
        

        dataTableBody.appendChild(tr);

        tr.onclick=()=>{
            (<HTMLElement>document.getElementById("dataTable")).style.display="none";
            (<HTMLElement>document.getElementById("editForm")).style.display="block";
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
                
                fetchRegistrations(`registrations/${reg.id}`, "PUT", upReg)
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    console.log("Įrašas atnaujintas");
                    console.log(data);
                    (<HTMLElement>document.getElementById("dataTable")).style.display="block";
                    (<HTMLElement>document.getElementById("editForm")).style.display="none";
                    loadData();
                })

                
            }
            (<HTMLButtonElement>document.getElementById("deleteRegistration")).onclick=()=>{

                fetchRegistrations(`registrations/${reg.id}`, "DELETE", null)
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    (<HTMLElement>document.getElementById("dataTable")).style.display="block";
                    (<HTMLElement>document.getElementById("editForm")).style.display="none";
                    loadData();
                });
            };


        }
        
    })

}