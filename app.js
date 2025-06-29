// Main app functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Initialize the app
    initApp(currentUser);
    
    // Set up event listeners
    setupEventListeners();
});

function initApp(user) {
    // Display user info
    document.getElementById('userName').textContent = user.name;
    document.getElementById('profilePic').textContent = user.name.charAt(0).toUpperCase();
    
    // Display social info
    document.getElementById('instagramId').textContent = user.instagram ? `ID: ${user.instagram}` : 'ID: Not set';
    document.getElementById('whatsappNumber').textContent = user.whatsapp ? `Number: ${user.whatsapp}` : 'Number: Not set';
    document.getElementById('gmailAddress').textContent = user.gmail ? `Email: ${user.gmail}` : 'Email: Not set';
    
    // Load notes
    if (user.notes) {
        document.getElementById('notesArea').value = user.notes;
    }
    
    // Load tasks in weekly view
    if (user.todos) {
        renderTasks(user.todos);
    }
    
    // Load alarms
    if (user.alarms) {
        renderAlarms(user.alarms);
    }
    
    // Update date and time
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Check alarms
    setInterval(checkAlarms, 1000);
    
    // Highlight today's column
    highlightToday();
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
    
    // Logout
    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
    });
    
    // Add task
    document.getElementById('addTaskBtn').addEventListener('click', addNewTask);
    document.getElementById('newTask').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addNewTask();
    });
    
    // Task categories
    document.querySelectorAll('.category').forEach(cat => {
        cat.addEventListener('click', function() {
            document.querySelector('.category.active').classList.remove('active');
            this.classList.add('active');
            filterTasks(this.dataset.category);
        });
    });
    
    // Timer controls
    document.getElementById('startTimer').addEventListener('click', startTimer);
    document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
    document.getElementById('resetTimer').addEventListener('click', resetTimer);
    
    // Set alarm
    document.getElementById('setAlarm').addEventListener('click', setAlarm);
    
    // Save notes
    document.getElementById('saveNotes').addEventListener('click', saveUserNotes);
    
    // Message buttons
    document.querySelectorAll('.message-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            openMessagePlatform(platform);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update active nav item
    document.querySelectorAll('nav li').forEach(li => {
        li.classList.remove('active');
        if (li.querySelector('a').getAttribute('href') === `#${sectionId}`) {
            li.classList.add('active');
        }
    });
}

function updateDateTime() {
    const now = new Date();
    
    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString(undefined, options);
    
    // Format time
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    document.getElementById('currentTime').textContent = `${hours}:${minutes} ${ampm}`;
}

// Task functions
function addNewTask() {
    const taskInput = document.getElementById('newTask');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        const taskTime = document.getElementById('taskTime').value || '';
        const taskDate = document.getElementById('taskDate').value || '';
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            time: taskTime,
            date: taskDate,
            createdAt: new Date().toISOString()
        };
        
        addTask(newTask);
        renderTasks(getCurrentUser().todos);
        
        // Clear inputs
        taskInput.value = '';
        document.getElementById('taskTime').value = '';
        document.getElementById('taskDate').value = '';
    }
}

function renderTasks(tasks) {
    // Clear all day columns
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
        const dayContainer = document.getElementById(`${day}-tasks`);
        if (dayContainer) {
            dayContainer.innerHTML = '';
        }
    });
    
    if (!tasks || tasks.length === 0) {
        days.forEach(day => {
            const dayContainer = document.getElementById(`${day}-tasks`);
            if (dayContainer) {
                dayContainer.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; font-size: 12px;">No tasks</p>';
            }
        });
        updateTaskSummary(0, 0, 0);
        return;
    }
    
    // Group tasks by day of the week
    const tasksByDay = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    };
    
    let totalTasks = 0;
    let completedTasks = 0;
    let pendingTasks = 0;
    
    tasks.forEach((task, index) => {
        totalTasks++;
        if (task.completed) {
            completedTasks++;
        } else {
            pendingTasks++;
        }
        
        let dayOfWeek = 'monday'; // default
        
        if (task.date) {
            const taskDate = new Date(task.date);
            const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            dayOfWeek = dayNames[taskDate.getDay()];
        }
        
        if (tasksByDay[dayOfWeek]) {
            tasksByDay[dayOfWeek].push({ ...task, originalIndex: index });
        }
    });
    
    // Render tasks for each day
    days.forEach(day => {
        const dayContainer = document.getElementById(`${day}-tasks`);
        if (!dayContainer) return;
        
        const dayTasks = tasksByDay[day];
        
        if (dayTasks.length === 0) {
            dayContainer.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; font-size: 12px;">No tasks</p>';
            return;
        }
        
        dayTasks.forEach(taskData => {
            const taskItem = document.createElement('div');
            taskItem.className = 'day-task-item' + (taskData.completed ? ' completed' : '');
            
            const taskHeader = document.createElement('div');
            taskHeader.className = 'day-task-header';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
            checkbox.className = 'day-task-checkbox';
            checkbox.checked = taskData.completed;
        checkbox.addEventListener('change', function() {
                taskData.completed = this.checked;
                updateTask(taskData.originalIndex, taskData);
                taskItem.classList.toggle('completed', taskData.completed);
                updateTaskSummary();
        });
        
        const taskText = document.createElement('span');
            taskText.className = 'day-task-text' + (taskData.completed ? ' completed' : '');
            taskText.textContent = taskData.text;
            
            taskHeader.appendChild(checkbox);
            taskHeader.appendChild(taskText);
        
            const taskTime = document.createElement('div');
            taskTime.className = 'day-task-time';
        
            if (taskData.time || taskData.date) {
            let timeInfo = '';
                if (taskData.date) {
                    const date = new Date(taskData.date);
                timeInfo += date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            }
                if (taskData.time) {
                if (timeInfo) timeInfo += ' • ';
                    const [hours, minutes] = taskData.time.split(':');
                let time = `${hours % 12 || 12}:${minutes}`;
                if (hours >= 12) time += ' PM';
                else time += ' AM';
                timeInfo += time;
            }
            taskTime.textContent = timeInfo;
        }
        
        const taskActions = document.createElement('div');
            taskActions.className = 'day-task-actions';
        
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.title = 'Edit';
        editBtn.addEventListener('click', function() {
                editTask(taskData.originalIndex, taskData);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.title = 'Delete';
        deleteBtn.addEventListener('click', function() {
                deleteTask(taskData.originalIndex);
            renderTasks(getCurrentUser().todos);
        });
        
        taskActions.appendChild(editBtn);
        taskActions.appendChild(deleteBtn);
        
            taskItem.appendChild(taskHeader);
        taskItem.appendChild(taskTime);
        taskItem.appendChild(taskActions);
        
            dayContainer.appendChild(taskItem);
    });
    });
    
    // Update task summary
    updateTaskSummary(totalTasks, completedTasks, pendingTasks);
    
    // Highlight today's column
    highlightToday();
}

function updateTaskSummary(total = null, completed = null, pending = null) {
    if (total === null) {
        const tasks = getCurrentUser().todos || [];
        total = tasks.length;
        completed = tasks.filter(task => task.completed).length;
        pending = total - completed;
    }
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}

function highlightToday() {
    const today = new Date().getDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayName = dayNames[today];
    
    // Remove previous today class
    document.querySelectorAll('.day-column').forEach(col => {
        col.classList.remove('today');
    });
    
    // Add today class to current day
    const todayColumn = document.querySelector(`[data-day="${todayName}"]`);
    if (todayColumn) {
        todayColumn.classList.add('today');
    }
}

function editTask(index, task) {
    const newText = prompt('Edit task:', task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        updateTask(index, task);
        renderTasks(getCurrentUser().todos);
    }
}

function filterTasks(category) {
    const tasks = getCurrentUser().todos || [];
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    let filteredTasks = [];
    
    switch (category) {
        case 'all':
            filteredTasks = tasks;
            break;
        case 'today':
            filteredTasks = tasks.filter(task => task.date === today);
            break;
        case 'upcoming':
            filteredTasks = tasks.filter(task => task.date && task.date > today);
            break;
        case 'completed':
            filteredTasks = tasks.filter(task => task.completed);
            break;
        default:
            filteredTasks = tasks;
    }
    
    renderTasks(filteredTasks);
}

// Timer functions
let timerInterval;
let timerSeconds = 25 * 60; // 25 minutes
let isTimerRunning = false;

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

function resetTimer() {
    pauseTimer();
    const focusMinutes = parseInt(document.getElementById('focusDuration').value) || 25;
    timerSeconds = focusMinutes * 60;
    updateTimerDisplay();
}

function updateTimer() {
    timerSeconds--;
    updateTimerDisplay();
    
    if (timerSeconds <= 0) {
        pauseTimer();
        alert('Timer completed!');
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    document.getElementById('timerTime').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Alarm functions
function setAlarm() {
    const alarmTime = document.getElementById('alarmTime').value;
    const alarmLabel = document.getElementById('alarmLabel').value.trim() || 'Alarm';
    
    if (alarmTime) {
        const newAlarm = {
            time: alarmTime,
            label: alarmLabel,
            active: true
        };
        
        addAlarm(newAlarm);
        renderAlarms(getCurrentUser().alarms);
        
        // Clear inputs
        document.getElementById('alarmTime').value = '';
        document.getElementById('alarmLabel').value = '';
    }
}

function renderAlarms(alarms) {
    const container = document.getElementById('alarmsContainer');
    container.innerHTML = '';
    
    if (!alarms || alarms.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center;">No alarms set</p>';
        return;
    }
    
    alarms.forEach((alarm, index) => {
        const alarmItem = document.createElement('li');
        alarmItem.className = 'alarm-item';
        
        const alarmTime = document.createElement('span');
        alarmTime.className = 'alarm-time';
        
        // Format time (convert 24h to 12h)
        const [hours, minutes] = alarm.time.split(':');
        let time = `${hours % 12 || 12}:${minutes}`;
        if (hours >= 12) time += ' PM';
        else time += ' AM';
        
        alarmTime.textContent = time;
        
        const alarmLabel = document.createElement('span');
        alarmLabel.className = 'alarm-label';
        alarmLabel.textContent = alarm.label;
        
        const alarmActions = document.createElement('div');
        alarmActions.className = 'alarm-actions';
        
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = alarm.active ? '<i class="fas fa-bell-slash"></i>' : '<i class="fas fa-bell"></i>';
        toggleBtn.addEventListener('click', function() {
            toggleAlarm(index);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', function() {
            deleteAlarm(index);
            renderAlarms(getCurrentUser().alarms);
        });
        
        alarmActions.appendChild(toggleBtn);
        alarmActions.appendChild(deleteBtn);
        
        alarmItem.appendChild(alarmTime);
        alarmItem.appendChild(alarmLabel);
        alarmItem.appendChild(alarmActions);
        
        container.appendChild(alarmItem);
    });
}

function toggleAlarm(index) {
    const user = getCurrentUser();
    if (user && user.alarms) {
        user.alarms[index].active = !user.alarms[index].active;
        updateUserData(user);
        renderAlarms(user.alarms);
    }
}

function checkAlarms() {
    const user = getCurrentUser();
    if (!user || !user.alarms) return;
    
    const now = new Date();
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;
    
    user.alarms.forEach(alarm => {
        if (alarm.active && alarm.time === currentTime) {
            alert(`ALARM: ${alarm.label}`);
            alarm.active = false; // Turn off after triggering
            updateUserData(user);
        }
    });
}

// Notes functions
function saveUserNotes() {
    const notes = document.getElementById('notesArea').value;
    saveNotes(notes);
    alert('Notes saved!');
}

// Message platform functions
function openMessagePlatform(platform) {
    const user = getCurrentUser();
    let url = '';
    
    switch (platform) {
        case 'instagram':
            if (user.instagram) {
                url = `https://instagram.com/${user.instagram}`;
                window.open(url, '_blank');
            } else {
                alert('Instagram ID not set in your profile');
            }
            break;
        case 'whatsapp':
            if (user.whatsapp) {
                url = `https://wa.me/${user.whatsapp}`;
                window.open(url, '_blank');
            } else {
                alert('WhatsApp number not set in your profile');
            }
            break;
        case 'gmail':
            if (user.gmail) {
                url = `https://mail.google.com/mail/?view=cm&to=${user.gmail}`;
                window.open(url, '_blank');
            } else {
                alert('Gmail not set in your profile');
            }
            break;
    }
}