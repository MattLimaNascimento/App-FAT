from validate_docbr import CNH
from rest_framework import serializers

<<<<<<< HEAD
def cnh_valido(value):
        if value is not None:
            cnh_validator = CNH()
            if not cnh_validator.validate(value):
                raise serializers.ValidationError('CNH inválida. Certifique-se de que o formato é válido.')
        
            
=======

def cnh_valido(self,value,request):
    # Verifique se campo 'cnh' está vazio 
    if value == None:
         print(value)
     # Caso contrário ,valide CNH com validate_docbr
    if value != None:
        cnh_validator = CNH()
        cnh_validator.validate(value)
        return value  # CNH válida
    

    
   
    
    
    
>>>>>>> Pedro-Branch
