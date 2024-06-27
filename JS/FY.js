import { db, doc, setDoc } from './config.js';

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();

    const school = document.getElementById("school").value;
    const curriculum = document.getElementById("curriculum").value;
    const allSubjects = document.querySelectorAll("#subjectsTableBody tr");

    let subjects = [];
    let semester1 = [];
    let semester2 = [];

    allSubjects.forEach((row) => {
        const subject = row.querySelector('input[id="subjects"]').value;
        const s1g = row.querySelector('input[id="s1g"]').value;
        const s2g = row.querySelector('input[id="s2g"]').value;

        subjects.push(subject);
        semester1.push(s1g);
        semester2.push(s2g);
    });

    const file1 = document.getElementById("file1").value;
    const file2 = document.getElementById("file2").value;

    // const userEmail = document.cookie.split("sanitizedEmail=")[1].split(";")[0];
    const userEmail = 'adirbhat@gmail.com';
    // Create a document reference
    const fyDocRef = doc(db, `students/${userEmail}/FY/${school}`);

    // Set the document in Firestore
    setDoc(fyDocRef, {
        School: school,
        Curriculum: curriculum,
        Subjects: subjects,
        Semester1: semester1,
        Semester2: semester2,
        file1: file1,
        file2: file2,
    }).then(() => {
        alert("Data sent successfully");
    }).catch((error) => {
        alert("Error: " + error.message);
    });
}); 