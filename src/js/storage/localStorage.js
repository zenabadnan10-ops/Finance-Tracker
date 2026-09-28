const TRANSACTIONS_KEY = "ledger-transactions";
const BUDGETS_KEY = "ledger-budgets";


export const saveData = (transactions) => {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const loadData = () => {
    const data = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY));

    if(!data) return [];

    try {
        return data;
    } catch {
        console.error("Failed to load transactions.");
        return [];
    }
};

export const saveBudgets = (budgets) => {
    localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
};

export const loadBudgets = () => {
    const data = JSON.parse(localStorage.getItem(BUDGETS_KEY));

    try {
        return data;
    } catch {
        console.error("Failed to load budgets.");
        return [];
    }
};