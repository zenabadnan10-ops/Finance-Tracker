import { renderNavigation } from './ui/switch-sections.js';
import {
  closeBudgetModal,
  closeDeleteBudgetModal,
  closeDeleteModal,
  closeFilterModal,
  closeTransactionModal,
  getBudgetForm,
  getForm,
  openBudgetModal,
  openDeleteBudgetModal,
  openDeleteModal,
  openFilterModal,
  openTransactionModal,
  resetForm,
} from './ui/modals.js';
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransaction,
} from './transactions/transactions.js';
import {
  renderSummary,
  renderTransactions,
} from './transactions/transactionUI.js';
import { states } from './state/state.js';
import { validateForm } from './transactions/validation.js';
import { loadBudgets, loadData } from './storage/localStorage.js';
import { filterIncomeExpense } from './transactions/filters.js';
import { getFilteredTransactions } from './transactions/filters.js';
import { exportCSV, exportJSON } from './transactions/export.js';
import { renderDashboard } from './dashboard/dashboard.js';
import { validateBudgetForm } from './budgets/validateBudget.js';
import { addBudget, deleteBudget, editBudget, getBudgets } from './budgets/budgets.js';
import { renderBudgets } from './budgets/budgetUI.js';
import { renderBudgetsSummary } from './budgets/budgetUI.js';
import { renderAnalyticsCards } from './analytics/analyticsUI.js';
import { renderInsights } from './dashboard/insights.js';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

const addTransactionBtns = document.querySelectorAll('.add-transaction-btn');
const closeBtn = document.getElementById('close-transaction-btn');
const deleteModalBtn = document.getElementById('delete-modal-btn');
const cancelBtn = document.getElementById('cancel-add-btn');
const transactionList = document.getElementById('transactions-cards-section');
const incomeFilterBtn = document.getElementById('income-filter-btn');
const expenseFilterBtn = document.getElementById('expense-filter-btn');
const noFilterBtn = document.getElementById('no-filter-btn');
const searchInput = document.getElementById('search-transactions');
const sortInput = document.getElementById('sort-transaction');
const filterInput = document.getElementById('open-filter-modal');
const cancelFilterBtn = document.getElementById('filter-cancel-btn');
const filterModal = document.getElementById('filter-transaction-modal');
const filterForm = document.getElementById('filter-transaction-form');
const exportSelect = document.getElementById('export-transaction');

const addBudgetsBtns = document.querySelectorAll('.add-budget-btn');
const cancelBudgetBtn = document.getElementById('cancel-add-budget-btn');
const budgetList = document.getElementById("budgets-cards-section");
const deleteBudgetConfirm = document.getElementById("delete-budget-modal-btn");
const cancelDeleteBudget = document.getElementById("close-budget-modal-btn");
const noBudgetFilterBtn = document.getElementById("no-budget-filter-btn");
const OnTrackFilterBtn = document.getElementById("on-track-filter-btn");
const OverBudgetFilterBtn = document.getElementById("over-budget-filter-btn");

const analyticsRangeSelect = document.getElementById("analytics-range");

const setupEventListeners = () => {

  analyticsRangeSelect.addEventListener("change", (e) => {
    states.ui.analyticsRange = e.target.value;
    renderAnalyticsCards();
  })

  cancelDeleteBudget.addEventListener('click', () => {
    states.ui.deletingBudgetId = null;
    closeDeleteBudgetModal();
  });

  deleteBudgetConfirm.addEventListener("click", () => {
    const id = states.ui.deletingBudgetId;

    if(id) {
      deleteBudget(id);
      renderBudgets();
      renderBudgetsSummary();
      states.ui.deletingBudgetId = null;
    }
    
    closeDeleteBudgetModal();
  });

  cancelBudgetBtn.addEventListener('click', (e) => {
    e.preventDefault();

    states.ui.editingBudgetId = null;
    resetForm();
    closeBudgetModal();
  });

  addBudgetsBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      console.log('click');
      states.ui.editingBudgetId = null;
      resetForm();
      openBudgetModal();
    });
  });

  exportSelect.addEventListener('change', (e) => {
    const format = e.target.value;
    const transactionsToExport = states.transactions;

    if (format === 'csv') exportCSV(transactionsToExport);
    if (format === 'json') exportJSON(transactionsToExport);

    exportSelect.value = '';
  });

  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const filterData = new FormData(filterForm);

    const min = filterData.get('min');
    const max = filterData.get('max');

    states.ui.filters = {
      category: filterData.get('category') || '',
      date: filterData.get('date') || '',
      from: filterData.get('from') || '',
      to: filterData.get('to') || '',
      min: min === '' ? null : Number(min) || null,
      max: max === '' ? null : Number(max) || null,
      recurring: filterData.get('recurring') === 'on' || null,
    };

    console.log(states.ui.filters);

    renderTransactions(getFilteredTransactions());
    closeFilterModal();
  });

  filterInput.addEventListener('click', () => {
    openFilterModal();
  });

  cancelFilterBtn.addEventListener('click', () => {
    closeFilterModal();
  });

  document.addEventListener('click', (e) => {
    const clickedInsideModal = filterModal.contains(e.target);
    const clickedTrigger = filterInput.contains(e.target);

    if (filterModal.open && !clickedInsideModal && !clickedTrigger) {
      filterModal.close();
    }
  });

  sortInput.addEventListener('change', (e) => {
    states.ui.sorting = e.target.value;
    renderTransactions(getFilteredTransactions());
  });

  incomeFilterBtn.addEventListener('click', () => {
    renderTransactions(filterIncomeExpense('income'));
    expenseFilterBtn.classList.remove('section-btn-active');
    noFilterBtn.classList.remove('section-btn-active');
    incomeFilterBtn.classList.add('section-btn-active');
  });

  expenseFilterBtn.addEventListener('click', () => {
    renderTransactions(filterIncomeExpense('expense'));
    expenseFilterBtn.classList.add('section-btn-active');
    noFilterBtn.classList.remove('section-btn-active');
    incomeFilterBtn.classList.remove('section-btn-active');
  });

  noFilterBtn.addEventListener('click', () => {
    renderTransactions(states.transactions);
    expenseFilterBtn.classList.remove('section-btn-active');
    noFilterBtn.classList.add('section-btn-active');
    incomeFilterBtn.classList.remove('section-btn-active');
    renderSummary(states.transactions);
  });

  
  noBudgetFilterBtn.addEventListener('click', () => setBudgetFilter(noBudgetFilterBtn, []));
  OnTrackFilterBtn.addEventListener('click', () => setBudgetFilter(OnTrackFilterBtn, ['on-track', 'warning']));
  OverBudgetFilterBtn.addEventListener('click', () => setBudgetFilter(OverBudgetFilterBtn, ['over']));

  searchInput.addEventListener('input', (e) => {
    states.ui.searchQuery = e.target.value;
    renderTransactions(getFilteredTransactions());
  });

  closeBtn.addEventListener('click', () => {
    states.ui.deletingTransactionId = null;
    closeDeleteModal();
  });

  deleteModalBtn.addEventListener('click', () => {
    const id = states.ui.deletingTransactionId;

    if (id) {
      deleteTransaction(id);
      renderTransactions(states.transactions);
      renderBudgets();
      renderSummary(states.transactions);
      renderBudgetsSummary();
      renderAnalyticsCards();
      renderDashboard(states.transactions);
      states.ui.deletingTransactionId = null;
    }

    closeDeleteModal();
  });

  addTransactionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      states.ui.editingTransactionId = null;
      resetForm();
      openTransactionModal();
    });
  });

  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    states.ui.editingTransactionId = null;
    resetForm();
    closeTransactionModal();
  });

  transactionList.addEventListener('click', (e) => {
    const editBtn = e.target.closest('[data-action="edit"]');
    const deleteBtn = e.target.closest('[data-action="delete"]');

    if (editBtn) {
      const id = editBtn.dataset.id;
      const transaction = getTransaction(id);

      states.ui.editingTransactionId = id;
      openTransactionModal(transaction);
    }

    if (deleteBtn) {
      const id = deleteBtn.dataset.id;

      states.ui.deletingTransactionId = id;
      openDeleteModal();
    }
  });

  budgetList.addEventListener('click', (e) => {
    const editBtn = e.target.closest('[data-action="edit"]');
    const deleteBtn = e.target.closest('[data-action="delete"]');

    if (editBtn) {
      const id = editBtn.dataset.id;
      const budget = getBudgets(id);

      states.ui.editingBudgetId = id;
      openBudgetModal(budget);
    }

    if (deleteBtn) {
      const id = deleteBtn.dataset.id;

      states.ui.deletingBudgetId = id;
      openDeleteBudgetModal();
    }
  });

  getForm().addEventListener('submit', (e) => {
    e.preventDefault();

    handleSubmission();
  });

  getBudgetForm().addEventListener("submit", (e) => {
    e.preventDefault();

    handleBudgetSumbission();
  })
};

const setBudgetFilter = (activeBtn, statuses) => {
  states.ui.budgetFilter = statuses;

  [noBudgetFilterBtn, OnTrackFilterBtn, OverBudgetFilterBtn].forEach((btn) =>
    btn.classList.remove('section-btn-active')
  );
  activeBtn.classList.add('section-btn-active');

  renderBudgets();
};

const handleBudgetSumbission = () => {
    const formData = new FormData(getBudgetForm());

    const budgetData = {
        category: formData.get('category'),
        limit: formData.get('limit'),
        period: formData.get('period'),
    };

    const validation = validateBudgetForm(budgetData);

    if (!validation.isValid) {
        showErrors(validation.errors);
        return;
    }

    if (states.ui.editingBudgetId) {
        editBudget(states.ui.editingBudgetId, budgetData);
        states.ui.editingBudgetId = null;
    } else {
        addBudget(budgetData);
    }

    renderBudgets();
    renderBudgetsSummary();
    resetForm();
    closeBudgetModal();
}

const showErrors = (errors) => {
  const firstError = Object.values(errors)[0];
  alert(firstError);
};

const handleSubmission = () => {
  const formData = new FormData(getForm());

  const transactionData = {
    type: formData.get('type'),
    description: formData.get('desc'),
    amount: formData.get('amount'),
    category: formData.get('category'),
    date: formData.get('date'),
    recurring: formData.get('recurring') || '',
    notes: formData.get('notes') || '',
  };

  const validation = validateForm(transactionData);

  if (!validation.isValid) {
    showErrors(validation.errors);
    return;
  }

  if (states.ui.editingTransactionId) {
    editTransaction(states.ui.editingTransactionId, transactionData);
    states.ui.editingTransactionId = null;
  } else {
    addTransaction(transactionData);
  }

  renderTransactions(states.transactions);
  renderBudgets();
  renderSummary(states.transactions);
  renderBudgetsSummary();
  renderAnalyticsCards();
  renderDashboard(states.transactions);
  resetForm();
  closeTransactionModal();
};

function init() {
  states.budgets = loadBudgets();
  states.transactions = loadData();
  noFilterBtn.classList.add('section-btn-active');
  noBudgetFilterBtn.classList.add('section-btn-active');

  renderNavigation();
  renderTransactions(getFilteredTransactions());
  renderBudgets();
  renderSummary(states.transactions);
  renderBudgetsSummary();
  renderAnalyticsCards();
  renderInsights(states.transactions, states.budgets);
  renderDashboard();
  setupEventListeners();
};

init();