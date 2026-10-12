☕🐾 Savana — Cafeteria com Propósito

As pessoas vêm pela comida… e saem com um novo melhor amigo.


🎯 O Problema que Resolvemos
Abrigos e ONGs de proteção animal enfrentam dois desafios críticos e simultâneos: falta de visibilidade para os animais disponíveis para adoção e escassez crônica de recursos para custear vacinas, castrações, rações e emergências veterinárias.
Ao mesmo tempo, cafeterias tradicionais não têm mecanismo algum para conectar seus clientes a causas sociais relevantes.
O Savana resolve os dois lados desse problema em uma única plataforma:

Para a ONG: expõe os animais resgatados a um público que já está presencialmente engajado, aumentando as chances reais de adoção.
Para os clientes: transforma um simples café ou bolo em um ato de impacto — cada venda reverte diretamente para alimentação, medicamentos e cuidados dos animais.
Para doadores: oferece um canal direto de contribuição via QR Code, sem burocracia.

A plataforma é desenvolvida em parceria com a APASFA (Associação Protetora dos Animais São Francisco de Assis).

🖼️ Protótipo
O design completo da interface está disponível no Figma:
🔗 Acessar protótipo no Figma

🌐 Funcionalidades
ÁreaFuncionalidade🏠 Landing PageApresentação do projeto, links para adoção, cardápio, doações e regras☕ Cardápio DigitalListagem de produtos com nome, preço e descrição🐶 AdoçãoPerfis dos animais resgatados com foto, nome, porte e status💰 DoaçõesQR Code para doação direta à ONG🕐 Regras e HoráriosInformações de visitação ao espaço🔐 Área AdministrativaLogin de funcionários + CRUD completo de animais e produtos

🛠️ Stack Técnica
Frontend
TecnologiaVersãoUsoNext.js16.1.6Framework React fullstackReact19.2.3Interface de usuárioTypeScript^5Tipagem estáticaTailwind CSS^4Estilização utilitáriaReact Hook Form^7Gerenciamento de formuláriosZod^4Validação de schemas no clienteESLint^9Linting (Next.js + TypeScript)
Backend
TecnologiaUsoNestJSFramework backendPrismaORM — banco SQLitebcryptCriptografia de senhas@nestjs/jwtGeração e validação de tokens JWTclass-validatorValidação dos DTOsclass-transformerTransformação de tipos nos DTOs

🔐 Autenticação e Validação
O sistema usa um fluxo completo de autenticação com JWT, com validação dupla: Zod no frontend e DTOs com class-validator no backend.
Fluxo de Cadastro
[Formulário] → Zod valida → POST /users → CreateUserDto valida → bcrypt hash → Prisma salva

Usuário preenche nome, CPF, email, senha e confirmação em /cadastro/funcionario
Zod valida localmente antes de qualquer requisição
Backend recebe, valida com CreateUserDto, criptografa a senha com bcrypt e salva via Prisma

Fluxo de Login
[Formulário] → Zod valida → POST /auth/login → LoginDto valida → bcrypt compare → JWT → localStorage

Usuário preenche email e senha em /login
Backend valida com LoginDto, compara a senha e retorna um JWT com validade de 1 dia
Frontend salva o token no localStorage e redireciona para /gerenciamento

DTOs
LoginDto
CampoTipoValidaçãoemailstringFormato de email válidopasswordstringMínimo de 6 caracteres
CreateUserDto
CampoTipoValidaçãonamestringMínimo de 3 caracterescpfstringEntre 11 e 14 caracteresemailstringFormato de email válidopasswordstringMínimo de 6 caracteres
CreatePetDto
CampoTipoValidaçãonamestringMínimo de 2 caracteresspeciesstringObrigatórioagenumberMínimo 0breedstringObrigatóriodescriptionstringMínimo de 10 caracteresimagestringOpcional
CreateMenuDto
CampoTipoValidaçãonamestringMínimo de 2 caracteresdescriptionstringMínimo de 5 caracterespricenumberMínimo 0.01categorystringObrigatórioimagestringOpcional
Validação Global (Backend)
typescriptapp.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

whitelist: true — remove campos não declarados no DTO automaticamente
transform: true — converte tipos automaticamente (ex: "2" → 2)

Proteção de Rotas com JWT Guard
typescript@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
O guard extrai o token do header Authorization: Bearer <token> e verifica a assinatura.
AcessoRotas🔒 ProtegidasPOST /pets, DELETE /pets/:id, POST /menu, DELETE /menu/:id, DELETE /users/:id🌐 PúblicasGET /pets, GET /menu, GET /users, POST /auth/login, POST /users

🚀 Como Rodar Localmente
Pré-requisitos

Node.js 18+
npm ou yarn

Instalação
bash# Clone o repositório
git clone https://github.com/seu-usuario/savana.git
cd savana

# Instale as dependências
npm install
Configuração do Banco de Dados
bash# Gere o cliente Prisma
npx prisma generate

# Execute as migrations
npx prisma migrate dev
Rodando o Projeto
bash# Ambiente de desenvolvimento
npm run dev
Acesse http://localhost:3000.

✅ Verificação de Lint
O projeto usa eslint-config-next com suporte a TypeScript. Para checar:
bashnpm run lint
A configuração em eslint.config.mjs estende next/core-web-vitals e next/typescript, garantindo zero warnings e erros em produção.

📁 Estrutura de Pastas
savana/
├── app/
│   ├── adocao/          # Página de adoção de animais
│   ├── cadastro/        # Cadastro de animais, funcionários e produtos
│   ├── cardapio/        # Cardápio digital
│   ├── doacoes/         # Página de doações via QR Code
│   ├── gerenciamento/   # Painel administrativo
│   ├── login/           # Autenticação de funcionários
│   ├── regras/          # Horários e regras de visitação
│   ├── components/
│   │   ├── atomos/      # Button, Input, Title, Description…
│   │   ├── moleculas/   # Card, CardAnimal, CardProduto…
│   │   └── organismos/  # Forms, Header, Footer, LoginForm…
│   ├── hooks/           # useUser (autenticação)
│   ├── lib/             # Schemas Zod, utils, mock de usuários
│   └── services/        # authService
├── prisma.config.ts
├── next.config.ts
└── eslint.config.mjs

📌 Status
🚧 Finalizado |  🎓 Projeto acadêmico  |  🤝 Parceria com a APASFA

📜 Licença
Desenvolvido para fins acadêmicos e sociais. Uso educacional permitido.

Cada xícara vendida e cada doação realizada representam mais cuidado, mais proteção e mais esperança para um animal resgatado. 🐾☕
