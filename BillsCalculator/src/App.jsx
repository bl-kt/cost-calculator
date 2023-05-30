import * as React from 'react';
import * as css from './App.css'

export default function App() {
    const [incomes, setIncomes] = React.useState([]);
    const [costs, setCosts] = React.useState([]);


    const pencil = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="16" height="16"
                 viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round"
                 stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
                <path d="M16 5l3 3"/>
            </svg>
        )
    }
    function addIncome() {
        setIncomes((prev) => [...prev, {label: 'New Income', amount: 0}]);
    }

    function removeIncome(index) {
        setIncomes((prev) => [...prev.filter((_, i) => {
            return i !== index;
        })]);
    }

    function addCost() {
        setCosts((prev) => [...prev, {label: 'New Cost', amount: 0}]);
    }

    function removeCost(index) {
        setCosts((prev) => [...prev.filter((_, i) => {
            return i !== index;
        })]);
    }

    function calculate() {
    //     Do stuff

        // function updateTotals() {
        //     const incomeTotal = parseInt(income1.value, 10) + parseInt(income2.value, 10)
        //     const costsTotal = parseInt(rent.value, 10) + parseInt(bills.value, 10) + parseInt(food.value, 10) + parseInt(council_tax.value, 10)
        //
        //     const cd = (income1.value == 0) ? income2.value : gcd (income1.value, income2.value%income1.value);
        //     const ratio = `${income1.value/cd}:${income2.value/cd}`
        //     const u = (income1.value/cd)  + (income2.value/cd)
        //
        //     rent_1.value = Math.ceil((parseInt(rent.value)/u) * (parseInt(income1.value)/cd))
        //     rent_2.value = Math.ceil((parseInt(rent.value)/u) * (parseInt(income2.value)/cd))
        //
        //     bills_1.value = Math.ceil((parseInt(bills.value)/u) * (parseInt(income1.value)/cd))
        //     bills_2.value = Math.ceil((parseInt(bills.value)/u) * (parseInt(income2.value)/cd))
        //
        //     food_1.value = Math.ceil((parseInt(food.value)/u) * (parseInt(income1.value)/cd))
        //     food_2.value = Math.ceil((parseInt(food.value)/u) * (parseInt(income2.value)/cd))
        //
        //     council_1.value = Math.ceil((parseInt(council_tax.value)/u) * (parseInt(income1.value)/cd))
        //     council_2.value = Math.ceil((parseInt(council_tax.value)/u) * (parseInt(income2.value)/cd))
        //
        //     income_total.value = incomeTotal
        //     costs_total.value = costsTotal
        //
        // }

    }

    return (
        <div>
            <h1> Cost Split Calculator </h1>
            <fieldset>
                <legend> <h2>Income{incomes.length > 1 ? 's' : ''}</h2> </legend>
                <div className={'cards'}>
                {incomes.map((income, i) => {
                    return (
                        <fieldset key={`income-fieldset-${i}`}>
                            <legend>
                                <div>
                                <input id={`income-label-${income.label}`} key={`income-label${i}`}
                                           defaultValue={income.label}>
                                </input>
                                <button onClick={() => {removeIncome(i)}}> - </button>
                                </div>
                            </legend>
                            <div>
                                <input type={'number'} id={`income-amount-${income.label}`} key={`income-value${i}`} defaultValue={income.amount}></input>
                            </div>
                        </fieldset>
                    );
                })}
                </div>
                {incomes.length < 1 && (
                    <p> Click to add an income </p>
                )}
                <div className={'cards-button'}>
                    {/* Total */}
                    <button onClick={addIncome}>+</button>
                </div>
            </fieldset>
            <fieldset>
                <legend> <h2>Cost{costs.length > 1 ? 's' : ''}</h2> </legend>
                <div  className={'cards'}>
                    {costs.map((cost, i) => (
                        <fieldset key={`income-fieldset-${i}`}>
                            <legend>
                                <div>
                                    <input id="cost-label" key={`cost-label${i}`}
                                           defaultValue={cost.label}>
                                    </input>
                                    <button onClick={() => {removeCost(i)}}> - </button>
                                </div>
                            </legend>
                            <div>
                                <input id="income-amount" key={`cost-value${i}`} defaultValue={cost.amount} onChange={updateCost}></input>
                            </div>
                        </fieldset>
                    ))}
                </div>
                {costs.length < 1 && (
                    <p> Click to add a cost </p>
                )}
                <div className={'cards-button'}>
                {/*    Total */}
                <button onClick={addCost}>+</button>
                </div>
            </fieldset>
            <fieldset disabled={incomes < 2}>
                <legend> <h2> Rules </h2> </legend>
                    <fieldset>
                        <legend> <h3> Split </h3> </legend>
                        <div className={'column'}>
                            <div className={'column-rule'}>
                                <input disabled={incomes.length < 2} type="radio" id="even" name="split-type" value="even"/>
                                <label htmlFor="even">Evenly</label>
                            </div>

                            <div className={'column-rule'}>
                                <input disabled={incomes.length < 2} type="radio" id="ratio" name="split-type" value="ratio"/>
                                <label htmlFor="ratio">Equally</label>
                            </div>
                        </div>
                    </fieldset>
            </fieldset>
            <button onClick={calculate} className={'calculate'} disabled={(incomes.length < 2) && (costs.length < 1)}> <h2>Calculate</h2> </button>
        </div>
    );
}