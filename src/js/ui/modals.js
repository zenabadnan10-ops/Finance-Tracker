const addModal = document.getElementById("add-transaction-modal");
const addForm = document.getElementById("add-transaction-form");

export const openTransactionModal = () => {
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
