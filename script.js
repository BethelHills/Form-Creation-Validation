// User Registration Form with Validation and API Integration
document.addEventListener('DOMContentLoaded', () => {
    // Form Selection
    const form = document.getElementById('registration-form');
    const feedbackDiv = document.getElementById('form-feedback');
    
    // Form Submission Event Listener
    form.addEventListener('submit', function(event) {
        // Prevent form from submitting to server
        event.preventDefault();
        
        // Input Retrieval and Trimming
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Validation Logic
        let isValid = true;
        let messages = [];
        
        // Username Validation (minimum 3 characters)
        if (username.length < 3) {
            isValid = false;
            messages.push('Username must be at least 3 characters long');
        }
        
        // Email Validation (must contain @ and .)
        if (!email.includes('@') || !email.includes('.')) {
            isValid = false;
            messages.push('Email must contain @ and . characters');
        }
        
        // Password Validation (minimum 8 characters)
        if (password.length < 8) {
            isValid = false;
            messages.push('Password must be at least 8 characters long');
        }
        
        // Displaying Feedback
        feedbackDiv.style.display = 'block';
        
        if (isValid) {
            feedbackDiv.textContent = 'Registration successful!';
            feedbackDiv.style.color = '#28a745';
        } else {
            feedbackDiv.innerHTML = messages.join('<br>');
            feedbackDiv.style.color = '#dc3545';
        }
    });
    
    // Reset button functionality
    document.querySelector('.reset-btn').addEventListener('click', function() {
        form.reset();
        feedbackDiv.style.display = 'none';
    });
    
    // API Integration - Load User Data
    document.getElementById('load-user-data').addEventListener('click', async function() {
        const userDataDisplay = document.getElementById('user-data-display');
        
        try {
            // Show loading state
            userDataDisplay.innerHTML = '<p>Loading user data...</p>';
            
            // Fetch user data from JSONPlaceholder API
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const users = await response.json();
            
            // Display user data
            userDataDisplay.innerHTML = `
                <h3>Sample Users from API:</h3>
                <div class="users-list">
                    ${users.slice(0, 5).map(user => `
                        <div class="user-card">
                            <h4>${user.name}</h4>
                            <p><strong>Email:</strong> ${user.email}</p>
                            <p><strong>Username:</strong> ${user.username}</p>
                            <p><strong>Phone:</strong> ${user.phone}</p>
                            <p><strong>Website:</strong> ${user.website}</p>
                            <p><strong>Company:</strong> ${user.company.name}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            
        } catch (error) {
            userDataDisplay.innerHTML = `
                <div class="error-message">
                    <h3>Error loading user data</h3>
                    <p>${error.message}</p>
                    <p>Please check your internet connection and try again.</p>
                </div>
            `;
        }
    });
    
    console.log('User Registration Form initialized successfully!');
});

