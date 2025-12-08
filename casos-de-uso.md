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

CASO DE USO 5: Cadastrar Produto

Ator: Administrador

Fluxo Principal:

Administrador acessa painel administrativo

Clica em “Catálogo de Produtos”
	
Seleciona “Cadastrar Produto”
		
Sistema exibe formulário de novo produto
		
Administrador insere título, preço, descrição, imagem e quantidade
		
Administrador confirma cadastro
		
Sistema valida e registra o produto
		
Sistema exibe mensagem de sucesso e atualiza catálogo

Fluxo Alternativo: Dados Inválidos
	•	5a. Sistema identifica erros ou campos vazios
	•	5b. Sistema exibe mensagem indicando correção necessária
	•	5c. Administrador insere correções e reenviar

CASO DE USO 6: Editar Produto

Ator: Administrador

Fluxo Principal:

Administrador acessa painel administrativo

Clica em “Gerenciar Produtos”

Seleciona produto e clica em “Editar”

Sistema exibe formulário preenchido com dados do produto

Administrador altera as informações necessárias

Administrador confirma edição

Sistema salva alterações

Sistema retorna catálogo atualizado

Fluxo Alternativo: Cancelar Edição
	•	6a. Administrador cancela a operação
	•	6b. Sistema retorna ao catálogo sem modificar dados

CASO DE USO 7: Excluir Produto

Ator: Administrador

Fluxo Principal

Administrador acessa painel administrativo

Clica em “Gerenciar Produtos”

Seleciona produto e clica em “Excluir”

Sistema solicita confirmação

Administrador confirma

Sistema remove produto

Sistema atualiza catálogo exibindo mensagem de exclusão concluída

Fluxo Alternativo: Cancelar Exclusão
	•	7a. Administrador não confirma
	•	7b. Sistema mantém produto e retorna ao catálogo

CASO DE USO 8: Cadastrar Usuário

Ator: Administrador

Fluxo Principal:
	
Administrador acessa painel administrativo

Clica em “Gerenciar Usuários”

Seleciona “Cadastrar Usuário”

Sistema exibe formulário

Administrador preenche dados do novo usuário

Sistema valida e cria a conta

Sistema exibe mensagem de sucesso e atualiza lista

Fluxo Alternativo: Dados Incorretos
	•	8a. Dados inválidos
	•	8b. Sistema solicita correção
	•	8c. Administrador reenviar

CASO DE USO 9: Editar Usuário

Ator: Administrador

Fluxo Principal

Administrador acessa painel administrativo

Clica em “Gerenciar Usuários”

Seleciona usuário e clica em “Editar”

Sistema exibe dados atuais

Administrador modifica dados

Sistema salva alterações

Sistema atualiza lista de usuários

Fluxo Alternativo: Cancelar Alteração
	•	9a. Administrador cancela operação
	•	9b. Sistema mantém dados atuais

CASO DE USO 10: Excluir Usuário

Ator: Administrador

Fluxo Principal:

Administrador acessa painel administrativo

Clica em “Gerenciar Usuários”

Seleciona usuário e clica em “Excluir”

Sistema solicita confirmação

Administrador confirma

Sistema remove o usuário

Sistema atualiza lista exibindo exclusão concluída

Fluxo Alternativo: Cancelar Exclusão
	•	10a. Administrador não confirma
	•	10b. Sistema mantém o usuário

CASO DE USO 11: Logout do Sistema
Atores: Cliente, Administrador
Fluxo Principal:

Usuário logado clica em "Logout"

Sistema encerra sessão

Sistema redireciona para página inicial

Sistema exibe opções de login/cadastro
