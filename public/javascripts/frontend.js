
$(document).ready(function(){
    $("#signup-form").submit(function(e){
        return false;
    });
    
    $("#signup").on('click', function(e){
        let username = $("#inputName").val();
        let email = $("#inputEmail").val();
        let password = $("#inputPassword").val();
        let data = {
            username, password, email
        };

        let flashMsg = $("#flashMessage");

        axios.post('/api/signup', data)
          .then(function (response) {
            let res = response.data;
            flashMsg.html(res.message);
            flashMsg.removeClass('alert-danger')
            flashMsg.fadeIn();

            if(res.success) {
              flashMsg.addClass('alert-success');
              location.reload();
            } else {
              flashMsg.addClass('alert-danger');
            }
            
            flashMsg.fadeOut(5000)
        }).catch(function (error) {
            flashMsg.addClass('alert-danger');
            flashMsg.html("Failed to connect to server");
            flashMsg.fadeOut(5000);
        });
    });

    $(".form-signin").submit(function(e){
        return false;
    });
    
    $("#login").on("click", () => {
        let email = $("#inputEmail").val();
        let password = $("#inputPassword").val();
        let data = {
            email, password
        };

        let flashMsg = $("#flashMessage");

        axios.post("/api/login", data).then((res) => {
            flashMsg.html(res.data.message);
            flashMsg.removeClass('alert-danger');
            flashMsg.fadeIn();

            if(res.data.success){
                flashMsg.addClass('alert-success'); 
                location.reload();
            } else {
                flashMsg.addClass('alert-danger');
            }

            flashMsg.fadeOut(3000)
                
        }).catch((err) => {
            flashMsg.addClass('alert-danger')
            flashMsg.html("Failed to connect to the server")
            flashMsg.fadeOut(3000)
        });
    });

    
});

