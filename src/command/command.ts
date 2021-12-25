export interface Command {
    name: string
    description: string

    action(): void
}