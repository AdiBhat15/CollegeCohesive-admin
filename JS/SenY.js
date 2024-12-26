import { db, doc, setDoc, getDoc, getDocs, collection, storage, storageRef, uploadBytes, getDownloadURL } from "./config.js";

document.addEventListener("DOMContentLoaded", async function () {
  const userEmail = document.cookie.split("sanitizedEmail=")[1]?.split(";")[0];

  if (!userEmail) {
    alert("User not logged in!");
    return;
  }

  const schoolField = document.getElementById("school");
  const curriculumField = document.getElementById("curriculum");
  const subjectRows = document.getElementById("subjectRows");
  const file1Input = document.getElementById("file1");
  const file2Input = document.getElementById("file2");

  // Fetch data from Firestore

   // Reference to the SenY subcollection
   const senyCollectionRef = collection(db, `students/${userEmail}/SenY`);
   const senySnapshot = await getDocs(senyCollectionRef);

  if (!senySnapshot.empty) {
     // Assuming there's only one school entry, or select the first document
   const firstDoc = senySnapshot.docs[0];
   const schoolName = firstDoc.id; // Document ID is the school name
   const senyData = firstDoc.data();


    // Pre-fill form fields
    schoolField.value = schoolName || "";
    curriculumField.value = senyData.Curriculum || "";

    // Populate subject rows
    if (senyData.Subjects && senyData.Semester1 && senyData.Semester2) {
      senyData.Subjects.forEach((subject, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><input type="text" id="subjects" value="${subject}" class="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:bg-gray-700 transition duration-200"></td>
          <td><input type="text" id="s1g" value="${senyData.Semester1[index]}" class="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:bg-gray-700 transition duration-200"></td>
          <td><input type="text" id="s2g" value="${senyData.Semester2[index]}" class="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:bg-gray-700 transition duration-200"></td>
        `;
        subjectRows.appendChild(row);
      });
    }

    // Set file inputs (file inputs can't show URLs directly, but we can inform the user)
    if (senyData.file1) {
      const file1Link = document.createElement("a");
      file1Link.href = senyData.file1;
      file1Link.target = "_blank";
      file1Link.textContent = "View Uploaded File 1";
      file1Input.insertAdjacentElement("afterend", file1Link);
    }

    if (senyData.file2) {
      const file2Link = document.createElement("a");
      file2Link.href = senyData.file2;
      file2Link.target = "_blank";
      file2Link.textContent = "View Uploaded File 2";
      file2Input.insertAdjacentElement("afterend", file2Link);
    }
  } else {
    console.log("No previous data found for this user.");
  }
});

// Submit logic remains unchanged
document.getElementById("submit").addEventListener("click", async function (e) {
  e.preventDefault();

  const school = document.getElementById("school").value;
  const curriculum = document.getElementById("curriculum").value;
  const allSubjects = document.querySelectorAll("#subjectRows tr");

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

  const userEmail = document.cookie.split("sanitizedEmail=")[1]?.split(";")[0];
  if (!userEmail) {
    alert("User not logged in!");
    return;
  }

  const file1 = document.getElementById("file1").files[0];
  const file2 = document.getElementById("file2").files[0];

  let file1URL = "";
  let file2URL = "";

  if (file1) {
    const file1Ref = storageRef(storage, `reports/${userEmail}/${file1.name}`);
    const file1Snapshot = await uploadBytes(file1Ref, file1);
    file1URL = await getDownloadURL(file1Snapshot.ref);
  }

  if (file2) {
    const file2Ref = storageRef(storage, `reports/${userEmail}/${file2.name}`);
    const file2Snapshot = await uploadBytes(file2Ref, file2);
    file2URL = await getDownloadURL(file2Snapshot.ref);
  }

  const senyDocRef = doc(db, `students/${userEmail}/SenY/${school}`);

  setDoc(senyDocRef, {
    School: school,
    Curriculum: curriculum,
    Subjects: subjects,
    Semester1: semester1,
    Semester2: semester2,
    file1: file1URL,
    file2: file2URL,
  }).then(() => {
    alert("Data sent successfully");
  }).catch((error) => {
    alert("Error: " + error.message);
  });
});