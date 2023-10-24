from validate_docbr import CNH
from rest_framework import serializers

#def cnh_valido(numero_cnh):
#  # validar CNH
# cnh = CNH()
#return cnh.validate(numero_cnh)

def cnh_valido(self,cnh):
    if len(cnh)!=9:
        raise serializers.ValidationError('Cnh deve conter 9 digitos!')
    return cnh