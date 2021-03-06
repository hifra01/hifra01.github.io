document.addEventListener('DOMContentLoaded', async () => {
    const postsJson = await fetch('./assets/posts.json');
    const posts = await postsJson.json();

    const preferencesJson = await fetch('./assets/preferences.json');
    const preferences = await preferencesJson.json();

    const followedDiscussions = preferences.followed_discussions;

    const followedDiscussionsContainer = document.getElementById('followed-discussions-container');

    let innerPostsHTML = '';

    posts.posts.forEach(post => {
        if (followedDiscussions.includes(post.id)) {
            innerPostsHTML += `
            <a href="./post.html?id=${post.id}" class="post-card-link"><div class="card post-card">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-creator">Dibuat oleh <b>${post.created_by}</b></p>
                <div class="post-topics">
                    ${post.topics.map(topic => `
                    <div class="topics-item"><p>${topic}</p></div>
                    `).join('')}
                </div>
            </div></a>
            `
        }
    });
    followedDiscussionsContainer.innerHTML = innerPostsHTML;
});

