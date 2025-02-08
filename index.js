document.getElementById("show-login").addEventListener("click", function() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
    document.getElementById("options").style.display = "none";
});

document.getElementById("show-register").addEventListener("click", function() {
    document.getElementById("register-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("options").style.display = "none";
});

// Function to Show Options After Login/Register
function showOptions() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "none";
    document.getElementById("options").style.display = "block"; // Show options
}

// Register Button Logic
document.getElementById("register-btn").addEventListener("click", function() {
    alert("Registration successful!");
    showOptions();
});

// Login Button Logic
document.getElementById("login-btn").addEventListener("click", function() {
    alert("Login successful!");
    showOptions();
});
