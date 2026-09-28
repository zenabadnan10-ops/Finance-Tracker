import { getBudgetSpent, getBudgetStatus } from '../calculations/budgetCalcs.js';
import { getBudgetProgress, getBudgetSummary } from '../calculations/budgetCalcs.js';
import { filteredBudgets } from './filterBudget.js';
import { states } from '../state/state';

const noBudgets = document.querySelector('.no-budgets');
const budgetList = document.getElementById('budgets-cards-section');

const budgetsTotal = document.getElementById('budgets-total-amount');
const budgetsSpent = document.getElementById('budgets-total-spent');
const budgetsRemain = document.getElementById('budgets-total-remaining');

const STATUS_LABELS = {
  'on-track': 'On Track',
  warning: 'Warning',
  over: 'Limit Exceeded',
};

export const createBudgetElement = (budget, { showActions = true } = {}) => {
  const article = document.createElement('article');

  article.className = 'budget-card';
  article.dataset.id = budget.id;

  const width = Math.min(getBudgetProgress(budget), 100);
  const status = getBudgetStatus(budget);
  const spent = getBudgetSpent(
    states.transactions,
    budget.category,
    budget.period,
    budget.createdAt
  );

  const actionsBudget = showActions
    ? `
        <button type="button" data-id=${budget.id} class="edit-budget-btn" aria-label="Edit budget" data-action="edit">
            <i class="ti ti-edit" aria-hidden="true"></i>
        </button>
        <button type="button" data-id=${budget.id} class="delete-budget-btn" aria-label="Delete budget" data-action="delete">
            <i class="ti ti-trash" aria-hidden="true"></i>
        </button>
    `
    : '';

    article.innerHTML = `
        <div class="budget-card-top">
            <p class="budget-card-category">${budget.category}</p>
            <div class="budget-card-actions">
                ${actionsBudget}
            </div>
        </div>
        <p class="budget-card-spent">
            Rs. <span class="budget-spent-amount">${spent}</span> of Rs. <span class="budget-limit-amount">${budget.limit}</span>
        </p>
        <div class="budget-progress-track" role="progressbar" aria-valuenow="${Math.round(width)}" aria-valuemin="0" aria-valuemax="100">
            <div class="budget-progress-fill ${status}" style="width: ${width}%;"></div>
        </div>
        <p class="budget-card-status ${status}">${STATUS_LABELS[status]}</p>
    `;

    return article;
};

export const renderBudgets = () => {
  const budgets = filteredBudgets(...(states.ui.budgetFilter || []));
  budgetList.innerHTML = '';

  if (budgets.length === 0) {
    noBudgets.style.display = '';
    budgetList.style.display = 'none';
    return;
  }

  noBudgets.style.display = 'none';
  budgetList.style.display = 'grid';

  budgets.forEach((budget) => {
    budgetList.appendChild(createBudgetElement(budget));
  });
};

export const renderBudgetsSummary = () => {

    const {total, spent, remaining} = getBudgetSummary(states.budgets);

    budgetsTotal.textContent = total;
    budgetsSpent.textContent = spent;
    budgetsRemain.textContent = remaining;
};