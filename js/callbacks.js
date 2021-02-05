var get = function (url, success, error) {
    var xhr = new window.XMLHttpRequest

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200){
                success(xhr.responseText)
            } else {
                error(xhr)
            }
        }
    }
    xhr.open('GET', url, true);
    xhr.send()
}

var getPosts = function(success, error) {
    get('https://jsonplaceholder.typicode.com/usders', function (response) {
        var users = JSON.parse(response);
        console.log(users[0])
        get('https://jsonplaceholder.typicode.com/comments?userId=' + users[0].id, function (response) {
            var posts = JSON.parse(response)
            success(posts)
        }, function(e){
            error('Erreur ajax', e)
        })
    }, function (e) {
        error('Erreur ajax', e)
    });
}

getPosts(function (posts) {
    console.log('Le premier article ', posts);
}, function(error) {
    console.error(error)
})