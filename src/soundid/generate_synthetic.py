import os
import json
import numpy as np
import scipy.io.wavfile as wav

# Parâmetros globais
SAMPLE_RATE = 22050
DURATION = 3.0  # segundos
NUM_SAMPLES = int(SAMPLE_RATE * DURATION)
t = np.linspace(0, DURATION, NUM_SAMPLES, endpoint=False)

def generate_cururu():
    """
    Sapo-Cururu (Rhinella marina)
    Som grave e pulsado. Coaxar de baixa frequência (~250Hz) modulado a ~8Hz.
    """
    carrier = np.sin(2 * np.pi * 250 * t)
    # Onda quadrada suave entre 0 e 1 atuando como modulador de amplitude a 8Hz
    modulator = 0.5 * (1 + np.sin(2 * np.pi * 8 * t))
    # Adicionar variação aleatória de amplitude para naturalidade
    modulator += np.random.normal(0, 0.05, num_samples := len(t))
    modulator = np.clip(modulator, 0, 1)
    
    signal = carrier * modulator
    # Adicionar ruído de fundo (vento/ambiente)
    noise = np.random.normal(0, 0.05, signal.shape)
    signal = signal + noise
    # Normalização
    signal = signal / np.max(np.abs(signal))
    return (signal * 32767).astype(np.int16)

def generate_perereca():
    """
    Perereca-Verde (Aplastodiscus argyreornatus)
    Assobio agudo e curto de alta frequência (~2200Hz) repetido a cada 0.6s.
    """
    carrier = np.sin(2 * np.pi * 2200 * t)
    t_mod = t % 0.6
    # Envelope ativo nos primeiros 0.12 segundos de cada ciclo de 0.6s
    envelope = np.zeros_like(t_mod)
    mask = t_mod < 0.12
    envelope[mask] = np.sin(np.pi * t_mod[mask] / 0.12)  # Meio ciclo de seno
    
    signal = carrier * envelope
    # Adicionar ruído de fundo
    noise = np.random.normal(0, 0.03, signal.shape)
    signal = signal + noise
    # Normalização
    signal = signal / np.max(np.abs(signal))
    return (signal * 32767).astype(np.int16)

def generate_pimenta():
    """
    Rã-Pimenta (Leptodactylus labyrinthicus)
    Assobio ascendente (sweep) de média frequência (de 500Hz a 1200Hz) ocorrendo a cada 1.0s.
    """
    t_mod = t % 1.0
    sweep_duration = 0.3
    
    phase = np.zeros_like(t)
    envelope = np.zeros_like(t)
    
    for i, val in enumerate(t_mod):
        if val < sweep_duration:
            # Frequência instantânea de 500Hz a 1200Hz
            # Fase é a integral de 2 * pi * f(t) dt
            f0, f1 = 500.0, 1200.0
            phase[i] = 2 * np.pi * (f0 * val + 0.5 * (f1 - f0) * (val ** 2) / sweep_duration)
            envelope[i] = np.sin(np.pi * val / sweep_duration)  # Janela de amplitude
        else:
            phase[i] = 0.0
            envelope[i] = 0.0
            
    signal = np.sin(phase) * envelope
    # Adicionar ruído de fundo
    noise = np.random.normal(0, 0.04, signal.shape)
    signal = signal + noise
    # Normalização
    signal = signal / np.max(np.abs(signal))
    return (signal * 32767).astype(np.int16)

def main():
    raw_dir = "data/raw"
    os.makedirs(raw_dir, exist_ok=True)
    
    # Gerar e salvar áudios
    generators = {
        "cururu.wav": (generate_cururu, "Rhinella marina", "Sapo-cururu", "Lagoa da Pampulha, Belo Horizonte - MG"),
        "perereca.wav": (generate_perereca, "Aplastodiscus argyreornatus", "Perereca-verde", "Parque Nacional da Serra dos Órgãos, Teresópolis - RJ"),
        "pimenta.wav": (generate_pimenta, "Leptodactylus labyrinthicus", "Rã-pimenta", "Parque Nacional da Serra da Canastra, São Roque de Minas - MG")
    }
    
    metadata = []
    
    for filename, (gen_func, species, common_name, location) in generators.items():
        filepath = os.path.join(raw_dir, filename)
        audio_data = gen_func()
        wav.write(filepath, SAMPLE_RATE, audio_data)
        print(f"Áudio sintético gerado: {filepath}")
        
        metadata.append({
            "filename": filename,
            "species": species,
            "common_name": common_name,
            "location": location,
            "timestamp": "2026-08-04T12:00:00-03:00",
            "duration_seconds": DURATION,
            "sample_rate": SAMPLE_RATE
        })
        
    # Escrever metadados
    metadata_path = "data/metadata.json"
    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    print(f"Metadados salvos com sucesso em: {metadata_path}")

if __name__ == "__main__":
    main()
