from django.shortcuts import render

from quotient.models import Brand, Car, Plan


def home(request):
    if request.method == "GET":
        return render(
            request,
            'index.html'
        )


def notice(request):
    if request.method == "GET":
        return render(
            request,
            'aviso.html'
        )


def une(request):
    if request.method == "GET":
        return render(
            request,
            'une.html'
        )


def collection(request):
    if request.method == "GET":
        return render(
            request,
            'cobranza.html'
        )


def documentation(request):
    if request.method == "GET":
        return render(
            request,
            'documentacion.html'
        )


def moment_a(request):
    if request.method == "GET":
        return render(
            request,
            'momento_arrendamiento.html'
        )


def moment_c(request):
    if request.method == "GET":
        return render(
            request,
            'momento_credito.html'
        )


def buro(request):
    if request.method == "GET":
        return render(
            request,
            'buro.html'
        )


def quote(request):
    if request.method == "GET":
        return render(
            request,
            'cotizador.html'
        )

    
def quote2(request):
    if request.method == "GET":
        brands = Brand.objects.filter(is_active=True)
        return render(
            request,
            'cotizador3.html',
            {
                'brands': brands
                # 'brands': serializers.serialize('json', brands)                
            }
        )


def quote_dev(request):
    if request.method == "GET":
        brands = Brand.objects.filter(is_active=True)
        print(brands)
        return render(
            request,
            'cotizador2.html',
            {
                'brands': brands
            }
        )

    