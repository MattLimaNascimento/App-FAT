

# API :

1- Abra o terminal do visual code (ctrl + j) e digite o comando : 'cd Api' , para direcionar o terminal para a pasta na qual está o arquivo manage.py;
2 -Depois digite o comando : 'python manage.py runserver' . Este comando irá iniciar o servidor. Com o botão ' ctrl' pressionado, clique no endereço "http://127.0.0.1:8000/";
3 - Assim abrirá uma pág principal da Api que contem a lista de todos os endpoints :
i - /rides/api/profiles/ : este endpoint Retorna uma lista de perfis ;
ii - /rides/api/profiles/id : este endpoint retorna um unico perfil mediante chave id inserida,permitindo alterar algum campo do perfil ;
iii -/rides/api/rides/id:Retorna carona especifica por meio do id e altualiza dados desta;
iv -/rides/api/rides/:Retorna lista de caronas e permite postar nova.
obs: basta colar estes endereços após a porta 8000, que será redirecionado ao endpoint escolhido!

