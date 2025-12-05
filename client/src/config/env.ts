
const env = {
    environment: import.meta.env.VITE_ENV,
    SERVER_URL: import.meta.env.VITE_SERVER_URL
} as const

export default env;