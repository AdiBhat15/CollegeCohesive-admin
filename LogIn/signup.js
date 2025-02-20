import { db, doc, setDoc } from '../js/config.js';

(function () {
    emailjs.init({
      publicKey: "3VA3g3af412nzsdRj",
    });
})();

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();

    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let password = "";
    const passwordLength = 12;
    for (let i = 0; i < passwordLength; i++) {
        const randomType = Math.floor(Math.random() * 3);
        if (randomType === 0) {
            password += letters.charAt(Math.floor(Math.random() * letters.length));
        } else if (randomType === 1) {
            password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        } else {
            password += symbols.charAt(Math.floor(Math.random() * symbols.length));
        }
    }
    console.log("Generated Password:", password);
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    // Sanitize email address
    const sanitizedEmail = email.replace(/[.#$[\]]/g, "-");

    sendPasswordEmail(email, password);

    const studentRef = doc(db, "students", sanitizedEmail);
    setDoc(studentRef, {
        username: username,
        email: email,
        password: password
    }).then(() => {
        console.log("Data added to Firestore");
    }).catch((error) => {
        console.error("Error adding data to Firestore: ", error);
    });
});

document.getElementById("login").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = 'login.html';
});

function sendPasswordEmail(email, password) {
    console.log(email);
    emailjs.send("service_oqxc76t", "template_hynz0g6", {
        to_email: email,
        subject: "Your New Password",
        message: `Your autogenerated password is: ${password}`
    }).then(function(response) {
        alert("Email sent successfully!");
        console.log("SUCCESS", response);
    }, function(error) {
        alert("Failed to send email. Please try again.");
        console.log("FAILED", error);
    });
}