export const states = {
    transactions: [],
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
        }
    }
}