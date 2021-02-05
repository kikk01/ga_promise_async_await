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

var getPosts = async function() {
    try {
        var response = await get('https://jsonplaceholder.typicode.com/ufsers')
        var users = JSON.parse(response)
        response = await get('https://jsonplaceholder.typicode.com/comments?userId=' + users[0].id)
        var posts = JSON.parse(response)
        return posts        
    } catch (e) {
        console.log('il y a eu un problème', e);
    }

}

var getFirstPost = async function() {
    try {
        var posts = await getPosts()
        return posts[0]        
    } catch (e) {
        console.log('il y a eu un problème', e);
    }
   
}

var demo = async function () {
    var arr = await Promise.all([getPosts(), getFirstPost()])
    console.log(arr);
}

demo()