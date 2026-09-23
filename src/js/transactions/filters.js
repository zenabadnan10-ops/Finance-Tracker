import { states } from "../state/state"
import { renderSummary } from "./transactionUI";

export const searchTransactions = () => {
    
}

export const filterIncomeExpense = (type) => {

    let result = states.transactions;

    result = result.filter(transaction => {
        return transaction.type === type;
    });

    renderSummary(result);

    return result;
};

export const getFilteredTransactions = () => {

    let result = states.transactions;

    result = searchTransactions(result, states.ui.searchQuery);

    renderSummary(result);

    return result;
};