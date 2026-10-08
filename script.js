// Hospital Emergency Management System
// ADS Concept: Priority Queue using JavaScript array

let patients = [];

let patientCounter = 1001;


// ------------------------------------
// Patient Registration
// ------------------------------------

document
    .getElementById("patientForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const age = Number(document.getElementById("age").value);
        const gender = document.getElementById("gender").value;
        const symptoms = document.getElementById("symptoms").value;
        const severity = Number(document.getElementById("severity").value);

        const patient = {

            id: "P" + patientCounter++,

            name: name,

            age: age,

            gender: gender,

            symptoms: symptoms,

            severity: severity,

            arrivalTime: new Date(),

            status: "Waiting"
        };

        patients.push(patient);

        // Sort according to priority
        sortPatients();

        displayPatients();

        updateDashboard();

        this.reset();

        alert(
            "Patient registered successfully!\nPatient ID: "
            + patient.id
        );
    });


// ------------------------------------
// Priority Queue
// ------------------------------------

function sortPatients() {

    patients.sort(function(a, b) {

        // Smaller severity number = higher priority

        if (a.status === "Waiting" &&
            b.status !== "Waiting") {

            return -1;
        }

        if (a.status !== "Waiting" &&
            b.status === "Waiting") {

            return 1;
        }

        if (a.severity !== b.severity) {

            return a.severity - b.severity;
        }

        // If same priority,
        // earlier arrival gets priority

        return a.arrivalTime - b.arrivalTime;
    });
}


// ------------------------------------
// Display Patients
// ------------------------------------

function displayPatients(searchText = "") {

    const table =
        document.getElementById("patientTable");

    table.innerHTML = "";

    const filteredPatients = patients.filter(function(patient) {

        return (
            patient.name
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||

            patient.id
                .toLowerCase()
                .includes(searchText.toLowerCase())
        );
    });


    filteredPatients.forEach(function(patient, index) {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${patient.id}</td>

            <td>${patient.name}</td>

            <td>${patient.age}</td>

            <td>${patient.gender}</td>

            <td>${patient.symptoms}</td>

            <td>
                ${getPriorityBadge(patient.severity)}
            </td>

            <td>
                ${formatTime(patient.arrivalTime)}
            </td>

            <td class="status ${getStatusClass(patient.status)}">
                ${patient.status}
            </td>

            <td>
                ${
                    patient.status === "Waiting"

                    ? `<button onclick="treatPatient('${patient.id}')">
                        Treat
                       </button>`

                    : patient.status === "Treating"

                    ? `<button onclick="completePatient('${patient.id}')">
                        Complete
                       </button>`

                    : `<span>✓ Done</span>`
                }
            </td>
        `;

        table.appendChild(row);
    });
}


// ------------------------------------
// Priority Badge
// ------------------------------------

function getPriorityBadge(severity) {

    switch (severity) {

        case 1:
            return `<span class="badge critical-badge">
                        Critical
                    </span>`;

        case 2:
            return `<span class="badge serious-badge">
                        Serious
                    </span>`;

        case 3:
            return `<span class="badge moderate-badge">
                        Moderate
                    </span>`;

        case 4:
            return `<span class="badge minor-badge">
                        Minor
                    </span>`;
    }
}


// ------------------------------------
// Status CSS Class
// ------------------------------------

function getStatusClass(status) {

    if (status === "Waiting")
        return "waiting";

    if (status === "Treating")
        return "treating";

    return "completed";
}


// ------------------------------------
// Call Next Patient
// ------------------------------------

document
    .getElementById("nextPatient")
    .addEventListener("click", function() {

        sortPatients();

        const nextPatient = patients.find(function(patient) {

            return patient.status === "Waiting";

        });

        if (!nextPatient) {

            alert("No patients waiting.");

            return;
        }

        nextPatient.status = "Treating";

        displayPatients();

        updateDashboard();

        alert(
            "Next Patient:\n\n" +
            "ID: " + nextPatient.id + "\n" +
            "Name: " + nextPatient.name + "\n" +
            "Priority: " +
            getPriorityName(nextPatient.severity)
        );
    });


// ------------------------------------
// Treat Patient
// ------------------------------------

function treatPatient(id) {

    const patient = patients.find(function(patient) {

        return patient.id === id;

    });

    if (patient) {

        patient.status = "Treating";

        displayPatients();

        updateDashboard();
    }
}


// ------------------------------------
// Complete Treatment
// ------------------------------------

function completePatient(id) {

    const patient = patients.find(function(patient) {

        return patient.id === id;

    });

    if (patient) {

        patient.status = "Completed";

        displayPatients();

        updateDashboard();
    }
}


// ------------------------------------
// Search
// ------------------------------------

document
    .getElementById("search")
    .addEventListener("input", function() {

        displayPatients(this.value);

    });


// ------------------------------------
// Dashboard
// ------------------------------------

function updateDashboard() {

    document.getElementById("totalPatients")
        .textContent = patients.length;


    document.getElementById("criticalPatients")
        .textContent =
        patients.filter(function(patient) {

            return patient.severity === 1 &&
                   patient.status !== "Completed";

        }).length;


    document.getElementById("seriousPatients")
        .textContent =
        patients.filter(function(patient) {

            return patient.severity === 2 &&
                   patient.status !== "Completed";

        }).length;


    document.getElementById("normalPatients")
        .textContent =
        patients.filter(function(patient) {

            return patient.severity >= 3 &&
                   patient.status !== "Completed";

        }).length;
}


// ------------------------------------
// Priority Name
// ------------------------------------

function getPriorityName(severity) {

    const names = {

        1: "Critical",
        2: "Serious",
        3: "Moderate",
        4: "Minor"

    };

    return names[severity];
}


// ------------------------------------
// Format Time
// ------------------------------------

function formatTime(date) {

    return date.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });
}


// ------------------------------------
// Sample Patients
// ------------------------------------

patients = [

    {
        id: "P1001",
        name: "Ravi Kumar",
        age: 45,
        gender: "Male",
        symptoms: "Chest Pain",
        severity: 1,
        arrivalTime: new Date(Date.now() - 120000),
        status: "Waiting"
    },

    {
        id: "P1002",
        name: "Sneha Reddy",
        age: 30,
        gender: "Female",
        symptoms: "High Fever",
        severity: 2,
        arrivalTime: new Date(Date.now() - 90000),
        status: "Waiting"
    },

    {
        id: "P1003",
        name: "Rahul Kumar",
        age: 25,
        gender: "Male",
        symptoms: "Minor Injury",
        severity: 4,
        arrivalTime: new Date(Date.now() - 60000),
        status: "Waiting"
    }
];

patientCounter = 1004;

sortPatients();

displayPatients();

updateDashboard();
