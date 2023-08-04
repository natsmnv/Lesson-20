let input = document.getElementById('input');
let button = document.getElementById('send');
let content = document.getElementById('content');
let commentsContent = document.getElementById('commentsContent');

button.addEventListener('click', function () {
    let value = input.value;
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${value}&_limit=1`)
        .then(response => {
            if (!response.ok) {
                throw new Error('There is not this post');
            } else {
                return response.json();
            }
        })
        .then(json => {
            json.forEach(post => {
                content.textContent = post.title;
                let btn = document.createElement('button');
                btn.textContent = 'Show';
                btn.id = 'show';
                content.appendChild(btn);

                btn.addEventListener('click', function () {
                    fetch(`https://jsonplaceholder.typicode.com/posts/${value}/comments`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('There are not any posts');
                            } else {
                                return response.json();
                            }
                        })
                        .then(json => {
                            json.forEach(comments => {
                                let comment = document.createElement('div');
                                comment.textContent = comments.name;
                                commentsContent.appendChild(comment);
                            })
                        })
                        .catch(error => {
                            console.log(error.message);
                        })
                })
            })
        })
        .catch(error => {
            console.log(error.message);
        })
})