export function timeFormat(time: string): string {
    const date = new Date(time);

    return date.toLocaleString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false })
}