document.getElementById("btn").addEventListener('click',() => {

    let email = document.getElementById("email-input").value
    let password = document.getElementById("pw-input").value



    axios.post('https://reqres.in/api/login',{
            "email": email,
            "password": password
        })
        .then(function (response) {
            
        let token = response.data.token
        localStorage.setItem('token',token)
        window.location = "loginSuccess.html"
        console.log("token received", token);
      
        
        }).catch(error => {
            console.log(error);
            alert(error.response.data.error)
            
        })
    
})