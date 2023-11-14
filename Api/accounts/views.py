    # DRF
from rest_framework.response import Response
from rest_framework import generics, mixins
from rest_framework import status
from rest_framework import serializers

from accounts.models import Profile
from .serializers import ProfileSerializer
from django.contrib.auth.models import User
from validate_docbr import CNH


class ProfilesAPIView(generics.ListCreateAPIView):

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def post(self, request,):
        data = request.data
        if len(data['cnh']) != 11:
            raise serializers.ValidationError('CNH inválida. Certifique-se de que o campo tenha 11 digitos!')
        if data['cnh'] is not '':
                cnh_validator = CNH()
                if not cnh_validator.validate(data['cnh']):
                    raise serializers.ValidationError('CNH inválida. Certifique-se de que o formato é válido.')
        if data['senha'] != data['senha2']:
            raise serializers.ValidationError({'error': 'As senhas precisam ser iguais.'})
        new_profile = Profile.objects.create(
            user=User.objects.get(pk=data['user']),
            nome=data['nome'],
            email=data['email'],
            senha=data['senha'],
            cnh=data['cnh'],
            placa_carro=data['placa_carro'],
            diretorio=data['diretorio']
        )
        serializer = ProfileSerializer(new_profile, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ProfileDetailAPIView(
        generics.GenericAPIView,
        mixins.RetrieveModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **Kwargs):
        return self.destroy(request, *args, **Kwargs)
