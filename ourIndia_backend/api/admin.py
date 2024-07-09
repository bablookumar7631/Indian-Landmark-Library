from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import *

# Register your models here.
admin.site.register(Monument),

class UserModelAdmin(BaseUserAdmin):
    # The fields to be used in displaying th User model.
    # These override the definitions on the base UserModelAdmin
    # that reference specific fields on auth.User.
    list_display = ('id', 'email', 'name', 'tc', 'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'tc')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    # add_fieldset is not a standard ModelAdmin attribute UserModelAdmin
    # overrides get_fields to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields':('email', 'name', 'tc', 'password', 'password2'),
        }),
    )
    search_fields = ('email', 'name',)
    ordering = ('email', 'id', 'name')
    filter_horizontal = ()

# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)

