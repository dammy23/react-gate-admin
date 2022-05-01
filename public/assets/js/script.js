
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

    $("#courseForm").submit(function (e) {
        e.preventDefault();
       var formData = new FormData($(this)[0]);
        $.ajax({
            type: "POST",
            url: "/course/create",
            data: formData,
            processData: false,
            contentType: false,
            headers: {"Authorization":localStorage.getItem('authUserToken')},
            success: function (data) {
                console.log(data);
                Swal.fire({
                    title: "Success!",
                    html: "<h4>Course Added</h4>",
                    icon: "success",
                });
                $("#courseForm").trigger("reset");
                window.location='/courses';
    
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

    $("#courseFormUpdate").submit(function (e) {
        e.preventDefault();
       var formData = new FormData($(this)[0]);
       //alert(localStorage.getItem('authUserToken'));

        $.ajax({
            type: "PUT",
            url: "/course/update/"+$("#recid").val(),
            data: formData,
            processData: false,
            contentType: false,
            headers: {"Authorization":localStorage.getItem('authUserToken')},
            success: function (data) {
                console.log(data);
                Swal.fire({
                    title: "Success!",
                    html: "<h4>Course Updated</h4>",
                    icon: "success",
                });
                $("#courseFormUpdate").trigger("reset");
                window.location='/courses';
    
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


    $("#lessonForm").submit(function (e) {
        e.preventDefault();
        var object = {};
        var formData = new FormData($(this)[0]);
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
        
        
        $.ajax({
            type: "POST",
            url: "/lesson/create",
            dataType: 'json',
            data: json,
            contentType : 'application/json',
            headers: {"Authorization":localStorage.getItem('authUserToken')},
            success: function (data) {
                Swal.fire({
                    title: "Success!",
                    html: "<h4>Lesson Added</h4>",
                    icon: "success",
                });
                var id =$("#course_id").val();
                dtable.destroy();
                getLessons(id);
                $("#lessonForm").trigger("reset");
                $("#btnAddl").trigger("click")
    
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

    $("#lessonFormUpdate").submit(function (e) {
        e.preventDefault();
        var object = {};
        var formData = new FormData($(this)[0]);
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
        
        
        $.ajax({
            type: "PUT",
            url: "/lesson/update/"+$("#lrecid").val(),
            dataType: 'json',
            data: json,
            contentType : 'application/json',
            headers: {"Authorization":localStorage.getItem('authUserToken')},
            success: function (data) {
                Swal.fire({
                    title: "Success!",
                    html: "<h4>Lesson Updated</h4>",
                    icon: "success",
                });
                var id =$("#course_id").val();
                dtable.destroy();
                getLessons(id);
                $("#lessonFormUpdate").trigger("reset");
                $("#close").trigger("click")
    
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

    

    $(".edit-course").click(function(){
        var name=$(this).data("name");
        var image=$(this).data("image");
        var id=$(this).data("id");
        $("#name").val(name);
        $("#recid").val(id);
        $("#image").prop("src","/uploads/"+image);
        $("#btnModal").trigger("click");

       

    });
    
    $(".lesson-course").click(function(){
        if(dtable!=undefined){
            dtable.destroy();
        }
        var name=$(this).data("name");
        var id=$(this).data("id");
        $("#exampleModalLabel2").html(name+" Lessons");
        $("#recid").val(id);
        $(".course_id").each(function(){
            $(this).val(id);
        });

        getLessons(id);
        
        $("#lfbtnModal1").trigger("click");

       

    });


    function getLessons(id){
        fetch('/lesson/list/'+id, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          .then(response => response.json())
          .then(data => {
            $("#lessonBody").html("");
              var cnt=1;
                data.forEach(function(item){ 
                    $("#lessonBody").append('<tr><td>'+cnt+'</td><td>'+item.name+'</td><td>'+item.count+'</td>\
                    <td>'+item.duration+'</td><td>'+item.description+'</td>\
                    <td><button class="btn btn-primary edit-lesson" data-name="'+item.name+'" data-course="'+item.course_id+'"\
                    data-count="'+item.count+'" data-duration="'+item.duration+'"\
                    data-description="'+item.description+'"\
                    data-video_id="'+item.video_id+'"\
                    data-id="'+item.id+'"\
                  ><i class="fas fa-edit"></i>Edit</button></td>\
                    <td><button class="btn btn-danger delete-lesson"\
                    data-id="'+item.id+'"\
                  ><i class="fas fa-trash"></i>Delete</button></td></tr>');
                    cnt++;

                });

             dtable= $('#dataTables-lesson').DataTable({
                    responsive: true,
                    pageLength: 20,
                    lengthChange: false,
                    searching: true,
                    ordering: true
                });

                $(".edit-lesson").click(function(){
                    console.log("vvvv");
                    var name=$(this).data("name");
                    var count=$(this).data("count");
                    var duration=$(this).data("duration");
                    var description=$(this).data("description");
                    var video_id=$(this).data("video_id");
                    var id=$(this).data("id");
                    $("#lesson_name").val(name);
                    $("#lrecid").val(id);
                    $("#count").val(count);
                    $("#duration").val(duration);
                    $("#description").val(description);
                    $("#video_id").val(video_id);
                    console.log("tttttt");
                    $("#btnModal1").trigger("click");
                    console.log("pppppp");
            
                   
            
                });



                $(".delete-lesson").click(function(){
                    if(confirm("Do you really want to delete this lesson ?")){
                        var id=$(this).data("id");
                        $.ajax({
                            type: "DELETE",
                            url: "/lesson/delete/"+id,
                            processData: false,
                            contentType: false,
                            headers: {"Authorization":localStorage.getItem('authUserToken')},
                            success: function (data) {
                                console.log(data);
                                Swal.fire({
                                    title: "Success!",
                                    html: "<h4>Lesson Deleted</h4>",
                                    icon: "success",
                                });
                            
                                var id =$("#course_id").val();
                                dtable.destroy();
                                getLessons(id);
                                
                    
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
          });
    }

    $(".delete-course").click(function(){
        if(confirm("Do you really want to delete this course ?")){
            var id=$(this).data("id");
            $.ajax({
                type: "DELETE",
                url: "/course/delete/"+id,
                processData: false,
                contentType: false,
                headers: {"Authorization":localStorage.getItem('authUserToken')},
                success: function (data) {
                    console.log(data);
                    Swal.fire({
                        title: "Success!",
                        html: "<h4>Course Deleted</h4>",
                        icon: "success",
                    });
                
                    window.location='/courses';
        
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
        var id=$(this).data("id");
        $("#user_name").val(name);
        $("#recid").val(id);
        $("#email").val(email);
        $("#btnModal").trigger("click");

       

    });
    
    
    
    
    

    // Auto-hide sidebar on window resize if window size is small
    // $(window).on('resize', function () {
    //     if ($(window).width() <= 768) {
    //         $('#sidebar, #body').addClass('active');
    //     }
    // });
})();





