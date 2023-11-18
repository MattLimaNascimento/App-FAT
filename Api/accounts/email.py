from djoser import email

class ActivationEmail(email.ActivationEmail):
    template_name = 'accounts/activation.html'


class ConfirmationEmail(email.ConfirmationEmail):
    template_name = 'accounts/confirmation.html'


class PasswordResetEmail(email.PasswordResetEmail):
    template_name = 'accounts/password_reset.html'


class PasswordChangedConfirmationEmail(email.PasswordChangedConfirmationEmail):
    template_name = 'accounts/password_changed_confirmation.html'
