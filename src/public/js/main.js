$("#loginForm").submit(function (e) {
    e.preventDefault();
    var email=$("#email").val();
    var password=$("#password").val();
    
    
    $.ajax({
        type: "POST",
        url: "/user/authenticate",
        dataType: 'json',
        data: '{"email": "' + email + '", "password" : "' + password + '"}',
        contentType : 'application/json',
        success: function (data) {
            var str= data;
            localStorage.setItem("authUserEmail",str.user.email);
            localStorage.setItem("authUserID",str.user.id);
            localStorage.setItem("authUserName",str.user.name);
            localStorage.setItem("authUserToken",str.token);
            

            /**Swal.fire({
                title: "Success!",
                html: data,
                icon: "success",
            });**/
            window.location='/dashboard';

        },
        error: function (data) {
            Swal.fire({
                title: "Error!",
                html: data.responseJSON.message,
                icon: "error",
            });
            
        },
    });

    return false;
});
