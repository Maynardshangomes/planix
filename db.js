// Database operations using localStorage

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Get all users
function getAllUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Update user data
function updateUserData(user) {
    const users = getAllUsers();
    const index = users.findIndex(u => u.gmail === user.gmail);
    if (index !== -1) {
        users[index] = user;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}

// Add a new task
function addTask(task) {
    const user = getCurrentUser();
    if (user) {
        user.todos.push(task);
        updateUserData(user);
    }
}

// Update a task
function updateTask(index, updatedTask) {
    const user = getCurrentUser();
    if (user) {
        user.todos[index] = updatedTask;
        updateUserData(user);
    }
}

// Delete a task
function deleteTask(index) {
    const user = getCurrentUser();
    if (user) {
        user.todos.splice(index, 1);
        updateUserData(user);
    }
}

// Save notes
function saveNotes(notes) {
    const user = getCurrentUser();
    if (user) {
        user.notes = notes;
        updateUserData(user);
    }
}

// Add an alarm
function addAlarm(alarm) {
    const user = getCurrentUser();
    if (user) {
        if (!user.alarms) user.alarms = [];
        user.alarms.push(alarm);
        updateUserData(user);
    }
}

// Delete an alarm
function deleteAlarm(index) {
    const user = getCurrentUser();
    if (user && user.alarms) {
        user.alarms.splice(index, 1);
        updateUserData(user);
    }
}