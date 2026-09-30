const TRANSACTIONS_KEY = "ledger-transactions";
const BUDGETS_KEY = "ledger-budgets";

export const saveData = (transactions) => {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const loadData = () => {
    try {
        const data = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to load transactions:", error);
        return [];
    }
};

export const saveBudgets = (budgets) => {
    localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
};

export const loadBudgets = () => {
    try {
        const data = JSON.parse(localStorage.getItem(BUDGETS_KEY));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to load budgets:", error);
        return [];
    }
};