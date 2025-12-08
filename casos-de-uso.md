Casos de uso Vival Vinis

Atores Principais:

Cliente (Usuário não administrador)

Administrador

CASO DE USO 1: Cadastro de Usuário
Atores: Cliente, Administrador
Fluxo Principal:

Usuário clica no botão "Cadastrar"

Sistema direciona para página de cadastro com formulário

Usuário insere login, email e senha

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
3. Usuário insere senha fora dos padrões
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

Usuário pode filtrar por nome

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

Administrador clica em "Catalogo de  Produtos"

Sistema exibe lista completa de produtos com opções de editar/excluir

Fluxo Alternativo A: Cadastrar Novo Produto
4. Administrador clica em "Cadastrar Produto"
5. Sistema exibe formulário com campos: título, preço, estoque, descrição, imagem
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

sistema exibe menu de administrador

Clica em "Usuários"

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

