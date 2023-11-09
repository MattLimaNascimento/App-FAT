<<<<<<< HEAD
from django.urls import path,include
=======
from django.urls import path, include
>>>>>>> 0200b675b32c09ce2c1597c7cfb6a4f11829f419
from .views import (RidesAPIView,
                    RideDetailAPIView,
                    ProfileDetailAPIView,
                    ProfilesAPIView,
                    UserDetailAPIView,
                    )

                 
# create your routes here !

urlpatterns = [
    path('rides/', RidesAPIView.as_view(), name='rides'),
    path('rides/<int:pk>/', RideDetailAPIView.as_view(), name='ride'),
    path('profiles/', ProfilesAPIView.as_view(), name='profiles'),
<<<<<<< HEAD
    path('profiles/<int:pk>/', ProfileDetailAPIView.as_view(), name='profile'),
    path('token/user-detail/',UserDetailAPIView.as_view(),name='user-detail'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls.authtoken'))

=======
    path('profiles/<int:pk>', ProfileDetailAPIView.as_view(), name='profile'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls.authtoken')),
>>>>>>> 0200b675b32c09ce2c1597c7cfb6a4f11829f419
]
