const en = require('./en');
const es = require('./es');
const pt = require('./pt');
const de = require('./de');
const { app } = require('electron');
const fs = require('fs');
const path = require('path');

// Idiomas suportados
const SUPPORTED_LOCALES = {
  en: en,
  es: es,
  pt: pt,
  de: de
};

// Idioma padrão
const DEFAULT_LOCALE = 'en';

// Caminho para arquivo de configuração
let userDataPath = '';
try {
  userDataPath = app ? app.getPath('userData') : '';
} catch (error) {
  console.error('Erro ao obter pasta de dados do usuário:', error);
}

const languageConfigPath = userDataPath ? path.join(userDataPath, 'language_preference.json') : '';

// Salvar a preferência de idioma do usuário
function saveUserLanguagePreference(locale) {
  if (!languageConfigPath) return false;
  
  try {
    fs.writeFileSync(languageConfigPath, JSON.stringify({ locale }));
    return true;
  } catch (error) {
    console.error('Erro ao salvar preferência de idioma:', error);
    return false;
  }
}

// Obter a preferência de idioma do usuário
function getUserLanguagePreference() {
  if (!languageConfigPath) return null;
  
  try {
    if (fs.existsSync(languageConfigPath)) {
      const data = fs.readFileSync(languageConfigPath, 'utf8');
      const config = JSON.parse(data);
      return config.locale;
    }
  } catch (error) {
    console.error('Erro ao ler preferência de idioma:', error);
  }
  
  return null;
}

// Obtém o idioma do sistema
function getSystemLocale() {
  // Para Electron, podemos usar app.getLocale()
  const locale = app ? app.getLocale() : 
    (navigator ? (navigator.language || navigator.userLanguage) : DEFAULT_LOCALE);
  
  // Corte para obter apenas o código principal do idioma (en-US -> en)
  const mainLocale = locale.split('-')[0];
  
  return mainLocale;
}

// Obtém o idioma atual, com fallback para o padrão
function getCurrentLocale() {
  // Primeiro, verificar se há uma preferência do usuário
  const userPreference = getUserLanguagePreference();
  
  if (userPreference && SUPPORTED_LOCALES[userPreference]) {
    return userPreference;
  }
  
  // Se não houver preferência, usar o idioma do sistema
  const systemLocale = getSystemLocale();
  
  // Verifica se o idioma do sistema é suportado
  if (SUPPORTED_LOCALES[systemLocale]) {
    return systemLocale;
  }
  
  // Fallback para o idioma padrão
  return DEFAULT_LOCALE;
}

// Obtém as strings de tradução para o idioma especificado
function getTranslationsForLocale(locale) {
  if (SUPPORTED_LOCALES[locale]) {
    return SUPPORTED_LOCALES[locale];
  }
  return SUPPORTED_LOCALES[DEFAULT_LOCALE];
}

// Obtém as strings de tradução para o idioma atual
function getTranslations() {
  const currentLocale = getCurrentLocale();
  const translations = getTranslationsForLocale(currentLocale);
  return translations;
}

// Traduz um texto com base na chave e no idioma especificado
function translateWithLocale(key, locale, defaultText = '') {
  const translations = getTranslationsForLocale(locale);
  
  // Suporta chaves aninhadas como 'drop_area.text'
  const keys = key.split('.');
  let result = translations;
  
  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k];
    } else {
      return defaultText || key;
    }
  }
  
  return result;
}

// Traduz um texto com base na chave
function translate(key, defaultText = '') {
  const currentLocale = getCurrentLocale();
  return translateWithLocale(key, currentLocale, defaultText);
}

module.exports = {
  translate,
  translateWithLocale,
  getCurrentLocale,
  getTranslations,
  getTranslationsForLocale,
  saveUserLanguagePreference,
  getUserLanguagePreference,
  supportedLocales: Object.keys(SUPPORTED_LOCALES)
}; 