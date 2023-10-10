def cnh_valido(numero_cnh):
            return len(numero_cnh)==11 
               
def placa_carro_valido(placa_carro):
    return placa_carro.is_alnum() and len(placa_carro) == 8
        
