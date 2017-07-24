import json
from decimal import Decimal

from django.core import serializers
from django.http.response import HttpResponse
from django.forms.models import model_to_dict

from .models import Car, Plan, CarOption

def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError

def get_cars(request, brand_id):
    # cars =  Car.objects.filter(brand=brand_id, is_active=True)
    cars = json.loads(serializers.serialize('json', Car.objects.filter(brand=brand_id, is_active=True)))
    # cars2 = Car.objects.filter(brand=brand_id, is_active=True)
    for c in cars:
        options = []
        model_option = CarOption.objects.filter(car_id=c['pk'])
        if model_option.count() > 0:
            for o in model_option:
                options.append(model_to_dict(o))
        c['fields']['options'] = options

    return HttpResponse(
        json.dumps(cars, default=default)
    )

def get_plan(request):
    plan = serializers.serialize('json', Plan.objects.all())
    return HttpResponse(
        plan
    )