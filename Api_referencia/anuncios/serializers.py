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

class RidesSerializer(serializers.ModelSerializer):
    passageiros = CarregaDadosPassageirosSerializer(many=True, required=False, read_only=True)
    passageiros_id = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=False,
        queryset=User.objects.all(),
        source='passageiros'
    )

    class Meta:
        model = Ride
        fields = ['id','motorista', 'passageiros', 'passageiros_id', 'data_publicaçao',
                  'data_saida', 'origem', 'destino', 'preço', 'veiculo', 'modalidade']

    def update(self, instance, validated_data):
        passageiros = validated_data.pop('passageiros')
        instance = super(RidesSerializer, self).update(instance, validated_data)
        instance.passageiros.clear()
        for passageiro in passageiros:
            instance.passageiros.add(passageiro)
        return instance

class UserSerialier(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"