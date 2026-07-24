import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mlm.mobile',
  appName: 'mlm',
  webDir: 'dist/app/browser',
  plugins: {
    StatusBar: {
      // overlaysWebView: false,
      // style: "DEFAULT",
      // backgroundColor: '#64A30E',
    }
  }
};

export default config;
