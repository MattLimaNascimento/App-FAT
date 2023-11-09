# DRF
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, mixins,viewsets,filters
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.decorators import api_view
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import serializers

from accounts.models import Profile
from rides.models import Ride
from .serializers import RidesSerializer, ProfileSerializer, UserSerialier
from django.contrib.auth.models import User
from . validators import cnh_valido



"""
API de Rides (v1)
"""

@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/rides/api/profiles/',
            'method': 'GET','POST'
            'usuario': None,
            'email': None,
            'senha': None,
            'diretorio': None,
            'description': 'Retorna uma lista de perfis'
        },
        {
            'Endpoint': '/rides/api/profiles/<int:pk>',
            'method': 'GET','PUT'
            'usuario': None,
            'email': None,
            'senha': None,
            'diretorio': None,
            'description': 'Retorna um único perfil.Permite alterar algum campo deste'
        },
        {
            'Endpoint': '/rides/api/rides/<int:pk>',
            'method': 'GET','PUT'
            'usuario':None,
            'email': None,
            'senha': None,
            'diretorio': None,
            'description': 'Retorna carona especifica por meio do id e altualiza dados desta '
        },
        {
            'Endpoint': '/rides/api/rides/',
            'method': 'GET','POST'
            'usuario': None,
            'email': None,
            'senha': None,
            'diretorio':None,
            'description': 'Retorna lista de caronas e permite postar nova.'
        },
        
    ]
    return Response(routes)





class RidesAPIView(generics.ListCreateAPIView):
    """
    Listar Rides mediante filtro
    Ref POST : (RAW)
    {
    "modalidade": "CARONA",
    "motorista": 7,
    "data_saida": "2023-09-20T14:45:00Z",
    "info": "Teste"
}

    """
    serializer_class = RidesSerializer
    queryset = Ride.objects.all()
    filter_backends = [DjangoFilterBackend,filters.SearchFilter]
    search_fields = ['motorista','passageiros']

    # listar Rides  -> request GET

    def get_queryset(self):
        dicionario_request = self.request.GET.dict()
        return self.queryset.filter(**dicionario_request)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    




class RideDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Ride.objects.all()
    serializer_class = RidesSerializer
    lookup_field = 'pk'

    def get_object(self):
        if self.kwargs.get('Rides_pk'):
            return get_object_or_404(self.get_queryset(), carona_id=self.kwargs.get('Rides_pk'),
                                     pk=self.kwargs.get('profile_pk'))
        return get_object_or_404(self.get_queryset(), pk=self.kwargs.get('profile_pk'))




"""
API de Perfis 

"""


class ProfilesAPIView(generics.ListCreateAPIView):

    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    filter_backends = [DjangoFilterBackend,filters.OrderingFilter,filters.SearchFilter]
    search_fields = ['nome','email']
    ordering_fields = ['nome']


    def post(self, request,):
        data = request.data
        print(data['cnh'])
        if not cnh_valido(data['cnh']):
            raise serializers.ValidationError('CNH invalido !')
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
    
       
        
class ProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'pk'

    def get_object(self):
        if self.kwargs.get('Rides_pk'):
            return get_object_or_404(self.get_queryset(), perfil_id=self.kwargs.get('profiles_pk'),
                                     pk=self.kwargs.get('profile_pk'))
        return get_object_or_404(self.get_queryset(), pk=self.kwargs.get('profile_pk'))

# Autentificação para user logado
class UserDetailAPIView(generics.RetrieveAPIView):
    
    """
    endpoint para pegar informaçôes do user logado
    
    """
    
    permission_classes =[IsAuthenticated]
    serializer_class = UserSerialier
    
    def get_object(self):
        return self.request.user