import {renderNavigation} from "./ui/switch-sections.js";
import { closeTransactionModal, getForm, openTransactionModal, resetForm } from "./ui/modals.js";
import { addTransaction } from "./transactions/transactions.js";
import { renderTransactions } from "./transactions/transactionUI.js";
import { states } from "./state/state.js";
import { validateForm } from "./transactions/validation.js";
import { loadData } from "./storage/localStorage.js";

const addTransactionBtns = document.querySelectorAll(".add-transaction-btn");
const cancelBtn = document.getElementById("cancel-add-btn");

const setupEventListeners = () => {

    addTransactionBtns.forEach(btn => {
        btn.addEventListener("click", () =>{
            openTransactionModal();
            resetForm();
        })
    });
    
    cancelBtn.addEventListener("click", () => {
        closeTransactionModal();
    });

    getForm().addEventListener("submit", (e) => {
        e.preventDefault();

        handleSubmission();
    })

}


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

    addTransaction(transactionData);

    renderTransactions(states.transactions);
    resetForm();
    closeTransactionModal();
};

function init() {
    states.transactions = loadData();

    renderNavigation();
    renderTransactions(states.transactions);
    setupEventListeners();
}

init();