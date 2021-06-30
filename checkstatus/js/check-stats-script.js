function load_page_html(id, url, data)
{
    $('#loading').show();
    $.ajax({
        type: "POST",
        url: base_url + url,
        data: data,
        async: true,
        success: function (data) {
            setTimeout(function () {
                $('#' + id).html(data);
                $('#loading').hide();
            }, 2000);
        },
    });
}

function show_error_msg_form(data) {
    notif({
        type: "error",
        msg: data,
        autohide: false,
        opacity: 0.8
    });
}

function show_success_msg_form(data) {
    notif({
        type: "success",
        msg: data,
        autohide: false,
        opacity: 0.8
    });
}

function open_modal(idmodal, title)
{
    $('.' + idmodal).iziModal('setZindex', 99999);
    $('.' + idmodal).iziModal('open', { zindex: 99999 });
    $('.' + idmodal).iziModal('setTitle', title);
    $('.' + idmodal).iziModal('open');
    $('.page-loader-wrapper').hide();
}

function act_cancel_appl()
{
    var id      = "email-verify-status";
    var url     = "app/sent_email_verification";
    var data    = $("#frm-cancel-appl").serialize();

    $('.modal-cancel-application').iziModal('close');
    $.ajax({
        type: "POST",
        url: base_url + "app/sent_email_verification",
        data: $("#frm-cancel-appl").serialize(),
        async: true,
        success: function (data) {
            $('.modal-email-verification .iziModal-content').empty();
            $('.modal-email-verification .iziModal-content').html(data);
            $(".modal-email-verification").iziModal('setTitle', 'Email Verification');
            $('.modal-email-verification').iziModal('setZindex', 99999);
            $('.modal-email-verification').iziModal('open', { zindex: 99999 });
            $('.page-loader-wrapper').hide();
        },
    });

}

function act_cancel_appl_sbt()
{
    var url     = "app/act_sent_cancel_application";
    var data    = $("#form-verify-cancel").serialize();

    $('.modal-cancel-application').iziModal('close');
    $.ajax({
        type: "POST",
        url: base_url + url,
        data: data,
        async: true,
        dataType: "json",
        success: function (data) {

            console.log(data.msg);
            if(data.status == true)
            {
                $('.modal-email-verification').iziModal('close');
                show_success_msg_form(data.msg);
                $('.btn-sbt-check').trigger('click');
            }else{
                show_error_msg_form(data.msg);
            }
        },
    });
}