import { db, doc, setDoc, getDoc, getDocs, collection, storage, storageRef, uploadBytes, getDownloadURL } from "./config.js";

document.addEventListener("DOMContentLoaded", async function () {
    const userEmail = document.cookie.split("sanitizedEmail=")[1]?.split(";")[0];
  
    if (!userEmail) {
      alert("User not logged in!");
      return;
    }
  
    const levelRows = document.getElementById("level");
    const titleRows = document.getElementById("title");
    const yearRows = document.getElementById("year");
    const notesRows = document.getElementById("notes");
    
  
    // Fetch data from Firestore
  
     // Reference to the SY subcollection
     const honCollectionRef = collection(db, `students/${userEmail}/Hon`);
     const honSnapshot = await getDocs(honCollectionRef);
  
    if (!honSnapshot.empty) {
       // Assuming there's only one school entry, or select the first document
     //const firstDoc = honSnapshot.docs[0];
    // const schoolName = firstDoc.id; // Document ID is the school name
    // const honData = firstDoc.data();
  
  
      // Pre-fill form fields
      //schoolField.value = schoolName || "";
     //curriculumField.value = syData.Curriculum || "";
      //schoolField.value = schoolName || "";
      //curriculumField.value = syData.Curriculum || "";

  
      // Populate subject rows
      if (honData.level && honData.title && honData.year && honData.notes) {
        honData.honors.forEach((honors, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td><input type="text" id="level" value="${honDada.level}" class="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:bg-gray-700 transition duration-200"></td>
            <td><input type="text" id="title" value="${honData.title}" class="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:bg-gray-700 transition duration-200"></td>
            <td><input type="text" id="year" value="${honData.year}" class="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:bg-gray-700 transition duration-200"></td>
            <td><input type="text" id="notes" value="${honData.notes}" class="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:bg-gray-700 transition duration-200"></td>
          `;
          subjectRows.appendChild(row);
        });
      }
  
     
    } else {
      console.log("No previous data found for this user.");
    }
  });


// Event listener for form submission to save data
document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    const allAchievements = document.querySelectorAll("#achievementsTableBody tr");
    console.log
    //const userEmail="adirbhat@gmail.com";
    const userEmail = document.cookie.split("sanitizedEmail=")[1].split(";")[0];

    allAchievements.forEach((row) => {
        const level = row.querySelector('input[id="level"]').value; 
        const title = row.querySelector('input[id="title"]').value;
        const year = row.querySelector('input[id="year"]').value;
        const note = row.querySelector('input[id="notes"]').value;

        if (level && title && year && note) {
            const achievementDocRef = doc(db, `students/${userEmail}/Hon/${title}`);
            setDoc(achievementDocRef, {
                Level: level,
                Title: title,
                Year: year,
                Notes: note,
            })
            .then(() => {
                console.log("Data saved successfully"); // Debugging log
                alert("Data saved successfully");
            })
            .catch((error) => {
                console.error("Error saving data: ", error); // More detailed error logging
                alert("Failed to save data: " + error.message); // Display the actual error message
            });
        }
    });
});