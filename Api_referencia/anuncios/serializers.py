from accounts.models import User
from anuncios.models import Ride
from rest_framework import serializers

class CarregaDadosPassageirosSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name','diretorio']

        def get_nome_usuario(self, obj):
            return obj.nome.username

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'diretorio']

class RidesSerializer(serializers.ModelSerializer):
    passageiros = UserDetailSerializer(many=True, read_only=True)
    motorista = UserDetailSerializer(read_only=True)
    passageiros_id = serializers.PrimaryKeyRelatedField(
        required=False,
        many=True,
        read_only=False,
        queryset=User.objects.all(),
        source='passageiros'
    )
    motorista_id = serializers.PrimaryKeyRelatedField(
        read_only=False,
        queryset=User.objects.all(),
        source='motorista'
    )

    class Meta:
        model = Ride
        fields = ['id', 'motorista','vagas', 'motorista_id', 'passageiros_id', 'passageiros', 'data_publicaçao',
                  'hora_saida', 'origem', 'destino', 'preço', 'veiculo', 'modalidade']

    def to_representation(self, instance):
        # Remove os campos de ID da representação da API
        ret = super(RidesSerializer, self).to_representation(instance)
        ret.pop('passageiros_id', None)
        ret.pop('motorista_id', None)
        return ret

    def update(self, instance, validated_data):
        passageiros_data = validated_data.pop('passageiros_id', [])
        motorista_data = validated_data.pop('motorista_id', None)

        instance = super(RidesSerializer, self).update(instance, validated_data)

        # Limpa os passageiros existentes e adiciona os novos
        instance.passageiros.clear()
        for passageiro_data in passageiros_data:
            passageiro, _ = User.objects.get_or_create(id=passageiro_data.id)
            instance.passageiros.add(passageiro)

        # Atualiza ou cria o motorista
        if motorista_data:
            motorista, _ = User.objects.get_or_create(id=motorista_data.id)
            instance.motorista = motorista
            instance.save()

        return instance
    
class CarregaFotoMotoristaSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'diretorio',"name"]

class UserRidesSerializer(serializers.ModelSerializer):
    motorista = CarregaFotoMotoristaSerializer(read_only=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        motorista_data = representation['motorista']
        representation['motorista'] = [motorista_data['id'], motorista_data['diretorio'], motorista_data['name'] ]
        return representation
    
    class Meta:
        model = Ride
        fields = ['id','motorista','vagas', 'passageiros', 'data_publicaçao','hora_saida', 'origem', 'destino', 'preço', 'veiculo', 'modalidade']