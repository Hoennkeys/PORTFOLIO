# 🐸 Relatório de Implementação: Fases 1 e 2 - SoundID

Este documento detalha o que foi criado e testado para as **Fases 1 (Coleta e Organização)** e **2 (Pré-processamento)** do sistema de identificação de sons de anfíbios.

---

## 📁 Estrutura de Pastas Criada

As pastas abaixo foram criadas no diretório raiz do projeto para segmentação dos dados de áudio e features:

* `data/`
  * `raw/` - Gravações de áudio originais (formato `.wav`).
  * `processed/`
    * `spectrograms/` - Imagens dos espectrogramas de Mel (formato `.png`).
    * `features/` - Arquivos de coeficientes MFCC extraídos (formato binário `.npy`).
  * `metadata.json` - Banco de metadados das captações de som (espécie, localização, caminhos físicos e formatos).

---

## 🛠️ Arquivos Criados e Alterações

### 1. `requirements.txt`
Contém as dependências Python necessárias para processamento numérico, geração de sinais e visualização de dados.
* Para evitar incompatibilidades e tempos longos de compilação em ambiente Windows/MSYS2, as dependências foram instaladas utilizando o gerenciador do sistema (`pacman`) com pacotes pré-compilados UCRT64:
  `mingw-w64-ucrt-x86_64-python-{numpy, scipy, matplotlib, soundfile, librosa}`.

### 2. `src/soundid/generate_synthetic.py`
* [generate_synthetic.py](file:///c:/Users/Administrador/PORTFOLIO/src/soundid/generate_synthetic.py)
* Gera cantos sintéticos de sapo baseando-se em suas características acústicas reais de frequência e pulso:
  * **Sapo-Cururu (*Rhinella marina*):** Coaxar grave (~250Hz) modulado a ~8Hz.
  * **Perereca-Verde (*Aplastodiscus argyreornatus*):** Assobios curtos de alta frequência (~2200Hz) a cada 0.6s.
  * **Rã-Pimenta (*Leptodactylus labyrinthicus*):** Assobios ascendentes (sweeps) de 500Hz a 1200Hz.
* Escreve os metadados das gravações no arquivo central `data/metadata.json`.

### 3. `src/soundid/preprocess.py`
* [preprocess.py](file:///c:/Users/Administrador/PORTFOLIO/src/soundid/preprocess.py)
* **Decisão de Arquitetura:** Para contornar a falha crítica do LLVM JIT no Numba (`LLVM ERROR: Symbol not found: sincosf`) presente no compilador dinâmico do Windows/MSYS2, o pré-processador foi desenvolvido utilizando **puramente NumPy e SciPy** para calcular o espectrograma de Mel e extrair os MFCCs.
* **Processamento Executado:**
  1. Carregamento rápido de arquivos de áudio e conversão automática para mono e ponto flutuante `[-1.0, 1.0]`.
  2. Filtro Passa-Banda (Butterworth de 5ª ordem) retendo frequências de **150Hz a 4500Hz** para limpeza de ruídos como vento ou batidas.
  3. Cálculo da STFT (Short-Time Fourier Transform) usando SciPy.
  4. Projeção dos coeficientes para a escala logarítmica de Mel (128 canais).
  5. Exportação da imagem do espectrograma utilizando Matplotlib.
  6. Extração de **20 coeficientes MFCC** usando Transformada Discreta de Cosseno (DCT-II) e salvamento em formato `.npy`.

### 4. `src/soundid/test_pipeline.py`
* [test_pipeline.py](file:///c:/Users/Administrador/PORTFOLIO/src/soundid/test_pipeline.py)
* Script de teste que automatiza toda a validação do fluxo:
  1. Executa a geração sintética.
  2. Garante a criação física dos arquivos de áudio brutos e tamanho adequado.
  3. Roda o pré-processador e garante a escrita correta dos espectrogramas e arquivos `.npy`.
  4. Valida as dimensões dos arrays MFCC (20 coeficientes, 131 frames temporais).
  5. Valida o preenchimento de caminhos relativos em `data/metadata.json`.

---

## 🧪 Resultados dos Testes do Pipeline

A execução do comando `python src/soundid/test_pipeline.py` foi concluída com sucesso. Veja o log do teste realizado:

```text
=== INICIANDO TESTE DO PIPELINE SOUNDID ===

Passo 1: Executando geração de áudio sintético...
Áudio sintético gerado: data/raw\cururu.wav
Áudio sintético gerado: data/raw\perereca.wav
Áudio sintético gerado: data/raw\pimenta.wav
Metadados salvos com sucesso em: data/metadata.json
Geração sintética concluída.

  [OK] Arquivo gerado: data\raw\cururu.wav (132344 bytes)
  [OK] Arquivo gerado: data\raw\perereca.wav (132344 bytes)
  [OK] Arquivo gerado: data\raw\pimenta.wav (132344 bytes)
  [OK] Arquivos brutos e metadados iniciais validados.

Passo 2: Executando pré-processamento de áudio...
[cururu] Pré-processamento (NumPy/SciPy) concluído:
  -> Espectrograma salvo: data/processed/spectrograms\cururu.png
  -> Features MFCC ((20, 131)) salvas: data/processed/features\cururu_mfcc.npy
[perereca] Pré-processamento (NumPy/SciPy) concluído:
  -> Espectrograma salvo: data/processed/spectrograms\perereca.png
  -> Features MFCC ((20, 131)) salvas: data/processed/features\perereca_mfcc.npy
[pimenta] Pré-processamento (NumPy/SciPy) concluído:
  -> Espectrograma salvo: data/processed/spectrograms\pimenta.png
  -> Features MFCC ((20, 131)) salvas: data/processed/features\pimenta_mfcc.npy
Metadados atualizados com sucesso em data/metadata.json.
Pré-processamento concluído.

  [OK] Espécie: Sapo-cururu (Rhinella marina)
       Espectrograma gerado: data/processed/spectrograms\cururu.png
       Features salvas: data/processed/features\cururu_mfcc.npy - Shape: (20, 131)
  [OK] Espécie: Perereca-verde (Aplastodiscus argyreornatus)
       Espectrograma gerado: data/processed/spectrograms\perereca.png
       Features salvas: data/processed/features\perereca_mfcc.npy - Shape: (20, 131)
  [OK] Espécie: Rã-pimenta (Leptodactylus labyrinthicus)
       Espectrograma gerado: data/processed/spectrograms\pimenta.png
       Features salvas: data/processed/features\pimenta_mfcc.npy - Shape: (20, 131)

=== TODOS OS TESTES PASSARAM COM SUCESSO! ===
As Fases 1 (Coleta e Organização) e 2 (Pré-processamento) foram validadas.
```

---

## 🏃 Como Rodar o Pipeline no Futuro

Caso precise re-executar os testes ou rodar o processador em novos áudios reais:

1. **Rodar a suíte completa de teste:**
   ```bash
   python src/soundid/test_pipeline.py
   ```

2. **Gerar novos áudios sintéticos:**
   ```bash
   python src/soundid/generate_synthetic.py
   ```

3. **Pré-processar áudios existentes:**
   * Coloque os áudios na pasta `data/raw/`.
   * Registre o arquivo e espécie em `data/metadata.json`.
   * Execute:
     ```bash
     python src/soundid/preprocess.py
     ```
