from django.contrib import admin
from .models import Ride

# Register your models here.

class RideAdmin(admin.ModelAdmin):
    
    list_display = ('motorista', 'data_publicaçao',
                    'hora_saida', 'origem','destino','preço','veiculo')
    list_filter = ('motorista',)
    search_fields = ('motorista','veiculo')
    
admin.site.register(Ride,RideAdmin)