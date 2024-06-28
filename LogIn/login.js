import { db, collection, doc, getDoc } from '../js/config.js'; // Adjust the import as per your Firestore setup

document.getElementById("submit").addEventListener("click", async function (e) {
    e.preventDefault(); 

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Sanitize email address
    const sanitizedEmail = email.replace(/[.#$[\]]/g, "-");

    // Check if email exists in the database
    const userDocRef = doc(db, "students", sanitizedEmail);
    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const storedPassword = userData.password;
            // Check if the entered password matches the stored password
            if (password === storedPassword) {
                alert('Login successful');
                // Store the sanitized email and original email in cookies
                document.cookie = `email=${encodeURIComponent(email)}; path=/;`;
                document.cookie = `sanitizedEmail=${sanitizedEmail}; path=/;`;
                // Redirect to the landing page
                window.location.href = '../index.html'; // Replace with your landing page URL
            } else {
                alert('Incorrect password');
            }
        } else {
            alert('User does not exist');
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        alert('An error occurred. Please try again.');
    }
});