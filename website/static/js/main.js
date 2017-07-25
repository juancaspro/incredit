$(document).ready(function() {

    let is_mobile = true;

    $('#num-contrato').hide();
    $('.error').hide();

    if(!/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        $("#financiamiento #active").hide();
        $("#financiamiento #out").show();
        is_mobile = false;
    }else{
        $("#financiamiento #out").hide();
        is_mobile = true;
    }
    
    // Functions and vars to products 
    $("#arrendamiento #faqs").hide();
    $("#arrendamiento #more-info").hide();
    $("#arrendamiento #marrendamiento").hide();
    $("#arrendamiento #out").hide();

    $("#financiamiento #faqs").hide();
    $("#financiamiento #more-info").hide();
    $("#financiamiento #mcredito").hide();

    height_arrendamiento = $("#arrendamiento").outerHeight();
    $("#arrendamiento").css({
        "height": height_arrendamiento+"px"
    });
    $('#financiamiento').css({
        "height": height_arrendamiento+"px"
    });
    $('#arrendamiento .info').click(function(){
        if(!$('#arrendamiento #more-info').is(':visible')){
            $("#arrendamiento #initial-info").hide();
            $("#arrendamiento #faqs").hide();
            $("#arrendamiento #more-info").show();
            $('#arrendamiento .info').html('- Menos información');
            $("#arrendamiento #marrendamiento").show();
        }else{
            $("#arrendamiento #more-info").hide();
            $("#arrendamiento #faqs").hide();
            $("#arrendamiento #initial-info").show();
            $('#arrendamiento .info').html('+ Más información');
            $("#arrendamiento #marrendamiento").hide();
        }
    });
    $('#financiamiento .info').click(function(){
        if(!$('#financiamiento #more-info').is(':visible')){
            $("#financiamiento #initial-info").hide();
            $("#financiamiento #faqs").hide();
            $("#financiamiento #more-info").show();
            $('#financiamiento .info').html('- Menos información');
            $("#financiamiento #mcredito").show();
        }else{
            $("#financiamiento #more-info").hide();
            $("#financiamiento #faqs").hide();
            $("#financiamiento #initial-info").show();
            $('#financiamiento .info').html('+ Más información');
            $("#financiamiento #mcredito").hide();
        }
    });
    $('#arrendamiento .faq').click(function(){
        if(!$('#arrendamiento #faqs').is(':visible')){
            $("#arrendamiento #more-info").hide();
            $("#arrendamiento #faqs").show();
            $("#arrendamiento #initial-info").hide();
            $("#arrendamiento #marrendamiento").hide();
        }
    });
    
    $('#financiamiento .faq').click(function(){
        if(!$('#financiamiento #faqs').is(':visible')){
            $("#financiamiento #more-info").hide();
            $("#financiamiento #faqs").show();
            $("#financiamiento #initial-info").hide();
            $("#financiamiento #mcredito").hide();
        }
    });

    $(document).mousemove(function() {    
        if($('#financiamiento').is(':hover') || $('#arrendamiento').is(':hover')) {
            $('body').css({'overflow-y': 'hidden'});
        }
        else {
            $('body').css({'overflow-y': 'scroll'});
        }
    });

    $('#financiamiento').hover(function() {
        if(!is_mobile){
            if($('#financiamiento').hasClass('col-md-3')){
                $("#arrendamiento").removeClass( "col-md-9" ).addClass( "col-md-3" );
                $("#financiamiento").removeClass( "col-md-3" ).addClass( "col-md-9" );
                $("#arrendamiento #out").show();
                $("#arrendamiento #active").hide();
                $("#financiamiento #out").hide();
                $("#financiamiento #active").slideDown(1500);
            }
        }
    });

    $('#arrendamiento').hover(function() {
        if(!is_mobile){
            if($('#arrendamiento').hasClass('col-md-3')){
                $("#arrendamiento").removeClass( "col-md-3" ).addClass( "col-md-9" );
                $("#financiamiento").removeClass( "col-md-9" ).addClass( "col-md-3" );
                $("#financiamiento #out").show();
                $("#financiamiento #active").hide();
                $("#arrendamiento #out").hide();
                $("#arrendamiento #active").slideDown(1500);
            }
        }
    });

    $(function(){
        $('input[type="radio"][name=client]').click(function(){
            if ($(this).is(':checked') && $(this).val() == 1){
                $('#num-contrato').show();
            }else{
                $('#num-contrato').hide();
            }
        });
    });

    // $('#number').keydown(function (e) {
    //     console.log(e.keyCode)
    //     // Allow: backspace, delete, tab, escape, enter and .
    //     if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
    //          // Allow: Ctrl/cmd+A
    //         (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    //          // Allow: Ctrl/cmd+C
    //         (e.keyCode == 86 && (e.ctrlKey === true || e.metaKey === true)) ||
    //         // Allow: Ctrl/cmd+V
    //         (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
    //          // Allow: Ctrl/cmd+X
    //         (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
    //          // Allow: home, end, left, right
    //         (e.keyCode >= 35 && e.keyCode <= 39)) {
    //              // let it happen, don't do anything
    //              return;
    //     }
    //     // Ensure that it is a number and stop the keypress
    //     if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) || e.shiftKey == 187) {
    //         e.preventDefault();
    //     }
    // });
    $.mask.definitions['h'] = "[0-9]";
    $.mask.definitions['-'] = "[+]";
    $('#number').mask('+hh hhhhhhhhhh');
    var emailPattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    $('#email').focusout(function(){
        if($(this).val() != "" && !emailPattern.test($(this).val())){
            $(this).addClass('input-error');
            $('#email-error').show();      
        }
    });
    $('#email').keyup(function(){
        if($(this).hasClass('input-error') && !emailPattern.test($(this).val())){
            $(this).removeClass('input-error');
            $('#email-error').hide();
        }
    });

    $('#send-contact').click(function(){
        let name = $('#name');
        let app = $('#app');
        let number = $('#number');
        let email = $('#email');
        let city = $('#city');
        let client = $('#client');
        let noClient = $('#noClient');
        let contract = $('#contract');
        let service = $('#service');
        let accept = $('#accept');
        let flag_send = true;
        if(name.val() == ""){
            name.addClass('input-error');
            $('#name-error').show();
            flag_send = false;
        }else{
            name.removeClass('input-error');
            $('#name-error').hide();
        }
        if(app.val() == ""){
            app.addClass('input-error');
            $('#app-error').show();
            flag_send = false;            
        }else{
            app.removeClass('input-error');
            $('#app-error').hide();
        }
        if(number.val() == ""){
            number.addClass('input-error');
            $('#number-error').show();
            flag_send = false;            
        }else{
            number.removeClass('input-error');
            $('#number-error').hide();
        }
        if(email.val() == "" || email.val().length > 50){
            email.addClass('input-error');
            $('#email-error').show();
            flag_send = false;                        
        }else{
            email.removeClass('input-error');
            $('#email-error').hide();
        }
        if(city.val() == ""){
            city.addClass('input-error');
            $('#city-error').show();
            flag_send = false;                        
        }else{
            city.removeClass('input-error');
            $('#city-error').hide();
        }

        if(!client.is(':checked') && !noClient.is(':checked')){
            client.addClass('input-error');
            $('#client-error').show();
            flag_send = false;                        
        }else{
            client.removeClass('input-error');
            $('#client-error').hide();
        }
        if(contract.val() == "" && !noClient.is(':checked')){
            contract.addClass('input-error');
            $('#contract-error').show();
            flag_send = false;                        
        }else{
            contract.removeClass('input-error');
            $('#contract-error').hide();
        }
        if(service.val() == ""){
            service.addClass('input-error');
            $('#service-error').show();
            flag_send = false;                        
        }else{
            service.removeClass('input-error');
            $('#service-error').hide();
        }
        if(!accept.is(':checked')){
            accept.addClass('input-error');
            $('#accept-error').show();
            flag_send = false;                        
        }else{
            accept.removeClass('input-error');
            $('#accept-error').hide();
        }
        if(grecaptcha.getResponse() == ''){
            $('#captcha-error').show();
            flag_send = false;  
        }else{
            $('#captcha-error').hide();
        }
        console.log(grecaptcha.getResponse())
        if(flag_send){
            console.log("Se envia");
            sweetAlert({
                title: "¡Enviado!",
                text: "Se ha enviado su correo, pronto estaremos en contacto con usted",
                type: "success"
            }, function(){
                window.location.href = '/#nosotros'
            });
        }
    });
});