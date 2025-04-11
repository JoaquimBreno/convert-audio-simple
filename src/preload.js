const { contextBridge, ipcRenderer } = require('electron');

// Função auxiliar para chamar IPC com tratamento de erro
const ipcInvoke = async (channel, ...args) => {
  try {
    return await ipcRenderer.invoke(channel, ...args);
  } catch (error) {
    console.error(`Erro ao chamar ${channel}:`, error);
    throw error;
  }
};

// Configurar listeners para eventos
const setupListeners = (callback) => {
  ipcRenderer.on('file-opened', (event, filePath) => {
    if (callback && typeof callback === 'function') {
      callback('file-opened', filePath);
    }
  });
};

// Expor as APIs do Electron para o frontend
contextBridge.exposeInMainWorld('electronAPI', {
  selectFiles: () => ipcInvoke('select-files'),
  selectOutputDirectory: () => ipcInvoke('select-output-directory'),
  convertAudio: (options) => ipcInvoke('convert-audio', options),
  // API para log no processo principal
  log: (message) => ipcInvoke('log-message', message),
  // API para lidar com arquivos arrastados
  handleDroppedFiles: (files) => {
    // Criar um array com informações básicas dos arquivos
    // já que não podemos passar objetos File diretamente pelo IPC
    const fileInfos = files.map(file => ({
      name: file.name,
      path: file.path, // Pode ser undefined no macOS
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }));
    
    return ipcInvoke('handle-dropped-files', fileInfos);
  },
  // Registrar ouvintes para eventos do sistema operacional
  onSystemEvent: (callback) => setupListeners(callback)
}); 