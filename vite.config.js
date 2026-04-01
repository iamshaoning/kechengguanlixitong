import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  
  return {
    base: './',
    build: {
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    },
    publicDir: 'public',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [
      createHtmlPlugin({
        inject: {
          data: {
            VITE_FIREBASE_API_KEY: env.VITE_FIREBASE_API_KEY,
            VITE_FIREBASE_AUTH_DOMAIN: env.VITE_FIREBASE_AUTH_DOMAIN,
            VITE_FIREBASE_PROJECT_ID: env.VITE_FIREBASE_PROJECT_ID,
            VITE_FIREBASE_STORAGE_BUCKET: env.VITE_FIREBASE_STORAGE_BUCKET,
            VITE_FIREBASE_MESSAGING_SENDER_ID: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
            VITE_FIREBASE_APP_ID: env.VITE_FIREBASE_APP_ID,
            VITE_FIREBASE_DATABASE_URL: env.VITE_FIREBASE_DATABASE_URL
          }
        }
      })
    ]
  }
})