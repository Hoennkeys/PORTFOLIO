import os
import sys

# Desabilitar o JIT do Numba para evitar erros do LLVM (Symbol not found: sincosf) no MSYS2 Windows
os.environ['NUMBA_DISABLE_JIT'] = '1'
os.environ['NUMBA_DISABLE_INTEL_SVML'] = '1'

import json
import numpy as np

# Adicionar a pasta src ao sys.path para permitir importações relativas
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from soundid import generate_synthetic
from soundid import preprocess

def test_pipeline():
    print("=== INICIANDO TESTE DO PIPELINE SOUNDID ===\n")
    
    # 1. Executar Geração Sintética
    print("Passo 1: Executando geração de áudio sintético...")
    generate_synthetic.main()
    print("Geração sintética concluída.\n")
    
    # Validações Passo 1
    raw_files = ["cururu.wav", "perereca.wav", "pimenta.wav"]
    for file in raw_files:
        path = os.path.join("data", "raw", file)
        assert os.path.exists(path), f"Erro: {path} não foi criado!"
        assert os.path.getsize(path) > 10000, f"Erro: {path} está vazio ou muito pequeno!"
        print(f"  [OK] Arquivo gerado: {path} ({os.path.getsize(path)} bytes)")
        
    assert os.path.exists("data/metadata.json"), "Erro: data/metadata.json não foi criado!"
    with open("data/metadata.json", "r", encoding="utf-8") as f:
        meta = json.load(f)
    assert len(meta) == 3, "Erro: data/metadata.json deve ter 3 registros de espécies!"
    print("  [OK] Arquivos brutos e metadados iniciais validados.\n")
    
    # 2. Executar Pré-processamento
    print("Passo 2: Executando pré-processamento de áudio...")
    preprocess.main()
    print("Pré-processamento concluído.\n")
    
    # Validações Passo 2
    with open("data/metadata.json", "r", encoding="utf-8") as f:
        meta_updated = json.load(f)
        
    for item in meta_updated:
        # Validar novos campos de metadados
        assert "processed_spectrogram" in item, "Erro: processamento não adicionou caminho do espectrograma nos metadados!"
        assert "processed_features" in item, "Erro: processamento não adicionou caminho das features nos metadados!"
        assert "mfcc_shape" in item, "Erro: processamento não adicionou formato do MFCC nos metadados!"
        
        spec_path = item["processed_spectrogram"]
        feat_path = item["processed_features"]
        mfcc_shape = item["mfcc_shape"]
        
        # Verificar arquivos físicos
        assert os.path.exists(spec_path), f"Erro: Espectrograma não encontrado em {spec_path}!"
        assert os.path.exists(feat_path), f"Erro: Feature npy não encontrada em {feat_path}!"
        
        # Validar dados das features
        mfcc_data = np.load(feat_path)
        assert mfcc_data.shape == tuple(mfcc_shape), f"Erro: Shape do arquivo {feat_path} ({mfcc_data.shape}) diverge do metadado ({mfcc_shape})!"
        assert mfcc_data.shape[0] == 20, f"Erro: Número de coeficientes MFCC deve ser 20, mas obteve {mfcc_data.shape[0]}!"
        
        print(f"  [OK] Espécie: {item['common_name']} ({item['species']})")
        print(f"       Espectrograma gerado: {spec_path}")
        print(f"       Features salvas: {feat_path} - Shape: {mfcc_data.shape}")
        
    print("\n=== TODOS OS TESTES PASSARAM COM SUCESSO! ===")
    print("As Fases 1 (Coleta e Organização) e 2 (Pré-processamento) foram validadas.")

if __name__ == "__main__":
    try:
        test_pipeline()
        sys.exit(0)
    except AssertionError as e:
        print(f"\n[FALHA NO TESTE] AssertionError: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\n[FALHA NO TESTE] Erro inesperado: {e}")
        sys.exit(1)
