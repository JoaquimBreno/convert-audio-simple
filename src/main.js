const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs');
const i18n = require('./locales');

// Configurar o caminho do FFmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

let mainWindow;
let currentLanguage = i18n.getCurrentLocale();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    icon: path.join(__dirname, 'assets/icons/app-icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      // Configurações adicionais para acesso a arquivos no macOS
      sandbox: false,
      // Permitir que a aplicação acesse arquivos do sistema
      enableWebFilesystem: true
    },
    // Melhorar a estética da janela
    backgroundColor: '#f5f8fa',
    titleBarStyle: 'hiddenInset',
    show: false, // Não mostrar até que esteja pronto
    minWidth: 600,
    minHeight: 500
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  // Mostrar janela quando estiver pronta para evitar flash branco
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  
  // Abrir DevTools apenas em ambiente de desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  
  // Criar o menu da aplicação
  createAppMenu();
}

// Função para criar o menu da aplicação com suporte a idiomas
function createAppMenu() {
  const t = (key) => i18n.translate(key);
  
  const template = [
    {
      label: t('menu.file.title'),
      submenu: [
        {
          label: t('menu.file.open'),
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            if (mainWindow) {
              const result = await dialog.showOpenDialog(mainWindow, {
                properties: ['openFile', 'multiSelections'],
                filters: [
                  { name: t('file_type'), extensions: ['wav', 'mp3', 'ogg', 'flac', 'aac', 'm4a'] }
                ]
              });
              
              if (!result.canceled && result.filePaths.length > 0) {
                mainWindow.webContents.send('files-selected', result.filePaths);
              }
            }
          }
        },
        {
          label: t('menu.file.output_dir'),
          accelerator: 'CmdOrCtrl+D',
          click: async () => {
            if (mainWindow) {
              const result = await dialog.showOpenDialog(mainWindow, {
                properties: ['openDirectory']
              });
              
              if (!result.canceled && result.filePaths.length > 0) {
                mainWindow.webContents.send('output-dir-selected', result.filePaths[0]);
              }
            }
          }
        },
        { type: 'separator' },
        {
          label: t('menu.file.exit'),
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit()
        }
      ]
    },
    {
      label: t('menu.edit.title'),
      submenu: [
        {
          label: t('menu.edit.clear_queue'),
          accelerator: 'CmdOrCtrl+Shift+C',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('clear-queue');
            }
          }
        },
        { type: 'separator' },
        {
          label: t('menu.edit.preferences'),
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('open-preferences');
            }
          }
        }
      ]
    },
    {
      label: t('menu.view.title'),
      submenu: [
        {
          label: t('menu.view.toggle_dark'),
          accelerator: 'CmdOrCtrl+Shift+D',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('toggle-dark-mode');
            }
          }
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: t('menu.help.title'),
      submenu: [
        {
          label: t('menu.help.website'),
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://audioconverter.example.com');
          }
        },
        {
          label: t('menu.help.github'),
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://github.com/example/audio-converter');
          }
        },
        { type: 'separator' },
        {
          label: t('menu.help.about'),
          click: () => {
            dialog.showMessageBox(mainWindow, {
              title: t('menu.help.about'),
              message: `${t('app_title')} - v${app.getVersion()}`,
              detail: 'Copyright © 2023\nPowered by Electron & FFmpeg',
              buttons: ['OK'],
              icon: path.join(__dirname, 'assets/icons/app-icon.png')
            });
          }
        }
      ]
    }
  ];
  
  // Adicionar menu de idiomas
  template.push({
    label: 'Language',
    submenu: i18n.supportedLocales.map(locale => {
      return {
        label: i18n.translate(`languages.${locale}`),
        type: 'radio',
        checked: currentLanguage === locale,
        click: () => changeLanguage(locale)
      };
    })
  });
  
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Mudar o idioma da aplicação
function changeLanguage(locale) {
  if (i18n.supportedLocales.includes(locale) && currentLanguage !== locale) {
    currentLanguage = locale;
    
    // Salvar preferência de idioma do usuário
    i18n.saveUserLanguagePreference(locale);
    
    // Atualizar o menu
    createAppMenu();
    
    // Notificar a interface do usuário
    if (mainWindow) {
      mainWindow.webContents.send('language-changed', locale);
    }
    
    return locale;
  }
  
  return currentLanguage;
}

// Configurações específicas para o macOS
if (process.platform === 'darwin') {
  app.whenReady().then(() => {
    try {
      // Registrar a aplicação como handler para o protocolo de arquivo
      app.setAsDefaultProtocolClient('file');
      
      // Em versões mais recentes do macOS, definir a política de segurança
      if (app.setSecurityAccessPolicyEnabled) {
        // Permitir acesso a arquivos selecionados pelo usuário
        app.setSecurityAccessPolicyEnabled(false);
      }
      
      // Ativar recursos específicos do macOS
      app.on('open-file', (event, path) => {
        event.preventDefault();
        if (mainWindow) {
          // Informar à janela principal que um arquivo foi aberto
          mainWindow.webContents.send('file-opened', path);
        }
      });
    } catch (error) {
      console.error('Erro ao configurar recursos específicos do macOS:', error);
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Manipular a seleção de arquivos
ipcMain.handle('select-files', async () => {
  const t = (key) => i18n.translate(key);
  
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: t('file_type'), extensions: ['wav', 'mp3', 'ogg', 'flac', 'aac', 'm4a'] }
    ]
  });
  
  if (result.canceled) {
    return [];
  }
  
  return result.filePaths;
});

// Manipular a seleção do diretório de saída
ipcMain.handle('select-output-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  
  if (result.canceled) {
    return '';
  }
  
  return result.filePaths[0];
});

// Manipular mensagens de log do renderer
ipcMain.handle('log-message', async (event, message) => {
  console.log('Renderer log:', message);
  return true;
});

// Manipular arquivos arrastados
ipcMain.handle('handle-dropped-files', async (event, fileInfos) => {
  console.log('Arquivos arrastados recebidos:', fileInfos.map(f => f.name));
  
  try {
    // Se estamos no macOS, usamos a API de permissões
    if (process.platform === 'darwin') {
      // No macOS Catalina (10.15) ou superior, precisamos pedir permissão para acessar arquivos
      const extensions = ['wav', 'mp3', 'ogg', 'flac', 'aac', 'm4a'];
      const audioFiles = fileInfos.filter(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        return extensions.includes(ext);
      });
      
      if (audioFiles.length === 0) {
        console.warn('Nenhum arquivo de áudio válido encontrado');
        return [];
      }
      
      // Informar ao usuário que precisaremos de permissão
      const { response } = await dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: i18n.translate('notifications.permission_needed'),
        message: i18n.translate('notifications.permission_needed'),
        detail: i18n.translate('notifications.permission_detail'),
        buttons: ['Continuar', 'Cancelar'],
        defaultId: 0,
        cancelId: 1
      });
      
      if (response === 1) {
        console.log('Usuário cancelou a operação');
        return [];
      }
      
      // Para macOS, a melhor opção é usar o diálogo de arquivo que solicita permissão automaticamente
      // Isso é mais confiável do que tentar usar a API de permissões diretamente
      const result = await dialog.showOpenDialog(mainWindow, {
        title: 'Selecione os arquivos para permitir acesso',
        buttonLabel: 'Permitir acesso',
        properties: ['openFile', 'multiSelections'],
        filters: [
          { name: 'Arquivos de Áudio', extensions: extensions }
        ],
        message: 'Selecione os arquivos para os quais deseja conceder acesso'
      });
      
      if (result.canceled) {
        console.log('Seleção de arquivos cancelada');
        return [];
      }
      
      // O macOS agora concederá permissão para estes arquivos específicos
      console.log('Permissão concedida para arquivos:', result.filePaths);
      return result.filePaths;
    } else {
      // Para Windows e Linux, normalmente conseguimos obter o path diretamente
      const validPaths = fileInfos
        .filter(file => file.path && typeof file.path === 'string')
        .map(file => file.path);
      
      console.log('Caminhos válidos obtidos diretamente:', validPaths);
      return validPaths;
    }
  } catch (error) {
    console.error('Erro ao processar arquivos arrastados:', error);
    return [];
  }
});

// Manipuladores para localização
ipcMain.handle('change-language', async (event, language) => {
  const newLang = changeLanguage(language);
  return newLang;
});

ipcMain.handle('get-current-language', async () => {
  return currentLanguage;
});

ipcMain.handle('get-supported-languages', async () => {
  return i18n.supportedLocales;
});

// Fornecer todas as traduções para o frontend
ipcMain.handle('get-translations', async () => {
  return i18n.getTranslations();
});

// Converter arquivo de áudio
ipcMain.handle('convert-audio', async (event, { inputPath, outputPath, format }) => {
  console.log('Iniciando conversão:', { inputPath, outputPath, format });
  
  return new Promise((resolve, reject) => {
    // Validar parâmetros de entrada
    if (!inputPath || !outputPath || !format) {
      console.error('Parâmetros inválidos:', { inputPath, outputPath, format });
      return reject({
        success: false,
        error: i18n.translate('notifications.conversion_error')
      });
    }

    // Verificar se o arquivo de entrada existe
    try {
      const fileExists = fs.existsSync(inputPath);
      if (!fileExists) {
        console.error('Arquivo de entrada não encontrado:', inputPath);
        return reject({
          success: false,
          error: 'Arquivo de entrada não encontrado.'
        });
      }
    } catch (error) {
      console.error('Erro ao verificar arquivo:', error);
      return reject({
        success: false,
        error: `Erro ao verificar arquivo: ${error.message}`
      });
    }
    
    // Verificar se o diretório de saída existe
    try {
      const dirExists = fs.existsSync(outputPath);
      if (!dirExists) {
        console.error('Diretório de saída não encontrado:', outputPath);
        return reject({
          success: false,
          error: 'Diretório de saída não encontrado.'
        });
      }
    } catch (error) {
      console.error('Erro ao verificar diretório:', error);
      return reject({
        success: false,
        error: `Erro ao verificar diretório: ${error.message}`
      });
    }

    const outputFilePath = path.join(
      outputPath, 
      `${path.basename(inputPath, path.extname(inputPath))}.${format}`
    );

    console.log('Arquivo de saída:', outputFilePath);

    let command = ffmpeg(inputPath).output(outputFilePath);
    
    // Configurar qualidade baseada no formato
    switch (format) {
      case 'mp3':
        command = command.audioCodec('libmp3lame').audioBitrate('320k');
        break;
      case 'ogg':
        command = command.audioCodec('libvorbis').audioBitrate('256k');
        break;
      case 'flac':
        command = command.audioCodec('flac');
        break;
      case 'wav':
        command = command.audioCodec('pcm_s16le');
        break;
      case 'aac':
        command = command.audioCodec('aac').audioBitrate('256k');
        break;
      case 'm4a':
        command = command.audioCodec('aac').audioBitrate('256k').format('ipod');
        break;
    }
    
    command
      .on('end', () => {
        resolve({
          success: true,
          outputPath: outputFilePath
        });
      })
      .on('error', (err) => {
        reject({
          success: false,
          error: err.message
        });
      })
      .run();
  });
}); 