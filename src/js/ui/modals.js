const addModal = document.getElementById("add-transaction-modal");
const addForm = document.getElementById("add-transaction-form");
const modalName = document.getElementById("add-transaction-heading");
const formBtn = document.getElementById("submit-btn");

export const openTransactionModal = (transaction = null) => {

    if(transaction) {

        addForm.elements["type"].value = transaction.type;
        addForm.elements["desc"].value = transaction.description;
        addForm.elements["amount"].value = transaction.amount;
        addForm.elements["category"].value = transaction.category;
        addForm.elements["date"].value = transaction.date;
        addForm.elements["recurring"].checked = transaction.recurring === "on" || transaction.recurring === true;
        addForm.elements["notes"].value = transaction.notes || "";

        modalName.textContent = "Edit Transaction"
        formBtn.textContent = "Edit Transaction"

    } else {

        modalName.textContent = "Add Transaction"
        formBtn.textContent = "Add Transaction"

    }

    addModal.showModal();
};

export const closeTransactionModal = () => {
    addModal.close();
};

export const resetForm = () => {
    addForm.reset();
};

export const getForm = () => {
    return addForm;
};
