import { db, collection, getDocs } from '../js/config.js'; // Adjust the import as per your Firestore setup

// DOM Elements
const searchInput = document.querySelector("input[type='text']");
const tableBody = document.querySelector("tbody");

// Fetch all students from Firestore
async function fetchStudents() {
    const studentsCollection = collection(db, "students");
    try {
        const querySnapshot = await getDocs(studentsCollection);
        const students = [];
        querySnapshot.forEach((doc) => {
            students.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return students;
    } catch (error) {
        console.error("Error fetching students:", error);
        alert('An error occurred while fetching student data.');
        return [];
    }
}

// Render the student table
function renderTable(students) {
    tableBody.innerHTML = ""; // Clear existing rows
    if (students.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center py-4 text-gray-500">No students found</td>
            </tr>
        `;
        return;
    }
    students.forEach((student) => {
        const row = document.createElement("tr");
        row.classList.add("border-b", "border-gray-700", "hover:bg-gray-700", "transition");
        row.innerHTML = `
            <td class="px-4 py-2">${student.username || "N/A"}</td>
            <td class="px-4 py-2">${student.email || "N/A"}</td>
            <td class="px-4 py-2">${student.password || "N/A"}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
async function setupSearch() {
    const allStudents = await fetchStudents();
    renderTable(allStudents);

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredStudents = allStudents.filter((student) => 
            (student.name && student.name.toLowerCase().includes(searchTerm)) ||
            (student.email && student.email.toLowerCase().includes(searchTerm))
        );
        renderTable(filteredStudents);
    });
}

// Initialize the script
setupSearch();
