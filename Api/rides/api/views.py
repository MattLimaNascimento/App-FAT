    # DRF
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, mixins
from rest_framework.generics import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import serializers

from accounts.models import Profile
from rides.models import Ride
from .serializers import RidesSerializer, ProfileSerializer, UserSerialier
from django.contrib.auth.models import User
from django.http import Http404
from django.http import HttpResponse

"""
API de Rides (v1)
"""
# Obtém todos os objetos do modelo Ride
rides = Ride.objects.all()

# Imprime informações específicas sobre cada objeto Ride
for ride in rides:
    print(f"ID: {ride.id}, Origem: {ride.origem}")

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
    queryset = Ride.objects.all()
    serializer_class = RidesSerializer

    # listar Rides  -> request GET

    def get_queryset(self):
        dicionario_request = self.request.GET.dict()
        return self.queryset.filter(**dicionario_request)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class RideDetailAPIView(generics.GenericAPIView,
                        mixins.RetrieveModelMixin,
                        mixins.DestroyModelMixin,
                        mixins.UpdateModelMixin
                        ):

    queryset = Ride.objects.all()
    serializer_class = RidesSerializer

    lookup_field = 'pk'

    def delete(self, request, *args, **Kwargs):
        return self.destroy(request, *args, **Kwargs)

    def get(self, request, *args, **Kwargs):
        return self.retrieve(request, *args, **Kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class ManagePassenger(APIView):
    def patch(self, request, ride_id, *args, **kwargs):
        return self.manage_passenger(request, ride_id, "Adicionar")

    def post(self, request, ride_id, *args, **kwargs):
        return self.manage_passenger(request, ride_id, "Remover")

    def manage_passenger(self, request, ride_id, tipo):
        profile_id = request.data.get('id')

        if not ride_id or not profile_id or not tipo:
            return Response({'error': 'Ride ID, Profile ID, and Type are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            ride = Ride.objects.get(id=ride_id)
            profile = Profile.objects.get(id=profile_id)
        except Ride.DoesNotExist:
            raise Http404('Ride not found')
        except Profile.DoesNotExist:
            raise Http404('Profile not found')

        if tipo == "Adicionar":
            # Adiciona o perfil como passageiro à Ride
            ride.passageiros.add(profile)
        elif tipo == "Remover":
            # Remove o perfil como passageiro da Ride
            ride.passageiros.remove(profile)
        else:
            return Response({'error': 'Invalid Type. Use "Adicionar" or "Remover".'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = RidesSerializer(ride)
        return Response(serializer.data, status=status.HTTP_200_OK)
"""
API de Perfis (v1)

"""


class ProfilesAPIView(generics.ListCreateAPIView):

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def post(self, request,):
        data = request.data
        if len(data['cnh']) != 11:
            raise serializers.ValidationError("O campo deve ter exatamente 11 caracteres.")

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


"""
API (v2)
"""

class RidesViewSet(viewsets.ModelViewSet):
    queryset = Ride.objects.all()
    serializer_class = RidesSerializer

    @action(detail=True, methods=['get'])
    def profiles(self, request, pk=None):
        self.pagination_class_sizes = 5
        profiles = Profile.objects.all()
        page = self.paginate_queryset(profiles)

        if page is not None:
            serializer = ProfileSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

# Autentificação para user logado
class UserDetailAPIView(generics.RetrieveAPIView):
    
    """
    endpoint para pegar informaçôes do user logado
    
    """
    
    permission_classes =[IsAuthenticated]
    serializer_class = UserSerialier
    
    def get_object(self):
        return self.request.user