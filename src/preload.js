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
  
  ipcRenderer.on('language-changed', (event, language) => {
    if (callback && typeof callback === 'function') {
      callback('language-changed', language);
    }
  });
};

// Carrega as traduções para o idioma atual
async function loadTranslations() {
  try {
    // Obter as traduções do processo principal
    const translations = await ipcInvoke('get-translations');
    return translations;
  } catch (error) {
    console.error('Erro ao carregar traduções:', error);
    return {};
  }
}

// Inicializa o sistema de traduções
async function setupI18n() {
  // Obter todas as traduções na inicialização
  let translations = await loadTranslations();
  let currentLocale = await ipcInvoke('get-current-language');
  
  // Função de tradução com substituição de variáveis
  const translate = (key, replacements = {}) => {
    // Divide a chave por pontos (ex: "menu.file.title" => ["menu", "file", "title"])
    const keys = key.split('.');
    let result = translations;
    
    // Navega pelo objeto de traduções seguindo os níveis da chave
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // Retorna a chave se não encontrar tradução
      }
    }
    
    // Se o resultado for uma string, substitui as variáveis
    if (typeof result === 'string') {
      return Object.entries(replacements).reduce((str, [pattern, replacement]) => {
        return str.replace(new RegExp(`{{${pattern}}}`, 'g'), replacement);
      }, result);
    }
    
    return key;
  };
  
  // Função para atualizar as traduções
  const refreshTranslations = async () => {
    translations = await loadTranslations();
    currentLocale = await ipcInvoke('get-current-language');
    return currentLocale;
  };
  
  // Expõe funções de i18n para o frontend
  contextBridge.exposeInMainWorld('i18n', {
    t: translate,
    currentLanguage: currentLocale,
    refreshTranslations: refreshTranslations
  });
  
  // Ouvinte para atualizar traduções quando o idioma mudar
  ipcRenderer.on('language-changed', async () => {
    await refreshTranslations();
  });
}

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
  onSystemEvent: (callback) => setupListeners(callback),
  // API de idiomas
  changeLanguage: async (language) => {
    try {
      const newLanguage = await ipcInvoke('change-language', language);
      return newLanguage;
    } catch (error) {
      console.error('Erro ao mudar idioma:', error);
      throw error;
    }
  },
  getCurrentLanguage: () => ipcInvoke('get-current-language'),
  getSupportedLanguages: () => ipcInvoke('get-supported-languages')
});

// Inicializar o sistema de tradução
setupI18n().catch(error => {
  console.error('Erro ao inicializar sistema de tradução:', error);
}); 