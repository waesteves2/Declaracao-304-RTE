// Variáveis para rastrear o estado do preenchimento
let remetentePreenchido = false;
let destinatarioPreenchido = false;

function alterarVisibilidade(sectionId, exibir) {
  document.getElementById(sectionId).style.display = exibir ? 'block' : 'none';
}

function proximoPasso(sectionId) {
  // Verificar se a seção remetente ou destinatário já foi preenchida
  if ((sectionId === 'remetente-section' && remetentePreenchido) || (sectionId === 'destinatario-section' && destinatarioPreenchido)) {
    alert('Você já preencheu os dados desta seção. Prossiga para a próxima etapa.');
    return;
  }

  alterarVisibilidade(sectionId, true);

  // Ocultar a seção anterior
  const secaoAnterior = sectionId === 'destinatario-section' ? 'remetente-section' : 'destinatario-section';
  alterarVisibilidade(secaoAnterior, false);

  if (sectionId === 'destinatario-section') {
    remetentePreenchido = true;
  } else if (sectionId === 'mercadoria-section') {
    destinatarioPreenchido = true;
  }
}

function voltarPasso(sectionId) {
  // Verificar se é possível voltar para a seção anterior

  alterarVisibilidade(sectionId, true);

  // Exibir a seção anterior
  const secaoAnterior = sectionId === 'destinatario-section' ? 'remetente-section' : 'destinatario-section';
  alterarVisibilidade(secaoAnterior, false);

  if (sectionId === 'destinatario-section') {
    remetentePreenchido = false;
  } else if (sectionId === 'mercadoria-section') {
    destinatarioPreenchido = true;
  }
}


// Adicione esta função para retornar à seção "Remetente" diretamente
function voltarRemetente() {
  alterarVisibilidade('destinatario-section', false);
  alterarVisibilidade('remetente-section', true);
  remetentePreenchido = false;
}



function gerarDeclaracao() {
  // Verificar se todas as seções foram preenchidas
  if (!remetentePreenchido || !destinatarioPreenchido) {
    alert('Preencha todos os dados antes de gerar a declaração.');
    return;
  }

  // Obter os valores dos campos
  const remetenteNome = document.getElementById('remetente-nome').value;
  const remetenteCPF = document.getElementById('remetente-cpf').value;
  const remetenteTelefone = document.getElementById('remetente-telefone').value;
  const remetenteCEP = document.getElementById('remetente-cep').value;
  const remetenteNumero = document.getElementById('remetente-numero').value;
  const remetenteEndereco = document.getElementById('remetente-endereco').value;
  const remetenteBairro = document.getElementById('remetente-bairro').value;
  const remetenteCidadeUF = document.getElementById('remetente-cidade-uf').value;

  const destinatarioNome = document.getElementById('destinatario-nome').value;
  const destinatarioCPF = document.getElementById('destinatario-cpf').value;
  const destinatarioTelefone = document.getElementById('destinatario-telefone').value;
  const destinatarioCEP = document.getElementById('destinatario-cep').value;
  const destinatarioNumero = document.getElementById('destinatario-numero').value;
  const destinatarioEndereco = document.getElementById('destinatario-endereco').value;
  const destinatarioBairro = document.getElementById('destinatario-bairro').value;
  const destinatarioCidadeUF = document.getElementById('destinatario-cidade-uf').value;

  const mercadoriaVolumes = document.getElementById('mercadoria-volumes').value;
  const mercadoriaValor = document.getElementById('mercadoria-valor').value;
  const mercadoriaPeso = document.getElementById('mercadoria-peso').value;
  const mercadoriaDescricao = document.getElementById('mercadoria-descricao').value;
  const mercadoriaQtdPares = document.getElementById('mercadoria-qtd-pares').value;
  const mercadoriaComprimento = document.getElementById('mercadoria-comprimento').value;
  const mercadoriaLargura = document.getElementById('mercadoria-largura').value;
  const mercadoriaAltura = document.getElementById('mercadoria-altura').value;

  // Verificar se campos obrigatórios estão preenchidos
  if (!remetenteNumero || !remetenteEndereco || !remetenteCidadeUF || !remetenteCPF || !destinatarioNumero || !destinatarioEndereco || !destinatarioCidadeUF || !destinatarioCPF || !mercadoriaVolumes || !mercadoriaValor || !mercadoriaPeso || !mercadoriaComprimento || !mercadoriaLargura || !mercadoriaAltura || !mercadoriaDescricao || !mercadoriaQtdPares) {
    alert('Preencha todos os campos obrigatórios antes de gerar a declaração.');
    return;
  }

  // Verificar se o CPF está na lista para decidir se o frete será cobrado
  const cpfsComFreteCobrado = ['342.539.108-90', '381.444.968-17', '315.851.618-70', '411.312.438-89', '410.129.968-40', '248.955.688-65', '432.339.048-35', '215.443.638-26', '260.464.398-76','341.159.118-83', '413.798.418-28', '227.209.948-39', '318.853.828-63', '319.881.098-17', '135.936.138-32'];
  const cobrarFrete = cpfsComFreteCobrado.includes(remetenteCPF);
  const freteValor = cobrarFrete ? calcularFrete(mercadoriaVolumes, mercadoriaPeso) : 0;

  // Montar o cabeçalho e texto da declaração
  const cabecalho = '<div style="border: 1px solid #000; padding: 10px;"><img src="rte.png" alt="Logo da Empresa" style="width: 60%; height: 60px;"></div>';
  const textoCabecalho = `
    <div style="border: 1px solid #000; padding: 10px; text-align: justify; font-size: small;">
      <h3 style="text-align: center; margin-bottom: 10px;">Declaração de Conteúdo</h3>
      Declaro para os devidos fins de direito e sob as penas da lei, que os volumes abaixo
      relacionados, por mim entregues como encomendas, à RODONAVES TRANSPORTES E ENCOMENDAS LTDA., contém apenas objetos de uso pessoal.
      Neles não são conduzidas nem correspondências a constituir monopólio postal da União, nem mercadorias destinadas a
      comercializações, sujeitas a tributos municipais, estaduais ou federais, nem drogas, objetos ou produtos perigosos
      relacionados na NORMA BRASILEIRA NBR-7502, cujo teor é do meu conhecimento, ou outros que oferecem risco à
      saúde ou à segurança das pessoas que no veículo são transportadas, ou mesmo de terceiros que sejam obrigados a
      manipula-los.
      Responsabilizo-me, integralmente, por quaisquer ônus ou prejuízos que de seu transporte possam decorrer,
      inclusive em caso de apreensão e aplicação de multas. Declaro, ainda, isenta a RODONAVES, do ressarcimento,
      que possa ocorrer da mercadoria por não estar embalada adequadamente.
    </div>
  `;

  // Montar as informações do remetente
  const informacoesRemetente = `
    <div style="border: 1px solid #000; padding: 10px; font-family: 'Arial', sans-serif; font-size: 14px;">
      <h3 style="text-align: center; margin-bottom: 10px;"><b>Remetente</b></h3>
      <span style="margin-bottom: 5px; display: block;">Nome: ${remetenteNome}</span>
      <span>CPF: ${remetenteCPF}</span>
      <span style="margin-bottom: 5px; display: block;">Telefone: ${remetenteTelefone}</span>
      <span style="margin-bottom: 5px; display: block;">CEP: ${remetenteCEP}</span>
      <span style="margin-bottom: 5px; display: block;">Nº: ${remetenteNumero}</span>
      <span style="margin-bottom: 5px; display: block;">Endereço: ${remetenteEndereco}</span>
      <span stule= "margin-bottom: 5px; display: block;"> Bairro: ${remetenteBairro}</span>
      <span style="margin-bottom: 5px; display: block;">Cidade/UF: ${remetenteCidadeUF}</span>
    </div>
  `;

  // Montar as informações do destinatário
  const informacoesDestinatario = `
    <div style="border: 1px solid #000; padding: 10px; font-family: 'Arial', sans-serif; font-size: 14px;">
      <h3 style="text-align: center; margin-bottom: 10px;"><b>Destinatário</b></h3>
      <span style="margin-bottom: 5px; display: block;">Nome: ${destinatarioNome}</span>
      <span>CPF: ${destinatarioCPF}</span>
      <span style="margin-bottom: 5px; display: block;">Telefone: ${destinatarioTelefone}</span>
      <span style="margin-bottom: 5px; display: block;">CEP: ${destinatarioCEP}</span>
      <span style="margin-bottom: 5px; display: block;">Nº: ${destinatarioNumero}</span>
      <span style="margin-bottom: 5px; display: block;">Endereço: ${destinatarioEndereco}</span>
      <span stule="margin-bottom: 5px; display: block;"> Bairro: ${destinatarioBairro}</span>
      <span style="margin-bottom: 5px; display: block;">Cidade/UF: ${destinatarioCidadeUF}</span>
    </div>
  `;

  const informacoesMercadoria = `
    <div style="border: 1px solid #000; padding: 10px; text-align: center;">
      <b>Informações da Mercadoria</b><br>
      <table style="width: 100%;">
        <tr style="text-align: center;">
          <td><b>Volumes:</b><br> ${mercadoriaVolumes}</td>
          <td><b>Valor:</b><br> ${mercadoriaValor}</td>
          <td><b>Peso:</b><br> ${mercadoriaPeso}</td>
          <td><b>Descrição:</b><br> ${mercadoriaDescricao}</td>
          <td><b>Qtd de pares:</b><br> ${mercadoriaQtdPares}</td>
          <td><b>Com:</b><br> ${mercadoriaComprimento}</td>
          <td><b>Lar:</b><br> ${mercadoriaLargura}</td>
          <td><b>Alt:</b><br> ${mercadoriaAltura}</td>
        </tr>
      </table>
    </div>

    <div style="border: 1px solid #000; padding: 10px;">
      <h4>PAGADOR DE FRETE REMETENTE</h4>
      <h4 style="text-align: center; margin-bottom: 5px;"> PIX: 44.914.992/0001-38</h4>
      <div style="text-align: center;">
        <img src="code.png" width="50" height="50" alt="">
        ${cobrarFrete ? `<p>Valor do Frete: R$ ${freteValor.toFixed(2)}</p>` : `<p></p>`}

      </div>
    </div>
  `;

  const informacoes = informacoesRemetente + informacoesDestinatario + informacoesMercadoria;

  const printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>Declaração de Conteúdo</title></head><body>');
  printWindow.document.write(cabecalho + textoCabecalho + informacoes);
  printWindow.document.write('</body></html>');
  printWindow.document.close();

  printWindow.print();
}



function cidadeElegivel(cidade) {
  // Lista de cidades elegíveis para o frete
  const cidadesElegiveis = ['ADAMANTINA','ADOLFO','AGUAÍ','ÁGUAS DA PRATA','ÁGUAS DE LINDÓIA','ÁGUAS DE SANTA BÁRBARA','ÁGUAS DE SÃO PEDRO','AGUDOS','ALAMBARI','ALFREDO MARCONDES','ALTAIR','ALTINÓPOLIS','ALTO ALEGRE','ALUMÍNIO','ÁLVARES FLORENCE','ÁLVARES MACHADO','ÁLVARO DE CARVALHO','ALVINLÂNDIA','AMERICANA','AMÉRICO BRASILIENSE','AMÉRICO DE CAMPOS','AMPARO','ANALÂNDIA','ANDRADINA','ANGATUBA','ANHEMBI','ANHUMAS','APARECIDA D OESTE','APIAÍ','ARAÇATUBA','ARAMINA','ARANDU','ARAPEÍ','ARARAQUARA','ARARAS','ARCO-ÍRIS','AREALVA','AREIAS','AREIÓPOLIS','ARIRANHA','ARTUR NOGUEIRA','ASPÁSIA','ASSIS','ATIBAIA','AURIFLAMA','AVAÍ','AVANHANDAVA','AVARÉ','BADY BASSITT','BALBINOS','BÁLSAMO','BARBOSA','BARIRI','BARRA BONITA','BARRA DO CHAPÉU','BARRA DO TURVO','BARRETOS','BARRINHA','BASTOS','BATATAIS','BAURU','BEBEDOURO','BENTO DE ABREU','BERTIOGA','BILAC','BIRIGUI','BOCAINA','BOFETE','BOITUVA','BOM JESUS DOS PERDÕES','BOM SUCESSO DE ITARARÉ','BORÁ','BORACÉIA','BORBOREMA','BOREBI','BOTUCATU','BRAGANÇA PAULISTA','BRAÚNA','BREJO ALEGRE','BRODOWSKI','BROTAS','BURI','BURITAMA','BURITIZAL','CABRÁLIA PAULISTA','CABREÚVA','CAÇAPAVA','CACHOEIRA PAULISTA','CAFELÂNDIA','CAIABU','CAIUÁ','CAJAMAR','CAJATI','CAJOBI','CAJURU','CAMPINA DO MONTE ALEGRE','CAMPINAS','CAMPO LIMPO PAULISTA','CAMPOS DO JORDÃO','CAMPOS NOVOS PAULISTA','CANANÉIA','CANAS','CÂNDIDO MOTA','CÂNDIDO RODRIGUES','CANITAR','CAPELA DO ALTO','CAPIVARI','CARDOSO','CASA BRANCA','CÁSSIA DOS COQUEIROS','CASTILHO','CATANDUVA','CATIGUÁ','CEDRAL','CERQUEIRA CÉSAR','CERQUILHO','CESÁRIO LANGE','CHARQUEADA','CHAVANTES','CLEMENTINA','COLINA','COLÔMBIA','CONCHAL','CONCHAS','CORDEIRÓPOLIS','COROADOS','CORONEL MACEDO','CORUMBATAÍ','COSMÓPOLIS','COSMORAMA','CRAVINHOS','CRISTAIS PAULISTA','CRUZÁLIA','CUNHA','DESCALVADO','DIRCE REIS','DIVINOLÂNDIA','DOBRADA','DOIS CÓRREGOS','DOLCINÓPOLIS','DOURADO','DRACENA','DUARTINA','DUMONT','ECHAPORÃ','ELDORADO','ELIAS FAUSTO','ELISIÁRIO','EMBAÚBA','EMILIANÓPOLIS','ENGENHEIRO COELHO','ESPÍRITO SANTO DO PINHAL','ESPÍRITO SANTO DO TURVO','ESTIVA GERBI','ESTRELA DO NORTE','ESTRELA D OESTE','EUCLIDES DA CUNHA PAULISTA','FARTURA','FERNANDO PRESTES','FERNANDÓPOLIS','FERNÃO','FLORA RICA','FLOREAL','FLÓRIDA PAULISTA','FLORÍNEA','FRANCA','GABRIEL MONTEIRO','GÁLIA','GARÇA','GASTÃO VIDIGAL','GAVIÃO PEIXOTO','GENERAL SALGADO','GETULINA','GLICÉRIO','GUAIÇARA','GUAIMBÊ','GUAÍRA','GUAPIAÇU','GUAPIARA','GUARÁ','GUARAÇAÍ','GUARACI','GUARANI D OESTE','GUARANTÃ','GUARARAPES','GUARAREMA','GUAREÍ','GUARIBA','GUATAPARÁ','GUZOLÂNDIA','HERCULÂNDIA','HOLAMBRA','HORTOLÂNDIA','IACANGA','IACRI','IARAS','IBATÉ','IBIRÁ','IBIRAREMA','IBITINGA','IBIÚNA','ICÉM','IEPÊ','IGARAÇU DO TIETÊ','IGARAPAVA','IGARATÁ','IGUAPE','ILHA COMPRIDA','ILHA SOLTEIRA','ILHABELA','INDAIATUBA','INDIANA','INDIAPORÃ','INÚBIA PAULISTA','IPAUSSU','IPERÓ','IPEÚNA','IPIGUÁ','IPORANGA','IPUÃ','IRACEMÁPOLIS','IRAPUÃ','IRAPURU','ITABERÁ','ITAÍ','ITAJOBI','ITAJU','ITAÓCA','ITAPETININGA','ITAPEVA','ITAPIRA','ITAPIRAPUÃ PAULISTA','ITÁPOLIS','ITAPORANGA','ITAPUÍ','ITAPURA','ITAQUAQUECETUBA','ITARARÉ','ITARIRI','ITATIBA','ITATINGA','ITIRAPINA','ITIRAPUÃ','ITOBI','ITU','ITUPEVA','ITUVERAVA','JABORANDI','JABOTICABAL','JACAREÍ','JACI','JACUPIRANGA','JAGUARIÚNA','JALES','JAMBEIRO','JANDIRA','JARDINÓPOLIS','JARINU','JAÚ','JERIQUARA','JOANÓPOLIS','JOÃO RAMALHO','JOSÉ BONIFÁCIO','JÚLIO MESQUITA','JUMIRIM','JUNDIAÍ','JUNQUEIRÓPOLIS','JUQUIÁ','LAGOINHA','LARANJAL PAULISTA','LAVÍNIA','LAVRINHAS','LEME','LENÇÓIS PAULISTA','LIMEIRA','LINDÓIA','LINS','LORENA','LOURDES','LOUVEIRA','LUCÉLIA','LUCIANÓPOLIS','LUÍS ANTÔNIO','LUIZIÂNIA','LUPÉRCIO','LUTÉCIA','MACATUBA','MACAUBAL','MACEDÔNIA','MAGDA','MAIRINQUE','MANDURI','MARABÁ PAULISTA','MARACAÍ','MARAPOAMA','MARIÁPOLIS','MARÍLIA','MARINÓPOLIS','MARTINÓPOLIS','MATÃO','MENDONÇA','MERIDIANO','MESÓPOLIS','MIGUELÓPOLIS','MINEIROS DO TIETÊ','MIRA ESTRELA','MIRACATU','MIRANDÓPOLIS','MIRANTE DO PARANAPANEMA','MIRASSOL','MIRASSOLÂNDIA','MOCOCA','MOGI GUAÇU','MOGI MIRIM','MOMBUCA','MONÇÕES','MONTE ALEGRE DO SUL','MONTE ALTO','MONTE APRAZÍVEL','MONTE AZUL PAULISTA','MONTE CASTELO','MONTE MOR','MONTEIRO LOBATO','MORRO AGUDO','MORUNGABA','MOTUCA','MURUTINGA DO SUL','NANTES','NARANDIBA','NATIVIDADE DA SERRA','NAZARÉ PAULISTA','NEVES PAULISTA','NHANDEARA','NIPOÃ','NOVA ALIANÇA','NOVA CAMPINA','NOVA CANAÃ PAULISTA','NOVA CASTILHO','NOVA EUROPA','NOVA GRANADA','NOVA GUATAPORANGA','NOVA INDEPENDÊNCIA','NOVA LUZITÂNIA','NOVA ODESSA','NOVAIS','NOVO HORIZONTE','NUPORANGA','OCAUÇU','ÓLEO','OLÍMPIA','ONDA VERDE','ORIENTE','ORINDIÚVA','ORLÂNDIA','OSCAR BRESSANE','OSVALDO CRUZ','OURINHOS','OURO VERDE','OUROESTE','PACAEMBU','PALESTINA','PALMARES PAULISTA','PALMEIRA D OESTE','PALMITAL','PANORAMA','PARAGUAÇU PAULISTA','PARAIBUNA','PARAÍSO','PARANAPANEMA','PARANAPUÃ','PARAPUÃ','PARDINHO','PARIQUERA-AÇU','PARISI','PATROCÍNIO PAULISTA','PAULICÉIA','PAULÍNIA','PAULISTÂNIA','PAULO DE FARIA','PEDERNEIRAS','PEDRANÓPOLIS','PEDREGULHO','PEDREIRA','PEDRINHAS PAULISTA','PEDRO DE TOLEDO','PENÁPOLIS','PEREIRA BARRETO','PEREIRAS','PIACATU','PIEDADE','PILAR DO SUL','PINDAMONHANGABA','PINDORAMA','PINHALZINHO','PIQUEROBI','PIQUETE','PIRACAIA','PIRACICABA','PIRAJU','PIRAJUÍ','PIRANGI','PIRAPOZINHO','PIRASSUNUNGA','PIRATININGA','PITANGUEIRAS','PLANALTO','PLATINA','POLONI','POMPÉIA','PONGAÍ','PONTAL','PONTALINDA','PONTES GESTAL','POPULINA','PORANGABA','PORTO FELIZ','PORTO FERREIRA','POTIM','POTIRENDABA','PRACINHA','PRADÓPOLIS','PRATÂNIA','PRESIDENTE ALVES','PRESIDENTE BERNARDES','PRESIDENTE EPITÁCIO','PRESIDENTE PRUDENTE','PRESIDENTE VENCESLAU','PROMISSÃO','QUADRA','QUATÁ','QUEIROZ','QUELUZ','QUINTANA','RAFARD','RANCHARIA','REDENÇÃO DA SERRA','REGENTE FEIJÓ','REGINÓPOLIS','REGISTRO','RESTINGA','RIBEIRA','RIBEIRÃO BONITO','RIBEIRÃO BRANCO','RIBEIRÃO CORRENTE','RIBEIRÃO DO SUL','RIBEIRÃO DOS ÍNDIOS','RIBEIRÃO GRANDE','RIBEIRÃO PRETO','RIFAINA','RINCÃO','RINÓPOLIS','RIO CLARO','RIO DAS PEDRAS','RIO GRANDE DA SERRA','RIOLÂNDIA','RIVERSUL','ROSANA','ROSEIRA','RUBIÁCEA','RUBINÉIA','SABINO','SAGRES','SALES','SALES OLIVEIRA','SALMOURÃO','SALTINHO','SALTO','SALTO DE PIRAPORA','SALTO GRANDE','SANDOVALINA','SANTA ADÉLIA','SANTA ALBERTINA','SANTA BÁRBARA D OESTE','SANTA BRANCA','SANTA CLARA D OESTE','SANTA CRUZ DA CONCEIÇÃO','SANTA CRUZ DA ESPERANÇA','SANTA CRUZ DAS PALMEIRAS','SANTA CRUZ DO RIO PARDO','SANTA ERNESTINA','SANTA FÉ DO SUL','SANTA GERTRUDES','SANTA LÚCIA','SANTA MERCEDES','SANTA RITA DO PASSA-QUATRO','SANTA RITA D OESTE','SANTA ROSA DE VITERBO','SANTA SALETE','SANTANA DA PONTE PENSA','SANTO ANASTÁCIO','SANTO ANTÔNIO DA ALEGRIA','SANTO ANTÔNIO DE POSSE','SANTO ANTÔNIO DO ARACANGUÁ','SANTO ANTÔNIO DO JARDIM','SANTO ANTÔNIO DO PINHAL','SANTO EXPEDITO','SANTÓPOLIS DO AGUAPEÍ','SÃO BENTO DO SAPUCAÍ','SÃO CARLOS','SÃO JOÃO DA BOA VISTA','SÃO JOÃO DAS DUAS PONTES','SÃO JOÃO DE IRACEMA','SÃO JOÃO DO PAU D ALHO','SÃO JOAQUIM DA BARRA','SÃO JOSÉ DA BELA VISTA','SÃO JOSÉ DO BARREIRO','SÃO JOSÉ DO RIO PARDO','SÃO JOSÉ DO RIO PRETO','SÃO JOSÉ DOS CAMPOS','SÃO LUIZ DO PARAITINGA','SÃO MANUEL','SÃO MIGUEL ARCANJO','SÃO PEDRO','SÃO PEDRO DO TURVO','SÃO ROQUE','SÃO SEBASTIÃO DA GRAMA','SÃO SIMÃO','SARAPUÍ','SARUTAIÁ','SEBASTIANÓPOLIS DO SUL','SERRA AZUL','SERRA NEGRA','SERRANA','SERTÃOZINHO','SETE BARRAS','SEVERÍNIA','SILVEIRAS','SOCORRO','SOROCABA','SUD MENNUCCI','SUMARÉ','SUZANÁPOLIS','TEDITAR','TABAPUÃ','TABATINGA','TACIBA','TAGUAÍ','TAIAÇU','TAIÚVA','TAMBAÚ','TANABI','TAPIRAÍ','TAPIRATIBA','TAQUARAL','TAQUARITINGA','TAQUARITUBA','TAQUARIVAÍ','TARABAI','TARUMÃ','TATUÍ','TAUBATÉ','TEJUPÁ','TEODORO SAMPAIO','TERRA ROXA','TIETÊ','TIMBURI','TORRE DE PEDRA','TORRINHA','TRABIJU','TREMEMBÉ','TRÊS FRONTEIRAS','TUIUTI','TUPÃ','TUPI PAULISTA','TURIÚBA','TURMALINA','UEDITAR','UBARANA','UBATUBA','UBIRAJARA','UCHOA','UNIÃO PAULISTA','URÂNIA','URU','URUPÊS','VEDITAR','VALENTIM GENTIL','VALINHOS','VALPARAÍSO','VARGEM','VARGEM GRANDE DO SUL','VARGEM GRANDE PAULISTA','VÁRZEA PAULISTA','VERA CRUZ','VINHEDO','VIRADOURO','VISTA ALEGRE DO ALTO','VITÓRIA BRASIL','VOTORANTIM','VOTUPORANGA','ZACARIAS'];

  const cidadeFormatada = cidade.split('/')[0].trim().toUpperCase();

  return cidadesElegiveis.includes(cidadeFormatada);
}

function calcularFrete(volumes, peso, cidadeUF) {
  const inputCidade = document.getElementById('destinatario-cidade-uf').value;

  if (volumes >= 1 && volumes <= 5 && peso <= 100 && cidadeElegivel(inputCidade)) {
    const tabelaDePrecos = [52.62, 63.59, 74.55, 85.62, 98.15];
    return tabelaDePrecos[volumes - 1];
  } else {
    return 0; // Valor padrão caso não atenda a nenhuma regra
  }
}



