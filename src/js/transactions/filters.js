import { states } from "../state/state"

export const searchTransactions = () => {
    
}

export const filterIncomeExpense = (type) => {

    let result = states.transactions;

    result = result.filter(transaction => {
        return transaction.type === type;
    });

    return result;
};

export const getFilteredTransactions = () => {

    let result = states.transactions;

    result = searchTransactions(result, states.ui.searchQuery);

    return result;
};