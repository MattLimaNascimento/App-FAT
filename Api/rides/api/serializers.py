from accounts.models import Profile , CustomUser
from rides.models import Ride
from django.contrib.auth.models import User
from rest_framework import serializers
from .validators import cnh_valido





class CarregaDadosPassageirosSerializer(serializers.ModelSerializer):
    class Meta:
        nome_usuario = serializers.SerializerMethodField()
        model = CustomUser
        fields = ['id', 'username','diretorio']

        def get_nome_usuario(self, obj):
            return obj.nome.username


class ProfileSerializer(serializers.ModelSerializer):
    senha2 = serializers.CharField(write_only = True)
    
    class Meta:
        model = Profile
        fields = ['user','nome','ativo','email','placa_carro','cnh','diretorio','senha','senha2']
        
    # def validate(self,data):
    #     if not cnh_valido(data['cnh']):
    #         raise serializers.ValidationError('CNH inválida. Certifique-se de que o formato é válido.')
    #     return data

    
    def save(self):
        user = User()
        user.email = self.validated_data["email"] # validação do campo 'email'
        user.username = self.validated_data["username"] # validação do campo 'nome usuario'
        senha = self.validated_data["senha"] # validação do campo 'senha'
        senha2 = self.validated_data["senha2"]# validação do campó 'senha2'
        if senha != senha2:
            raise serializers.ValidationError({'error': 'As senhas precisam ser iguais.'})
        user.set_password(senha) #criptografar senha 
        user.save() # senha criptografada salva
        return user # retornar user com senha criptografada
    


class RidesSerializer(serializers.ModelSerializer):
    passageiros = CarregaDadosPassageirosSerializer(many=True, required=False,read_only=True)
    passageiros_id = serializers.PrimaryKeyRelatedField(many=True, read_only=False, queryset=User.objects.all(),source='passageiros')
    class Meta:
        model = Ride
        fields = ['motorista','passageiros','passageiros_id','data_publicaçao',
                  'data_saida','origem','destino','preço','veiculo','modalidade']

    def update(self, instance, validated_data):
        passageiros = validated_data.pop('passageiros')
        instance = super(RidesSerializer, self).update(
            instance, validated_data)
        instance.passageiros.clear()
        for passageiro in passageiros:
            instance.passageiros.add(passageiro)
            return instance
        
        for atributo, valor in validated_data.items():
            setattr(instance, atributo, valor)
        instance.save()
        return instance
    
    def get_nome_passageiros(self, obj):
        return obj.nome.passageiros

class UserSerialier(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"