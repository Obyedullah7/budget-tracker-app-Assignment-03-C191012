import { createContext, useEffect, useState } from "react";
export const EntriesContext = createContext();

export function EntriesProvider({ children }) {
  const [entries, setEntries] = useState(function () {
    const value = localStorage.getItem("entries");
    if (!value) return [];
    return JSON.parse(value);
  });

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const totalIncome = entries
    .filter((entry) => entry.type === "income")
    .reduce((prev, entry) => prev + entry.value, 0);

  const totalExpense = entries
    .filter((entry) => entry.type === "expense")
    .reduce((prev, entry) => prev + entry.value, 0);


  const totalBudget = totalIncome - totalExpense;

  function handleDelete(id) {
    setEntries(entries.filter((entry) => entry.id !== id));
  }


  return (
    <EntriesContext.Provider
      value={{ entries, setEntries, totalIncome, totalExpense, totalBudget, handleDelete }}
    >
      {children}
    </EntriesContext.Provider>
  );
}
