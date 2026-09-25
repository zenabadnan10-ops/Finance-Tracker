import { states } from "../state/state"
import { renderSummary } from "./transactionUI";

const getSignedAmount = (transaction) => {
    
    return transaction.type === "expense" ? -transaction.amount : transaction.amount;
}

export const filterIncomeExpense = (type) => {

    let result = states.transactions;

    result = result.filter(transaction => {
        return transaction.type === type;
    });

    renderSummary(result);

    return result;
};

export const searchTransactions = (transactions, query) => {

    const lowerQuery = query.trim().toLowerCase();

    if(!lowerQuery) return transactions;

    return transactions.filter(transaction => {

        const description = transaction.description.toLowerCase();
        const category = transaction.category.toLowerCase();

        return description.includes(lowerQuery) || category.includes(lowerQuery);
    });
};

export const sortTransactions = (transactions, sorting) => {

    const sorted = [...transactions];

    switch (sorting) {
        case "newest":
            return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        case "oldest":
            return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        case "highest":
            return sorted.sort((a, b) => getSignedAmount(b) - getSignedAmount(a));
        case "lowest":
            return sorted.sort((a, b) => getSignedAmount(a) - getSignedAmount(b));
        default:
            return sorted;
    }
};

export const getFilteredTransactions = () => {

    let result = states.transactions;

    result = searchTransactions(result, states.ui.searchQuery);
    result = sortTransactions(result, states.ui.sorting);

    renderSummary(result);

    return result;
};