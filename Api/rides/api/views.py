    # DRF
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, mixins
from rest_framework import status
from rest_framework.decorators import api_view

from accounts.models import Profile
from rides.models import Ride
from .serializers import RidesSerializer
from django.contrib.auth.models import User
from django.http import Http404

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
