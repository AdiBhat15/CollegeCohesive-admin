document.addEventListener("DOMContentLoaded", function() {
    // Function to retrieve the value of a specific cookie
    function getCookie(cookieName) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Check if this cookie is the one we want
            if (cookie.startsWith(cookieName + '=')) {
                return decodeURIComponent(cookie.substring(cookieName.length + 1));
            }
        }
        return null; // Return null if cookie is not found
    }

    // Function to delete a specific cookie
    function deleteCookie(cookieName) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    // Get the email from the cookie
    const userEmail = getCookie('email');

    // Typewriter effect
    function typeWriterEffect(element, text, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Display the email on the page with typewriter effect
    const emailDisplay = document.getElementById('emailDisplay');
    if (userEmail) {
        const originalEmail = userEmail.replace(/-/g, function(match) {
            return { '-': '.' }[match];
        });
        typeWriterEffect(emailDisplay, `Hello ${originalEmail}`, 100); // Adjust the speed as needed
    } else {
        emailDisplay.textContent = 'No email found in cookie';
    }

    // Logout functionality
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function() {
        // Clear the cookies
        deleteCookie('email');
        deleteCookie('sanitizedEmail');
        // Redirect to the login page
        window.location.href = 'login.html'; // Replace with your login page URL
    });
});
