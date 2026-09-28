const addModal = document.getElementById("add-transaction-modal");
const addForm = document.getElementById("add-transaction-form");
const deleteModal = document.getElementById("delete-transaction-modal");
const filterModal = document.getElementById("filter-transaction-modal");
const addBudgetModal = document.getElementById("add-budget-modal");
const addBudgetForm = document.getElementById("add-budget-form");
const deleteBudgetModal = document.getElementById("delete-budget-modal");

export const openBudgetModal = (budget = null) => {
    if(!addBudgetModal) return;

    if(budget) {
        addBudgetForm.elements["category"].value = budget.category;
        addBudgetForm.elements["limit"].value = budget.limit;
        addBudgetForm.elements["period"].value = budget.period;

        document.getElementById("add-budget-heading").textContent = "Edit Budget";
        document.getElementById("submit-budget-btn").textContent = "Edit Budget";
    } else {
        resetForm();
        document.getElementById("add-budget-heading").textContent = "Add Budget";
        document.getElementById("submit-budget-btn").textContent = "Add Budget";
    }

    addBudgetModal.showModal();
};

export const closeBudgetModal = () => {
    if (addBudgetModal && addBudgetModal.open) {
        addBudgetModal.close();
    }
};

export const openDeleteBudgetModal = () => {
    if (deleteBudgetModal) deleteBudgetModal.showModal();
};

export const closeDeleteBudgetModal = () => {
    if (deleteBudgetModal && deleteBudgetModal.open) deleteBudgetModal.close();
};

export const openTransactionModal = (transaction = null) => {
    if (!addModal) return;

    if (transaction) {
        addForm.elements["type"].value = transaction.type;
        addForm.elements["desc"].value = transaction.description;
        addForm.elements["amount"].value = transaction.amount;
        addForm.elements["category"].value = transaction.category;
        addForm.elements["date"].value = transaction.date;
        addForm.elements["recurring"].checked = transaction.recurring === "on" || transaction.recurring === true;

        document.getElementById("add-transaction-heading").textContent = "Edit Transaction";
        document.getElementById("submit-btn").textContent = "Edit Transaction";
    } else {
        resetForm();
        document.getElementById("add-transaction-heading").textContent = "Add Transaction";
        document.getElementById("submit-btn").textContent = "Add Transaction";
    }

    addModal.showModal();
};

export const closeTransactionModal = () => {
    if (addModal && addModal.open) {
        addModal.close();
    }
};

export const openDeleteModal = () => {
    if (deleteModal) deleteModal.showModal();
};

export const closeDeleteModal = () => {
    if (deleteModal && deleteModal.open) deleteModal.close();
};

export const resetForm = () => {
    if (addForm) {
        addForm.reset();

        if (addForm.elements["recurring"]) {
            addForm.elements["recurring"].checked = false;
        }
    }

    if(addBudgetForm) {
        addBudgetForm.reset();
    }
};

export const getForm = () => addForm;

export const getBudgetForm = () => addBudgetForm;

export const closeFilterModal = () => {
    if(filterModal) filterModal.close();
};

export const openFilterModal = () => {
    if(filterModal) filterModal.showModal();
};