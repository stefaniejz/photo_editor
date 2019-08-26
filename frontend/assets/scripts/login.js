document.addEventListener("DOMContentLoaded", event => {
    const form = document.getElementById("login")
    form.addEventListener("submit", event => {
        event.preventDefault();
        fetch("http://localhost:3000/login", {
          method:"Post",
          headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                    user: {
                    name: event.target[0].value
                
                }
            })      
        })
        .then(res => {
            return res.json()
        })
        .then(json => {
            console.log(json)
            document.cookie = "user_id=" + json.id + "; path=/";
            window.location.href = "http://localhost:8080/index"
        })
    })


})