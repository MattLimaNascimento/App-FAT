from validate_docbr import CNH


def cnh_valido(numero_cnh):
    # Validar CNH
    cnh = CNH()
    return  cnh.validate(numero_cnh)  # True