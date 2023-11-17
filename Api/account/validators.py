from validate_docbr import CNH
from rest_framework import serializers

def cnh_valido(value):
<<<<<<< HEAD:Api/account/validators.py
        if value is not '':
            cnh_validator = CNH()
            if not cnh_validator.validate(value):
                raise serializers.ValidationError('CNH inválida. Certifique-se de que o formato é válido.')
=======
        if value is not None:
            cnh_validator = CNH()
            if not cnh_validator.validate(value):
                raise serializers.ValidationError('CNH inválida. Certifique-se de que o formato é válido.')
        
            
>>>>>>> origin/Pedro-Branch:Api/rides/api/validators.py
