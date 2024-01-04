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

  // Coletar dados do remetente
  const remetenteNome = document.getElementById('remetente-nome').value;
  const remetenteCPF = document.getElementById('remetente-cpf').value;
  const remetenteTelefone = document.getElementById('remetente-telefone').value;
  const remetenteCEP = document.getElementById('remetente-cep').value;
  const remetenteNumero = document.getElementById('remetente-numero').value;
  const remetenteEndereco = document.getElementById('remetente-endereco').value;
  const remetenteBairro = document.getElementById('remetente-bairro').value;
  const remetenteCidadeUF = document.getElementById('remetente-cidade-uf').value;

  // Coletar dados do destinatário
  const destinatarioNome = document.getElementById('destinatario-nome').value;
  const destinatarioCPF = document.getElementById('destinatario-cpf').value;
  const destinatarioTelefone = document.getElementById('destinatario-telefone').value;
  const destinatarioCEP = document.getElementById('destinatario-cep').value;
  const destinatarioNumero = document.getElementById('destinatario-numero').value;
  const destinatarioEndereco = document.getElementById('destinatario-endereco').value;
  const destinatarioBairro = document.getElementById('destinatario-bairro').value;
  const destinatarioCidadeUF = document.getElementById('destinatario-cidade-uf').value;

  // Verificar se os dados da mercadoria foram preenchidos
  const mercadoriaVolumes = document.getElementById('mercadoria-volumes').value;
  const mercadoriaValor = document.getElementById('mercadoria-valor').value;
  const mercadoriaPeso = document.getElementById('mercadoria-peso').value;
  const mercadoriaDescricao = document.getElementById('mercadoria-descricao').value;
  const mercadoriaQtdPares = document.getElementById('mercadoria-qtd-pares').value;

  if (!remetenteNumero || !remetenteEndereco || !remetenteCidadeUF || !remetenteCPF || !destinatarioNumero || !destinatarioEndereco || !destinatarioCidadeUF || !destinatarioCPF || !mercadoriaVolumes || !mercadoriaValor || !mercadoriaPeso || !mercadoriaDescricao || !mercadoriaQtdPares) {
    alert('Preencha todos os campos obrigatórios antes de gerar a declaração.');
    return;
  }

  // Concatenar todas as informações em uma única string

  // Adicionar uma logo e um texto ao cabeçalho
  const cabecalho = '<div style="border: 1px solid #000; padding: 10px;"><img src="rte.png" alt="Logo da Empresa" style="width: 65%; height: 60px;"></div>';
  const textoCabecalho = `
    <div style="border: 1px solid #000; padding: 10px; text-align: justify;">
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

  // Adicionar bordas aos itens do remetente
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

  // Restante do código para o destinatário permanece o mesmo...

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
  </tr>
</table>
</div>

  <div style="border: 1px solid #000; padding: 10px;">
    <h4>PAGADOR DE FRETE REMETENTE</h4>
    <h4 style="text-align: center; margin-bottom: 5px;"> PIX: 44.914.992/0001-38</h4>
    <div style="text-align: center;">
        <img src="code.png" width="50" height="50" alt="">
    </div>
    

  </div>
  

`;

  // Concatenar todas as informações em uma única string
  const informacoes = informacoesRemetente + informacoesDestinatario + informacoesMercadoria;

  // Exibir a string, o cabeçalho e a logo no diálogo de impressão
  const printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>Declaração de Conteúdo</title></head><body>');
  printWindow.document.write(cabecalho + textoCabecalho + informacoes);
  printWindow.document.write('</body></html>');
  printWindow.document.close();

  // Acionar o diálogo de impressão
  printWindow.print();
}



