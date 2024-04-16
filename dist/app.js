const markInput = document.getElementById("mark");
const modelInput = document.getElementById("model");
const yearInput = document.getElementById("year");
const regNumberInput = document.getElementById("regNumber");
const phoneInput = document.getElementById("phone");
const addRegistrationButton = document.getElementById("addRegistration");
const loadDataButton = document.getElementById("loadData");
const dataTableBody = document.getElementById("dataTableBody");
const dataTable = document.getElementById("dataTable");
const editForm = document.getElementById("editForm");
let registrationData;
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
const showData = () => {
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
        const tdV = document.createElement("td");
        tr.appendChild(tdMark);
        tr.appendChild(tdModel);
        tr.appendChild(tdNo);
        tr.appendChild(tdV);
        dataTableBody.appendChild(tr);
        tr.onclick = () => {
            dataTable.style.display = "none";
            editForm.style.display = "block";
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
                fetch(`https://registracija-fa201-default-rtdb.europe-west1.firebasedatabase.app/registrations/${reg.id}.json`, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(upReg)
                })
                    .then((response) => {
                    return response.json();
                })
                    .then((data) => {
                    console.log("Įrašas atnaujintas");
                    console.log(data);
                    dataTable.style.display = "block";
                    editForm.style.display = "none";
                    loadData();
                });
            };
        };
    });
};
const loadData = () => {
    fetch("https://registracija-fa201-default-rtdb.europe-west1.firebasedatabase.app/registrations.json", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        // Object.keys(data) - gražina objekto raktų masyvą
        //Masyvas su duomenimis
        registrationData = [];
        //Sukame ciklą per visus objekto raktus
        Object.keys(data).forEach((k) => {
            //Kiekvieną registraciją įkeliame į registrationData masyvą
            // data[k].id=k; id -priskirimas
            // {id:k , ... data[k]}  - paimame visus atributus iš objekto data[k] ir pridedame atributą id kurio reikšmė k
            registrationData.push(Object.assign({ id: k }, data[k]));
        });
        showData();
        console.log(registrationData);
    });
};
loadDataButton.onclick = loadData;
export {};
