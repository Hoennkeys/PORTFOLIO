import os
import json
import numpy as np
import scipy.io.wavfile as wav
import scipy.signal as signal
import scipy.fft as fft
import matplotlib
# Usar backend não interativo para evitar problemas de GUI
matplotlib.use('Agg')
import matplotlib.pyplot as plt

# Parâmetros de pré-processamento
LOW_CUT = 150.0   # Hz - Limita ruídos de vento e vibração de baixa frequência
HIGH_CUT = 4500.0 # Hz - Limita ruídos de altíssima frequência (ex: insetos)
N_MELS = 128
N_MFCC = 20
N_FFT = 1024
HOP_LENGTH = 512

def butter_bandpass(lowcut, highcut, fs, order=5):
    nyq = 0.5 * fs
    low = lowcut / nyq
    high = highcut / nyq
    b, a = signal.butter(order, [low, high], btype='band')
    return b, a

def apply_bandpass_filter(data, lowcut, highcut, fs, order=5):
    b, a = butter_bandpass(lowcut, highcut, fs, order=order)
    y = signal.filtfilt(b, a, data)
    return y

def get_mel_filterbank(sr, n_fft, n_mels, fmin, fmax):
    """
    Gera a matriz do banco de filtros de Mel.
    Mapeia bins de frequência da FFT para a escala Mel.
    """
    # Converter frequências Hz para Mel
    mel_min = 2595.0 * np.log10(1.0 + fmin / 700.0)
    mel_max = 2595.0 * np.log10(1.0 + fmax / 700.0)
    
    # Pontos igualmente espaçados na escala Mel
    mel_points = np.linspace(mel_min, mel_max, n_mels + 2)
    
    # Converter de volta para Hz
    hz_points = 700.0 * (10.0 ** (mel_points / 2595.0) - 1.0)
    
    # Converter Hz para índices dos bins da FFT
    bin_points = np.floor((n_fft + 1) * hz_points / sr).astype(int)
    
    filters = np.zeros((n_mels, int(n_fft // 2 + 1)))
    for i in range(1, n_mels + 1):
        left = bin_points[i - 1]
        center = bin_points[i]
        right = bin_points[i + 1]
        
        if center > left:
            filters[i - 1, left:center] = (np.arange(left, center) - left) / (center - left)
        if right > center:
            filters[i - 1, center:right] = (right - np.arange(center, right)) / (right - center)
            
    return filters, hz_points[1:-1]

def preprocess_audio(filepath, output_spec_dir, output_feat_dir):
    """
    Carrega o áudio, aplica filtro passa-banda, normaliza,
    calcula espectrograma de Mel e extrai coeficientes MFCC usando NumPy e SciPy.
    """
    basename = os.path.splitext(os.path.basename(filepath))[0]
    
    # 1. Carregar áudio usando scipy.io.wavfile (rápido e sem dependência LLVM/librosa)
    sr, y = wav.read(filepath)
    
    # Converter para mono se for estéreo
    if len(y.shape) > 1:
        y = np.mean(y, axis=1)
        
    # Converter para float32 na faixa [-1.0, 1.0]
    y = y.astype(np.float32)
    if np.max(np.abs(y)) > 0:
        y = y / np.max(np.abs(y))
        
    # 2. Filtrar ruído (Butterworth Bandpass Filter)
    y_filtered = apply_bandpass_filter(y, LOW_CUT, HIGH_CUT, sr)
    
    # Re-normalizar após filtragem
    if np.max(np.abs(y_filtered)) > 0:
        y_filtered = y_filtered / np.max(np.abs(y_filtered))
        
    # 3. Calcular STFT (Short-Time Fourier Transform)
    f, t_coords, Zxx = signal.stft(
        y_filtered, 
        fs=sr, 
        nperseg=N_FFT, 
        noverlap=N_FFT - HOP_LENGTH, 
        boundary='zeros', 
        padded=True
    )
    
    # Espectrograma de Potência
    spectrogram = np.abs(Zxx) ** 2
    
    # 4. Projetar para a escala de Mel
    filters, mel_hz = get_mel_filterbank(sr, N_FFT, N_MELS, LOW_CUT, HIGH_CUT)
    mel_spectrogram = np.dot(filters, spectrogram)
    
    # Converter para escala logarítmica (Decibéis)
    mel_spectrogram_db = 10.0 * np.log10(np.maximum(mel_spectrogram, 1e-10))
    # Referenciar ao valor máximo para manter na faixa de 0 a -X dB
    mel_spectrogram_db = mel_spectrogram_db - np.max(mel_spectrogram_db)
    
    # 5. Salvar Imagem do Espectrograma
    plt.figure(figsize=(10, 4))
    # Usar pcolormesh para renderização rápida e profissional do espectrograma
    plt.pcolormesh(t_coords, np.arange(N_MELS), mel_spectrogram_db, shading='gouraud', cmap='viridis')
    plt.colorbar(label='Potência Relativa (dB)')
    plt.title(f'Espectrograma de Mel - {basename.capitalize()}')
    plt.ylabel('Canais de Filtro Mel')
    plt.xlabel('Tempo (s)')
    plt.tight_layout()
    
    spec_path = os.path.join(output_spec_dir, f"{basename}.png")
    plt.savefig(spec_path, dpi=150)
    plt.close()
    
    # 6. Extrair MFCCs (Mel-Frequency Cepstral Coefficients) via DCT tipo-II
    # Calcula a DCT no eixo das frequências Mel (eixo 0)
    mfcc = fft.dct(mel_spectrogram_db, axis=0, type=2, norm='ortho')[:N_MFCC]
    
    # Salvar MFCCs como arquivo binário numpy (.npy)
    feat_path = os.path.join(output_feat_dir, f"{basename}_mfcc.npy")
    np.save(feat_path, mfcc)
    
    print(f"[{basename}] Pré-processamento (NumPy/SciPy) concluído:")
    print(f"  -> Espectrograma salvo: {spec_path}")
    print(f"  -> Features MFCC ({mfcc.shape}) salvas: {feat_path}")
    
    return spec_path, feat_path, mfcc.shape

def main():
    raw_dir = "data/raw"
    spec_dir = "data/processed/spectrograms"
    feat_dir = "data/processed/features"
    metadata_path = "data/metadata.json"
    
    os.makedirs(spec_dir, exist_ok=True)
    os.makedirs(feat_dir, exist_ok=True)
    
    if not os.path.exists(metadata_path):
        print("Erro: data/metadata.json não encontrado. Execute generate_synthetic.py primeiro.")
        return
        
    with open(metadata_path, "r", encoding="utf-8") as f:
        metadata = json.load(f)
        
    for item in metadata:
        filename = item["filename"]
        filepath = os.path.join(raw_dir, filename)
        
        if os.path.exists(filepath):
            spec_path, feat_path, mfcc_shape = preprocess_audio(filepath, spec_dir, feat_dir)
            item["processed_spectrogram"] = spec_path
            item["processed_features"] = feat_path
            item["mfcc_shape"] = list(mfcc_shape)
        else:
            print(f"Aviso: Arquivo {filepath} não encontrado.")
            
    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    print("Metadados atualizados com sucesso em data/metadata.json.")

if __name__ == "__main__":
    main()
