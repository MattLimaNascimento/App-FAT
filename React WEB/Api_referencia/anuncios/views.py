    # DRF
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, mixins
from rest_framework import status

from anuncios.models import Ride
from .serializers import RidesSerializer
from account.models import User
from django.http import Http404

# Create your views here.

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
            profile = User.objects.get(id=profile_id)
        except Ride.DoesNotExist:
            raise Http404('Ride not found')
        except User.DoesNotExist:
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