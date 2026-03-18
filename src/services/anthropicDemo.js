import Anthropic from '@anthropic-ai/sdk'

const DEMO_SYSTEM_PROMPT = `Você é um corretor de redações do ENEM. Avalie a redação com critério e honestidade.

A nota total deve ser a soma realista das 5 competências (cada uma de 0 a 200, apenas múltiplos de 40: 0, 40, 80, 120, 160, 200). Seja HONESTO — não inflacione a nota.

Os pontos fracos devem ser específicos, concretos e curtos (até 12 palavras cada).
O ponto forte deve ser genuíno e motivador (até 12 palavras).

Retorne APENAS este JSON, sem markdown, sem texto adicional:
{
  "nota_total": 620,
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
