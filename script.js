// Simulated user data
const users = [
    { username: 'user1', posts: 10, followers: 100, following: 50 },
    { username: 'user2', posts: 5, followers: 80, following: 30 },
];

let currentUser = users[0];

// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        navigateTo(page);
    });
});

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(`${page}-page`).style.display = 'block';
    
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.querySelector(`.nav-item[data-page="${page}"]`).classList.add('active');

    if (page === 'profile') {
        updateProfilePage();
    } else if (page === 'explore') {
        updateExplorePage();
    }
}

// Like functionality
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

// Comment functionality
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

// Profile page functionality
function updateProfilePage() {
    document.getElementById('profile-username').textContent = currentUser.username;
    const stats = document.querySelector('.profile-stats');
    stats.innerHTML = `
        <span><strong>${currentUser.posts}</strong> posts</span>
        <span><strong>${currentUser.followers}</strong> followers</span>
        <span><strong>${currentUser.following}</strong> following</span>
    `;

    // Simulated profile posts
    const profileGrid = document.querySelector('.profile-grid');
    profileGrid.innerHTML = '';
    for (let i = 0; i < currentUser.posts; i++) {
        const post = document.createElement('div');
        post.className = 'profile-grid-item';
        post.innerHTML = `<img src="https://www.familyhandyman.com/wp-content/uploads/2018/02/handcrafted-log-home.jpg?height=200&width=200" alt="Post ${i+1}">`;
        profileGrid.appendChild(post);
    }
}

// Explore page functionality
function updateExplorePage() {
    const exploreGrid = document.querySelector('.explore-grid');
    exploreGrid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const post = document.createElement('div');
        post.className = 'explore-item';
        post.innerHTML = `<img src="https://www.familyhandyman.com/wp-content/uploads/2018/02/handcrafted-log-home.jpg?height=200&width=200" alt="Explore ${i+1}">`;
        exploreGrid.appendChild(post);
    }
}

// Upload functionality
document.getElementById('upload-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('file-input');
    const captionInput = document.getElementById('caption-input');
    
    if (fileInput.files.length > 0) {
        // Simulating post creation
        currentUser.posts++;
        alert('Post uploaded successfully!');
        fileInput.value = '';
        captionInput.value = '';
        navigateTo('home');
    } else {
        alert('Please select an image to upload.');
    }
});

// Initial page load
navigateTo('home');

