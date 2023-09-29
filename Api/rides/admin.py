from django.contrib import admin
from .models import Ride, Profile

# Register your models here.


@admin.register(Ride)
class RideAdmin(admin.ModelAdmin):
    list_display = ('motorista', 'data_publicaçao',
                    'data_saida', 'origem','destino','preço','veiculo')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'nome', 'email', 'placa_carro', 'cnh', 'diretorio')
