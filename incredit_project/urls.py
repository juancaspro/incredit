from django.conf.urls import url
from django.contrib import admin

from website.views import (home, notice, une,
                           collection, quote,
                           quote_dev, buro,
                           documentation, quote2,
                           moment_a, moment_c)
from quotient.views import (get_cars, get_plan)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', home),
    url(r'^aviso/', notice),
    url(r'^une/', une),
    url(r'^cobranza/', collection),
    url(r'^cotizador/', quote),
    url(r'^cotizador_dev/', quote_dev),
    url(r'^cotizador2/', quote2),
    url(r'^buro/$', buro),
    url(r'^documentacion/$', documentation),
    url(r'^amoment/$', moment_a),
    url(r'^cmoment/$', moment_c),
    url(r'^cars/brand_id/(\d+)/$', get_cars),
    url(r'^plans/$', get_plan),
]
