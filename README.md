# Audio Converter - Multi-platform Desktop App for MP3, WAV, OGG, FLAC, AAC, M4A

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)
![FFmpeg](https://img.shields.io/badge/powered%20by-FFmpeg-green.svg)
![Electron](https://img.shields.io/badge/built%20with-Electron-47848F.svg)

> **Convert audio files between formats easily with this free, open-source desktop application. Perfect for music producers, podcasters, and media enthusiasts.**

*[English](#english) | [Español](#español) | [Português](#português) | [Deutsch](#deutsch)*

<div align="center">
  <img src="src/assets/icons/app-icon.png" alt="Audio Converter Logo" width="128" height="128">
</div>

![Screenshot](src/assets/screenshot.png)

## Key Features

- ✅ **User-friendly** drag and drop interface
- ✅ **Convert between formats**: MP3, WAV, OGG, FLAC, AAC, M4A
- ✅ **Batch processing** - convert multiple files at once
- ✅ **Cross-platform** - works on Windows, macOS, and Linux
- ✅ **Completely free** and open-source
- ✅ **No watermarks** or time limits

---

<a name="english"></a>
## English

A desktop application to convert audio files between different formats (MP3, WAV, OGG, FLAC, AAC, M4A) using FFmpeg and Electron. Works on Windows, macOS, and Linux.

### Features

- Intuitive graphical interface with drag-and-drop support
- Conversion between multiple audio formats:
  - MP3 (using libmp3lame codec)
  - WAV (PCM)
  - OGG Vorbis
  - FLAC
  - AAC
  - M4A (AAC in MP4 container)
- Batch processing of multiple files
- Custom output directory selection
- Compatible with Windows, macOS, and Linux

### Application Icon

The application uses a professional audio wave icon for a clean, modern look. The icon is displayed in the taskbar, application window, and file associations on all supported platforms.

If you want to customize the icon:

1. Replace the icon files in the `src/assets/icons` directory:
   - `app-icon.png` - Main application icon (512x512 pixels recommended)
   - `icon.icns` - macOS icon
   - `icon.ico` - Windows icon

2. Rebuild the application using:
   ```bash
   npm run dist
   ```

### Installation

#### Method 1: Download compiled version

1. Go to the "Releases" section of the repository
2. Download the compiled version for your operating system:
   - Windows: `.exe` (installer) or `.zip` (portable)
   - macOS: `.dmg`
   - Linux: `.AppImage` or `.deb`
3. Install or run the application according to the file format

#### Method 2: Run from source code

##### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (usually installed with Node.js)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

##### Steps

1. Clone the repository or download the source code:
   ```bash
   git clone [repository-url]
   cd electron-audio-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

### How to Use

1. Open the application
2. Drag audio files to the indicated area or click "Select Files"
3. Choose the directory where the converted files will be saved by clicking "Choose"
4. Select the desired output format from the dropdown menu
5. Click "Convert" to start the process
6. The progress bar will show the conversion status

### Building the Application for Different Operating Systems

#### Initial Configuration

The project uses [electron-builder](https://www.electron.build/) to create distributable applications for different platforms.

#### Building for Windows

In the terminal, run:

```bash
npm run dist:win
```

This will create:
- An `.exe` installer in the `dist` folder
- A portable `.zip` with all necessary files

**Note for non-Windows users:** Building for Windows from macOS or Linux requires using Wine and some additional configurations. See the [electron-builder documentation](https://www.electron.build/multi-platform-build) for more details.

#### Building for macOS

In the terminal, run:

```bash
npm run dist:mac
```

This will create a `.dmg` file in the `dist` folder.

**Note:** To build for macOS, you need to be on a macOS system.

#### Building for Linux

In the terminal, run:

```bash
npm run dist:linux
```

This will create:
- A portable `.AppImage` file
- A `.deb` package for Debian/Ubuntu-based distributions

#### Building for All Platforms

If you want to build for all platforms supported by your system:

```bash
npm run dist
```

### Technical Details

- **Electron:** Framework used to create desktop applications with web technologies
- **FFmpeg:** Software used for audio/video manipulation
  - We use the `ffmpeg-static` package to provide pre-compiled FFmpeg binaries
  - The `fluent-ffmpeg` package is used as a Node.js wrapper for FFmpeg
- **electron-builder:** Tool that packages Electron applications for distribution

### Troubleshooting

#### Common Errors

- **"Could not select output directory"**: Check if the application has permissions to access the file system
- **"Conversion failed"**: Check if the input file is a valid audio file

#### Solutions for Specific Problems

##### Codec not found error

The application includes a full version of FFmpeg with all necessary codecs. If you encounter a codec-related error, it may be due to:

1. A corrupted file
2. An unsupported file format
3. An issue with the application installation

In this case, try reinstalling the application or use a more recent version.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<a name="español"></a>
## Español

Una aplicación de escritorio para convertir archivos de audio entre diferentes formatos (MP3, WAV, OGG, FLAC, AAC, M4A) utilizando FFmpeg y Electron. Funciona en Windows, macOS y Linux.

### Características

- Interfaz gráfica intuitiva con soporte para arrastrar y soltar
- Conversión entre múltiples formatos de audio:
  - MP3 (usando codec libmp3lame)
  - WAV (PCM)
  - OGG Vorbis
  - FLAC
  - AAC
  - M4A (AAC en contenedor MP4)
- Procesamiento por lotes de múltiples archivos
- Selección de directorio de salida personalizado
- Compatible con Windows, macOS y Linux

### Instalación

#### Método 1: Descargar versión compilada

1. Ve a la sección "Releases" del repositorio
2. Descarga la versión compilada para tu sistema operativo:
   - Windows: `.exe` (instalador) o `.zip` (portátil)
   - macOS: `.dmg`
   - Linux: `.AppImage` o `.deb`
3. Instala o ejecuta la aplicación según el formato del archivo

#### Método 2: Ejecutar desde el código fuente

##### Requisitos previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (normalmente instalado con Node.js)
- [Git](https://git-scm.com/) (opcional, para clonar el repositorio)

##### Pasos

1. Clona el repositorio o descarga el código fuente:
   ```bash
   git clone [url-del-repositorio]
   cd electron-audio-converter
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta la aplicación:
   ```bash
   npm start
   ```

### Cómo usar

1. Abre la aplicación
2. Arrastra archivos de audio al área indicada o haz clic en "Seleccionar Archivos"
3. Elige el directorio donde se guardarán los archivos convertidos haciendo clic en "Elegir"
4. Selecciona el formato de salida deseado en el menú desplegable
5. Haz clic en "Convertir" para iniciar el proceso
6. La barra de progreso mostrará el estado de la conversión

### Compilando la aplicación para diferentes sistemas operativos

#### Configuración inicial

El proyecto utiliza [electron-builder](https://www.electron.build/) para crear aplicaciones distribuibles para diferentes plataformas.

#### Compilando para Windows

En la terminal, ejecuta:

```bash
npm run dist:win
```

Esto creará:
- Un instalador `.exe` en la carpeta `dist`
- Una versión portátil `.zip` con todos los archivos necesarios

**Nota para usuarios que no usan Windows:** Compilar para Windows desde macOS o Linux requiere usar Wine y algunas configuraciones adicionales. Consulta la [documentación de electron-builder](https://www.electron.build/multi-platform-build) para más detalles.

#### Compilando para macOS

En la terminal, ejecuta:

```bash
npm run dist:mac
```

Esto creará un archivo `.dmg` en la carpeta `dist`.

**Nota:** Para compilar para macOS, necesitas estar en un sistema macOS.

#### Compilando para Linux

En la terminal, ejecuta:

```bash
npm run dist:linux
```

Esto creará:
- Un archivo `.AppImage` portátil
- Un paquete `.deb` para distribuciones basadas en Debian/Ubuntu

#### Compilando para todas las plataformas

Si deseas compilar para todas las plataformas compatibles con tu sistema:

```bash
npm run dist
```

### Detalles técnicos

- **Electron:** Framework utilizado para crear aplicaciones de escritorio con tecnologías web
- **FFmpeg:** Software utilizado para manipulación de audio/vídeo
  - Utilizamos el paquete `ffmpeg-static` para proporcionar binarios precompilados de FFmpeg
  - El paquete `fluent-ffmpeg` se utiliza como wrapper de Node.js para FFmpeg
- **electron-builder:** Herramienta que empaqueta aplicaciones Electron para su distribución

### Solución de problemas

#### Errores comunes

- **"No se pudo seleccionar el directorio de salida"**: Verifica si la aplicación tiene permisos para acceder al sistema de archivos
- **"La conversión falló"**: Verifica si el archivo de entrada es un archivo de audio válido

#### Soluciones para problemas específicos

##### Error de codec no encontrado

La aplicación incluye una versión completa de FFmpeg con todos los codecs necesarios. Si encuentras un error relacionado con codecs, puede deberse a:

1. Un archivo corrupto
2. Un formato de archivo no soportado
3. Un problema con la instalación de la aplicación

En este caso, intenta reinstalar la aplicación o usa una versión más reciente.

### Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para obtener más detalles.

---

<a name="português"></a>
## Português

Um aplicativo para converter arquivos de áudio entre diferentes formatos (MP3, WAV, OGG, FLAC, AAC, M4A) usando FFmpeg e Electron. Funciona em Windows, macOS e Linux.

### Recursos

- Interface gráfica intuitiva com suporte para arrastar e soltar arquivos
- Conversão entre múltiplos formatos de áudio:
  - MP3 (usando codec libmp3lame)
  - WAV (PCM)
  - OGG Vorbis
  - FLAC
  - AAC
  - M4A (AAC em contêiner MP4)
- Processamento em lote de múltiplos arquivos
- Seleção de diretório de saída personalizado
- Compatível com Windows, macOS e Linux

### Instalação

#### Método 1: Baixar a versão compilada

1. Acesse a seção "Releases" do repositório
2. Baixe a versão compilada para seu sistema operacional:
   - Windows: `.exe` (instalador) ou `.zip` (portátil)
   - macOS: `.dmg`
   - Linux: `.AppImage` ou `.deb`
3. Instale ou execute o aplicativo conforme o formato do arquivo

#### Método 2: Executar a partir do código fonte

##### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (normalmente instalado com o Node.js)
- [Git](https://git-scm.com/) (opcional, para clonar o repositório)

##### Passos

1. Clone o repositório ou baixe o código fonte:
   ```bash
   git clone [url-do-repositorio]
   cd electron-audio-converter
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o aplicativo:
   ```bash
   npm start
   ```

### Como usar

1. Abra o aplicativo
2. Arraste arquivos de áudio para a área indicada ou clique em "Selecionar Arquivos"
3. Escolha o diretório onde os arquivos convertidos serão salvos clicando em "Escolher"
4. Selecione o formato de saída desejado no menu suspenso
5. Clique em "Converter" para iniciar o processo
6. A barra de progresso mostrará o status da conversão

### Compilando o aplicativo para diferentes sistemas operacionais

#### Configuração inicial

O projeto usa [electron-builder](https://www.electron.build/) para criar aplicativos distribuíveis para diferentes plataformas.

#### Compilando para Windows

No terminal, execute:

```bash
npm run dist:win
```

Isso criará:
- Um instalador `.exe` na pasta `dist`
- Uma versão portátil `.zip` com todos os arquivos necessários

**Observação para usuários não-Windows:** Compilar para Windows a partir de macOS ou Linux requer o uso de Wine e algumas configurações adicionais. Consulte a [documentação do electron-builder](https://www.electron.build/multi-platform-build) para mais detalhes.

#### Compilando para macOS

No terminal, execute:

```bash
npm run dist:mac
```

Isso criará um arquivo `.dmg` na pasta `dist`.

**Observação:** Para compilar para macOS, você precisa estar em um sistema macOS.

#### Compilando para Linux

No terminal, execute:

```bash
npm run dist:linux
```

Isso criará:
- Um arquivo `.AppImage` portátil
- Um pacote `.deb` para distribuições baseadas em Debian/Ubuntu

#### Compilando para todas as plataformas

Se você deseja compilar para todas as plataformas suportadas pelo seu sistema:

```bash
npm run dist
```

### Detalhes técnicos

- **Electron:** Framework usado para criar aplicativos de desktop com tecnologias web
- **FFmpeg:** Software usado para manipulação de áudio/vídeo
  - Utilizamos o pacote `ffmpeg-static` para fornecer binários pré-compilados do FFmpeg
  - O pacote `fluent-ffmpeg` é usado como wrapper de Node.js para o FFmpeg
- **electron-builder:** Ferramenta que empacota aplicativos Electron para distribuição

### Resolução de problemas

#### Erros comuns

- **"Não foi possível selecionar o diretório de saída"**: Verifique se o aplicativo tem permissões para acessar o sistema de arquivos
- **"A conversão falhou"**: Verifique se o arquivo de entrada é um arquivo de áudio válido

#### Soluções para problemas específicos

##### Erro de codec não encontrado

O aplicativo inclui uma versão completa do FFmpeg com todos os codecs necessários. Se você encontrar um erro relacionado a codecs, pode ser devido a:

1. Um arquivo corrompido
2. Um formato de arquivo não suportado
3. Um problema com a instalação do aplicativo

Neste caso, tente reinstalar o aplicativo ou use uma versão mais recente.

### Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---

<a name="deutsch"></a>
## Deutsch

Eine Desktop-Anwendung zum Konvertieren von Audiodateien zwischen verschiedenen Formaten (MP3, WAV, OGG, FLAC, AAC, M4A) mit FFmpeg und Electron. Funktioniert unter Windows, macOS und Linux.

### Funktionen

- Intuitive grafische Benutzeroberfläche mit Drag-and-Drop-Unterstützung
- Konvertierung zwischen mehreren Audioformaten:
  - MP3 (mit libmp3lame-Codec)
  - WAV (PCM)
  - OGG Vorbis
  - FLAC
  - AAC
  - M4A (AAC im MP4-Container)
- Stapelverarbeitung mehrerer Dateien
- Benutzerdefinierte Auswahl des Ausgabeverzeichnisses
- Kompatibel mit Windows, macOS und Linux

### Installation

#### Methode 1: Kompilierte Version herunterladen

1. Gehen Sie zum Bereich "Releases" des Repositories
2. Laden Sie die kompilierte Version für Ihr Betriebssystem herunter:
   - Windows: `.exe` (Installer) oder `.zip` (portabel)
   - macOS: `.dmg`
   - Linux: `.AppImage` oder `.deb`
3. Installieren oder führen Sie die Anwendung entsprechend dem Dateiformat aus

#### Methode 2: Aus dem Quellcode ausführen

##### Voraussetzungen

- [Node.js](https://nodejs.org/) (Version 14 oder höher)
- [npm](https://www.npmjs.com/) (normalerweise mit Node.js installiert)
- [Git](https://git-scm.com/) (optional, zum Klonen des Repositories)

##### Schritte

1. Klonen Sie das Repository oder laden Sie den Quellcode herunter:
   ```bash
   git clone [repository-url]
   cd electron-audio-converter
   ```

2. Installieren Sie die Abhängigkeiten:
   ```bash
   npm install
   ```

3. Starten Sie die Anwendung:
   ```bash
   npm start
   ```

### Verwendung

1. Öffnen Sie die Anwendung
2. Ziehen Sie Audiodateien in den angegebenen Bereich oder klicken Sie auf "Dateien auswählen"
3. Wählen Sie das Verzeichnis, in dem die konvertierten Dateien gespeichert werden sollen, durch Klicken auf "Auswählen"
4. Wählen Sie das gewünschte Ausgabeformat aus dem Dropdown-Menü
5. Klicken Sie auf "Konvertieren", um den Prozess zu starten
6. Der Fortschrittsbalken zeigt den Status der Konvertierung an

### Kompilieren der Anwendung für verschiedene Betriebssysteme

#### Erste Konfiguration

Das Projekt verwendet [electron-builder](https://www.electron.build/), um verteilbare Anwendungen für verschiedene Plattformen zu erstellen.

#### Kompilieren für Windows

Im Terminal ausführen:

```bash
npm run dist:win
```

Dies erstellt:
- Einen `.exe`-Installer im `dist`-Ordner
- Eine portable `.zip`-Version mit allen erforderlichen Dateien

**Hinweis für Nicht-Windows-Benutzer:** Das Kompilieren für Windows von macOS oder Linux aus erfordert die Verwendung von Wine und einige zusätzliche Konfigurationen. Weitere Details finden Sie in der [electron-builder-Dokumentation](https://www.electron.build/multi-platform-build).

#### Kompilieren für macOS

Im Terminal ausführen:

```bash
npm run dist:mac
```

Dies erstellt eine `.dmg`-Datei im `dist`-Ordner.

**Hinweis:** Um für macOS zu kompilieren, müssen Sie sich auf einem macOS-System befinden.

#### Kompilieren für Linux

Im Terminal ausführen:

```bash
npm run dist:linux
```

Dies erstellt:
- Eine portable `.AppImage`-Datei
- Ein `.deb`-Paket für Debian/Ubuntu-basierte Distributionen

#### Kompilieren für alle Plattformen

Wenn Sie für alle von Ihrem System unterstützten Plattformen kompilieren möchten:

```bash
npm run dist
```

### Technische Details

- **Electron:** Framework zur Erstellung von Desktop-Anwendungen mit Webtechnologien
- **FFmpeg:** Software zur Audio-/Videomanipulation
  - Wir verwenden das `ffmpeg-static`-Paket, um vorkompilierte FFmpeg-Binärdateien bereitzustellen
  - Das `fluent-ffmpeg`-Paket wird als Node.js-Wrapper für FFmpeg verwendet
- **electron-builder:** Tool, das Electron-Anwendungen für die Verteilung verpackt

### Fehlerbehebung

#### Häufige Fehler

- **"Ausgabeverzeichnis konnte nicht ausgewählt werden"**: Überprüfen Sie, ob die Anwendung Berechtigungen für den Zugriff auf das Dateisystem hat
- **"Konvertierung fehlgeschlagen"**: Überprüfen Sie, ob die Eingabedatei eine gültige Audiodatei ist

#### Lösungen für spezifische Probleme

##### Codec nicht gefunden Fehler

Die Anwendung enthält eine vollständige Version von FFmpeg mit allen notwendigen Codecs. Wenn Sie einen Codec-bezogenen Fehler erhalten, kann dies auf Folgendes zurückzuführen sein:

1. Eine beschädigte Datei
2. Ein nicht unterstütztes Dateiformat
3. Ein Problem mit der Anwendungsinstallation

Versuchen Sie in diesem Fall, die Anwendung neu zu installieren oder eine neuere Version zu verwenden.

### Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die LICENSE-Datei für Details.

---

## Keywords / Tags

audio converter, mp3 converter, wav converter, ogg converter, flac converter, aac converter, m4a converter, audio format converter, music file converter, audio conversion tool, free audio converter, open source audio converter, cross-platform audio converter, batch audio converter, electron app, ffmpeg converter

## Related Projects

- [FFmpeg](https://ffmpeg.org/) - The powerful multimedia framework used by this converter
- [Electron](https://www.electronjs.org/) - Framework for building cross-platform desktop apps
- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) - Node.js wrapper for FFmpeg
- [electron-builder](https://www.electron.build/) - Tool for packaging Electron applications 