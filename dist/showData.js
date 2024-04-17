import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
export const showData = (registrationData) => {
    let dataTableBody = document.getElementById("dataTableBody");
    dataTableBody.innerHTML = "";
    registrationData.forEach((reg) => {
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
        const tr = document.createElement("tr");
        const tdMark = document.createElement("td");
        tdMark.innerHTML = reg.mark;
        const tdModel = document.createElement("td");
        tdModel.innerHTML = reg.model;
        const tdNo = document.createElement("td");
        tdNo.innerHTML = reg.regNumber;
        tr.appendChild(tdMark);
        tr.appendChild(tdModel);
        tr.appendChild(tdNo);
        dataTableBody.appendChild(tr);
        tr.onclick = () => {
            document.getElementById("dataTable").style.display = "none";
            document.getElementById("editForm").style.display = "block";
            document.getElementById("markEdit").value = reg.mark;
            document.getElementById("modelEdit").value = reg.model;
            document.getElementById("regNumberEdit").value = reg.regNumber;
            document.getElementById("yearEdit").value = reg.year.toString();
            document.getElementById("phoneEdit").value = reg.phone;
            document.getElementById("updateRegistration").onclick = () => {
                const upReg = {
                    mark: document.getElementById("markEdit").value,
                    model: document.getElementById("modelEdit").value,
                    year: document.getElementById("yearEdit").valueAsNumber,
                    regNumber: document.getElementById("regNumberEdit").value,
                    phone: document.getElementById("phoneEdit").value,
                };
                fetchRegistrations(`registrations/${reg.id}`, "PUT", upReg)
                    .then((response) => {
                    return response.json();
                })
                    .then((data) => {
                    console.log("Įrašas atnaujintas");
                    console.log(data);
                    document.getElementById("dataTable").style.display = "block";
                    document.getElementById("editForm").style.display = "none";
                    loadData();
                });
            };
            document.getElementById("deleteRegistration").onclick = () => {
                fetchRegistrations(`registrations/${reg.id}`, "DELETE", null)
                    .then((response) => {
                    return response.json();
                })
                    .then((data) => {
                    document.getElementById("dataTable").style.display = "block";
                    document.getElementById("editForm").style.display = "none";
                    loadData();
                });
            };
        };
    });
};
