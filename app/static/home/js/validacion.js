//Validacion nombre de usuario
$("#username").on("keyup", function() {
    var username = $("#username").val();
    var datos = new FormData();
    datos.append("username", username);
    var regex = /^[a-zA-Z0-9\s]+$/;

    if(regex.test(username)){
        $.ajax({
            type: "POST",
            url: "views/modules/ajax.php",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                if(response != 0){
                    $("#username").addClass("is-invalid").removeClass("is-valid");
                    $("#submitButton").prop("disabled", false);

                }else{
                    $("#username").addClass("is-valid").removeClass("is-invalid");
                    $("#submitButton").prop("disabled", true);

                }
            },
            error: function(){

            }
        });
    }else{
        $("#username").addClass("is-invalid").removeClass("is-valid");
        $("#submitButton").prop("disabled", true);
    }
});

//validacion email
$("#email").on("keyup", function() {
    var email = $("#email").val();
    var datos = new FormData();
    datos.append("email", email);
    var regex = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

    if(regex.test(email)){
        $.ajax({
            type: "POST",
            url: "views/modules/ajax.php",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                if(response != 0){
                    $("#email").addClass("is-invalid").removeClass("is-valid");
                    $("#submitButton").prop("disabled", false);
                }else{
                    $("#email").addClass("is-valid").removeClass("is-invalid");
                    $("#submitButton").prop("disabled", true);
                }
            },
            error: function(){

            }
        });
    }else{
        $("#email").addClass("is-invalid").removeClass("is-valid");
        $("#submitButton").prop("disabled", true);
    }
});

//Validacion Nombre
$("#name").on( "keyup" ,function () {
    var regex = /^([a-zA-Z\s]+){3,40}$/;
    var firstName = $(this).val();

    if(regex.test(firstName)){
        $(this).addClass("is-valid").removeClass("is-invalid");
        $("#submitButton").prop("disabled", false);
    }else{
        $(this).addClass("is-invalid").removeClass("is-valid");
        $("#submitButton").prop("disabled", true);
    }
});

//Validacion Apellido
$("#lastname").on( "keyup" ,function () {
    var regex = /^([a-zA-Z\s]+){3,40}$/;
    var firstName = $(this).val();

    if(regex.test(firstName)){
        $(this).addClass("is-valid").removeClass("is-invalid");
        $("#submitButton").prop("disabled", false);
    }else{
        $(this).addClass("is-invalid").removeClass("is-valid");
        $("#submitButton").prop("disabled", true);
    }
});

//Validacion numero de telefono
$("#phoneNum").on( "keyup" ,function () {
    var regex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    var phoneNum = $(this).val();

    if(regex.test(phoneNum)){
        $(this).addClass("is-valid").removeClass("is-invalid");
        $("#submitButton").prop("disabled", false);
    }else{
        $(this).addClass("is-invalid").removeClass("is-valid");
        $("#submitButton").prop("disabled", true);
    }
});

//Validacion contraseña
$("#password").on( "keyup" ,function () {
    console.log("xd");
    var regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    var password = $(this).val();

    if(regex.test(password)){
        $(this).addClass("is-valid").removeClass("is-invalid");
        $("#submitButton").prop("disabled", false);
    }else{
        $(this).addClass("is-invalid").removeClass("is-valid");
        $("#submitButton").prop("disabled", true);
    }
});

    