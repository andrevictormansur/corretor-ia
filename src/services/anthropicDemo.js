import Anthropic from '@anthropic-ai/sdk'

const DEMO_SYSTEM_PROMPT = `Você é um corretor oficial do ENEM treinado pelo INEP. Avalie a redação com rigor técnico absoluto.

CALIBRAÇÃO OBRIGATÓRIA:
- Redação fraca (erros frequentes, argumentação genérica, proposta vaga): 200–440
- Redação mediana (poucos erros, argumentação aceitável, proposta incompleta): 500–660
- Redação boa (domínio sólido, repertório legítimo, proposta com 4 elementos): 680–800
- Redação excepcional (repertório sofisticado e produtivo, proposta completa com 5 elementos): 840–1000
- Menos de 5% das redações do ENEM são excepcionais. Seja honesto.

REGRAS:
- Nota total = soma das 5 competências (cada uma: 0, 40, 80, 120, 160 ou 200)
- Redações medianas NÃO passam de 660. Não infle a nota.
- Pontos fracos: específicos, concretos, até 12 palavras cada
- Ponto forte: genuíno, até 12 palavras

Retorne APENAS este JSON, sem markdown, sem texto adicional:
{
  "nota_total": 580,
  "pontos_fracos": [
    "Argumentação superficial sem dados ou exemplos concretos",
    "Proposta de intervenção sem agente e efeito definidos",
    "Poucos conectivos entre os parágrafos do desenvolvimento"
  ],
  "ponto_forte": "Boa estrutura dissertativa com tese clara na introdução"
}`

function extractJson(text) {
  const t = text.trim()
  try { return JSON.parse(t) } catch {}
  const m = t.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (m) { try { return JSON.parse(m[1]) } catch {} }
  const s = t.indexOf('{'), e = t.lastIndexOf('}')
  if (s !== -1 && e !== -1) { try { return JSON.parse(t.slice(s, e + 1)) } catch {} }
  throw new Error('Não foi possível interpretar a resposta. Tente novamente.')
}

export async function corrigirRedacaoDemo(tema, redacao) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey || apiKey === 'sua_chave_aqui') {
    throw new Error('Chave da API não configurada. Crie o arquivo .env com VITE_ANTHROPIC_API_KEY=sua_chave.')
  }

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    system: DEMO_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: `Tema: ${tema}\n\nRedação:\n${redacao}` }],
  })

  const textBlock = response.content.find((b) => b.type === 'text')
  if (!textBlock) throw new Error('Resposta vazia da API.')

  return extractJson(textBlock.text)
}
