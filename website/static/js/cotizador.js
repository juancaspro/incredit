function getTasa(tasa, type=2) {
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

        // abono = abono.toFixed(2);
        
        // interes = interes.toFixed(2);
        // saldo = saldo.toFixed(2);

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
        for(j = 0; j < items[i].length; j++){
            if(j != 0){
                items[i][j] = items[i][j].toFixed(2);
            }
        }
    }
}

$(document).ready(function() {

    var brand = '';
    var car = '';
    var cars = '';
    // var type_product = '';
    // var type_person = '';
    var plan = '';
    var plans = ''

    $('#car-info').hide();
    $('#credit-info').hide();
    $('#info-credit').hide();

    $(function(){
        $('p[class="brand"]').click(function(){
            brand = $(this).attr('name-brand');
            $.getJSON('/cars/brand_id/' + $(this).attr('id-brand') + '/', function(cars_data){
                cars = cars_data;
                var options = '<option value="">--- Seleccione ---</option>';
                for (var i = 0; i < cars.length; i++) {
                    options += '<option " value="' + parseInt(cars[i].pk) + '">' + cars[i].fields['name'] + ' - ' + cars[i].fields['model'] +  ' - ' + cars[i].fields['price'] + '</option>';
                    // options += '<p>' + cars[i].fields['name'] + ' - ' + cars[i].fields['model'] + ' - $' + cars[i].fields['price'] + '</p>';
                }
                $('#brands').hide();
                $('#car-info').show();
                $('#car').html(options);
                $('#credit-info').show();
            });
            $.getJSON('/plans/', function(plans_data){
                plans = plans_data;
                var options = '<option value="">--- Seleccione ---</option>';
                for (var i = 0; i < plans.length; i++) {
                    options += '<option " value="' + parseInt(plans[i].pk) + '">' + plans[i].fields['name'] + '</option>';
                }
                $("#plan").html(options);
                $("#plan option:first").attr('selected', 'selected');
            });
        });
    });

    $('#cotizar').click(function(){
        car = getObject(cars, $('#car').val());
        plan = getObject(plans, $('#plan').val());

        var monto_financiar = car.price - (car.price * (plan.hitch / 100));
        var person = parseInt($('#type_person').val());
        var cuota = getValorDeCuotaFija(monto_financiar, parseFloat(plan.interest_rate), parseInt(plan.time), person);
        var items = getAmortizacion(monto_financiar, parseFloat(plan.interest_rate), parseInt(plan.time), cuota, person);
        var tbody = document.getElementById("tbody_1");
        formatAmort(items);
        $('#info-credit').show()
        $('#info-credit').html(
            '<p>Marca: ' + brand + '</p>' +
            '<p>Modelo: ' + car.name + ' - ' + car.model + '</p>' +
            '<p>Version: ' + car.version + '</p>' +
            '<p>Plan: ' + plan.name + '</p>' +
            '<p>Enganche: ' + plan.hitch + '%</p>' +
            '<p>Mensualidad: $' + cuota + '</p>'
        );
        for (i = 0; i < items.length; i++) {
            item = items[i];
            tr = document.createElement("tr");
            for (e = 0; e < item.length; e++) {
                value = item[e];
                td = document.createElement("td");
                textCell = document.createTextNode(value);
                td.appendChild(textCell);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    });
});