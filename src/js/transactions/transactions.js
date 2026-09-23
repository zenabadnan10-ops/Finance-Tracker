import { states } from "../state/state.js";
import { saveData } from "../storage/localStorage.js";

export const addTransaction = (data) => {

    states.transactions.push(
        {
            id: crypto.randomUUID(),
            type: data.type,
            description: data.description,
            amount: data.amount,
            category: data.category,
            date: data.date,
            recurring: data.recurring || "",
            createdAt: Date.now()
        }
    );

    saveData(states.transactions);
};

export const getTransaction = (id) => {
    return states.transactions.find(
        transaction => transaction.id === id
    );
};

export const editTransaction = (id, data) => {

    const index = states.transactions.findIndex(
        transaction => transaction.id === id
    );

    if(index === -1) return;

    states.transactions[index] = {
        ...states.transactions[index],
        ...data,
        amount: Number(data.amount)
    };

    saveData(states.transactions);
}

export const deleteTransaction = (id) => {

    const index = states.transactions.findIndex(
        transaction => transaction.id === id
    );

    if(index === -1) return;

    states.transactions.splice(index, 1);

    saveData(states.transactions);

}

export const viewTransaction = (id) => {

    const index = states.transactions.findIndex(
        transaction => transaction.id === id
    );

    if(index === -1) return;

    
}