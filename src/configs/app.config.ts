export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'localhost:5000',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/select-lottery',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
