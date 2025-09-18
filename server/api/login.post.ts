import { defineEventHandler, readBody, createError } from 'h3'

interface BackendLoginResponse {
    success: boolean
    message: string
    token: string
}

interface BackendUser {
    id: string
    username: string
    email: string
}

export default defineEventHandler(async (event) => {
    const body = await readBody<{ email: string; password: string }>(event)
    const config = useRuntimeConfig()

    try {
        // 1. Authentification → récupère le token
        const response = await $fetch<BackendLoginResponse>(`${config.backendUrl}/api/utilisateur/auth`, {
            method: 'POST',
            body
        })

        // 2. Appel backend pour récupérer les infos user
        const user = await $fetch<BackendUser>(`${config.backendUrl}/api/utilisateur/get`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${response.token}`
            }
        })

        // 3. Sauvegarde la session complète
        await setUserSession(event, {
            user,
            token: response.token,
            loggedInAt: new Date()
        })

        return { success: true, user }
    } catch (err: any) {
        throw createError({
            statusCode: err?.statusCode || 401,
            message: err?.data?.message || 'Bad credentials'
        })
    }
})
