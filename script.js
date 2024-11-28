// DOM Elements
const mainContent = document.getElementById('main-content');
const navItems = document.querySelectorAll('.nav-item');

// Mock database
let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Navigation functionality
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        loadPage(this.dataset.page);
    });
});

// Page loading function
function loadPage(page) {
    switch(page) {
        case 'home':
            loadHomePage();
            break;
        case 'explore':
            loadExplorePage();
            break;
        case 'upload':
            loadUploadPage();
            break;
        case 'activity':
            loadActivityPage();
            break;
        case 'profile':
            loadProfilePage();
            break;
        default:
            loadHomePage();
    }
}

// Home Page
function loadHomePage() {
    if (!currentUser) {
        loadLoginPage();
        return;
    }
    let postsHTML = '';
    posts.forEach(post => {
        postsHTML += `
            <div class="post">
                <div class="post-header">
                    <img src="${post.userAvatar}" alt="Profile" class="profile-pic">
                    <span class="username">${post.username}</span>
                    <i class="material-icons more-options">more_horiz</i>
                </div>
                <div class="post-image">
                    <img src="${post.imageUrl}" alt="Post content">
                </div>
                <div class="post-actions">
                    <i class="material-icons">favorite_border</i>
                    <i class="material-icons">chat_bubble_outline</i>
                    <i class="material-icons">send</i>
                    <i class="material-icons bookmark">bookmark_border</i>
                </div>
                <div class="post-likes">${post.likes} likes</div>
                <div class="post-caption">
                    <span class="username">${post.username}</span>
                    <span class="caption-text">${post.caption}</span>
                </div>
                <div class="post-comments">
                    ${post.comments.map(comment => `
                        <div class="comment">
                            <span class="username">${comment.username}</span>
                            <span class="comment-text">${comment.text}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="Add a comment...">
                    <button>Post</button>
                </div>
            </div>
        `;
    });
    mainContent.innerHTML = postsHTML || '<p>No posts yet.</p>';
    addPostFunctionality();
}

// Explore Page
function loadExplorePage() {
    if (!currentUser) {
        loadLoginPage();
        return;
    }
    let exploreHTML = '<div class="explore-grid">';
    posts.forEach(post => {
        exploreHTML += `<img src="${post.imageUrl}" alt="Explore image">`;
    });
    exploreHTML += '</div>';
    mainContent.innerHTML = exploreHTML;
}

// Upload Page
function loadUploadPage() {
    if (!currentUser) {
        loadLoginPage();
        return;
    }
    mainContent.innerHTML = `
        <div class="upload-form">
            <input type="file" id="image-upload" accept="image/*">
            <textarea placeholder="Write a caption..."></textarea>
            <button id="upload-button">Share</button>
        </div>
    `;
    document.getElementById('upload-button').addEventListener('click', uploadPost);
}

// Activity Page
function loadActivityPage() {
    if (!currentUser) {
        loadLoginPage();
        return;
    }
    mainContent.innerHTML = `
        <div class="activity-feed">
            <div class="activity-item">
                <img src="/placeholder.svg?height=40&width=40" alt="Profile" class="profile-pic">
                <span class="username">user1</span> liked your post.
            </div>
            <div class="activity-item">
                <img src="/placeholder.svg?height=40&width=40" alt="Profile" class="profile-pic">
                <span class="username">user2</span> started following you.
            </div>
        </div>
    `;
}

// Profile Page
function loadProfilePage() {
    if (!currentUser) {
        loadLoginPage();
        return;
    }
    mainContent.innerHTML = `
        <div class="profile-header">
            <img src="${currentUser.avatar}" alt="Profile" class="profile-pic">
            <div class="profile-info">
                <h2>${currentUser.username}</h2>
                <button onclick="loadEditProfilePage()">Edit Profile</button>
            </div>
        </div>
        <div class="profile-stats">
            <div>${posts.filter(post => post.username === currentUser.username).length} posts</div>
            <div>${currentUser.followers} followers</div>
            <div>${currentUser.following} following</div>
        </div>
        <div class="profile-grid">
            ${posts.filter(post => post.username === currentUser.username)
                .map(post => `<img src="${post.imageUrl}" alt="Profile post">`)
                .join('')}
        </div>
    `;
}

// Login Page
function loadLoginPage() {
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Login</h2>
            <input type="text" id="login-username" placeholder="Username">
            <input type="password" id="login-password" placeholder="Password">
            <button onclick="login()">Login</button>
            <p>Don't have an account? <a href="#" onclick="loadCreateUserPage()">Sign up</a></p>
        </div>
    `;
}

// Create User Page
function loadCreateUserPage() {
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Create Account</h2>
            <input type="text" id="create-username" placeholder="Username">
            <input type="password" id="create-password" placeholder="Password">
            <input type="email" id="create-email" placeholder="Email">
            <button onclick="createUser()">Sign Up</button>
        </div>
    `;
}

// Edit Profile Page
function loadEditProfilePage() {
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Edit Profile</h2>
            <input type="text" id="edit-username" placeholder="Username" value="${currentUser.username}">
            <input type="email" id="edit-email" placeholder="Email" value="${currentUser.email}">
            <input type="text" id="edit-avatar" placeholder="Avatar URL" value="${currentUser.avatar}">
            <textarea id="edit-bio" placeholder="Bio">${currentUser.bio || ''}</textarea>
            <button onclick="updateProfile()">Save Changes</button>
        </div>
    `;
}

// Add functionality to posts
function addPostFunctionality() {
    document.querySelectorAll('.post-actions i').forEach(icon => {
        icon.addEventListener('click', function() {
            if (this.textContent === 'favorite_border') {
                this.textContent = 'favorite';
                this.style.color = '#ff3040';
            } else if (this.textContent === 'favorite') {
                this.textContent = 'favorite_border';
                this.style.color = '#fff';
            }
            
            if (this.textContent === 'bookmark_border') {
                this.textContent = 'bookmark';
            } else if (this.textContent === 'bookmark') {
                this.textContent = 'bookmark_border';
            }
        });
    });

    document.querySelectorAll('.add-comment').forEach(commentSection => {
        const input = commentSection.querySelector('input');
        const button = commentSection.querySelector('button');
        
        button.addEventListener('click', () => {
            if (input.value.trim()) {
                const commentsContainer = commentSection.previousElementSibling;
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <span class="username">${currentUser.username}</span>
                    <span class="comment-text">${input.value}</span>
                `;
                commentsContainer.appendChild(newComment);
                input.value = '';
            }
        });
    });
}

// Upload a post
function uploadPost() {
    const fileInput = document.getElementById('image-upload');
    const caption = document.querySelector('.upload-form textarea').value;

    if (fileInput.files.length > 0 && caption) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const newPost = {
                id: Date.now(),
                username: currentUser.username,
                userAvatar: currentUser.avatar,
                imageUrl: event.target.result,
                caption: caption,
                likes: 0,
                comments: []
            };

            posts.unshift(newPost);
            localStorage.setItem('posts', JSON.stringify(posts));
            alert('Post uploaded successfully!');
            loadHomePage();
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select an image and write a caption.');
    }
}

// Login function
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        loadHomePage();
    } else {
        alert('Invalid username or password');
    }
}

// Create user function
function createUser() {
    const username = document.getElementById('create-username').value;
    const password = document.getElementById('create-password').value;
    const email = document.getElementById('create-email').value;

    if (users.some(u => u.username === username)) {
        alert('Username already exists');
        return;
    }

    const newUser = {
        username,
        password,
        email,
        avatar: '/placeholder.svg?height=150&width=150',
        followers: 0,
        following: 0
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    loadHomePage();
}

// Update profile function
function updateProfile() {
    const username = document.getElementById('edit-username').value;
    const email = document.getElementById('edit-email').value;
    const avatar = document.getElementById('edit-avatar').value;
    const bio = document.getElementById('edit-bio').value;

    if (username !== currentUser.username && users.some(u => u.username === username)) {
        alert('Username already exists');
        return;
    }

    currentUser.username = username;
    currentUser.email = email;
    currentUser.avatar = avatar;
    currentUser.bio = bio;

    const userIndex = users.findIndex(u => u.username === currentUser.username);
    users[userIndex] = currentUser;

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    loadProfilePage();
}

// Initial page load
if (currentUser) {
    loadHomePage();
} else {
    loadLoginPage();
}

