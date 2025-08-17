import { defineConfig, loadEnv } from 'vite'
import tailwindcss from 'tailwindcss'
import uni from '@dcloudio/vite-plugin-uni'
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind'

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    // https://vitejs.dev/config/
    return defineConfig({
        plugins: [uni(), uniTailwind()],
        css: {
            postcss: {
                plugins: [tailwindcss()]
            }
        },
        server: {
            port: env.VITE_APP_PORT || 5173,
            proxy: {
                [`${env.VITE_APP_PROXY_PREFIX}`]: {
                    target: env.VITE_APP_BASE_URL,
                    changeOrigin: true,
                    toProxy: true,
                    rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_PROXY_PREFIX}`), '')
                }
            }
        }
    })
}
