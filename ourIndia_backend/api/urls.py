from django.urls import path
from . import views


urlpatterns = [
    path('all-monument/', views.AllMonumentView.as_view(), name='all-monument'),
    path('monumentDetail/<int:pk>', views.MonumentDetailView.as_view(), name='stateDetail'),

    path('register/', views.UserRegistrationView.as_view(), name='register'),
    path('login/', views.UserLoginView.as_view(), name='login'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
    path('changepassword/', views.UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', views.SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<str:uidb64>/<str:token>/', views.UserPasswordResetView.as_view(), name='reset_password'),

]