import {renderNavigation} from "./ui/switch-sections.js";
import { closeDeleteModal, closeTransactionModal, getForm, openDeleteModal, openTransactionModal, resetForm } from "./ui/modals.js";
import { addTransaction, deleteTransaction, editTransaction, getTransaction } from "./transactions/transactions.js";
import { renderSummary, renderTransactions } from "./transactions/transactionUI.js";
import { states } from "./state/state.js";
import { validateForm } from "./transactions/validation.js";
import { loadData } from "./storage/localStorage.js";
import { filterIncomeExpense } from "./transactions/filters.js";
import { getFilteredTransactions } from "./transactions/filters.js";

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

const addTransactionBtns = document.querySelectorAll(".add-transaction-btn");
const closeBtn = document.getElementById("close-transaction-btn");
const deleteModalBtn = document.getElementById("delete-modal-btn");
const cancelBtn = document.getElementById("cancel-add-btn");
const transactionList = document.getElementById("transactions-cards-section");
const incomeFilterBtn = document.getElementById("income-filter-btn");
const expenseFilterBtn = document.getElementById("expense-filter-btn");
const noFilterBtn = document.getElementById("no-filter-btn");
const searchInput = document.getElementById("search-transactions");

const setupEventListeners = () => {

    incomeFilterBtn.addEventListener("click", () => {
        renderTransactions(filterIncomeExpense("income"));
        expenseFilterBtn.classList.remove("section-btn-active");
        noFilterBtn.classList.remove("section-btn-active");
        incomeFilterBtn.classList.add("section-btn-active");
    });

    expenseFilterBtn.addEventListener("click", () => {
        renderTransactions(filterIncomeExpense("expense"));
        expenseFilterBtn.classList.add("section-btn-active");
        noFilterBtn.classList.remove("section-btn-active");
        incomeFilterBtn.classList.remove("section-btn-active");
    });

    noFilterBtn.addEventListener("click", () => {
        renderTransactions(states.transactions);
        expenseFilterBtn.classList.remove("section-btn-active");
        noFilterBtn.classList.add("section-btn-active");
        incomeFilterBtn.classList.remove("section-btn-active");
        renderSummary(states.transactions);
    });

    searchInput.addEventListener("input", (e) => {
        states.ui.searchQuery = e.target.value;
        renderTransactions(getFilteredTransactions());
    });

    closeBtn.addEventListener("click", () => {
        closeDeleteModal();
        states.ui.deletingTransactionId = null;
    });

    deleteModalBtn.addEventListener("click", () => {
        const id = states.ui.deletingTransactionId;

        if(id) {
            deleteTransaction(id);
            renderTransactions(states.transactions);
            renderSummary(states.transactions);
            states.ui.deletingTransactionId = null;
        }

        closeDeleteModal();

    });

    addTransactionBtns.forEach(btn => {
        btn.addEventListener("click", () =>{
            states.ui.editingTransactionId = null;
            resetForm();
            openTransactionModal();
        })
    });
    
    cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();

        states.ui.editingTransactionId = null;
        resetForm();
        closeTransactionModal();
    });

    transactionList.addEventListener("click", (e) => {
        const editBtn = e.target.closest('[data-action="edit"]');
        const deleteBtn = e.target.closest('[data-action="delete"]');

        if(editBtn) {

            const id = editBtn.dataset.id;
            const transaction = getTransaction(id);
    
            states.ui.editingTransactionId = id;
            openTransactionModal(transaction);

        }

        if(deleteBtn) {
            const id = deleteBtn.dataset.id;

            states.ui.deletingTransactionId = id;
            openDeleteModal();
        }

    });

    getForm().addEventListener("submit", (e) => {
        e.preventDefault();

        handleSubmission();
    });

};


const showErrors = (errors) => {
    const firstError = Object.values(errors)[0];
    alert(firstError);
}

const handleSubmission = () => {

    const formData = new FormData(getForm());

    const transactionData = {
        type: formData.get("type"),
        description: formData.get("desc"),
        amount: formData.get("amount"),
        category: formData.get("category"),
        date: formData.get("date"),
        recurring: formData.get("recurring") || "",
        notes: formData.get("notes") || "",
    };

    const validation = validateForm(transactionData);

    if(!validation.isValid) {
        showErrors(validation.errors);
        return;
    }

    if(states.ui.editingTransactionId) {
        editTransaction(states.ui.editingTransactionId, transactionData);
        states.ui.editingTransactionId = null;
    } else {
        addTransaction(transactionData);
    }

    renderTransactions(states.transactions);
    renderSummary(states.transactions);
    resetForm();
    closeTransactionModal();
};

function init() {
    states.transactions = loadData();
    noFilterBtn.classList.add("section-btn-active");

    renderNavigation();
    renderTransactions(states.transactions);
    renderSummary(states.transactions);
    setupEventListeners();
}

init();