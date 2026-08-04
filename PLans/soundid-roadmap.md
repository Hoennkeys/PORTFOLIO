# 📍 Roadmap de Implementação: SoundID e Identificação de Anfíbios

Este documento detalha o roadmap de implementação para o sistema de identificação de sons de sapos e anfíbios em geral (**SoundID**), bem como as alterações necessárias no projeto **RibbitApp**.

---

## 📋 Fases do Roadmap

### 1. Coleta e Organização
* [ ] **Gravar sons de referência:** Estruturar o dataset inicial com gravações de campo de diferentes espécies de anfíbios.
* [ ] **Estruturar biblioteca com metadados:** Organizar os arquivos de áudio associando informações como espécie, coordenadas/localização geográfica, data e horário.
* [ ] **Organização de Diretórios:** Criar e manter a estrutura de pastas:
  * `/raw`: Gravações originais sem tratamento.
  * `/processed`: Gravações tratadas, normalizadas e limpas.
  * `/library`: Arquivos finais catalogados prontos para uso/treinamento.

### 2. Pré-processamento
* [ ] **Normalização e Remoção de Ruído:** Limpar as frequências indesejadas (vento, chuva, tráfego) e normalizar o volume das gravações.
* [ ] **Geração de Espectrogramas:** Converter os arquivos de áudio em representações visuais de frequência ao longo do tempo (espectrogramas).
* [ ] **Extração de Features:** Extrair coeficientes cepstrais de frequência de Mel (**MFCCs**), que servirão como as features principais para o modelo.

### 3. Treinamento do Modelo
* [ ] **Dataset Multiespécie:** Consolidar o dataset contendo áudios rotulados de diversas espécies de sapos e rãs.
* [ ] **Modelo de Classificação:** Projetar e treinar uma Rede Neural Convolucional (**CNN**) utilizando as imagens dos espectrogramas/MFCCs.
* [ ] **Validação e Testes:** Validar a precisão e o desempenho do modelo utilizando novos sons de teste que não foram apresentados durante a fase de treinamento.

### 4. Backend de Identificação
* [ ] **Pipeline de Inferência na API:**
  1. API recebe o arquivo de áudio enviado pelo cliente.
  2. Executa o pipeline de pré-processamento.
  3. Alimenta o modelo treinado com os dados gerados.
  4. Retorna a espécie identificada e o nível de confiança.
* [ ] **Persistência de Dados (Supabase):** Armazenar o arquivo de gravação de áudio no Storage do Supabase e registrar o resultado no banco de dados (tabela de histórico/identificações).

### 5. Integração no App
* [ ] **Integração com o SoundID Existente:** Utilizar a captação de áudio já existente na plataforma (módulo SoundID) como fonte primária dos sons gravados.
* [ ] **Envio e Consumo da API:** Direcionar o arquivo de áudio capturado pelo SoundID para a API de identificação de anfíbios e processar o retorno.
* [ ] **Apresentação de Resultados:** Exibir para o usuário a espécie identificada com seu nome científico/popular, ícone correspondente e metadados detalhados.

### 6. Iteração e Escalabilidade
* [ ] **Expansão do Dataset:** Adicionar continuamente novas espécies e novas variações de cantos.
* [ ] **Transfer Learning:** Refinar o modelo utilizando técnicas de aprendizado por transferência para acelerar e otimizar novas classes.
* [ ] **Feedback Loop:** Permitir que especialistas ou usuários reportem e corrijam identificações incorretas para retroalimentar o dataset de treinamento.

---

## 🔄 Alterações no Projeto (RibbitApp)

Para habilitar essas funcionalidades, as seguintes alterações precisam ser realizadas no ecossistema do **RibbitApp**:

1. **Integração com o SoundID (Captação Existente):**
   * Configurar o fluxo de áudio para reutilizar o módulo de captação de som (**SoundID**) já existente na plataforma, evitando retrabalho no desenvolvimento de gravação nativa.

2. **Serviço de Envio de Áudio:**
   * Implementar o serviço de rede responsável por enviar o arquivo gerado pelo SoundID para o backend/API de processamento.

3. **Integração com Supabase:**
   * Configurar e autenticar as chamadas ao Supabase.
   * Criar buckets de armazenamento no Supabase para salvar os áudios originados do SoundID.
   * Criar tabelas para salvar metadados e histórico de identificações associadas a cada captação.

4. **Consumo da API de IA:**
   * Desenvolver o handler/cliente HTTP para enviar o áudio à API do modelo de classificação e tratar respostas de sucesso ou erro (timeout, baixa confiança, etc.).

5. **Interface do Usuário (UI/UX):**
   * Criar a tela dedicada de **"Identificação de Sapo"** que serve como container/ponte para disparar o SoundID existente.
   * Desenvolver card/layout de resultados limpo, intuitivo e com informações ecológicas adicionais das espécies de anfíbios identificadas.

