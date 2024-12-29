import { db, doc, setDoc, getDoc, getDocs, collection, storage, storageRef, uploadBytes, getDownloadURL } from "./config.js";

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