function getTasa(tasa, type) {
    if(type == 1){
        return ((tasa / 12) * 1.16 / 100);
    }else{
        return ((tasa / 12) / 100);
    }

}

function getValorDeCuotaFija(monto, tasa, cuotas, type_person) {
    tasa = getTasa(tasa, type_person);
    valor = monto *( (tasa * Math.pow(1 + tasa, cuotas)) / (Math.pow(1 + tasa, cuotas) - 1) );
    return valor
}

function getAmortizacion(monto, tasa, cuotas, cuota, type_person) {
    var saldo = monto;
    var tasa = getTasa(tasa);
    var items = new Array();

    for (i=0; i < cuotas; i++) {
        interes = saldo * tasa;
        if(type_person == 1){
            abono = cuota - interes - (interes * 0.16);
            iva = (interes * 0.16);
        }else{
            abono = cuota - interes;
            iva = 0;
        }

        saldo -= abono;
        numero = i + 1;

        item = [numero, interes, abono, iva, cuota, saldo];
        items.push(item);
    }
    return items;
}

function getObject(objects, pk){
    for(i = 0; i < objects.length; i++){
        if(objects[i].pk == pk){
            return objects[i].fields;
        }
    }
}

function formatAmort(items){
    for(i = 0; i < items.length; i++){
        // console.log(items[i]);
        for(j = 0; j < items[i].length; j++){
            // console.log(items[i][j])
            if(j != 0){
                items[i][j] = items[i][j].toFixed(2);
            }
        }
    }
}


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function getTypes(cars){
    types_str = ['Autos', 'SUV', 'Pickups', 'Vans', 'Deportivos', 'Eléctricos'];
    types = [];
    types_int = [];
    types_obj = [];
    for(i = 0; i < cars.length; i++){
        type = cars[i]['fields'].type;
        if($.inArray(types_str[type - 1], types) === -1){
            types.push(types_str[type - 1]);
            types_int.push(type);
        }
    }
    console.log(types)
    console.log(types_int)
    for(j = 0; j < types.length; j++){
        types_obj.push({
            'name': types[j],
            'id': types_int[j]
        })
    }
    console.log(types_obj)
    return types_obj;
}

function isResponsive() {
    return $(window).width() < 960/*960*/;
}

$(document).ready(function() {
    // if($('body').width() < 992){
    //     // console.log("Redirect")
    //     window.location.href = "/cotizador/";
    // }

    // var settings
    var brand_id, brand_name;
    var cars, car_id;
    var type_car;
    var package, package_id, package_price;
    var product, product_name, person, person_name;
    var hitch;

    // Variables circle brands
    var brand_items = 5;
    var brand_deg = (360 * (Math.PI / 180)) / brand_items;
    var brand_radius = 110;

    // Prepare and adjust brands circle
    var width_brands = $('#brands').width();


    $('ul.circle#circle-brands').css({
        'width': width_brands + 'px',
        'height': width_brands + 'px'
    });

    $('#circle-brands div.circle-center').css({
        'width': ((width_brands / 3) * 2) + 'px',
        'height': ((width_brands / 3) * 2) + 'px',
        'margin': ((width_brands / 3) * -1) + 'px 0 0 ' + ((width_brands / 3) * -1) + 'px'
    });
    $('#circle-brands div.circle-center>div').css({
        'padding-top': (((width_brands / 3) * 2) - $('div.circle-center>div').height()) / 2 + 'px'
    });
    $('#circle-brands .circle-item-back').css({
        'width': ((width_brands / 2) + 2) + 'px',
        'height': ((width_brands / 2) + 2) + 'px',
        'margin-top': (((width_brands / 2) + 2) * -1) + 'px',
        'transform-origin': '0 ' + ((width_brands / 2) + 2) + 'px',
    });

    for(i = 2; i < (brand_items + 2); i++){
        let calc = ((brand_deg * (i - 1)) - brand_deg - (90 * (Math.PI / 180)));
        let calc2 = (((brand_deg * (i - 1)) - (brand_deg / 2) - (90 * (Math.PI / 180))) * (180 / Math.PI));
        let calc3 = ((((90 * (Math.PI / 180)) - brand_deg) *  (180 / Math.PI)) * -1)
        let flag_top = 0;

        $('#circle-brands .circle-item:nth-child(' + i + ')').css({
            'display': 'block'
        });
        if(brand_items == 2){
            $('#circle-brands .circle-item:nth-child(' + i + ') .circle-item-back').css({
                'width': ((width_brands / 6) * 3.5) + 'px',
                'height': ((width_brands / 6) * 3.5) + 'px',
                'transform': 'rotate(' + calc2 + 'deg) translate(-50%, -50%)'
            });
        }else{
            $('#circle-brands .circle-item:nth-child(' + i + ') .circle-item-back').css({
                'transform': 'rotate(' + calc2 + 'deg) skew(' + calc3 + 'deg)'
            });
            if(calc2 >= 90 && calc2 <= 180){
                $('#circle-brands .circle-item:nth-child(' + i + ') .circle-item-back div').css({
                    'transform': 'skew(1deg) rotate(225deg) scale(1)'
                });
                flag_top = 40;
            }
        }
        $('#circle-brands .circle-item:nth-child(' + i + '):before').css({
            'margin': (Math.cos(calc) * brand_radius).toFixed() + 'px 0 0 ' + (Math.sin(calc) * brand_radius).toFixed() + 'px'
        });

        width_span = $('#circle-brands .circle-item-text #span-text-' + (i-1) + '').width();
        console.log(width_span);
        $('#circle-brands .circle-item-text #span-text-' + (i-1) + '').css({
            'margin-top': ((width_brands / 4) - $('#circle-brands #span-text-' + (i-1) + '').height() + flag_top) + 'px',
            'margin-left': (((width_brands / 2) - width_span) / 2) + 'px',
        });
    }


    // Functions to click item circles
    $('#step1').click(function(){
        window.location.href = "/cotizador2/";
    });

    $('#step2').click(function(){
        $('#brand-name').html(brand_name);
        $("#option").hide();
        $("#modelos").show();
        // $("#option-button").show();
        $("#step1").removeClass('active');
        $("#step1").addClass('complete');
        $("#step2").removeClass('disabled');
        $("#step2").addClass('active');
        $("#step3").removeClass('active');
    });

    // Adjust quote circle
    $('#quote').css({
        'width': width_brands + 'px',
        'height': width_brands + 'px'
    });

    $("#modelos").hide();
    $("#option").hide();
    $("#option-detail").hide();
    $("#quote-circle").hide();
    $('#quote-info').hide();
    $("#option-button").hide();

    $('#products').hide();
    $('#people').hide();
    $('#hitch').hide();
    $('#times').hide();





    //TODO: PROBAR PARA EL DIMENSIONADO DEL CIRCULO OPTIONS RESPONSIVE.
    var width_option = $('#option').width();
    if(isResponsive()){
        $('#options').css({
            'width': width_option  - 10 +'px',
            'height': width_option - 10  + 'px'
        });

        $('#option div.options-button').css({
            'width': ((width_option / 3) * 2)  + 'px',
            'height': ((width_option / 3) * 2)  + 'px',
            'margin': ((width_option / 3) * -1)  + 'px 0 0 ' + ((width_option / 3) * -1) + 'px'
        });
    }


    // // Prepare and adjust package circle
    // var width_option = $('#option').width();
    // var scale_outside = (width_option * 30)/100; // aproximadamente 150 web
    //
    // var scale_inside = (width_option * 18)/100; // aproximadamente 85 web
    // // var scale_inside = 145; // aproximadamente 85 web
    //
    // // var scale_outside = 220;
    // $('#options').css({
    //     'width': width_option - scale_outside+ 'px',
    //     'height': width_option - scale_outside+ 'px'
    // });
    //
    // $('#option div.options-button').css({
    //     'width': ((width_option / 3) * 2) - scale_inside + 'px',
    //     'height': ((width_option / 3) * 2) - scale_inside + 'px',
    //     // 'margin': ((width_option / 3) * -1)  + 'px 0 0 ' + ((width_option / 3) * -1) + 'px'
    //     // 'margin-top':((width_option /3 )*-1)
    // });
    //
    //
    // // $('#option div.options-button>div').css({
    // //     'padding-top': (((width_option / 3) * 2) - $('div.options-button >div').height()) / 2 + 'px'
    // // });
    //
    //
    // $('#options .circle-item-back').css({
    //     'width': ((width_option / 2) + 2) + 'px',
    //     'height': ((width_option / 2) + 2) + 'px',
    //     'margin-top': (((width_option / 2) + 2) * -1) + 'px',
    //     'transform-origin': '0 ' + ((width_option / 2) + 2) + 'px',
    // });


    // Variables circle options
    // var options_items = 5;
    // var options_deg = (360 * (Math.PI / 180)) / options_items;
    // var options_radius = 110;
    //
    // // Prepare and adjust brands circle
    // var width_option = $('#option').width();


    // $('ul.circle#options').css({
    //     'width': width_option + 'px',
    //     'height': width_option + 'px'
    // });

    // $('#options div.circle-center').css({
    //     'width': ((width_option / 3) * 2) + 'px',
    //     'height': ((width_option / 3) * 2) + 'px',
    //     'margin': ((width_option / 3) * -1) + 'px 0 0 ' + ((width_option / 3) * -1) + 'px'
    // });

    // $('#options div.circle-center>div').css({
    //     'padding-top': (((width_option / 3) * 2) - $('div.circle-center>div').height()) / 2 + 'px'
    // });


    // $('#options .circle-item-back').css({
    //     'width': ((width_option / 2) + 2) + 'px',
    //     'height': ((width_option / 2) + 2) + 'px',
    //     'margin-top': (((width_option / 2) + 2) * -1) + 'px',
    //     'transform-origin': '0 ' + ((width_option / 2) + 2) + 'px',
    // });

    // for(i = 2; i < (options_items + 2); i++){
    //     let calc = ((options_deg * (i - 1)) - options_deg - (90 * (Math.PI / 180)));
    //     let calc2 = (((options_deg * (i - 1)) - (options_deg / 2) - (90 * (Math.PI / 180))) * (180 / Math.PI));
    //     let calc3 = ((((90 * (Math.PI / 180)) - options_deg) *  (180 / Math.PI)) * -1)
    //     let flag_top = 0;
    //
    //     // $('#option.circle-item:nth-child(' + i + ')').css({
    //     //     'display': 'block'
    //     // });
    //
    //     // if(options_items == 2){
    //     //     $('#circle-brands .circle-item:nth-child(' + i + ') .circle-item-back').css({
    //     //         'width': ((width_brands / 6) * 3.5) + 'px',
    //     //         'height': ((width_brands / 6) * 3.5) + 'px',
    //     //         'transform': 'rotate(' + calc2 + 'deg) translate(-50%, -50%)'
    //     //     });
    //     // }else{
    //
    //
    //     // $('#option .circle-item:nth-child(' + i + ') .circle-item-back').css({
    //     //     'transform': 'rotate(' + calc2 + 'deg) skew(' + calc3 + 'deg)'
    //     // });
    //
    //
    //     // if(calc2 >= 90 && calc2 <= 180){
    //     //     $('#option .circle-item:nth-child(' + i + ') .circle-item-back div').css({
    //     //         'transform': 'skew(1deg) rotate(225deg) scale(1)'
    //     //     });
    //     //     flag_top = 40;
    //     // }
    //     // }
    //
    //
    //     // $('#option .circle-item:nth-child(' + i + '):before').css({
    //     //     'margin': (Math.cos(calc) * options_radius).toFixed() + 'px 0 0 ' + (Math.sin(calc) * options_radius).toFixed() + 'px'
    //     // });
    //
    //     width_span = $('#options .circle-item-text #span-text-' + (i-1) + '').width();
    //     console.log(width_span);
    //     // $('#options .circle-item-text #span-text-' + (i-1) + '').css({
    //     //     'margin-top': ((width_option / 4) - $('#options #span-text-' + (i-1) + '').height() + flag_top) + 'px',
    //     //     'margin-left': (((width_option / 2) - width_span) / 2) + 'px',
    //     // });
    // }








    $('#opt-next').hide();


    $('.brand-option').click(function(){
        brand_id = $(this).attr('id');
        brand_name = $(this).attr('name');
        var model_items = 0;
        $.getJSON('/cars/brand_id/' + brand_id + '/', function(cars_data){
            cars = cars_data;
            if(cars.length > 0 && getTypes(cars).length > 0){
                let types = getTypes(cars);
                model_items = types.length;
                var options_cars = '';
                // for (var i = 0; i < cars.length; i++) {
                //     min_price = cars[i].fields['options'][0]['price']
                //     options_cars += `
                //         <li class="circle-item">
                //             <a class="circle-item-back model-element" name="`+cars[i].fields['name']+`" id-car="`+parseInt(cars[i].pk)+`" price="`+min_price+`">
                //                 <div class="circle-item-text">
                //                     <span class="font-rr font-white" id="span-text-`+ (i+1) +`" style="left: 0;">`+cars[i].fields['name']+`</span>
                //                 </div>
                //             </a>
                //         </li>`
                // }
                for (var i = 0; i < types.length; i++) {
                    options_cars += `
                        <li class="circle-item">
                            <a class="circle-item-back model-element" id-type="`+types[i].id+`" name="`+types[i].name+`">
                                <div class="circle-item-text">
                                    <span class="font-rr font-white" id="span-text-`+ (i+1) +`" style="left: 0;">`+types[i].name+`</span>
                                </div>
                            </a>
                        </li>
                    `

                }




                $('ul#circle-models div.circle-center').after(options_cars);
                $("a.model-element").each(function(index) {
                    $(this).on("click", function(){

                        // alert($(window).width())




                        $("#option-button").show();
                        // car_id
                        $('a.model-element').removeClass('active');
                        $(this).addClass('active');
                        // $('#option-button h1').html($(this).attr('name') + ' disponibles');
                        type_car = $(this).attr('id-type');
                        let cars_html = "";
                        let cars_html_resp = "";
                        for(i = 0; i < cars.length; i++){
                            if(cars[i]['fields']['type'] == type_car){
                                min_price = cars[i].fields['options'][0]['price']
                                cars_html += '<h2 class="font-me font-gray car-name" id-car="'+parseInt(cars[i].pk)+'" price="'+min_price+'"> ' + cars[i]['fields']['name'] + '</h2>';
                                cars_html_resp += '<li><a class="font-me font-gray car-name" id-car="'+parseInt(cars[i].pk)+'" price="'+min_price+'"> ' + cars[i]['fields']['name'] + '</a></li>';


                            }
                        }

                        $("#mySidenav").empty();
                        $("#mySidenav").append(cars_html_resp);
                        $("#mySidenav").append('<li><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></li>');

                        if (isResponsive()) {
                            $("#mySidenav").show();
                            openNav();
                        }

                        if(!isResponsive()){$('#option-button #cars').hide().html(cars_html).fadeIn('slow');}
                        $("h2.car-name").each(function(index){
                            $(this).on('click', function(){
                                $('#price-model').html($(this).attr('price'));
                                $('#price-model').formatCurrency();
                                car_id = $(this).attr('id-car');
                                $('#opt-next').show();
                            });
                        });

                        $("a.car-name").each(function(index){
                            $(this).on('click', function(){
                                $('#price-model').html($(this).attr('price'));
                                $('#price-model').formatCurrency();
                                car_id = $(this).attr('id-car');
                                $('#opt-next').show();
                            });
                        });


                        $('#opt-next').on('click',function () {
                            $( "#mySidenav" ).hide();
                        })
                    });
                });

                // Variables circle brands
                var model_deg = (360 * (Math.PI / 180)) / model_items;
                var model_radius = 110;

                // Prepare and ajust all circle
                var width_models = $('#modelos').width();

                $('ul.circle#circle-models').css({
                    'width': width_models + 'px',
                    'height': width_models + 'px'
                });

                $('#circle-models div.circle-center').css({
                    'width': ((width_models / 3) * 2) + 'px',
                    'height': ((width_models / 3) * 2) + 'px',
                    'margin': ((width_models / 3) * -1) + 'px 0 0 ' + ((width_models / 3) * -1) + 'px'
                });
                $('#circle-models div.circle-center>div').css({
                    'padding-top': '80px',
                    // 'padding-top': (((width_models / 3) * 2) - $('div.circle-center>div').height()) / 2 + 'px'

                });
                $('#circle-models .circle-item-back').css({
                    'width': ((width_models / 2) + 2) + 'px',
                    'height': ((width_models / 2) + 2) + 'px',
                    'margin-top': (((width_models / 2) + 2) * -1) + 'px',
                    'transform-origin': '0 ' + ((width_models / 2) + 2) + 'px',
                });
                // $('#circle-models .circle-item-text').css({
                //     'width': (width_models / 2) + 'px',
                //     'height': (width_models / 2) + 'px',
                // });

                // Prepare and ajust models circle options
                for(i = 2; i < (model_items + 2); i++){
                    let calc = ((model_deg * (i - 1)) - model_deg - (90 * (Math.PI / 180)));
                    let calc2 = (((model_deg * (i - 1)) - (model_deg / 2) - (90 * (Math.PI / 180))) * (180 / Math.PI));
                    let calc3 = ((((90 * (Math.PI / 180)) - model_deg) *  (180 / Math.PI)) * -1)
                    let flag_top = 0;

                    $('#circle-models .circle-item:nth-child(' + i + ')').css({
                        'display': 'block'
                    });
                    if(model_items == 2){
                        $('#circle-models .circle-item:nth-child(' + i + ') .circle-item-back').css({
                            'width': ((width_models / 6) * 3.5) + 'px',
                            'height': ((width_models / 6) * 3.5) + 'px',
                            'transform': 'rotate(' + calc2 + 'deg) translate(-50%, -50%)'
                        });
                    }else{
                        $('#circle-models .circle-item:nth-child(' + i + ') .circle-item-back').css({
                            'transform': 'rotate(' + calc2 + 'deg) skew(' + calc3 + 'deg)'
                        });
                        if(calc2 >= 90 && calc2 <= 180){
                            $('#circle-models .circle-item:nth-child(' + i + ') .circle-item-back div').css({
                                'transform': 'skew(1deg) rotate(225deg) scale(1)'
                            });
                            flag_top = 40;
                        }
                    }
                    $('#circle-models .circle-item:nth-child(' + i + '):before').css({
                        'margin': (Math.cos(calc) * model_radius).toFixed() + 'px 0 0 ' + (Math.sin(calc) * model_radius).toFixed() + 'px'
                    });
                    width_span = $('#circle-models .circle-item-text #span-text-' + (i-1) + '').width();
                    // console.log(width_span);
                    flag_adjust = ((model_items >= 4) ? model_items - 4 : 0);
                    adjust = 20 * flag_adjust;
                    console.log(adjust);
                    $('#circle-models .circle-item-text #span-text-' + (i-1) + '').css({
                        'margin-top': ((width_brands / 4) - $('#circle-models #span-text-' + (i-1) + '').height() + adjust + flag_top) + 'px',
                        'margin-left': (((width_brands / 2) - width_span) / 2) + 'px',
                    });
                }
            }else{
                sweetAlert({
                    title: "¡Lo sentimos!",
                    text: "Por el momento no contamos con vehículos de la marca seleccionado",
                    type: "warning"
                }, function(){
                    window.location.href = '/cotizador2/'
                });
            }
        });

        // $.getJSON('/plans/', function(plans_data){
        //     plans = plans_data;
        //     var options = '<option value="">--- Seleccione ---</option>';
        //     for (var i = 0; i < plans.length; i++) {
        //         options += '<option " value="' + parseInt(plans[i].pk) + '">' + plans[i].fields['name'] + '</option>';
        //     }
        //     $("#plan").html(options);
        //     $("#plan option:first").attr('selected', 'selected');
        // });
        // if(cars.length > 0){
        $('#brand-name').html(brand_name);
        $("#brands").hide();
        $("#modelos").show();
        // $("#option-button").show();
        $("#step1").removeClass('active');
        $("#step1").addClass('complete');
        $("#step2").removeClass('disabled');
        $("#step2").addClass('active');




        // $('#rmodel').;
        // $('#ryear').hide();
        // $('#rprice').hide();
        //
        // $('#rhitch').hide()
        // $('#rproduct').hide()
        // $('#rpeople').hide()
        // $('#rpackage').hide()
        // $('#rtime').hide()

        if (!isResponsive()) {
            $("#quote-info").show();
        }
        $("#resume-container").append('<span id="rbrand"></span><br>');
        $('#rbrand').html(brand_name);





        // }
    });

    $('#opt-next').click(function(){
        var packages_html = "";
        var packages_html_resp = "";
        console.log(cars)
        for(i=0; i < cars.length; i++){
            if(cars[i].pk == car_id){
                console.log(cars[i])
                for(j=0; j < cars[i]['fields']['options'].length; j++){
                    if(cars[i]['fields']['options'][j]['model'] == '2017'){
                        packages_html += '<p style="cursor: pointer" value="'+cars[i]['fields']['options'][j]['package']+'" id="package" description="'+cars[i]['fields']['options'][j]['description']+'" id-package="'+cars[i]['fields']['options'][j]['id']+'" price="'+cars[i]['fields']['options'][j]['price']+'" class="package font-mr font-gray">'+cars[i]['fields']['options'][j]['package']+'</p><br>'
                        packages_html_resp += '<li><p style="cursor: pointer" value="'+cars[i]['fields']['options'][j]['package']+'" id="package" description="'+cars[i]['fields']['options'][j]['description']+'" id-package="'+cars[i]['fields']['options'][j]['id']+'" price="'+cars[i]['fields']['options'][j]['price']+'" class="package font-mr font-gray">'+cars[i]['fields']['options'][j]['package']+'</p></li>'
                    }else if(cars[i]['fields']['options'][j]['model'] == '2016'){
                        packages_html += '<p style="cursor: pointer value="'+cars[i]['fields']['options'][j]['package']+'" id="package" description="'+cars[i]['fields']['options'][j]['description']+'" id-package="'+cars[i]['fields']['options'][j]['id']+'" price="'+cars[i]['fields']['options'][j]['price']+'" class="package font-mr font-gray">'+cars[i]['fields']['options'][j]['package']+'</p><br>'
                        packages_html_resp += '<li><p style="cursor: pointer value="'+cars[i]['fields']['options'][j]['package']+'" id="package" description="'+cars[i]['fields']['options'][j]['description']+'" id-package="'+cars[i]['fields']['options'][j]['id']+'" price="'+cars[i]['fields']['options'][j]['price']+'" class="package font-mr font-gray">'+cars[i]['fields']['options'][j]['package']+'</p><br>'
                    }else if(cars[i]['fields']['options'][j]['model'] == '2015'){
                        packages_html += '<p style="cursor: pointer value="'+cars[i]['fields']['options'][j]['package']+'" id="package" description="'+cars[i]['fields']['options'][j]['description']+'" id-package="'+cars[i]['fields']['options'][j]['id']+'" price="'+cars[i]['fields']['options'][j]['price']+'" class="package font-mr font-gray">'+cars[i]['fields']['options'][j]['package']+'</p></li>'
                        packages_html_resp += '<li><p style="cursor: pointer value="'+cars[i]['fields']['options'][j]['package']+'" id="package" description="'+cars[i]['fields']['options'][j]['description']+'" id-package="'+cars[i]['fields']['options'][j]['id']+'" price="'+cars[i]['fields']['options'][j]['price']+'" class="package font-mr font-gray">'+cars[i]['fields']['options'][j]['package']+'</p></li>'
                    }
                }
            }
        }

        if (isResponsive()) {
            $("#mySidenav").empty();
            $("#mySidenav").append(packages_html_resp);
            $("#mySidenav").append('<li><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></li>');

            $( "#mySidenav").show();
            openNav();
        }else{
            $('#packages div').after(packages_html);
        }



        $(".package").click(function(){
            $("#option-detail").html("");
            $("#option-detail").hide();
            package = $(this).attr('value');
            package_id = $(this).attr('id-package');
            package_price = $(this).attr('price')
            $('#packages').fadeOut();
            $('#products').fadeIn(2000);
            $('#packages-nav').removeClass('active');
            $('#products-nav').addClass('active');

            $("#resume-container").append('Paquete <span id="rpackage"></span><br>');
            $('#rpackage').html(package);



            var products_html = '<p value="1" style="cursor: pointer" value-name="Crédito Automotriz" id="product" class="product font-mr font-gray">Crédito Automotriz</p><br>';
            var products_html_resp = '<li><p value="1" style="cursor: pointer" value-name="Crédito Automotriz" id="product" class="product font-mr font-gray">Crédito Automotriz</p></li>';

            if (isResponsive()) {
                $("#mySidenav").empty();
                $("#mySidenav").append(products_html_resp);
                $("#mySidenav").append('<li><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></li>');

                $( "#mySidenav").show();
                // openNav();
            }else{
                $('#products div').after(products_html);
            }

        });
        $(".package").mouseout(function() {
            $("#option-detail").html("");
            $("#option-detail").hide();
        }).mouseover(function() {
            $("#option-detail").show();
            $("#option-detail").html("<p class='font-rr font-gray' style='padding-left:6em;'>"+$(this).attr('description')+"</p>");
        });
        $("#modelos").hide();
        $("#option-button").hide();
        $("#option").show();
        $("#step2").removeClass('active');
        $("#step2").addClass('complete');
        $("#step3").removeClass('disabled');
        $("#step3").addClass('active');


    });




    $(".product").click(function(){
        product = $(this).attr('value');
        product_name = $(this).attr('value-name');
        $('#products').fadeOut();
        $('#people').fadeIn(2000);
        $('#products-nav').removeClass('active');
        $('#people-nav').addClass('active');


        $("#resume-container").append('<span id="rproduct"></span><br>');
        $('#rproduct').html(product_name);


    });



    var person_html = '<p value="1" style="cursor: pointer" value-name="Persona física" id="person" class="person font-mr font-gray">Persona Física</p> <br> \
                       <p value="2" style="cursor: pointer" value-name="Persona Física con Actividad Empresarial" id="person" class="person font-mr font-gray">Persona Física con Actividad Empresarial</p> <br>\
                       <p value="3" style="cursor: pointer" value-name="Persona Moral" id="person" class="person font-mr font-gray">Persona Moral</p>';


    var person_html_resp = '<li><p value="1" style="cursor: pointer" value-name="Persona física" id="person" class="person font-mr font-gray">Persona Física</p> </li> \
                            <li><p value="2" style="cursor: pointer" value-name="Persona Física con Actividad Empresarial" id="person" class="person font-mr font-gray">Persona Física con Actividad Empresarial</p> </li>\
                            <li><p value="3" style="cursor: pointer" value-name="Persona Moral" id="person" class="person font-mr font-gray">Persona Moral</p></li>';


    if (isResponsive()) {
        $("#mySidenav").empty();
        $("#mySidenav").append(person_html_resp);
        $("#mySidenav").append('<li><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></li>');

        // openNav();
    }else{
        $('#people div').after(person_html);
    }


    $(".person").click(function(){
        console.log(package_price);
        $("#amount").val(package_price * 0.15);
        $("#amount").formatCurrency();
        person = $(this).attr('value');
        person_name = $(this).attr('value-name');
        $('#people').fadeOut();
        $('#hitch').fadeIn(2000);
        $('#people-nav').removeClass('active');
        $('#hitch-nav').addClass('active');

        $("#resume-container").append('<span id="rpeople"></span><br>Plan IN Credit<br>');
        $('#rpeople').html(person_name);
    });



    var porcentage_html = '<p class="font-mr font-gray">Elige el porcentaje</p> \
                            <select name="porcentage" id="porcentage"> \
                                <option value="15">15 %</option> \
                                <option value="25">25 %</option> \
                                <option value="35">35 %</option> \
                                <option value="45">45 %</option> \
                                <option value="55">55 %</option> \
                            </select> \
                            <hr style="border-top: 3px solid #5E5E5E; width:4em; margin-top: 2px; margin-bottom: 5px;"> \
                            <p class="font-mr font-gray">ó <br> Determina el monto</p> \
                            <label><span class="font-mr font-gray" style="font-weight: 100; text-align:center">Monto: </span><input type="text" name="amount" id="amount" value="50,000"></label> \
                            <center><p id="hitch-next" class="font-rr" style="cursor:pointer;border-top: 1px solid #40689B; border-bottom: 1px solid #40689B; color: #40689B; margin-top: 0.5em; width: 5em;">Siguiente</p></center>';


    var porcentage_html_resp = '';


    if (isResponsive()) {
        $("#mySidenav").empty();
        $("#mySidenav").append(porcentage_html);
        $("#mySidenav").append('<li><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></li>');

        // $( "#mySidenav").show();
        // openNav();
    }else{
        $('#hitch div').after(porcentage_html);
    }



    $("#porcentage").change(function(){
        $("#amount").val(package_price * ($(this).val() / 100));
        $("#amount").formatCurrency();
    });

    $("#hitch-next").click(function(){
        hitch = $('#porcentage').val();
        $('#hitch').fadeOut();
        $('#times').fadeIn(2000);
        $('#hitch-nav').removeClass('active');
        $('#times-nav').addClass('active');

        $("#resume-container").append('<span id="rhitch"></span><br>');
        $('#rhitch').html('Enganche ' + hitch + '%' + ' [' + (package_price * (hitch / 100)) + ']');
    });

    $(".bs-wizard").click(function() {
        $("#quote-circle").hide();
        $("#quote-info").hide();
        hitch = $('#porcentage').val();
    });


    var time_html = '<p value="12" style="cursor: pointer" value-name="12 meses" id="time" class="time font-mr font-gray">12 meses</p><br> \
                                <p value="24" style="cursor: pointer" value-name="24 meses" id="time" class="time font-mr font-gray">24 meses</p><br> \
                                <p value="36" style="cursor: pointer" value-name="36 meses" id="time" class="time font-mr font-gray">36 meses</p><br> \
                                <p value="48" style="cursor: pointer" value-name="48 meses" id="time" class="time font-mr font-gray">48 meses</p>';


    var time_html_resp = '<li><p value="12" style="cursor: pointer" value-name="12 meses" id="time" class="time font-mr font-gray">12 meses</p></li> \
                                <li><p value="24" style="cursor: pointer" value-name="24 meses" id="time" class="time font-mr font-gray">24 meses</p></li> \
                                <li><p value="36" style="cursor: pointer" value-name="36 meses" id="time" class="time font-mr font-gray">36 meses</p></li> \
                                <li><p value="48" style="cursor: pointer" value-name="48 meses" id="time" class="time font-mr font-gray">48 meses</p></li>';


    if (isResponsive()) {
        $("#mySidenav").empty();
        $("#mySidenav").append(time_html_resp);
        $("#mySidenav").append('<li><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></li>');

        // $( "#mySidenav").show();
        // openNav();
    }else{
        $('#times div').after(time_html);
    }


    $(".time").click(function(){
        time = $(this).attr('value');
        time_name = $(this).attr('value-name');
        let car_select, package_select;

        // package_id

        for(i=0; i < cars.length; i++){
            if(car_id == cars[i].pk){
                car_select = cars[i];
                for(j=0; j < cars[i]['fields']['options'].length; j++){
                    if(cars[i]['fields']['options'][j]['id'] == package_id){
                        package_select = cars[i]['fields']['options'][j];
                        break;
                    }
                }
                break;
            }
        }
        console.log(car_select);
        console.log(package_select);

        $("#resume-container").append('<span id="rmodel"></span><br>');
        $("#resume-container").append('<span id="ryear"></span><br>');
        $("#resume-container").append('<span id="rprice"></span><br>');
        $("#resume-container").append('<span id="rtime"></span><br>');

        $('#rmodel').html(car_select['fields'].name);
        $('#ryear').html(package_select.model);
        $('#rprice').html(package_price);
        $('#rprice').formatCurrency();
        $('#rtime').html('Plaza a ' + time_name);

        $("#option").hide();
        $("#quote-circle").show();
        $("#quote-info").show();
    });

    $('#cotizar').click(function(){
        var monto_financiar = package_price - (package_price * (hitch / 100));
        var type_person = parseInt(person);
        let comision = (monto_financiar * 0.01) * 1.16;
        var cuota = getValorDeCuotaFija(monto_financiar, parseFloat(15.49), parseInt(time), type_person);
        var items = getAmortizacion(monto_financiar, parseFloat(15.49), parseInt(time), cuota, type_person);
        console.log(items);
        console.log(cuota);
        $('#quote').html(`
            <p class="font-rr" style="padding-top:2.2em;">Comisión por apertura</p>
                        <h1 id="ccomision" class="font-rr font-blue">`+comision+`</h1>
                        <p class="font-rr" style="padding-top:1em;">Monto a financiar</p>
                        <h1 id="cmonto" class="font-rr font-blue">`+monto_financiar+`</h1>
                        <p class="font-rr" style="padding-top:1em;">Pago inicial</p>
                        <h1 id="cinicial" class="font-rr font-blue">`+(comision + (package_price * (hitch / 100)))+`</h1>
                        <p class="font-rr" style="padding-top:1em;">Pago mensual</p>
                        <h1 id="ccuota" class="font-rr font-blue">`+cuota.toFixed(2)+`</h1>
        `);
        $('#ccomision').formatCurrency();
        $('#cmonto').formatCurrency();
        $('#cinicial').formatCurrency();
        $('#ccuota').formatCurrency();
    });
});