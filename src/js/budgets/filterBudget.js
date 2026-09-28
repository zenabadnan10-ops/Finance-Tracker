import { getBudgetStatus } from "../calculations/budgetCalcs.js";
import { states } from "../state/state.js";

export const filteredBudgets = (...statuses) => {
    if (statuses.length === 0) return states.budgets;

    return states.budgets.filter((budget) =>
        statuses.includes(getBudgetStatus(budget))
    );
};