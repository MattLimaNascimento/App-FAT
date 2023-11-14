from accounts.models import Profile
from django.contrib.auth.models import User
from rest_framework import serializers
from validate_docbr import CNH


class ProfileSerializer(serializers.ModelSerializer):
    senha2 = serializers.CharField(write_only = True)
    
    class Meta:
        model = Profile
        fields = "__all__"
        
        def save(self):
            user = User()
            user.email = self.validated_data["email"] # validação do campo 'email'
            cnh = self.validated_data["cnh"]
            user.username = self.validated_data["nome"] # validação do campo 'nome usuario'
            senha = self.validated_data["senha"] # validação do campo 'senha'
            senha2 = self.validated_data["senha2"]# validação do campó 'senha2'
            user.set_password(senha) #criptografar senha 
            user.save() # senha criptografada salva
            return user # retornar user com senha criptografada
