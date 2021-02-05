var get = function (url) {
    return new Promise(function(resolve, reject) {
    var xhr = new window.XMLHttpRequest

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200){
                resolve(xhr.responseText)
            } else {
                reject(xhr)
            }
        }
    }
    xhr.open('GET', url, true);
    xhr.send()        
    })
}

var getPosts = function() {
    return get('https://jsonplaceholder.typicode.com/users').then(function (response) {
        var users = JSON.parse(response)
        return get('https://jsonplaceholder.typicode.com/comments?userId=' + users[0].id)
    }).then(function (response) {
        var posts = JSON.parse(response)
        return posts
    })
}

getPosts().then(function (posts) {
    console.log('Le premier article ', posts[0])
}).catch(function(error) {
    console.log(error);
}).then(function() {
    console.log('Fin des requetes AJAX');
})

/**
 * Promesses
 * let p = new Promise(function (resolve, reject) {
 * ...
 * ...
 * resolve(...)
 * })
 * 
 * p.then(function (response) {....})
 * .then(function () {})
 * .then(function () {})
 * .catch(function (error) {...} )
 * 
 */