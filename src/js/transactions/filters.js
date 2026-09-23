import { states } from "../state/state";
import { renderSummary } from "./transactionUI";

export const searchTransactions = (transactions, query) => {

    const lowerQuery = query.trim().toLowerCase();

    if(!lowerQuery) return transactions;

    return transactions.filter(transaction => {

        const description = transaction.description.toLowerCase();
        const category = transaction.category.toLowerCase();

        return description.includes(lowerQuery) || category.includes(lowerQuery);
    });
};

export const getFilteredTransactions = () => {

    let result = states.transactions;

    result = searchTransactions(result, states.ui.searchQuery);

    renderSummary(result);

    return result;
}