from accounts.models import User
from rides.models import Ride
from rest_framework import serializers




class CarregaDadosPassageirosSerializer(serializers.ModelSerializer):
    class Meta:
        diretorio = serializers.SerializerMethodField(source='profile.diretorio',read_only=True)  
        nome_usuario = serializers.SerializerMethodField()
<<<<<<< HEAD
        model = User
        fields = ['id', 'name', 'diretorio', 'email']
=======
<<<<<<< HEAD
        model = CustomUser
        fields = ['id', 'username','diretorio']
=======
        model = Profile
        fields = ['id', 'nome','diretorio', 'email']
>>>>>>> origin/Matheus-Branch
>>>>>>> Pedro-Branch

        def get_nome_usuario(self, obj):
            return obj.nome.username


<<<<<<< HEAD
class RidesSerializer(serializers.ModelSerializer):
    passageiros = CarregaDadosPassageirosSerializer(
        many=True, required=False, read_only=True)
    passageiros_id = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=False,
        queryset=User.objects.all(),
=======
<<<<<<< HEAD
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
    
=======
>>>>>>> origin/Matheus-Branch


class RidesSerializer(serializers.ModelSerializer):
    passageiros = CarregaDadosPassageirosSerializer(many=True, required=False, read_only=True)
    passageiros_id = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=False,
        queryset=Profile.objects.all(),
>>>>>>> Pedro-Branch
        source='passageiros'
    )

    class Meta:
        model = Ride
<<<<<<< HEAD
        fields = ['id', 'motorista', 'passageiros', 'passageiros_id', 'data_publicaçao',
=======
        fields = ['id','motorista', 'passageiros', 'passageiros_id', 'data_publicaçao',
>>>>>>> Pedro-Branch
                  'data_saida', 'origem', 'destino', 'preço', 'veiculo', 'modalidade']

    def update(self, instance, validated_data):
        passageiros = validated_data.pop('passageiros')
        instance = super(RidesSerializer, self).update(instance, validated_data)
        instance.passageiros.clear()
        for passageiro in passageiros:
            instance.passageiros.add(passageiro)
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
