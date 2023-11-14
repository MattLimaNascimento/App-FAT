from django.urls import path, include
from .views import (RidesAPIView,
                    RideDetailAPIView,
                    ManagePassenger,
                    )
                 
# create your routes here !

urlpatterns = [
    path('rides/', RidesAPIView.as_view(), name='rides'),
    path('rides/<int:pk>/', RideDetailAPIView.as_view(), name='ride'),
    path('rides/passenger/<int:ride_id>/', ManagePassenger.as_view(), name='adicionar_passageiro'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls.authtoken')),
]
