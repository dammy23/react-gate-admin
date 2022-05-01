
/*------------------------------------------------------------------
* Bootstrap Simple Admin Template
* Version: 3.0
* Author: Alexis Luna
* Website: https://github.com/alexis-luna/bootstrap-simple-admin-template
-------------------------------------------------------------------*/
//const { $ } = require("../vendor/chartsjs/chunks/helpers.segment");

(function() {
    'use strict';



    var dtable;
    // Toggle sidebar on Menu button click
    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
        $('#body').toggleClass('active');
    });
    $("#userName").html(" "+window.localStorage.getItem("authUserName"));
    $("#userEmail").html('<i class="fas fa-envelope"></i> '+window.localStorage.getItem("authUserEmail"));

    $("#inviteForm").submit(function (e) {
        e.preventDefault();
       var formData = new FormData($(this)[0]);
        $.ajax({
            type: "POST",
            url: "/invitation/create",
            data: formData,
            processData: false,
            contentType: false,
            headers: {"Authorization":localStorage.getItem('authUserToken')},
            success: function (data) {
                console.log(data);
                Swal.fire({
                    title: "Success!",
                    html: "<h4>Invite Added</h4>",
                    icon: "success",
                });
                $("#inviteForm").trigger("reset");
                window.location='/invitations';
    
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

    $("#inviteFormUpdate").submit(function (e) {
        e.preventDefault();
       var formData = new FormData($(this)[0]);
       //alert(localStorage.getItem('authUserToken'));

        $.ajax({
            type: "PUT",
            url: "/invitation/update/"+$("#recid").val(),
            data: formData,
            processData: false,
            contentType: false,
            headers: {"Authorization":localStorage.getItem('authUserToken')},
            success: function (data) {
                console.log(data);
                Swal.fire({
                    title: "Success!",
                    html: "<h4>Invite Updated</h4>",
                    icon: "success",
                });
                $("#inviteFormUpdate").trigger("reset");
                window.location='/invitations';
    
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


    

    

    $(".edit-invite").click(function(){
        var name=$(this).data("name");
        var email=$(this).data("email");
        var phone=$(this).data("phone");
        var image=$(this).data("image");
        var people=$(this).data("people");
        var expiry=$(this).data("expiry");
        var check=$(this).data("check-visitor");
        var entry=$(this).data("entry");
        
        
        var id=$(this).data("id");
        $("#visitor_name").val(name);
        $("#visitor_email").val(email);
        $("#visitor_phone").val(phone);
        $("#no_of_people").val(people);
        $("#expiry_date").val(expiry);
        if(check){
            $("#check_visitor").prop("checked", true);
        }else{
            $("#check_visitor").prop("checked", false);
        }

        if(entry){
            $("#multiple_entry_exit").prop("checked", true);
        }else{
            $("#multiple_entry_exit").prop("checked", false);
        }

        
        $("#recid").val(id);
        $("#image").prop("src","/uploads/"+image);
        $("#btnModal").trigger("click"); 
    });
    
   

    $(".delete-invite").click(function(){
        if(confirm("Do you really want to delete this invite ?")){
            var id=$(this).data("id");
            $.ajax({
                type: "DELETE",
                url: "/invitation/delete/"+id,
                processData: false,
                contentType: false,
                headers: {"Authorization":localStorage.getItem('authUserToken')},
                success: function (data) {
                    console.log(data);
                    Swal.fire({
                        title: "Success!",
                        html: "<h4>Invite Deleted</h4>",
                        icon: "success",
                    });
                
                    window.location='/invitations';
        
                },
                error: function (data) {

                    Swal.fire({
                        title: "Error!",
                        html: data.responseJSON.message,
                        icon: "error",
                    });
                    
                },
            });
        

        }

    });





// user page script
    $("#userForm").submit(function (e) {
        e.preventDefault();
        var object = {};
        var formData = new FormData($(this)[0]);
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
        
        $.ajax({
            type: "POST",
            url: "/user/create",
            dataType: 'json',
            data: json,
            contentType : 'application/json',
            headers: {"Authorization":localStorage.getItem('authUserToken')},
            success: function (data) {
                console.log(data);
                Swal.fire({
                    title: "Success!",
                    html: "<h4>User Added</h4>",
                    icon: "success",
                });
                $("#userForm").trigger("reset");
                window.location='/users';
      
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
      
      $("#userFormUpdate").submit(function (e) {
        e.preventDefault();
        var object = {};
        var formData = new FormData($(this)[0]);
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
      
        $.ajax({
            type: "PUT",
            url: "/user/update/"+$("#recid").val(),
            dataType: 'json',
            data: json,
            contentType : 'application/json',
            headers: {"Authorization":localStorage.getItem('authUserToken')},
            success: function (data) {
                //console.log(data);
                Swal.fire({
                    title: "Success!",
                    html: "<h4>User Updated</h4>",
                    icon: "success",
                });
                $("#userFormUpdate").trigger("reset");
                window.location='/users';
      
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

      

    $(".delete-user").click(function(){
        if(confirm("Do you really want to delete this user ?")){
            var id=$(this).data("id");
            $.ajax({
                type: "DELETE",
                url: "/user/delete/"+id,
                processData: false,
                contentType: false,
                headers: {"Authorization":localStorage.getItem('authUserToken')},
                success: function (data) {
                    console.log(data);
                    Swal.fire({
                        title: "Success!",
                        html: "<h4>User Deleted</h4>",
                        icon: "success",
                    });
                
                    window.location='/users';
        
                },
                error: function (data) {
    
                    Swal.fire({
                        title: "Error!",
                        html: data.responseJSON.message,
                        icon: "error",
                    });
                    
                },
            });
        
    
        }
    
    });
  
    $(".edit-user").click(function(){
        var name=$(this).data("name");
        var email=$(this).data("email");
        var type=$(this).data("type");
        var house=$(this).data("house");
        var street=$(this).data("street");
        var guard=$(this).data("guard");
        var id=$(this).data("id");
        $("#user_name").val(name);
        $("#recid").val(id);
        $("#type").val(type);
        $("#email").val(email); 
        $("#street_name").val(street); 
        $("#house_number").val(house);
        $("#guard_id").val(guard);
        $("#btnModal").trigger("click");

       

    });
    
    
    
    /// settings page scripts


    $("#settingForm").submit(function (e) {
        e.preventDefault();
        var object = {};
        var formData = new FormData($(this)[0]);
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
        
        $.ajax({
            type: "POST",
            url: "/setting/create",
            dataType: 'json',
            data: json,
            contentType : 'application/json',
            headers: {"Authorization":localStorage.getItem('authUserToken')},
            success: function (data) {
                console.log(data);
                Swal.fire({
                    title: "Success!",
                    html: "<h4>Setting Added</h4>",
                    icon: "success",
                });
                $("#settingForm").trigger("reset");
                window.location='/settings';
      
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
      
      $("#settingFormUpdate").submit(function (e) {
        e.preventDefault();
        var object = {};
        var formData = new FormData($(this)[0]);
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
      
        $.ajax({
            type: "PUT",
            url: "/setting/update/"+$("#recid").val(),
            dataType: 'json',
            data: json,
            contentType : 'application/json',
            headers: {"Authorization":localStorage.getItem('authUserToken')},
            success: function (data) {
                //console.log(data);
                Swal.fire({
                    title: "Success!",
                    html: "<h4>Setting Updated</h4>",
                    icon: "success",
                });
                $("#settingFormUpdate").trigger("reset");
                window.location='/settings';
      
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

      

    $(".delete-setting").click(function(){
        if(confirm("Do you really want to delete this setting ?")){
            var id=$(this).data("id");
            $.ajax({
                type: "DELETE",
                url: "/setting/delete/"+id,
                processData: false,
                contentType: false,
                headers: {"Authorization":localStorage.getItem('authUserToken')},
                success: function (data) {
                    console.log(data);
                    Swal.fire({
                        title: "Success!",
                        html: "<h4>Setting Deleted</h4>",
                        icon: "success",
                    });
                
                    window.location='/settings';
        
                },
                error: function (data) {
    
                    Swal.fire({
                        title: "Error!",
                        html: data.responseJSON.message,
                        icon: "error",
                    });
                    
                },
            });
        
    
        }
    
    });
  
    $(".edit-setting").click(function(){
        var name=$(this).data("name");
        var value=$(this).data("value");
        var id=$(this).data("id");
        $("#setting_name").val(name);
        $("#recid").val(id);
        $("#value").val(value);
        $("#btnModal").trigger("click");

       

    });
    


    //tenants section




// tenant page script
$("#tenantForm").submit(function (e) {
    e.preventDefault();
    var object = {};
    var formData = new FormData($(this)[0]);
    formData.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);
    
    $.ajax({
        type: "POST",
        url: "/tenant/create",
        dataType: 'json',
        data: json,
        contentType : 'application/json',
        headers: {"Authorization":localStorage.getItem('authUserToken')},
        success: function (data) {
            console.log(data);
            Swal.fire({
                title: "Success!",
                html: "<h4>Tenant Added</h4>",
                icon: "success",
            });
            $("#tenantForm").trigger("reset");
            window.location='/tenants';
  
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
  
  $("#tenantFormUpdate").submit(function (e) {
    e.preventDefault();
    var object = {};
    var formData = new FormData($(this)[0]);
    formData.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);
  
    $.ajax({
        type: "PUT",
        url: "/tenant/update/"+$("#recid").val(),
        dataType: 'json',
        data: json,
        contentType : 'application/json',
        headers: {"Authorization":localStorage.getItem('authUserToken')},
        success: function (data) {
            //console.log(data);
            Swal.fire({
                title: "Success!",
                html: "<h4>Tenant Updated</h4>",
                icon: "success",
            });
            $("#tenantFormUpdate").trigger("reset");
            window.location='/tenants';
  
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

  

$(".delete-tenant").click(function(){
    if(confirm("Do you really want to delete this tenant ?")){
        var id=$(this).data("id");
        $.ajax({
            type: "DELETE",
            url: "/tenant/delete/"+id,
            processData: false,
            contentType: false,
            headers: {"Authorization":localStorage.getItem('authUserToken')},
            success: function (data) {
                console.log(data);
                Swal.fire({
                    title: "Success!",
                    html: "<h4>Tenant Deleted</h4>",
                    icon: "success",
                });
            
                window.location='/tenants';
    
            },
            error: function (data) {

                Swal.fire({
                    title: "Error!",
                    html: data.responseJSON.message,
                    icon: "error",
                });
                
            },
        });
    

    }

});



$(".deactivate-tenant").click(function(){
    var type=$(this).data("type");
    if(confirm("Do you really want to "+type+" this tenant ?")){
        var id=$(this).data("id");

        $.ajax({
            type: "DELETE",
            url: "/tenant/deactivate/"+id+"/"+type,
            processData: false,
            contentType: false,
            headers: {"Authorization":localStorage.getItem('authUserToken')},
            success: function (data) {
                console.log(data);
                Swal.fire({
                    title: "Success!",
                    html: "<h4>Tenant "+type+"d</h4>",
                    icon: "success",
                });
            
                window.location='/tenants';
    
            },
            error: function (data) {
console.log(data);
                Swal.fire({
                    title: "Error!",
                    html: data.responseJSON.message,
                    icon: "error",
                });
                
            },
        });
    

    }

});

$(".edit-tenant").click(function(){
    var name=$(this).data("name");
    var email=$(this).data("email");
    var phone=$(this).data("phone");
    var apartment=$(this).data("apartment");
    var id=$(this).data("id");

    $("#tenant_name").val(name);
    $("#recid").val(id);
    $("#phone").val(phone);
    $("#email").val(email); 
    $("#apartment").val(apartment); 
    $("#btnModal").trigger("click");

   

});

    

    // Auto-hide sidebar on window resize if window size is small
    // $(window).on('resize', function () {
    //     if ($(window).width() <= 768) {
    //         $('#sidebar, #body').addClass('active');
    //     }
    // });
})();





