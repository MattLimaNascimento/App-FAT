from django.contrib import admin
from accounts.models import User
from rides.models import Ride
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class UserModelAdmin(BaseUserAdmin):
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserModelAdmin
    # that reference specific fields on auth.User.
    list_display = ('id', 'email', 'name', 'diretorio', 'cnh',
                    'placa_carro', 'is_active', 'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal info', {
         'fields': ('name', 'cnh', 'diretorio', 'placa_carro',)}),
        ('Permissions', {'fields': ('is_admin', 'is_active')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'cnh', 'placa_carro', 'diretorio', 'password1', 'password2'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email', 'id')
    filter_horizontal = ()


# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)


class RideAdmin(admin.ModelAdmin):
    list_display = ('motorista', 'data_publicaçao',
<<<<<<< HEAD
                    'data_saida', 'origem', 'destino', 'preço', 'veiculo')


admin.site.register(Ride, RideAdmin)
=======
                    'data_saida', 'origem','destino','preço','veiculo')
    list_filter = ('motorista',)
    search_fields = ('motorista','veiculo')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'nome', 'email', 'placa_carro', 'cnh', 'diretorio')
    list_filter = ('nome','email','cnh')
    search_fields = ('nome','email')
>>>>>>> Pedro-Branch
