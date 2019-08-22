document.addEventListener("DOMContentLoaded", event => {
    let match = document.cookie.match(new RegExp('user_id=([^;]+)'));
    
   fetch("http://localhost:3000/users/" + match[1])
   .then(res => {
       return res.json()
   })
   .then(json => {
    //    console.log(json)
       displayPhotos(json)
          
   })
   
   function displayPhotos(json) {  
       json.photos.map(function(photo) {
           create(photo)
       })
       
   }
   
   const userButton = document.getElementById('user');
    userButton.addEventListener("click", event => {
      window.location.href = "http://localhost:8080/login"
    })

    const editButton = document.getElementById('edit');
    editButton.addEventListener("click", event => {
      window.location.href = "http://localhost:8080/index"
    })

   function create(photo) { 
      const div= document.getElementById("photo collection")
      const div2= document.createElement("div")
      const a = document.createElement("a")
      const img = document.createElement("img")
      div2.className="ui three stackable card"
      a.className = "image"
      img.src = photo.url
      a.appendChild(img)
      div2.appendChild(a)
      div.appendChild(div2)
      return div
   }
})