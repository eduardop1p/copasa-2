import Image from 'next/image';

export default function CopasaMenu() {
  const highlights = [
    {
      link: '/copasa-home',
      imgSrc: '/assets/imgs/menu/Icone_Mais_Servicos.png',
      title: 'Mais Serviços',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_AutoDenuncia.png',
      title: 'Autodenúncia',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_Segunda_Via_de_Contas.png',
      title: 'Segunda via de contas',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_Estou_sem_Agua.png',
      title: 'Estou sem água',
    },
    {
      link: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/WaterLeak',
      imgSrc: '/assets/imgs/menu/Icone_Vazamento_de_Agua.png',
      title: 'Vazamento de água',
    },
    {
      link: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/SewerLeak',
      imgSrc: '/assets/imgs/menu/Icone_Vazamento_de_Esgoto.png',
      title: 'Vazamento de esgoto',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_Historico_de_Atendimento.png',
      title: 'Histórico de atendimento',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_Infracao_Irregularidade.png',
      title: 'Infração / Irregularidade',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_Parcelamento_de_Debitos.png',
      title: 'Parcelamento de débitos',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_Religacao_de_Agua.png',
      title: 'Religação de água',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_Informar_Leitura.png',
      title: 'Informar leitura',
    },
    {
      link: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/AutomaticDebit',
      imgSrc: '/assets/imgs/menu/Icone_Debito_Automatico.png',
      title: 'Débito Automático',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_Conta_por_Email.png',
      title: 'Contas por e-mail',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_Certidao_Negativa.png',
      title: 'Certidão negativa',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_Historico_de_Consumo.png',
      title: 'Histórico de Consumo',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_Consulta_de_Contas_Pagas.png',
      title: 'Consulta de contas pagas',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_PRECEND.png',
      title: 'PRECEND Laudo de Liberação das instalações de Esgoto',
    },
    {
      link: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/PayMyBillse',
      imgSrc: '/assets/imgs/menu/Icone_Onde_pagar_sua_Conta.png',
      title: 'Onde pagar sua conta',
    },
    {
      link: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/Violation',
      imgSrc: '/assets/imgs/menu/Icone_Violacao_de_Hidrometro.png',
      title: 'Violação de hidrômetro ou ligação clandestina',
    },
    {
      link: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/igam',
      imgSrc: '/assets/imgs/menu/Icone_Declaracao_de_Outorga.png',
      title: 'Declaração para outorga no IGAM',
    },
    {
      link: '/copasa-home/login',
      imgSrc: '/assets/imgs/menu/Icone_Programa_de_Subvencoes.png',
      title: 'Subvenções',
    },
  ];

  const categories = [
    {
      link: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/supply',
      imgSrc: '/assets/imgs/menu/Icone_Abastecimento.png',
      title: 'Abastecimento',
    },
    {
      link: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/Information',
      imgSrc: '/assets/imgs/menu/Icone_Informacoes.png',
      title: 'Informações',
    },
    {
      link: '/copasa-home/my-account',
      imgSrc: '/assets/imgs/menu/Icone_Minha_Conta.png',
      title: 'Minha conta',
    },
    {
      link: 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/faresAndPrices',
      imgSrc: '/assets/imgs/menu/Icone_Tarifas_e_Precos.png',
      title: 'Tarifas e preços',
    },
  ];

  return (
    <div className='mx-auto flex w-full max-w-[1210px] flex-col px-6'>
      <h2 className='mb-4 text-[15px] font-bold text-15315e'>DESTAQUES</h2>
      <div className='mb-8 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6'>
        {highlights.map((item, i) => (
          <a
            href={item.link}
            key={i}
            className='flex flex-col items-center gap-2 rounded-[5px] bg-5387ec p-4'
          >
            <Image src={item.imgSrc} alt={item.title} width={80} height={80} />
            <h1 className='text-center text-[13px] font-normal text-white'>
              {item.title}
            </h1>
          </a>
        ))}
      </div>
      <h2 className='mb-4 text-[15px] font-bold text-15315e'>CATEGORIAS</h2>
      <div className='mb-8 grid grid-cols-[repeat(4,152px)] gap-6 max-[745px]:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]'>
        {categories.map((item, i) => (
          <a
            href={item.link}
            key={i}
            className='flex flex-col items-center gap-2 rounded-[5px] bg-5387ec p-4'
          >
            <Image src={item.imgSrc} alt={item.title} width={80} height={80} />
            <h1 className='text-center text-[13px] font-normal text-white'>
              {item.title}
            </h1>
          </a>
        ))}
      </div>
      <h2 className='mb-4 text-[15px] font-bold text-15315e'>
        BASE DE CONHECIMENTO - MAIS RECENTES
      </h2>
    </div>
  );
}
