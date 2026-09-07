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
            notes: data.notes || "",
            createdAt: Date.now()
        }
    );

    saveData(states.transactions);
}