import { BrowserWindow, globalShortcut, app } from 'electron';

const createWindow: Function = (): BrowserWindow => {
  const window: BrowserWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 256,
    minHeight: 192,
    alwaysOnTop: true,
  });

  window.setMenu(null);

  window.loadFile('../index.html');

  return window;
};

const toggleDevTools: Function = (window: BrowserWindow): void => {
  window.webContents.toggleDevTools();
};

const createShortcuts: Function = (window: BrowserWindow): void => {
  globalShortcut.register('F12', (): void => {
    toggleDevTools(window);
  });
};

app.on('ready', (): void => {
  createShortcuts(createWindow());

  app.on('activate', (): void => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createShortcuts(createWindow());
    }
  });
});

app.on('window-all-closed', (): void => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
