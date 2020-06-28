// $(document).ready(function () {
//     $(document).ready(function () {
//         function readURL(input) {
//             if (input.files && input.files[0]) {
//                 var reader = new FileReader();
//
//                 reader.onload = function (e) {
//                     $('#blah').attr('src', e.target.result).css({'display': 'block', 'width': '100%'});
//                 }
//
//                 reader.readAsDataURL(input.files[0]);
//             }
//         }
//
//         $("#inputImg").change(function () {
//             readURL(this);
//         });
//     });
// });
//
//

$(document).ready(function () {
    $(document).ready(function () {
        function readURL(input) {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const reader = new FileReader();
                reader.onload = function (e) {
                    $('#blah').attr('src', e.target.result).css({'display': 'block', 'width': '100%'});
                }
                let formData = new FormData();
                if (formData) {
                    formData.append("image", file);
                    jQuery.ajax({
                        url: "http://localhost:5000/predict",
                        type: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            console.log(data)
                            $('#outputImg').attr('src', 'http://localhost:5000/get_img_url/' + data['img_id']).css({
                                'display': 'block',
                                'width': '100%'
                            });
                        }
                    });
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#inputImg").change(function () {
            readURL(this);
        });
    });
});


