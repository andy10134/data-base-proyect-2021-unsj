var count = 1;

$("#add_button").click(function (e) {
    var nuevoInput = $(this).prev().clone();

    //Definir funcion de callback
    count = count + 1;

    time = nuevoInput.find(".s1").attr("name").split("-");

    nuevoInput.find(".s1").attr("name", time[0] + "-" + count);
    nuevoInput.find(".s1").attr("id", time[0] + "-" + count);
    
    time = nuevoInput.find(".1p").attr("name").split("-");
    nuevoInput.find(".1p").attr("name", time[0] + "-" + time[1] + "-" + count);
    nuevoInput.find(".1p").attr("id", time[0] + "-" + time[1] + "-" + count);

    time = nuevoInput.find(".2p").attr("name").split("-");
    nuevoInput.find(".2p").attr("name", time[0] + "-" + time[1] + "-" + count);
    nuevoInput.find(".2p").attr("id", time[0] + "-" + time[1] + "-" + count);

    nuevoInput.insertBefore("#add_button");

});

var readURL = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(".profile-pic").attr("src", e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(".file-upload").on("change", function () {
    readURL(this);
});

$(".upload-button").on("click", function () {
    $(".file-upload").click();
});

//MODAL DE ACTUALIZACION DE TIPO DE USUARIO

$("#trainner-button").click(function (e) {
    var datos = new FormData();
    datos.append("userId", $("#id-user").text());
    $.ajax({
        type: "POST",
        url: "views/modules/ajax.php",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            swal({
                title: "Actualizacion efectuada ;)",
                text: "Tu cuenta ha sido actualizada satisfactoriamente Preparate para dar clases!",
                icon: "success",
                button: "Aceptar",
            }).then(function () {
                window.location = "http://localhost/webprogrammingfcefy2020/Golive/perfil";
            });
        }
    });
});

$("#userAccount-button").click(function (e) {
    var datos = new FormData();
    datos.append("userIdA", $("#id-user").text());

    $.ajax({
        type: "POST",
        url: "views/modules/ajax.php",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            swal({
                title: "Actualizacion efectuada :)",
                text: "Tu cuenta ha sido actualizada satisfactoriamente  Asegurate de inscribirte en clases!",
                icon: "success",
                button: "Aceptar",
            }).then(function () {
                window.location = "http://localhost/webprogrammingfcefy2020/Golive/perfil";
            });
        }
    });
});