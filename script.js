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
        const cpfsComFreteCobrado = ['267.596.818-86', '278.845.418-07', '269.408.068-57', '180.863.208-71', '135.936.138-32', '325.359.768-70', '215.945.088-01', '078.912.094-13', '190.858.998-18', '262.245.258-62', '467.551.058-21', '096.339.578-50', '311.007.898-80', '174.021.808-67', '161.965.748-17', '355.877.198-20', '309.792.038-21', '286.932.658-06', '158.277.728-44', '311.239.448-81', '090.792.618-58', '174.012.108-27', '424.690.818-58', '360.808.058-98', '400.661.088-29', '051.045.178-02', '371.618.198-65', '250.364.398-13', '268.027.218-80', '325.575.138-14', '323.479.978-40', '403.015.318-62', '376.138.178-65', '319.815.618-11', '152.923.248-17', '383.035.468-13', '103.288.608-08', '354.409.798-24', '329.723.628-02', '402.544.858-04', '309.996.488-37', '333.566.218-07', '382.074.078-32', '354.409.718-40', '289.210.458-05', '328.673.658-99', '312.843.978-82', '282.189.888-66', '312.322.448-13', '322.278.608-98', '292.228.558-84', '287.366.108-95', '314.698.038-01', '335.492.838-73', '324.813.688-00', '135.935.508-14', '383.157.118-06', '325.967.958-84', '328.567.238-29', '357.867.468-01', '298.256.258-80', '320.650.118-07', '364.474.998-10', '337.916.168-38', '285.195.288-99', '450.054.488-70', '322.697.278-27', '161.726.648-59', '305.406.988-57', '035.916.268-13', '263.820.658-03', '222.213.258-42', '308.030.798-42', '053.325.108-70', '381.158.338-78', '264.564.138-50', '337.713.218-08', '274.404.098-33', '393.607.808-47', '038.355.658-93', '161.941.588-75', '145.151.518-94', '223.382.088-62', '395.337.228-94', '284.906.638-90', '383.266.328-21', '437.640.478-01', '402.972.058-70', '249.099.878-19', '406.817.068-13', '221.301.628-35', '268.699.528-92', '141.271.888-04', '707.937.278-04', '355.009.328-45', '329.856.088-05', '323.812.878-76', '319.091.098-78', '752.494.567-15', '229.637.308-96', '131.026.128-81', '431.514.068-66', '262.309.538-89', '411.312.438-89', '157.874.918-23', '406.129.278-14', '298.757.798-22', '409.983.568-59', '286.970.888-28', '375.848.018-38', '061.822.028-31', '329.699.158-12', '120.097.728-90', '454.566.578-05', '131.025.468-03', '420.128.548-00', '078.512.059-99', '360.215.528-57', '345.827.608-48', '472.269.078-28', '221.485.998-52', '375.725.868-13', '362.177.088-76', '266.788.728-00', '258.153.088-03', '015.515.558-08', '377.448.598-47', '221.871.278-42', '711.142.708-49', '258.835.018-69', '364.904.598-25', '410.129.968-40', '365.073.808-22', '475.787.898-21', '315.238.828-40', '379.769.558-61', '328.414.988-08', '255.273.468-58', '302.379.488-00', '219.674.378-07', '391.035.338-08', '273.391.528-22', '349.164.708-85', '319.229.928-28', '364.160.808-26', '387.536.788-00', '312.322.468-67', '267.561.948-52', '828.235.108-34', '335.164.118-48', '223.114.318-62', '449.702.058-41', '223.639.348-22', '330.024.048-45', '295.146.828-82', '318.623.388-76', '278.069.688-57', '221.580.448-37', '441.537.648-76', '352.845.258-76', '302.242.998-32', '130.789.168-39', '338.233.178-06', '090.893.378-90', '086.960.358-28', '351.152.088-65', '261.096.618-05', '298.508.248-08', '357.616.828-18', '421.013.548-88', '120.103.708-56', '364.002.808-20', '378.061.748-00', '200.724.788-70', '363.677.138-83', '093.972.088-45', '215.443.638-26', '158.275.718-65', '351.741.148-55', '200.095.748-08', '248.955.688-65', '308.155.738-04', '382.730.868-28', '311.630.878-07', '170.468.108-18', '397.148.048-92', '191.009.698-93', '410.936.308-09', '295.739.468-58', '305.369.808-02', '089.746.458-31', '330.024.088-32', '342.654.718-03', '384.467.548-51', '444.064.568-21', '319.881.098-17', '174.023.938-52', '363.189.748-06', '407.582.838-73', '559.631.888-49', '349.375.618-63', '292.579.978-71', '148.435.088-02', '295.772.378-60', '339.383.998-56', '427.468.738-42', '388.526.888-46', '389.759.018-23', '333.680.228-81', '341.159.118-83', '272.646.568-45', '447.359.238-37', '442.106.438-66', '358.779.298-44', '130.794.728-02', '449.361.018-26', '342.539.108-90', '191.413.978-00', '170.643.128-75', '436.844.118-41', '249.393.718-08', '170.576.458-48', '103.519.788-01', '327.904.038-80', '374.588.528-79', '602.925.635-15', '450.132.438-40', '114.616.048-85', '371.076.758-00', '214.415.328-03', '314.558.578-90', '312.322.618-23', '342.664.698-61', '085.292.018-09', '222.194.978-10', '212.808.668-02', '352.692.758-80', '369.443.978-11', '294.180.938-47', '497.290.998-63', '344.932.498-54', '191.414.398-13', '938.224.568-53', '223.087.818-23', '145.661.638-22', '413.798.418-28', '430.299.088-01', '397.615.168-81', '276.525.368-47', '130.793.568-02', '181.843.688-44', '191.418.728-86', '096.338.608-57', '058.477.118-59', '445.091.888-62', '288.510.348-50', '391.614.038-81', '039.167.538-94', '157.874.568-31', '315.851.618-70', '219.232.028-04', '403.746.988-05', '498.966.518-09', '223.449.038-36', '217.949.858-67', '190.995.708-99', '137.287.808-47', '379.494.928-56', '411.907.358-06', '322.987.398-03', '446.104.418-10', '289.637.198-20', '190.856.198-07', '120.102.158-85', '294.602.448-23', '258.805.698-96', '307.579.638-70', '483.902.558-47', '213.610.758-56', '411.768.778-60', '385.556.668-21', '196.295.448-06', '227.209.948-39', '310.442.028-90', '131.067.698-40', '924.064.678-72', '397.396.968-05', '032.270.728-58', '295.501.288-22', '350.937.598-05', '255.189.078-00', '287.942.058-09', '438.475.358-62', '268.937.568-01', '388.809.788-61', '316.845.208-43', '333.218.078-90', '340.755.468-02', '219.783.698-67', '405.375.728-21', '096.331.788-19', '293.806.928-62', '374.341.998-06', '284.171.078-51', '399.213.478-45', '288.217.558-27', '219.410.798-30', '137.290.748-30', '426.863.758-33', '389.789.148-45', '355.429.078-57', '569.169.495-20', '408.171.638-24', '342.044.358-74', '363.388.168-90', '375.362.268-02', '183.422.448-90', '038.355.588-46', '221.005.148-73', '269.560.278-28', '088.137.398-26', '075.132.229-67', '227.033.608-94', '354.208.108-67', '454.779.028-09', '264.172.908-32', '363.353.938-75', '217.288.248-85', '398.875.018-24', '042.335.418-30', '381.444.968-17', '372.263.218-82', '171.789.188-88', '079.016.958-46', '089.186.378-88', '351.286.478-38', '272.130.708-86', '120.103.778-69', '942.767.571-34', '387.016.548-02', '366.950.598-96', '021.509.813-78', '342.224.208-24', '382.584.888-48', '397.322.328-97', '367.372.249-20', '426.650.228-18', '341.289.928-36', '131.060.098-88', '042.004.259-80', '294.005.268-90', '216.021.388-85', '268.832.208-79', '055.038.938-59', '158.282.698-60', '357.686.248-05', '067.951.728-64', '371.447.358-02', '408.457.188-19', '218.999.538-84', '015.654.318-47', '008.950.174-82', '403.676.918-92', '283.141.218-86', '039.068.328-05', '356.904.138-79', '296.752.018-78', '218.077.328-51', '289.705.368-25', '180.866.628-37', '825.608.978-49', '218.235.358-52', '130.807.158-29', '432.339.048-35', '338.198.648-14', '904.148.291-15', '337.880.448-37', '049.197.728-07', '029.311.499-42', '407.291.868-73', '602.925.715-34', '015.658.218-07', '268.080.678-64', '270.846.418-31', '052.119.838-07', '397.761.788-55', '283.888.398-45', '311.972.798-90', '260.464.398-76', '332.511.308-70', '059.301.398-06', '200.717.028-06', '453.976.498-56', '511.406.608-02', '137.297.388-52', '340.755.558-01', '418.837.588-40', '318.853.828-63', '249.658.698-18', '431.806.648-78', '382.917.838-70', '223.741.078-09', '449.581.908-99', '418.826.348-29', '030.684.318-83', '058.478.148-28', '503.256.938-03', '161.965.298-62', '223.902.328-76', '170.641.738-16', '438.287.609-53', '224.130.968-09', '074.162.308-02', '131.066.188-09', '335.214.138-02', '431.853.598-36', '120.103.668-24', '291.458.368-09', '409.104.428-00', '292.986.008-10', '402.479.448-58', '120.101.058-69', '059.557.218-94', '344.579.138-47', '191.005.378-37', '447.689.758-44', '161.954.538-11', '190.849.618-54', '051.700.338-42', '223.230.618-60', '267.596.818-86', '278.845.418-07', '269.408.068-57', '180.863.208-71', '135.936.138-32', '325.359.768-70', '215.945.088-01', '078.912.094-13', '190.858.998-18', '262.245.258-62', '467.551.058-21', '096.339.578-50', '311.007.898-80', '174.021.808-67', '161.965.748-17', '355.877.198-20', '309.792.038-21', '286.932.658-06', '158.277.728-44', '311.239.448-81', '090.792.618-58', '174.012.108-27', '424.690.818-58', '360.808.058-98', '400.661.088-29', '051.045.178-02', '371.618.198-65', '250.364.398-13', '268.027.218-80', '325.575.138-14', '323.479.978-40', '403.015.318-62', '376.138.178-65', '319.815.618-11', '152.923.248-17', '383.035.468-13', '103.288.608-08', '354.409.798-24', '329.723.628-02', '402.544.858-04', '309.996.488-37', '333.566.218-07', '382.074.078-32', '354.409.718-40', '289.210.458-05', '328.673.658-99', '312.843.978-82', '282.189.888-66', '312.322.448-13', '322.278.608-98', '292.228.558-84', '287.366.108-95', '314.698.038-01', '335.492.838-73', '324.813.688-00', '135.935.508-14', '383.157.118-06', '325.967.958-84', '328.567.238-29', '357.867.468-01', '298.256.258-80', '320.650.118-07', '364.474.998-10', '337.916.168-38', '285.195.288-99', '450.054.488-70', '322.697.278-27', '161.726.648-59', '305.406.988-57', '035.916.268-13', '263.820.658-03', '222.213.258-42', '308.030.798-42', '053.325.108-70', '381.158.338-78', '264.564.138-50', '337.713.218-08', '274.404.098-33', '393.607.808-47', '038.355.658-93', '161.941.588-75', '145.151.518-94', '223.382.088-62', '395.337.228-94', '284.906.638-90', '383.266.328-21', '437.640.478-01', '402.972.058-70', '249.099.878-19', '406.817.068-13', '221.301.628-35', '268.699.528-92', '141.271.888-04', '707.937.278-04', '355.009.328-45', '329.856.088-05', '323.812.878-76', '319.091.098-78', '752.494.567-15', '229.637.308-96', '131.026.128-81', '431.514.068-66', '262.309.538-89', '411.312.438-89', '157.874.918-23', '406.129.278-14', '298.757.798-22', '409.983.568-59', '286.970.888-28', '375.848.018-38', '061.822.028-31', '329.699.158-12', '120.097.728-90', '454.566.578-05', '131.025.468-03', '420.128.548-00', '078.512.059-99', '360.215.528-57', '345.827.608-48', '472.269.078-28', '221.485.998-52', '375.725.868-13', '362.177.088-76', '266.788.728-00', '258.153.088-03', '015.515.558-08', '377.448.598-47', '221.871.278-42', '711.142.708-49', '258.835.018-69', '364.904.598-25', '410.129.968-40', '365.073.808-22', '475.787.898-21', '315.238.828-40', '379.769.558-61', '328.414.988-08', '255.273.468-58', '302.379.488-00', '219.674.378-07', '391.035.338-08', '273.391.528-22', '349.164.708-85', '319.229.928-28', '364.160.808-26', '387.536.788-00', '312.322.468-67', '267.561.948-52', '828.235.108-34', '335.164.118-48', '223.114.318-62', '449.702.058-41', '223.639.348-22', '330.024.048-45', '295.146.828-82', '318.623.388-76', '278.069.688-57', '221.580.448-37', '441.537.648-76', '352.845.258-76', '302.242.998-32', '130.789.168-39', '338.233.178-06', '090.893.378-90', '086.960.358-28', '351.152.088-65', '261.096.618-05', '298.508.248-08', '357.616.828-18', '421.013.548-88', '120.103.708-56', '364.002.808-20', '378.061.748-00', '200.724.788-70', '363.677.138-83', '093.972.088-45', '215.443.638-26', '158.275.718-65', '351.741.148-55', '200.095.748-08', '248.955.688-65', '308.155.738-04', '382.730.868-28', '311.630.878-07', '170.468.108-18', '397.148.048-92', '191.009.698-93', '410.936.308-09', '295.739.468-58', '305.369.808-02', '089.746.458-31', '330.024.088-32', '342.654.718-03', '384.467.548-51', '444.064.568-21', '319.881.098-17', '174.023.938-52', '363.189.748-06', '407.582.838-73', '559.631.888-49', '349.375.618-63', '292.579.978-71', '148.435.088-02', '295.772.378-60', '339.383.998-56', '427.468.738-42', '388.526.888-46', '389.759.018-23', '333.680.228-81', '341.159.118-83', '272.646.568-45', '447.359.238-37', '442.106.438-66', '358.779.298-44', '130.794.728-02', '449.361.018-26', '342.539.108-90', '191.413.978-00', '170.643.128-75', '436.844.118-41', '249.393.718-08', '170.576.458-48', '103.519.788-01', '327.904.038-80', '374.588.528-79', '602.925.635-15', '450.132.438-40', '114.616.048-85', '371.076.758-00', '214.415.328-03', '314.558.578-90', '312.322.618-23', '342.664.698-61', '085.292.018-09', '222.194.978-10', '212.808.668-02', '352.692.758-80', '369.443.978-11', '294.180.938-47', '497.290.998-63', '344.932.498-54', '191.414.398-13', '938.224.568-53', '223.087.818-23', '145.661.638-22', '413.798.418-28', '430.299.088-01', '397.615.168-81', '276.525.368-47', '130.793.568-02', '181.843.688-44', '191.418.728-86', '096.338.608-57', '058.477.118-59', '445.091.888-62', '288.510.348-50', '391.614.038-81', '039.167.538-94', '157.874.568-31', '315.851.618-70', '219.232.028-04', '403.746.988-05', '498.966.518-09', '223.449.038-36', '217.949.858-67', '190.995.708-99', '137.287.808-47', '379.494.928-56', '411.907.358-06', '322.987.398-03', '446.104.418-10', '289.637.198-20', '190.856.198-07', '120.102.158-85', '294.602.448-23', '258.805.698-96', '307.579.638-70', '483.902.558-47', '213.610.758-56', '411.768.778-60', '385.556.668-21', '196.295.448-06', '227.209.948-39', '310.442.028-90', '131.067.698-40', '924.064.678-72', '397.396.968-05', '032.270.728-58', '295.501.288-22', '350.937.598-05', '255.189.078-00', '287.942.058-09', '438.475.358-62', '268.937.568-01', '388.809.788-61', '316.845.208-43', '333.218.078-90', '340.755.468-02', '219.783.698-67', '405.375.728-21', '096.331.788-19', '293.806.928-62', '374.341.998-06', '284.171.078-51', '399.213.478-45', '288.217.558-27', '219.410.798-30', '137.290.748-30', '426.863.758-33', '389.789.148-45', '355.429.078-57', '569.169.495-20', '408.171.638-24', '342.044.358-74', '363.388.168-90', '375.362.268-02', '183.422.448-90', '038.355.588-46', '221.005.148-73', '269.560.278-28', '088.137.398-26', '075.132.229-67', '227.033.608-94', '354.208.108-67', '454.779.028-09', '264.172.908-32', '363.353.938-75', '217.288.248-85', '398.875.018-24', '042.335.418-30', '381.444.968-17', '372.263.218-82', '171.789.188-88', '079.016.958-46', '089.186.378-88', '351.286.478-38', '272.130.708-86', '120.103.778-69', '942.767.571-34', '387.016.548-02', '366.950.598-96', '021.509.813-78', '342.224.208-24', '382.584.888-48', '397.322.328-97', '367.372.249-20', '426.650.228-18', '341.289.928-36', '131.060.098-88', '042.004.259-80', '294.005.268-90', '216.021.388-85', '268.832.208-79', '055.038.938-59', '158.282.698-60', '357.686.248-05', '067.951.728-64', '371.447.358-02', '408.457.188-19', '218.999.538-84', '015.654.318-47', '008.950.174-82', '403.676.918-92', '283.141.218-86', '039.068.328-05', '356.904.138-79', '296.752.018-78', '218.077.328-51', '289.705.368-25', '180.866.628-37', '825.608.978-49', '218.235.358-52', '130.807.158-29', '432.339.048-35', '338.198.648-14', '904.148.291-15', '337.880.448-37', '049.197.728-07', '029.311.499-42', '407.291.868-73', '602.925.715-34', '015.658.218-07', '268.080.678-64', '270.846.418-31', '052.119.838-07', '397.761.788-55', '283.888.398-45', '311.972.798-90', '260.464.398-76', '332.511.308-70', '059.301.398-06', '200.717.028-06', '453.976.498-56', '511.406.608-02', '137.297.388-52', '340.755.558-01', '418.837.588-40', '318.853.828-63', '249.658.698-18', '431.806.648-78', '382.917.838-70', '223.741.078-09', '449.581.908-99', '418.826.348-29', '030.684.318-83', '058.478.148-28', '503.256.938-03', '161.965.298-62', '223.902.328-76', '170.641.738-16', '438.287.609-53', '224.130.968-09', '074.162.308-02', '131.066.188-09', '335.214.138-02', '431.853.598-36', '120.103.668-24', '291.458.368-09', '409.104.428-00', '292.986.008-10', '402.479.448-58', '120.101.058-69', '059.557.218-94', '344.579.138-47', '191.005.378-37', '447.689.758-44', '161.954.538-11', '190.849.618-54', '051.700.338-42', '223.230.618-60'];
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
    <div style="border: 1px solid #000; padding: 6px; font-family: 'Arial', sans-serif; font-size: 14px;">
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
    <div style="border: 1px solid #000; padding: 6px; font-family: 'Arial', sans-serif; font-size: 14px;">
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



      function cidadeElegivel(cidade, grupo) {
        const gruposDeCidades = {
          interiorSP: ['ADAMANTINA', 'ADOLFO', 'AGUAÍ', 'ÁGUAS DA PRATA', 'ÁGUAS DE LINDÓIA', 'ÁGUAS DE SANTA BÁRBARA', 'ÁGUAS DE SÃO PEDRO', 'AGUDOS', 'ALAMBARI', 'ALFREDO MARCONDES', 'ALTAIR', 'ALTINÓPOLIS', 'ALTO ALEGRE', 'ALUMÍNIO', 'ÁLVARES FLORENCE', 'ÁLVARES MACHADO', 'ÁLVARO DE CARVALHO', 'ALVINLÂNDIA', 'AMERICANA', 'AMÉRICO BRASILIENSE', 'AMÉRICO DE CAMPOS', 'AMPARO', 'ANALÂNDIA', 'ANDRADINA', 'ANGATUBA', 'ANHEMBI', 'ANHUMAS', 'APARECIDA D OESTE', 'APIAÍ', 'ARAÇATUBA', 'ARAMINA', 'ARANDU', 'ARAPEÍ', 'ARARAQUARA', 'ARARAS', 'ARCO-ÍRIS', 'AREALVA', 'AREIAS', 'AREIÓPOLIS', 'ARIRANHA', 'ARTUR NOGUEIRA', 'ASPÁSIA', 'ASSIS', 'ATIBAIA', 'AURIFLAMA', 'AVAÍ', 'AVANHANDAVA', 'AVARÉ', 'BADY BASSITT', 'BALBINOS', 'BÁLSAMO', 'BARBOSA', 'BARIRI', 'BARRA BONITA', 'BARRA DO CHAPÉU', 'BARRA DO TURVO', 'BARRETOS', 'BARRINHA', 'BASTOS', 'BATATAIS', 'BAURU', 'BEBEDOURO', 'BENTO DE ABREU', 'BILAC', 'BIRIGUI', 'BOCAINA', 'BOFETE', 'BOITUVA', 'BOM JESUS DOS PERDÕES', 'BOM SUCESSO DE ITARARÉ', 'BORÁ', 'BORACÉIA', 'BORBOREMA', 'BOREBI', 'BOTUCATU', 'BRAGANÇA PAULISTA', 'BRAÚNA', 'BREJO ALEGRE', 'BRODOWSKI', 'BROTAS', 'BURI', 'BURITAMA', 'BURITIZAL', 'CABRÁLIA PAULISTA', 'CABREÚVA', 'CAÇAPAVA', 'CACHOEIRA PAULISTA', 'CAFELÂNDIA', 'CAIABU', 'CAIUÁ', 'CAJAMAR', 'CAJATI', 'CAJOBI', 'CAJURU', 'CAMPINA DO MONTE ALEGRE', 'CAMPINAS', 'CAMPO LIMPO PAULISTA', 'CAMPOS DO JORDÃO', 'CAMPOS NOVOS PAULISTA', 'CANANÉIA', 'CANAS', 'CÂNDIDO MOTA', 'CÂNDIDO RODRIGUES', 'CANITAR', 'CAPELA DO ALTO', 'CAPIVARI', 'CARDOSO', 'CASA BRANCA', 'CÁSSIA DOS COQUEIROS', 'CASTILHO', 'CATANDUVA', 'CATIGUÁ', 'CEDRAL', 'CERQUEIRA CÉSAR', 'CERQUILHO', 'CESÁRIO LANGE', 'CHARQUEADA', 'CHAVANTES', 'CLEMENTINA', 'COLINA', 'COLÔMBIA', 'CONCHAL', 'CONCHAS', 'CORDEIRÓPOLIS', 'COROADOS', 'CORONEL MACEDO', 'CORUMBATAÍ', 'COSMÓPOLIS', 'COSMORAMA', 'CRAVINHOS', 'CRISTAIS PAULISTA', 'CRUZÁLIA', 'CUNHA', 'DESCALVADO', 'DIRCE REIS', 'DIVINOLÂNDIA', 'DOBRADA', 'DOIS CÓRREGOS', 'DOLCINÓPOLIS', 'DOURADO', 'DRACENA', 'DUARTINA', 'DUMONT', 'ECHAPORÃ', 'ELDORADO', 'ELIAS FAUSTO', 'ELISIÁRIO', 'EMBAÚBA', 'EMILIANÓPOLIS', 'ENGENHEIRO COELHO', 'ESPÍRITO SANTO DO PINHAL', 'ESPÍRITO SANTO DO TURVO', 'ESTIVA GERBI', 'ESTRELA DO NORTE', 'ESTRELA D OESTE', 'EUCLIDES DA CUNHA PAULISTA', 'FARTURA', 'FERNANDO PRESTES', 'FERNANDÓPOLIS', 'FERNÃO', 'FLORA RICA', 'FLOREAL', 'FLÓRIDA PAULISTA', 'FLORÍNEA', 'FRANCA', 'GABRIEL MONTEIRO', 'GÁLIA', 'GARÇA', 'GASTÃO VIDIGAL', 'GAVIÃO PEIXOTO', 'GENERAL SALGADO', 'GETULINA', 'GLICÉRIO', 'GUAIÇARA', 'GUAIMBÊ', 'GUAÍRA', 'GUAPIAÇU', 'GUAPIARA', 'GUARÁ', 'GUARAÇAÍ', 'GUARACI', 'GUARANI D OESTE', 'GUARANTÃ', 'GUARARAPES', 'GUARAREMA', 'GUAREÍ', 'GUARIBA', 'GUATAPARÁ', 'GUZOLÂNDIA', 'HERCULÂNDIA', 'HOLAMBRA', 'HORTOLÂNDIA', 'IACANGA', 'IACRI', 'IARAS', 'IBATÉ', 'IBIRÁ', 'IBIRAREMA', 'IBITINGA', 'IBIÚNA', 'ICÉM', 'IEPÊ', 'IGARAÇU DO TIETÊ', 'IGARAPAVA', 'IGARATÁ', 'IGUAPE', 'ILHA COMPRIDA', 'ILHA SOLTEIRA', 'ILHABELA', 'INDAIATUBA', 'INDIANA', 'INDIAPORÃ', 'INÚBIA PAULISTA', 'IPAUSSU', 'IPERÓ', 'IPEÚNA', 'IPIGUÁ', 'IPORANGA', 'IPUÃ', 'IRACEMÁPOLIS', 'IRAPUÃ', 'IRAPURU', 'ITABERÁ', 'ITAÍ', 'ITAJOBI', 'ITAJU', 'ITAÓCA', 'ITAPETININGA', 'ITAPEVA', 'ITAPIRA', 'ITAPIRAPUÃ PAULISTA', 'ITÁPOLIS', 'ITAPORANGA', 'ITAPUÍ', 'ITAPURA', 'ITAQUAQUECETUBA', 'ITARARÉ', 'ITARIRI', 'ITATIBA', 'ITATINGA', 'ITIRAPINA', 'ITIRAPUÃ', 'ITOBI', 'ITU', 'ITUPEVA', 'ITUVERAVA', 'JABORANDI', 'JABOTICABAL', 'JACAREÍ', 'JACI', 'JACUPIRANGA', 'JAGUARIÚNA', 'JALES', 'JAMBEIRO', 'JANDIRA', 'JARDINÓPOLIS', 'JARINU', 'JAÚ', 'JERIQUARA', 'JOANÓPOLIS', 'JOÃO RAMALHO', 'JOSÉ BONIFÁCIO', 'JÚLIO MESQUITA', 'JUMIRIM', 'JUNDIAÍ', 'JUNQUEIRÓPOLIS', 'JUQUIÁ', 'LAGOINHA', 'LARANJAL PAULISTA', 'LAVÍNIA', 'LAVRINHAS', 'LEME', 'LENÇÓIS PAULISTA', 'LIMEIRA', 'LINDÓIA', 'LINS', 'LORENA', 'LOURDES', 'LOUVEIRA', 'LUCÉLIA', 'LUCIANÓPOLIS', 'LUÍS ANTÔNIO', 'LUIZIÂNIA', 'LUPÉRCIO', 'LUTÉCIA', 'MACATUBA', 'MACAUBAL', 'MACEDÔNIA', 'MAGDA', 'MAIRINQUE', 'MANDURI', 'MARABÁ PAULISTA', 'MARACAÍ', 'MARAPOAMA', 'MARIÁPOLIS', 'MARÍLIA', 'MARINÓPOLIS', 'MARTINÓPOLIS', 'MATÃO', 'MENDONÇA', 'MERIDIANO', 'MESÓPOLIS', 'MIGUELÓPOLIS', 'MINEIROS DO TIETÊ', 'MIRA ESTRELA', 'MIRACATU', 'MIRANDÓPOLIS', 'MIRANTE DO PARANAPANEMA', 'MIRASSOL', 'MOCOCA', 'MOGI GUAÇU', 'MOGI MIRIM', 'MOMBUCA', 'MONÇÕES', 'MONTE ALEGRE DO SUL', 'MONTE ALTO', 'MONTE APRAZÍVEL', 'MONTE AZUL PAULISTA', 'MONTE CASTELO', 'MONTE MOR', 'MONTEIRO LOBATO', 'MORRO AGUDO', 'MORUNGABA', 'MOTUCA', 'MURUTINGA DO SUL', 'NANTES', 'NARANDIBA', 'NATIVIDADE DA SERRA', 'NAZARÉ PAULISTA', 'NEVES PAULISTA', 'NHANDEARA', 'NIPOÃ', 'NOVA ALIANÇA', 'NOVA CAMPINA', 'NOVA CANAÃ PAULISTA', 'NOVA CASTILHO', 'NOVA EUROPA', 'NOVA GRANADA', 'NOVA GUATAPORANGA', 'NOVA INDEPENDÊNCIA', 'NOVA LUZITÂNIA', 'NOVA ODESSA', 'NOVAIS', 'NOVO HORIZONTE', 'NUPORANGA', 'OCAUÇU', 'ÓLEO', 'OLÍMPIA', 'ONDA VERDE', 'ORIENTE', 'ORINDIÚVA', 'ORLÂNDIA', 'OSCAR BRESSANE', 'OSVALDO CRUZ', 'OURINHOS', 'OURO VERDE', 'OUROESTE', 'PACAEMBU', 'PALESTINA', 'PALMARES PAULISTA', 'PALMEIRA D OESTE', 'PALMITAL', 'PANORAMA', 'PARAGUAÇU PAULISTA', 'PARAIBUNA', 'PARAÍSO', 'PARANAPANEMA', 'PARANAPUÃ', 'PARAPUÃ', 'PARDINHO', 'PARIQUERA-AÇU', 'PARISI', 'PATROCÍNIO PAULISTA', 'PAULICÉIA', 'PAULÍNIA', 'PAULISTÂNIA', 'PAULO DE FARIA', 'PEDERNEIRAS', 'PEDRANÓPOLIS', 'PEDREGULHO', 'PEDREIRA', 'PEDRINHAS PAULISTA', 'PEDRO DE TOLEDO', 'PENÁPOLIS', 'PEREIRA BARRETO', 'PEREIRAS', 'PIACATU', 'PIEDADE', 'PILAR DO SUL', 'PINDAMONHANGABA', 'PINDORAMA', 'PINHALZINHO', 'PIQUEROBI', 'PIQUETE', 'PIRACAIA', 'PIRACICABA', 'PIRAJU', 'PIRAJUÍ', 'PIRANGI', 'PIRAPOZINHO', 'PIRASSUNUNGA', 'PIRATININGA', 'PITANGUEIRAS', 'PLANALTO', 'PLATINA', 'POLONI', 'POMPÉIA', 'PONGAÍ', 'PONTAL', 'PONTALINDA', 'PONTES GESTAL', 'POPULINA', 'PORANGABA', 'PORTO FELIZ', 'PORTO FERREIRA', 'POTIM', 'POTIRENDABA', 'PRACINHA', 'PRADÓPOLIS', 'PRATÂNIA', 'PRESIDENTE ALVES', 'PRESIDENTE BERNARDES', 'PRESIDENTE EPITÁCIO', 'PRESIDENTE PRUDENTE', 'PRESIDENTE VENCESLAU', 'PROMISSÃO', 'QUADRA', 'QUATÁ', 'QUEIROZ', 'QUELUZ', 'QUINTANA', 'RAFARD', 'RANCHARIA', 'REDENÇÃO DA SERRA', 'REGENTE FEIJÓ', 'REGINÓPOLIS', 'REGISTRO', 'RESTINGA', 'RIBEIRA', 'RIBEIRÃO BONITO', 'RIBEIRÃO BRANCO', 'RIBEIRÃO CORRENTE', 'RIBEIRÃO DO SUL', 'RIBEIRÃO DOS ÍNDIOS', 'RIBEIRÃO GRANDE', 'RIBEIRÃO PRETO', 'RIFAINA', 'RINCÃO', 'RINÓPOLIS', 'RIO CLARO', 'RIO DAS PEDRAS', 'RIO GRANDE DA SERRA', 'RIOLÂNDIA', 'RIVERSUL', 'ROSANA', 'ROSEIRA', 'RUBIÁCEA', 'RUBINÉIA', 'SABINO', 'SAGRES', 'SALES', 'SALES OLIVEIRA', 'SALMOURÃO', 'SALTINHO', 'SALTO', 'SALTO DE PIRAPORA', 'SALTO GRANDE', 'SANDOVALINA', 'SANTA ADÉLIA', 'SANTA ALBERTINA', 'SANTA BÁRBARA D OESTE', 'SANTA BRANCA', 'SANTA CLARA D OESTE', 'SANTA CRUZ DA CONCEIÇÃO', 'SANTA CRUZ DA ESPERANÇA', 'SANTA CRUZ DAS PALMEIRAS', 'SANTA CRUZ DO RIO PARDO', 'SANTA ERNESTINA', 'SANTA FÉ DO SUL', 'SANTA GERTRUDES', 'SANTA LÚCIA', 'SANTA MERCEDES', 'SANTA RITA DO PASSA-QUATRO', 'SANTA RITA D OESTE', 'SANTA ROSA DE VITERBO', 'SANTA SALETE', 'SANTANA DA PONTE PENSA', 'SANTO ANASTÁCIO', 'SANTO ANTÔNIO DA ALEGRIA', 'SANTO ANTÔNIO DE POSSE', 'SANTO ANTÔNIO DO ARACANGUÁ', 'SANTO ANTÔNIO DO JARDIM', 'SANTO ANTÔNIO DO PINHAL', 'SANTO EXPEDITO', 'SANTÓPOLIS DO AGUAPEÍ', 'SÃO BENTO DO SAPUCAÍ', 'SÃO CARLOS', 'SÃO JOÃO DA BOA VISTA', 'SÃO JOÃO DAS DUAS PONTES', 'SÃO JOÃO DE IRACEMA', 'SÃO JOÃO DO PAU D ALHO', 'SÃO JOAQUIM DA BARRA', 'SÃO JOSÉ DA BELA VISTA', 'SÃO JOSÉ DO BARREIRO', 'SÃO JOSÉ DO RIO PARDO', 'SÃO JOSÉ DO RIO PRETO', 'SÃO JOSÉ DOS CAMPOS', 'SÃO LUIZ DO PARAITINGA', 'SÃO MANUEL', 'SÃO MIGUEL ARCANJO', 'SÃO PEDRO', 'SÃO PEDRO DO TURVO', 'SÃO ROQUE', 'SÃO SEBASTIÃO DA GRAMA', 'SÃO SIMÃO', 'SARAPUÍ', 'SARUTAIÁ', 'SEBASTIANÓPOLIS DO SUL', 'SERRA AZUL', 'SERRA NEGRA', 'SERRANA', 'SERTÃOZINHO', 'SETE BARRAS', 'SEVERÍNIA', 'SILVEIRAS', 'SOCORRO', 'SOROCABA', 'SUD MENNUCCI', 'SUMARÉ', 'SUZANÁPOLIS', 'TEDITAR', 'TABAPUÃ', 'TABATINGA', 'TACIBA', 'TAGUAÍ', 'TAIAÇU', 'TAIÚVA', 'TAMBAÚ', 'TANABI', 'TAPIRAÍ', 'TAPIRATIBA', 'TAQUARAL', 'TAQUARITINGA', 'TAQUARITUBA', 'TAQUARIVAÍ', 'TARABAI', 'TARUMÃ', 'TATUÍ', 'TAUBATÉ', 'TEJUPÁ', 'TEODORO SAMPAIO', 'TERRA ROXA', 'TIETÊ', 'TIMBURI', 'TORRE DE PEDRA', 'TORRINHA', 'TRABIJU', 'TREMEMBÉ', 'TRÊS FRONTEIRAS', 'TUIUTI', 'TUPÃ', 'TUPI PAULISTA', 'TURIÚBA', 'TURMALINA', 'UEDITAR', 'UBARANA', 'UBATUBA', 'UBIRAJARA', 'UCHOA', 'UNIÃO PAULISTA', 'URÂNIA', 'URU', 'URUPÊS', 'VEDITAR', 'VALENTIM GENTIL', 'VALINHOS', 'VALPARAÍSO', 'VARGEM', 'VARGEM GRANDE DO SUL', 'VARGEM GRANDE PAULISTA', 'VÁRZEA PAULISTA', 'VERA CRUZ', 'VINHEDO', 'VIRADOURO', 'VISTA ALEGRE DO ALTO', 'VITÓRIA BRASIL', 'VOTORANTIM', 'VOTUPORANGA', 'ZACARIAS'], // Cidades do interior de São Paulo
          grandeSP: ['SÃO PAULO', 'ARUJÁ', 'BARUERI', 'BIRITIBA MIRIM', 'CAIEIRAS', 'CARAPICUÍBA', 'COTIA', 'DIADEMA', 'EMBU', 'EMBU-GUAÇU', 'FERRAZ DE VASCONCELOS', 'FRANCISCO MORATO', 'FRANCO DA ROCHA', 'GUARAREMA', 'GUARULHOS', 'ITAPECERICA DA SERRA', 'ITAPEVI', 'ITAQUAQUECETUBA', 'JANDIRA', 'JUQUITIBA', 'MAIRIPORÃ', 'MAUÁ', 'MOGI DAS CRUZES', 'OSASCO', 'PIRAPORA DO BOM JESUS', 'POÁ', 'RIBEIRÃO PIRES', 'RIO GRANDE DA SERRA', 'SALESÓPOLIS', 'SANTA ISABEL', 'SANTANA DO PARNAÍBA', 'SANTO ANDRÉ', 'SÃO BERNARDO DO CAMPO', 'SÃO CAETANO DO SUL', 'SÃO LOURENÇO DA SERRA SUZANO', 'SUZANO', 'TABOÃO DA SERRA', 'VARGEM GRANDE PAULISTA'],    // Cidades da Grande São Paulo
          litoralSP: ['UBATUBA', 'CARAGUATATUBA', 'SÃO SEBASTIÃO', 'ILHABELA', 'CUBATÃO', 'BERTIOGA', 'GUARUJÁ', 'SÃO VICENTE', 'PRAIA GRANDE', 'MONGAGUÁ', 'ITANHAÉM', 'PERUÍBE', 'IGUAPE', 'ILHA COMPRIDA', 'CANANÉIA'],    // Cidades do litoral de São Paulo
          litoralSP2:['SANTOS',]    
        };

        const cidadeFormatada = cidade.split('/')[0].trim().toUpperCase();
        return gruposDeCidades[grupo].includes(cidadeFormatada);
      }

     
function calcularFrete(volumes, peso, cidadeUF) {
    const inputCidade = document.getElementById('destinatario-cidade-uf').value;

    if (volumes >= 1 && volumes <= 5 && peso <= 100) {
        if (cidadeElegivel(inputCidade, 'interiorSP')) {
            const tabelaDePrecosInteriorSP = [52.62, 63.59, 74.55, 85.62, 98.15]; // Valores para o interior de SP
            return tabelaDePrecosInteriorSP[volumes - 1];
        } else if (cidadeElegivel(inputCidade, 'grandeSP')) {
            const tabelaDePrecosGrandeSP = [76.75, 87.71, 98.68, 109.63, 131.56]; // Valores para a Grande SP
            return tabelaDePrecosGrandeSP[volumes - 1];
        } else if (cidadeElegivel(inputCidade, 'litoralSP')) {
            const tabelaDePrecosLitoralSP = [71.26, 82.22, 93.19, 104.14, 126.07]; // Valores para o litoral de SP
            return tabelaDePrecosLitoralSP[volumes - 1];
        } else if (cidadeElegivel(inputCidade, 'litoralSP2')) {
            const tabelaDePrecosLitoralSP2 = [76.03, 87.00, 97.96, 108.93, 122.07]; // Valores para o litoral de SP2
            return tabelaDePrecosLitoralSP2[volumes - 1];
        }
    }

    return 0;
}
