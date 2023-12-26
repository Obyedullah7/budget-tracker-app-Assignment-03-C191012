import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";


export default function IncomeList() {
  const { entries, handleDelete} = useEntries();
  const incomeEntries = entries.filter((entry) => entry.type === "income");

  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-green-600">Income</h2>
      {incomeEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expenses.</p>
      )}

       <ul id="income-list" className="divide-y">
        {incomeEntries.map((income) => (
          <li className="py-2.5"  key={income.id}>
            <div className="group flex justify-between gap-2 text-sm">
              <span>{income.title}</span>

              <div>
                <span className="text-green-600">{formatMoney(income.value)}</span>
                <span
                  className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
                  onClick={()=>
                    handleDelete(income.id)}
                >
                  Delete
                </span>

              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
