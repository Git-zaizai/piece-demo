export default {
    get(key: string) {
        return JSON.parse(<string>window.localStorage.getItem(key));
    },
    set(key: string, data: any) {
        window.localStorage.setItem(key, JSON.stringify(data));
    },
    remove(key: string) {
        window.localStorage.removeItem(key)
    },
    clear() {
        window.localStorage.clear()
    }
}
