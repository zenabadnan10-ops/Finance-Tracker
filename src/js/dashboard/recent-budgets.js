import { states } from "../state/state";
import { createBudgetElement } from "../budgets/budgetUI"

const noRecentBudgets = document.getElementById("no-recent-budgets");
const budgetDiv = document.getElementById("budgets-div");

const getRecentBudgets = (budgets) => {
    const sorted = [...budgets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sorted.slice(0, 2);
};

export const renderRecentBudgets = () => {

    const recent = getRecentBudgets(states.budgets);

    budgetDiv.innerHTML = "";

    if(recent.length === 0){
        noRecentBudgets.style.display = "";
        budgetDiv.style.display = "none";
        return;
    }

    noRecentBudgets.style.display = "none";
    budgetDiv.style.display = "flex";

    recent.forEach(budget => {
        const budgetElement = createBudgetElement(budget, { showActions: false });
        budgetDiv.appendChild(budgetElement);
    });
};