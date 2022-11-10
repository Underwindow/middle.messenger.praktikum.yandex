export interface CoreRouter {
    setPath(screen: any): unknown

    start(): void

    use(path: string, callback: () => void): CoreRouter

    go(path: string): void

    back(): void

    forward(): void

    redirect(path: string): void
}
