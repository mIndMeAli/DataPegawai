document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});

async function fetchData() {
    const url = "https://script.google.com/macros/s/AKfycbwrN23kEvhBzjvEYA2A6YR_PGQVcn2A_glRNVNHpHXQ_ljZ0uOvNSEmvOA8elBd3UxE/exec";
    try {
        const response = await fetch(url);
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}

function populateTable(data) {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = "";
    
    data.forEach((row, search) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${search + 1}</td>
            <td>${row.NIK}</td>
            <td>${row.Nama}</td>
            <td>${row["Nama Sekolah"]}</td>
            <td>${row.Status}</td>
            <td>${row.Disetujui}</td>
            <td>${row.Pengangkatan}</td>
            <td>${row.Jabatan}</td>
            <td>${row.NIP}</td>
        `;
        tbody.appendChild(tr);
    });
}

function filterTable() {
    let input = document.getElementById("search").value.toLowerCase().trim();
    let jabfil = document.getElementById("jabfil").value.toLowerCase().trim();
    let rows = document.querySelectorAll("#dataTable tbody tr");
    let table = document.getElementById("dataTable");
    let noDataMessage = document.getElementById("noDataMessage");
    let noInput = document.getElementById("noInput");

    if (input === "" && jabfil === "") {
        noInput.style.display = "block";
        noDataMessage.style.display = "none";
        table.style.display = "none";
        return;
    } else {
        noInput.style.display = "none";
    }

    let found = false;

    rows.forEach(row => {
        let nama = row.children[2].textContent.toLowerCase().trim();
        let nip = row.children[8].textContent.toLowerCase().trim();
        let jabatan = row.children[7].textContent.toLowerCase().trim();

        let matchesSearch = (nama.includes(input) || nip.includes(input));
        let matchesJabatan = jabfil === "" || jabatan.includes(jabfil.toLowerCase());

        if (matchesSearch && matchesJabatan) {
            row.style.display = "";
            found = true;
        } else {
            row.style.display = "none";
        }
    });
    table.style.display = found ? "table" : "none";
    noDataMessage.style.display = found ? "none" : "block";
}