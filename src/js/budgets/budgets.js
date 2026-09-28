import { states } from "../state/state.js";
import { saveBudgets } from "../storage/localStorage.js";

const toLocalDateString = (d = new Date()) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const addBudget = (data) => {
    states.budgets.push({
        id: crypto.randomUUID(),
        category: data.category,
        limit: data.limit,
        period: data.period,
        createdAt: toLocalDateString()
    });

    saveBudgets(states.budgets);
};

export const getBudgets = (id) => {
    return states.budgets.find(
        budget => budget.id === id
    );
};

export const editBudget = (id, data) => {

    const index = states.budgets.findIndex(
        budget => budget.id === id
    );

    if(index === -1) return;

    states.budgets[index] = {
        ...states.budgets[index],
        ...data,
        limit: Number(data.limit)
    };

    saveBudgets(states.budgets);
}

export const deleteBudget = (id) => {

    const index = states.budgets.findIndex(
        budget => budget.id === id
    );

    if(index === -1) return;

    states.budgets.splice(index, 1);

    saveBudgets(states.budgets);

}