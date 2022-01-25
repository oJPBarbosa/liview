import { BrowserWindow, globalShortcut, app } from 'electron';
import { join } from 'path';

const createWindow: Function = (): BrowserWindow => {
  const window: BrowserWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 256,
    minHeight: 192,
    alwaysOnTop: true,
    icon: join(process.cwd(), 'public/static/images/icon.png'),
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
