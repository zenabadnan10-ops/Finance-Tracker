import { getPeriodRange } from "../utils/range";
import { states } from '../state/state.js';

export const getBudgetSpent = (transactions, category, period, anchor) => {

    const { start, end } = getPeriodRange(period, anchor);

    return Math.abs(transactions.filter(transaction => {

        const transactionDate = new Date(transaction.date + "T00:00:00");

        return (
            transaction.category === category &&
            transaction.type === "expense" &&
            transactionDate >= start &&
            transactionDate < end
        );

    }).reduce((sum, transaction) => sum + Number(transaction.amount), 0));
};

export const getBudgetProgress = (budget) => {

    const limit = Number(budget.limit);
    
    if (!limit || limit <= 0) return 0;

    return ((getBudgetSpent(states.transactions, budget.category, budget.period, budget.createdAt) / limit) * 100)
};

export const getBudgetStatus = (budget) => {
    const progress = getBudgetProgress(budget);

    if (progress >= 100) return "over";
    if (progress >= 80) return "warning";
    return "on-track";
};

export const getBudgetSummary = (budgets) => {
    let total = 0;
    let spent = 0;
    let remaining = 0;

    budgets.forEach((budget) => {
        const limit = Number(budget.limit);
        const amount = getBudgetSpent(
            states.transactions,
            budget.category,
            budget.period,
            budget.createdAt
        );

        total += limit;
        spent += amount;
        remaining += Math.max(limit - amount, 0);
    });

    return { total, spent, remaining };
};