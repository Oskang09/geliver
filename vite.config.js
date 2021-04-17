import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * @type { import('vite').UserConfig }
 */
export default {
    define: {
        'process.env': {},
    },
    build: {
        outDir: 'docs',
    },
    jsx: 'react',
    base: "/geliver/",
    plugins: [reactRefresh(), VitePWA()],
    resolve: {
        alias: {
            '#': path.resolve(__dirname, "./src"),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    '@base-color': '#08979C'
                }
            },
        }
    }
};