export interface Command {
    readonly name: string
    readonly description: string

    action(): void
}