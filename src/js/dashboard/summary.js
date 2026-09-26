export const getFinancialSummary = (transactions) => {

    const income = transactions.filter(transaction => transaction.type === "income");
    const expenses = transactions.filter(transaction => transaction.type === "expense");

    const incomeTotal = income.reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    const expenseTotal = expenses.reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    const total = Number(incomeTotal) - Number(expenseTotal);

    return {
        balance: total,
        income: incomeTotal,
        expense: expenseTotal
    }
};