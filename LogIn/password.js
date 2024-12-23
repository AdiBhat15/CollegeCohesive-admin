import { app, db, getDoc, updateDoc, doc } from '../js/config.js';

document.getElementById("submit").addEventListener("click", async function (e) {
    e.preventDefault(); 

    var email = document.getElementById("email").value;
    var oldPassword = document.getElementById("oldPassword").value;
    var newPassword = document.getElementById("newPassword").value;

    // Sanitize email address
    const sanitizedEmail = email.replace(/[.#$[\]]/g, "-");

    // Reference to the user document in Firestore
    const userDocRef = doc(db, 'students', sanitizedEmail);

    try {
        const docSnapshot = await getDoc(userDocRef);
        
        if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const storedPassword = userData.password;

            // Compare stored password with the old password provided by the user
            if (oldPassword === storedPassword) {
                // Update password in Firestore
                await updateDoc(userDocRef, { password: newPassword });
                alert('Password updated successfully');
            } else {
                // Old password is incorrect
                alert('Incorrect old password');
            }
        } else {
            // Email doesn't exist in Firestore
            alert('User does not exist');
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        alert('An error occurred. Please try again.');
    }
});
