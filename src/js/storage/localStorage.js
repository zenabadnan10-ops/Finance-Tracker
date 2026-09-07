const STORAGE_KEY = "ledger-transactions";

export const saveData = (transactions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export const loadData = () => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if(!data) return [];

    try {
        return data;
    } catch {
        console.error("Failed to load transaction.");
        return [];
    }
}