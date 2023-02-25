import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
	  host: '0.0.0.0',
	  open: false,  //启动项目后打开浏览器
		proxy: {
      '/api': {
        target: 'http://192.168.1.105:8090',  //API服务地址
        changeOrigin: true,             //开启跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

