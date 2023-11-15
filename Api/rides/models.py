from django.db import models as mo
from datetime import datetime
from django.utils.translation import gettext as _
from accounts.models import User

# Create your models here.


class Ride(mo.Model):
    class Modalidade(mo.TextChoices):
        CARONA = 'CARONA', _('CARONA')
        UBER = 'UBER', _('Uber')

    class Veiculo(mo.TextChoices):
        CARRO = 'CARRO', _('Carro')
        MOTO = 'MOTO', _('Moto')

    motorista = mo.ForeignKey(
<<<<<<< HEAD
        User, on_delete=mo.CASCADE, related_name='driver', blank=True, null=True)
    passageiros = mo.ManyToManyField(
        User, related_name='passenger', blank=True)
=======
        User, on_delete=mo.CASCADE, related_name='driver', blank=True, null=True
    )
    passageiros = mo.ManyToManyField(Profile, related_name='passenger', blank=True)
>>>>>>> Pedro-Branch
    data_publicaçao = mo.DateTimeField(default=datetime.now)
    data_saida = mo.DateTimeField(default=datetime.now)
    origem = mo.TextField(max_length=50, default='FAT')
    destino = mo.TextField(max_length=50, default='Centro')
    preço = mo.IntegerField(default=4.00)
<<<<<<< HEAD
    veiculo = mo.TextField(
        max_length=10, choices=Veiculo.choices, default='Veiculo.CARRO')
    modalidade = mo.CharField(max_length=12, choices=Modalidade.choices,
                              default='Modalidade.CARONA')
=======
    veiculo = mo.TextField(max_length=10, choices=Veiculo.choices, default='Veiculo.CARRO')
    modalidade = mo.CharField(max_length=12, choices=Modalidade.choices, default='Modalidade.CARONA')
>>>>>>> Pedro-Branch
