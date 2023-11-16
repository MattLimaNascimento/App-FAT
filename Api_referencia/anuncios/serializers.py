from accounts.models import User
from anuncios.models import Ride
# from django.contrib.auth.models import User
from rest_framework import serializers

class CarregaDadosPassageirosSerializer(serializers.ModelSerializer):
    class Meta:
        nome_usuario = serializers.SerializerMethodField()
        model = User
        fields = ['id', 'name','diretorio', 'email']

        def get_nome_usuario(self, obj):
            return obj.nome.username

class CarregaFotoMotoristaSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'diretorio']

class RidesSerializer(serializers.ModelSerializer):
    passageiros = CarregaDadosPassageirosSerializer(many=True, required=False, read_only=True)
    motorista = CarregaFotoMotoristaSerializer(read_only=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        motorista_data = representation['motorista']
        representation['motorista'] = [motorista_data['id'], motorista_data['diretorio']]
        return representation
    
   # passageiros_id = serializers.PrimaryKeyRelatedField(
    #     many=True,
    #     read_only=False,
    #     queryset=User.objects.all(),
    #     source='passageiros'
    # )

    class Meta:
        model = Ride
        fields = ['id','motorista', 'passageiros', 'data_publicaçao',
                  'data_saida', 'origem', 'destino', 'preço', 'veiculo', 'modalidade']

    def update(self, instance, validated_data):
        passageiros = validated_data.pop('passageiros')
        instance = super(RidesSerializer, self).update(instance, validated_data)
        instance.passageiros.clear()
        for passageiro in passageiros:
            instance.passageiros.add(passageiro)
        return instance
    
class CarregaFotoMotoristaSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'diretorio']

class UserRidesSerializer(serializers.ModelSerializer):
    motorista = CarregaFotoMotoristaSerializer(read_only=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        motorista_data = representation['motorista']
        representation['motorista'] = [motorista_data['id'], motorista_data['diretorio']]
        return representation
    
    class Meta:
        model = Ride
        fields = ['motorista', 'passageiros', 'data_publicaçao',
                  'data_saida', 'origem', 'destino', 'preço', 'veiculo', 'modalidade']

class UserSerialier(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"