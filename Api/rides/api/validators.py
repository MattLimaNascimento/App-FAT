from validate_docbr import CNH
<<<<<<< HEAD

def cnh_valido(numero_cnh):
  # validar CNH
    cnh = CNH()
    return cnh.validate(numero_cnh)

#def cnh_valido(self,cnh):
#    if len(cnh)!=9:
#        raise serializers.ValidationError('Cnh deve conter 9 digitos!')
#    return cnh
=======
from rest_framework import serializers

def cnh_valido(value):
        if value is not None:
            cnh_validator = CNH()
            if not cnh_validator.validate(value):
                raise serializers.ValidationError('CNH inválida. Certifique-se de que o formato é válido.')
        
            
>>>>>>> 0200b675b32c09ce2c1597c7cfb6a4f11829f419
