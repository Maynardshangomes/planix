// Check if user is already logged in
if (localStorage.getItem('currentUser')) {
    window.location.href = 'index.html';
}

// Handle login form
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const gmail = document.getElementById('gmail').value;
        const password = document.getElementById('password').value;
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find user by Gmail
        const user = users.find(u => u.gmail === gmail && u.password === password);
        
        if (user) {
            // Store current user in localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            alert('Invalid Gmail or password');
        }
    });
}

// Handle signup form
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const gmail = document.getElementById('gmail').value;
        const password = document.getElementById('password').value;
        const instagram = document.getElementById('instagram').value;
        const whatsapp = document.getElementById('whatsapp').value;
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user already exists
        if (users.some(u => u.gmail === gmail)) {
            alert('User already exists with this Gmail');
            return;
        }
        
        // Create new user
        const newUser = {
            name,
            gmail,
            password,
            instagram,
            whatsapp,
            todos: [],
            notes: ""
        };
        
        // Add to users array
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Redirect to app
        window.location.href = 'index.html';
    });
}