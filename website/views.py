import json
from django.shortcuts import render

from quotient.models import Brand, Car, Plan


import cStringIO as StringIO
from xhtml2pdf import pisa
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from cgi import escape


def render_to_pdf(template_src, context_dict):
    template = get_template(template_src)
    context = Context(context_dict)
    html  = template.render(context)
    result = StringIO.StringIO()

    pdf = pisa.pisaDocument(StringIO.StringIO(html.encode("ISO-8859-1")), result)
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return HttpResponse('We had some errors<pre>%s</pre>' % escape(html))


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


def generate_table(request):
    if request.method == "GET":
        print(request.GET['data'])
        
        return render(
            request,
            'table.html',
            {
                'pays': json.loads(request.GET['data'])
            }
        )

def generate_pdf(request):
    if request.method == "GET":
        return render_to_pdf(
            'table.html',
            {
                'pays': json.loads(request.GET['data'])
            }
        )
    