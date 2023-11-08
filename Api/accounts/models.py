from django.db import models as mo
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
from rides.api.validators import cnh_valido
from django.core.validators import MaxValueValidator



# Create your models here.


def upload_path(instance, filename):
    return f'static/img/{instance.user_id}/{filename}'

def create_user(self, email, name, password, diretorio):
        """
       Cria e salva um user com foto,nome, e-mail e senha enviados !
        """
        if not email:
            raise ValueError('Usuário deve ter uma conta de e-mail!')
        user = self.model(
            email=self.normalize_email(email),
            nome=name,
            password=password,
            diretorio=diretorio
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

class Profile(mo.Model):
    class Genero(mo.TextChoices):
        M = 'M', _('Masculino')
        F = 'F', _('Feminino')

    class Tipos(mo.TextChoices):
        PASSAGEIRO = 'PASSAGEIRO', _('Passageiro')
        MOTORISTA = 'MOTORISTA', _('Motorista')

    user = mo.ForeignKey(User, on_delete=mo.CASCADE)
    ativo = mo.BooleanField(default=True)
    nome = mo.CharField(max_length=20)
    email = mo.EmailField(max_length=50)
    placa_carro = mo.CharField(max_length=8, null=True, blank=True)
    cnh = mo.CharField(blank=True,max_length=11,null=True,validators=[cnh_valido])
    diretorio = mo. ImageField(blank=False,
                               upload_to=upload_path)
    senha = mo.CharField(max_length=50, default='*********')
    # gender = mo.CharField(
    #     max_length=12, choices=Genero.choices, default='Genero.M')
    # tipos = mo.CharField(max_length=12, choices=Tipos.choices,
    #                      default='Tipos.Passageiro')
    # matricula = mo.IntegerField()
    # idade = mo.IntegerField()

        
    