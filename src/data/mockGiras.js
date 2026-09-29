/**
 * Dados de demonstração alinhados à identidade visual das postagens do Instagram do TULA
 */
export const MOCK_GIRAS = [
  {
    id: 'gira-caboclos-1408',
    dateBadge: '14/08 ÀS 19H',
    fullDate: '14 de Agosto',
    dayOfWeek: 'Sexta-feira',
    type: 'GIRA ABERTA',
    line: 'Linha de Caboclos',
    subtitle: 'Atendimento aberto com a',
    doorsOpen: '19h00 (Entrega de senhas)',
    startsAt: '19h30',
    location: 'R. Francisco Torres 908 - Centro, Curitiba',
    description: 'Receba o axé e o acolhimento das matas. Uma gira de cura, passes energéticos e direcionamento espiritual aberta a todos os consulentes.',
    recommendations: 'Venha com roupas claras e confortáveis. Não é cobrada nenhuma taxa por consultas ou passes.',
    status: 'aberta',
    isFeatured: true,
    // Foto atmosférica de cocar/penas e fogueira/luz quente
    bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    colorTheme: '#1b3322'
  },
  {
    id: 'gira-pretos-velhos-0708',
    dateBadge: '07/08 ÀS 19H',
    fullDate: '07 de Agosto',
    dayOfWeek: 'Sexta-feira',
    type: 'GIRA ABERTA',
    line: 'Linha de Pretos Velhos e Erês',
    subtitle: 'Atendimento aberto com a',
    doorsOpen: '19h00',
    startsAt: '19h30',
    location: 'R. Francisco Torres 908 - Centro, Curitiba',
    description: 'A sabedoria compassiva, o café acolhedor e a benção dos vovôs e vovós de Aruanda, trazendo paz ao coração e a energia pura da Ibejada.',
    recommendations: 'Traga suas orações e coração aberto. Senhas distribuídas por ordem de chegada.',
    status: 'aberta',
    isFeatured: false,
    // Foto de vela com fumaça e atmosfera calorosa
    bgImage: 'https://images.unsplash.com/photo-1603555501671-8f96b3fce8b6?auto=format&fit=crop&w=800&q=80',
    colorTheme: '#2b1e16'
  },
  {
    id: 'gira-baianos-2108',
    dateBadge: '21/08 ÀS 19H',
    fullDate: '21 de Agosto',
    dayOfWeek: 'Sexta-feira',
    type: 'GIRA ABERTA',
    line: 'Linha de Baianos e Povo Cigano',
    subtitle: 'Atendimento aberto com a',
    doorsOpen: '19h00',
    startsAt: '19h30',
    location: 'R. Francisco Torres 908 - Centro, Curitiba',
    description: 'A força da alegria de viver, o corte de quizilas e a energia vibrante da Bahia e das correntes do Oriente para abertura de caminhos.',
    recommendations: 'Distribuição de fitinhas e água fluidificada. Todos são muito bem-vindos.',
    status: 'aberta',
    isFeatured: false,
    // Fitas coloridas iluminadas pelo sol
    bgImage: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80',
    colorTheme: '#3d2516'
  },
  {
    id: 'gira-esquerda-2808',
    dateBadge: '28/08 ÀS 19H',
    fullDate: '28 de Agosto',
    dayOfWeek: 'Sexta-feira',
    type: 'GIRA ABERTA',
    line: 'Guardiões (Exu e Pombagira)',
    subtitle: 'Atendimento aberto com a',
    doorsOpen: '19h00',
    startsAt: '19h30',
    location: 'R. Francisco Torres 908 - Centro, Curitiba',
    description: 'Trabalhos de corte de energias densas, proteção das porteiras e quebra de demandas. Uma gira de profunda transformação e respeito à Lei Maior.',
    recommendations: 'Consultas por ordem de chegada. Mantenha a mente elevada e postura de respeito no terreiro.',
    status: 'aberta',
    isFeatured: false,
    // Búzios e contas sagradas em fundo escuro
    bgImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    colorTheme: '#1f1616'
  },
  {
    id: 'gira-pausa-0409',
    dateBadge: '04/09',
    fullDate: '04 de Setembro',
    dayOfWeek: 'Sexta-feira',
    type: 'NÃO HAVERÁ GIRA',
    line: 'Recesso Institucional',
    subtitle: 'Informamos que',
    doorsOpen: 'Portões fechados ao público',
    startsAt: '-',
    location: 'R. Francisco Torres 908 - Centro, Curitiba',
    description: 'Não haverá atendimento público nesta data devido à manutenção periódica do terreiro e consagrações internas do corpo mediúnico.',
    recommendations: 'Retornamos normalmente com nossos atendimentos públicos na semana seguinte.',
    status: 'cancelada',
    isFeatured: false,
    // Defumação / incenso e pedras
    bgImage: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&w=800&q=80',
    colorTheme: '#181818'
  },
  {
    id: 'gira-boiadeiros-1109',
    dateBadge: '11/09 ÀS 19H',
    fullDate: '11 de Setembro',
    dayOfWeek: 'Sexta-feira',
    type: 'GIRA ABERTA',
    line: 'Linha de Boiadeiros e Marinheiros',
    subtitle: 'Atendimento aberto com a',
    doorsOpen: '19h00',
    startsAt: '19h30',
    location: 'R. Francisco Torres 908 - Centro, Curitiba',
    description: 'Com o estalar do chicote e o balanço das águas sagradas, os Boiadeiros e Marinheiros trazem o recolhimento das correntes pesadas e a renovação das emoções.',
    recommendations: 'Consultas e passes abertos à comunidade de Curitiba e região.',
    status: 'aberta',
    isFeatured: false,
    // Vintage sepia / textura acolhedora
    bgImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    colorTheme: '#22261f'
  }
];
