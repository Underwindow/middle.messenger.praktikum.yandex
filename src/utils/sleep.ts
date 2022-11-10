export default function sleep(ms: number = 200) {
    // eslint-disable-next-line
    return new Promise((r) => setTimeout(r, ms));
}
