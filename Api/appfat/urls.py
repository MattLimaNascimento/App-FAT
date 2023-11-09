from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rides.api.views import get_routes

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',get_routes,name='routes'),
    path('rides/', include('rides.urls')),
    path('accounts/', include('accounts.urls')),
    path('rides/api/', include('rides.api.urls')),
<<<<<<< HEAD
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
=======
>>>>>>> 0200b675b32c09ce2c1597c7cfb6a4f11829f419
]
