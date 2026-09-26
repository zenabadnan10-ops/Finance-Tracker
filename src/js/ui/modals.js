const addModal = document.getElementById("add-transaction-modal");
const addForm = document.getElementById("add-transaction-form");
const deleteModal = document.getElementById("delete-transaction-modal");
const filterModal = document.getElementById("filter-transaction-modal");

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
};

export const getForm = () => addForm;

export const closeFilterModal = () => {
    if(filterModal) filterModal.close();
};

export const openFilterModal = () => {
    if(filterModal) filterModal.showModal();
};