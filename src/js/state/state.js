export const states = {
    transactions: [],
    budgets: [],
    ui: {
        editingTransactionId: null,
        deletingTransactionId: null,
        searchQuery: "",
        sorting: "newest",
        filters: {
            category: "",
            date: "",
            from: "",
            to: "",
            min: null,
            max: null,
            recurring: null
        },
        editingBudgetId: null,
        deletingBudgetId: null,
        analyticsRange: "week",
    }
};