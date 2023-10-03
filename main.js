const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

const createWindow = () => {
  // Obtém o objeto da tela principal
  const mainScreen = screen.getPrimaryDisplay();
  
  // Calcula o tamanho da janela com base nas dimensões da tela
  const windowWidth = mainScreen.workAreaSize.width * 0.8; // 0.8 = 80% da largura da tela
  const windowHeight = mainScreen.workAreaSize.height * 0.8; // 0.8 = 80% da altura da tela

  // Cria a janela do navegador com as dimensões calculadas
  const mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Carregar o index.html do aplicativo.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Abrir as ferramentas de desenvolvimento.
  mainWindow.webContents.openDevTools();
};

// Este método será chamado quando o Electron tiver terminado a inicialização e estiver pronto para criar janelas de navegador.
app.on('ready', createWindow);

// Sair quando todas as janelas forem fechadas.
app.on('window-all-closed', () => {
  // No macOS, é comum que os aplicativos e a barra de menus permaneçam ativos até o usuário sair explicitamente com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // No macOS, é comum recriar uma janela no aplicativo quando o ícone da dock é clicado e não há outras janelas abertas.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});






