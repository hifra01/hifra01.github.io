const submitReply = () => {
    const replyTextarea = document.getElementById("discussion-reply-textarea")
    const replyContent = replyTextarea.value

    if (replyContent !== "") {
        const discussionContent = document.getElementById("discussion-content")
        discussionContent.innerHTML += `
        <div class="card discussion-replies">
            <div class="reply-profile">
                <img src="./assets/images/profile_pic.png" class="reply-profile-picture">
                <span class="reply-profile-name">John Doe</span>
            </div>
            <div class="reply-content">
                <p>${replyContent}</p>
            </div>
        </div>
        `
    }

    replyTextarea.value = ''
}

document.addEventListener("DOMContentLoaded", async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const postID = urlParams.get("id")

    const postsJson = await fetch('./assets/posts.json');
    const posts = await postsJson.json();

    posts.posts.forEach(post => {
        if (postID === post.id.toString()) {
            const discussionHeader = document.getElementById('discussion-header')
            discussionHeader.innerHTML = `
            <h2 class="discussion-title">${post.title}</h2>
            <p class="discussion-creator">Dibuat oleh <b>${post.created_by}</b></p>
            `
            const discussionContent = document.getElementById('discussion-content')
            let innerHTMLList = ''

            post.replies.forEach(reply => {
                innerHTMLList += `
                <div class="card discussion-replies">
                    <div class="reply-profile">
                        <img src="./assets/images/profile_pic.png" class="reply-profile-picture">
                        <span class="reply-profile-name">${reply.created_by}</span>
                    </div>
                    <div class="reply-content">
                        <p>${reply.content}</p>
                    </div>
                </div>
                `
            })
            discussionContent.innerHTML = innerHTMLList

            const discussionReplySubmit = document.getElementById('discussion-reply-submit')
            discussionReplySubmit.addEventListener("click", submitReply)

        }
    })


})



