import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mlm.app',
  appName: 'mlm',
  webDir: 'dist/app/browser',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      backgroundColor: '#64A30E',
    }
  }
};

export default config;
