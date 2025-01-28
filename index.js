// Toggle the auth-menu when hamburger icon is clicked
const menuToggle = document.getElementById('menuToggle');
const authMenu = document.getElementById('authMenu');

menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    authMenu.classList.toggle('active'); // Toggle 'active' class
});

// Close the auth-menu if clicked outside
document.addEventListener('click', function(e) {
    if (!authMenu.contains(e.target) && e.target !== menuToggle) {
        authMenu.classList.remove('active');
    }
});

// Form submission using Fetch API to prevent page reload
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the default form submission

    const form = e.target;
    const formData = new FormData(form);
    
    // Submit the form data using Fetch API
    fetch(form.action, {
        method: form.method,
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            document.getElementById("form-message").innerHTML = "<p>Query submitted successfully! Thank you.</p>";
            form.reset(); // Optionally reset the form fields
        } else {
            // Show failure message
            document.getElementById("form-message").innerHTML = "<p>There was an issue submitting the form. Please try again.</p>";
        }
    })
    .catch(error => {
        // Show error message if something goes wrong
        document.getElementById("form-message").innerHTML = "<p>There was an issue submitting the form. Please try again.</p>";
    });
});