# CorretorIA — Corretor de Redações do ENEM com IA

Aplicativo web para corrigir redações do ENEM usando inteligência artificial (Claude da Anthropic). Recebe sua redação, avalia nas **5 competências oficiais** e fornece nota (0–1000) + feedback detalhado por competência.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- Uma chave de API da Anthropic → [console.anthropic.com](https://console.anthropic.com/settings/keys)

---

## Como rodar

### 1. Instalar dependências

```bash
cd corretor-ia
npm install
```

### 2. Configurar a chave da API

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e substitua `sua_chave_aqui` pela sua chave real:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

---

## Funcionalidades

- **Formulário simples**: cole sua redação e informe o tema
- **Correção por IA**: avaliação nas 5 competências oficiais do ENEM
- **Notas por competência**: 0, 40, 80, 120, 160 ou 200 pontos (padrão ENEM)
- **Nota total**: soma das 5 competências (0–1000)
- **Feedback detalhado**: orientações específicas para cada competência
- **Design responsivo**: funciona bem em celular e desktop

## As 5 Competências do ENEM

| # | Competência |
|---|------------|
| I | Domínio da Modalidade Escrita Formal da Língua Portuguesa |
| II | Compreensão da Proposta e Desenvolvimento do Tema |
| III | Organização e Interpretação de Informações |
| IV | Conhecimento dos Mecanismos Linguísticos |
| V | Elaboração de Proposta de Intervenção |

---

## Stack

- **Frontend**: React 18 + Vite 6
- **Estilização**: Tailwind CSS 3
- **IA**: Claude Sonnet via SDK `@anthropic-ai/sdk`

---

## Aviso

> Esta ferramenta é apenas para fins de estudo e apoio. Os resultados podem variar em relação à correção oficial do ENEM. A chave de API é usada diretamente no navegador (`dangerouslyAllowBrowser: true`) — **use apenas localmente (não publique a chave)**.
