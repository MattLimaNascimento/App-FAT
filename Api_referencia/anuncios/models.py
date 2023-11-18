from django.db import models as mo
from datetime import datetime
from django.utils.translation import gettext as _
from accounts.models import User


class Ride(mo.Model):
    class Modalidade(mo.TextChoices):
        CARONA = 'CARONA', _('CARONA')
        UBER = 'UBER', _('Uber')
    
    class Veiculo(mo.TextChoices):
        CARRO = 'Carro',_('Carro')
        MOTO = 'Moto',_('Moto')

    motorista = mo.ForeignKey(
        User, on_delete=mo.CASCADE, related_name='driver', blank=True, null=True
    )
    vagas = mo.IntegerField() 
    passageiros = mo.ManyToManyField(User, related_name='passenger', blank=True)
    data_publicaçao = mo.DateTimeField(default=datetime.now)
    hora_saida = mo.TimeField(default="00:00")
    origem = mo.TextField(max_length=50, default='FAT')
    destino = mo.TextField(max_length=50, default='Centro')
    preço = mo.IntegerField(default=4.00)
    veiculo = mo.TextField(max_length=10, choices=Veiculo.choices, default='Veiculo.CARRO')
    modalidade = mo.CharField(max_length=12, choices=Modalidade.choices, default='Modalidade.CARONA')