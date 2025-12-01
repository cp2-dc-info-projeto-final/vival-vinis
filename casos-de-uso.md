CASO DE USO: Sistema de Gerenciamento da Vival Vinis

Atores:

Cliente (Usuário não administrador)

Administrador

VISÃO GERAL DO SISTEMA:
A Vival Vinis é uma loja online de vinis que oferece funcionalidades diferenciadas para clientes e administradores através de um sistema web.

CASOS DE USO PARA CLIENTE

Caso de Uso 1: Cadastro de Cliente

Atores: Cliente

Fluxo Principal: Similar ao caso de uso fornecido

Fluxos Alternativos: Similar ao caso de uso fornecido

Caso de Uso 2: Login de Usuário

Atores: Cliente

Fluxo Principal:

Cliente acessa a página inicial

Cliente clica em "Login"

Sistema exibe formulário de login

Cliente insere email e senha

Sistema valida credenciais

Sistema redireciona para página inicial com usuário logado

Caso de Uso 3: Navegação no Catálogo

Atores: Cliente

Fluxo Principal:

Cliente acessa a página inicial

Cliente visualiza produtos em destaque

Cliente clica em "Catálogo Completo"

Sistema exibe todos os produtos disponíveis

Cliente pode filtrar por gênero, artista ou preço

Caso de Uso 4: Gerenciamento do Carrinho

Atores: Cliente

Fluxo Principal:

Cliente seleciona produto

Cliente clica em "Adicionar ao Carrinho"

Sistema adiciona item ao carrinho

Cliente acessa carrinho para visualizar itens

Cliente pode finalizar compra ou continuar navegando

CASOS DE USO PARA ADMINISTRADOR

Caso de Uso 5: Login de Administrador

Atores: Administrador

Fluxo Principal:

Administrador acessa página de login administrativo

Insere credenciais de administrador

Sistema valida permissões

Sistema redireciona para dashboard administrativo

Caso de Uso 6: Gerenciamento de Produtos

Atores: Administrador

Fluxo Principal:

Administrador acessa dashboard

Clica em "Gerenciar Produtos"

Sistema exibe lista completa de produtos

Administrador pode cadastrar, editar ou excluir produtos

Fluxo Alternativo 6A: Cadastrar Novo Produto

Administrador clica em "Cadastrar Produto"

Sistema exibe formulário com campos: título, artista, gênero, preço, estoque, descrição, imagem

Administrador preenche informações

Sistema valida dados e cadastra produto

Sistema atualiza catálogo

Fluxo Alternativo 6B: Editar Produto Existente

Administrador seleciona produto da lista

Clica em "Editar"

Sistema exibe formulário com dados atuais

Administrador modifica informações

Sistema salva alterações

Fluxo Alternativo 6C: Excluir Produto

Administrador seleciona produto

Clica em "Excluir"

Sistema solicita confirmação

Administrador confirma exclusão

Sistema remove produto do catálogo

Caso de Uso 7: Gerenciamento de Usuários

Atores: Administrador

Fluxo Principal:

Administrador acessa dashboard

Clica em "Gerenciar Usuários"

Sistema exibe lista de usuários cadastrados

Administrador pode visualizar, editar ou excluir usuários

Fluxo Alternativo 7A: Cadastrar Novo Usuário

Administrador clica em "Cadastrar Usuário"

Sistema exibe formulário de cadastro

Administrador preenche dados do usuário

Sistema cria nova conta de usuário

Fluxo Alternativo 7B: Editar Usuário Existente

Administrador seleciona usuário

Clica em "Editar"

Sistema exibe dados do usuário

Administrador modifica informações

Sistema salva alterações

Caso de Uso 8: Visualizar Dashboard Administrativo

Atores: Administrador

Fluxo Principal:

Administrador faz login

Sistema exibe dashboard com:

Estatísticas de vendas

Produtos mais vendidos

Usuários cadastrados recentemente

Alertas de estoque baixo

REQUISITOS DO SISTEMA:

Para Clientes:

Página inicial com produtos em destaque

Catálogo completo de produtos

Carrinho de compras

Sistema de login/cadastro

Perfil de usuário

Para Administradores:

Dashboard administrativo

CRUD completo de produtos

CRUD completo de usuários

Controle de estoque

Relatórios de vendas

Regras de Negócio:

Senhas devem ter entre 8-16 caracteres

Emails devem ser únicos no sistema

Produtos com estoque zero não são exibidos para clientes

Apenas administradores podem acessar funcionalidades administrativas

Este caso de uso fornece uma base completa para o desenvolvimento do sistema da Vival Vinis, atendendo tanto às necessidades dos clientes quanto às dos administradores.

junte os de cliente e administrador
SISTEMA VIVAL VINIS - CASOS DE USO INTEGRADOS

Atores Principais:

Cliente (Usuário não administrador)

Administrador

CASO DE USO 1: Cadastro de Usuário
Atores: Cliente, Administrador
Fluxo Principal:

Usuário clica no botão "Cadastrar"

Sistema direciona para página de cadastro com formulário

Usuário insere email, senha e nome de usuário

Sistema verifica disponibilidade no banco de dados

Banco de dados retorna verdadeiro

Sistema cria conta e registra informações

Sistema redireciona para página inicial

Fluxo Alternativo A: Email inválido
3. Usuário insere email já cadastrado
4. Sistema verifica e identifica email em uso
5. Sistema informa que email já está sendo usado
6. Sistema sugere uso de outro email

Fluxo Alternativo B: Senha fora dos padrões
3. Usuário insere senha com menos de 8 ou mais de 16 caracteres
4. Sistema verifica padrão da senha
5. Sistema exibe mensagem de erro
6. Sistema informa que senha está fora dos padrões
7. Sistema solicita senha correta

Fluxo Alternativo C: Campo vazio
3. Usuário deixa um ou mais campos em branco
4. Sistema identifica campos obrigatórios não preenchidos
5. Sistema exibe mensagem nos campos vazios
6. Sistema solicita preenchimento dos dados

CASO DE USO 2: Login no Sistema
Atores: Cliente, Administrador
Fluxo Principal:

Usuário acessa página inicial

Clica em "Login"

Sistema exibe formulário de login

Usuário insere email e senha

Sistema valida credenciais

Sistema identifica tipo de usuário (Cliente/Administrador)

Sistema redireciona para página inicial correspondente

Fluxo Alternativo A: Credenciais inválidas
5. Sistema não valida credenciais
6. Sistema exibe mensagem "Email ou senha incorretos"
7. Sistema mantém na página de login

CASO DE USO 3: Navegação e Visualização de Produtos
Atores: Cliente, Administrador
Fluxo Principal:

Usuário acessa página inicial

Sistema exibe produtos em destaque

Usuário clica em "Catálogo Completo"

Sistema exibe todos os produtos disponíveis

Usuário pode filtrar por gênero, artista ou preço

Fluxo Administrativo:
6. Administrador visualiza opções administrativas no catálogo

CASO DE USO 4: Gerenciamento de Carrinho
Atores: Cliente, Administrador
Fluxo Principal:

Usuário seleciona produto

Clica em "Adicionar ao Carrinho"

Sistema adiciona item ao carrinho

Usuário acessa carrinho para visualizar itens

Usuário pode finalizar compra ou continuar navegando

CASO DE USO 5: Gerenciamento de Produtos (Administrativo)
Atores: Administrador
Fluxo Principal:

Administrador faz login

Sistema exibe dashboard administrativo

Administrador clica em "Gerenciar Produtos"

Sistema exibe lista completa de produtos com opções de editar/excluir

Fluxo Alternativo A: Cadastrar Novo Produto
4. Administrador clica em "Cadastrar Produto"
5. Sistema exibe formulário com campos: título, artista, gênero, preço, estoque, descrição, imagem
6. Administrador preenche informações
7. Sistema valida e cadastra produto
8. Sistema atualiza catálogo

Fluxo Alternativo B: Editar Produto Existente
4. Administrador seleciona produto e clica em "Editar"
5. Sistema exibe formulário com dados atuais
6. Administrador modifica informações
7. Sistema salva alterações

Fluxo Alternativo C: Excluir Produto
4. Administrador seleciona produto e clica em "Excluir"
5. Sistema solicita confirmação
6. Administrador confirma exclusão
7. Sistema remove produto do catálogo

CASO DE USO 6: Gerenciamento de Usuários (Administrativo)
Atores: Administrador
Fluxo Principal:

Administrador acessa dashboard

Clica em "Gerenciar Usuários"

Sistema exibe lista de usuários cadastrados

Fluxo Alternativo A: Cadastrar Novo Usuário
3. Administrador clica em "Cadastrar Usuário"
4. Sistema exibe formulário de cadastro
5. Administrador preenche dados do usuário
6. Sistema cria nova conta

Fluxo Alternativo B: Editar Usuário Existente
3. Administrador seleciona usuário e clica em "Editar"
4. Sistema exibe dados do usuário
5. Administrador modifica informações
6. Sistema salva alterações

Fluxo Alternativo C: Excluir Usuário
3. Administrador seleciona usuário e clica em "Excluir"
4. Sistema solicita confirmação
5. Administrador confirma exclusão
6. Sistema remove usuário do sistema

CASO DE USO 7: Logout do Sistema
Atores: Cliente, Administrador
Fluxo Principal:

Usuário logado clica em "Logout"

Sistema encerra sessão

Sistema redireciona para página inicial

Sistema exibe opções de login/cadastro

CASO DE USO 8: Visualização de Dashboard (Administrativo)
Atores: Administrador
Fluxo Principal:

Administrador faz login

Sistema exibe dashboard com:

Estatísticas de vendas

Produtos mais vendidos

Usuários cadastrados recentemente

Alertas de estoque baixo

Acesso rápido às funcionalidades administrativas