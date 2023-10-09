from django.db import models as mo
from django.contrib.auth.models import User
from django.utils.translation import gettext as _


# Create your models here.


def upload_path(instance):
    return f'Profile_diretorio/{instance.user_id}'

class Profile(mo.Model):
    class Genero(mo.TextChoices):
        M = 'M', _('Masculino')
        F = 'F', _('Feminino')

    class Tipos(mo.TextChoices):
        PASSAGEIRO = 'PASSAGEIRO', _('Passageiro')
        MOTORISTA = 'MOTORISTA', _('Motorista')

    user = mo.ForeignKey(User, on_delete=mo.CASCADE)
    nome = mo.CharField(max_length=20)
    email = mo.EmailField(max_length=50)
    placa_carro = mo.CharField(max_length=8, null=True, blank=True)
    cnh = mo.IntegerField(null=True)
    diretorio = mo. ImageField(blank=False,
                               upload_to=upload_path)
    senha = mo.CharField(max_length=50, default='*********')
    # gender = mo.CharField(
    #     max_length=12, choices=Genero.choices, default='Genero.M')
    # tipos = mo.CharField(max_length=12, choices=Tipos.choices,
    #                      default='Tipos.Passageiro')
    # matricula = mo.IntegerField()
    # idade = mo.IntegerField()
