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

const searchTransactions = (transactions, query) => {

    const lowerQuery = query.trim().toLowerCase();

    if(!lowerQuery) return transactions;

    return transactions.filter(transaction => {

        const description = transaction.description.toLowerCase();
        const category = transaction.category.toLowerCase();

        return description.includes(lowerQuery) || category.includes(lowerQuery);
    });
};

const sortTransactions = (transactions, sorting) => {

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

const getDateRange = (range) => {

    const start = new Date();

    switch(range) {
        case "today":
            start.setHours(0, 0, 0, 0);
            return start;
        case "week":
            start.setDate(start.getDate() - 7);
            return start;
        case "month":
            start.setMonth(start.getMonth() - 1);
            return start;
        case "year":
            start.setFullYear(start.getFullYear() - 1);
            return start;
        default:
            return null;
    }
};

const filterTransactions = (transactions, filters) => {

    return transactions.filter(transaction => {

        if(filters.category && filters.category !== transaction.category) return false;

        if(filters.recurring && transaction.recurring !== "on") return false;

        if(filters.min && transaction.amount < filters.min) return false;

        if(filters.max && transaction.amount > filters.max) return false;

        const transactionDate = new Date(transaction.date);

        if(filters.from || filters.to) {
            if (filters.from && transactionDate < new Date(filters.from)) return false;
            if (filters.to && transactionDate > new Date(filters.to)) return false;
        } 
        
        if (filters.date) {
            const start = getDateRange(filters.date);
            if (start && transactionDate < start) return false;
        }

        return true;
    });
}

export const getFilteredTransactions = () => {

    let result = states.transactions;

    result = searchTransactions(result, states.ui.searchQuery);
    result = sortTransactions(result, states.ui.sorting);
    result = filterTransactions(result, states.ui.filters);

    renderSummary(result);

    return result;
};