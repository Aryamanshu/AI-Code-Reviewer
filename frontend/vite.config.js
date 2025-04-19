import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'react': resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
      'style-to-js': resolve(__dirname, 'node_modules/style-to-js'),
    },
    dedupe: ['react', 'react-dom'],
    preserveSymlinks: true
  },
  optimizeDeps: {
    include: [
      'prismjs',
      'react',
      'react-dom',
      'react-markdown',
      'rehype-highlight',
      'style-to-js'
    ],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
    }
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      onwarn(warning, warn) {
        // Skip certain warnings
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        // Use default for everything else
        warn(warning)
      }
    }
  },
})
