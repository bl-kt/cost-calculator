import * as React from 'react';
import * as css from './App.css'

export default function App() {
    const [incomes, setIncomes] = React.useState([]);
    const [costs, setCosts] = React.useState([]);
    const [results, setResults] = React.useState([]);
    const [splitRule, setSplitRule] = React.useState('even')

    function addIncome() {
        setIncomes((prev) => [...prev, {label: 'New Income', value: 1}]);
    }

    function updateIncomeLabel(e) {
        const value = e.target.value
        const i =  e.target.getAttribute("data-index");

        setIncomes((prev) => {
            const copy = [...prev];
            copy[i] = {label: value, value: copy[i].value}
            return copy
        })
    }

    function updateIncomeValue(e) {
        const value = e.target.value
        const i =  e.target.getAttribute("data-index");

        setIncomes((prev) => {
            const copy = [...prev];
            copy[i] = {label: copy[i].label, value: value}
            return copy
        })
    }

    function updateSplitRule(e) {
        const value = e.target.id

        setSplitRule(value)
    }

    function removeIncome(index) {
        setIncomes((prev) => [...prev.filter((_, i) => {
            return i !== index;
        })]);
    }

    function addCost() {
        setCosts((prev) => [...prev, {label: 'New Cost', value: 1}]);
    }

    function updateCostLabel(e) {
        const value = e.target.value
        const i =  e.target.getAttribute("data-index");

        setCosts((prev) => {
            const copy = [...prev];
            copy[i] = {label: value, value: copy[i].value}
            return copy
        })
    }

    function updateCostValue(e) {
        const value = e.target.value
        const i =  e.target.getAttribute("data-index");

        setCosts((prev) => {
            const copy = [...prev];

            copy[i] = {label: copy[i].label, value: value}
            return copy
        })
    }

    function removeCost(index) {
        setCosts((prev) => [...prev.filter((_, i) => {
            return i !== index;
        })]);
    }

    function gcd(a, b)
    {
        if (a === 0) return b;
        return gcd(b % a, a);
    }

    function findGCD(arr, n)
    {
        let result = arr[0];
        for (let i = 1; i < n; i++)
        {
            result = gcd(arr[i], result);
            if(result === 1) return 1;
        }
        return result;
    }

    function calculate() {
        let incomeTotal = 0;
        let incomeValues = incomes.map((income) => {
            return income.value
        })
        
        incomeValues.forEach((income) => {
            incomeTotal += parseInt(income,10)
        })

        let costsTotal = 0;
        let costsValues = costs.map((cost) => {
            return cost.value
        })

        costsValues.forEach((cost) => {
            costsTotal += parseInt(cost,10)
        })

        let results = []

        if (splitRule === 'ratio'){
            const gcd = findGCD(incomeValues, incomeValues.length)
            const ratio = incomeValues.map((income) => {
                return income/gcd
            }).join(':')

            // Not sure if this math here is correct.
            let unit = 0;
            incomeValues.forEach((income) => {
                unit += income/gcd;
            })

            incomes.forEach((income) => {
                let split = []
                costs.forEach((cost) => {
                    split.push([cost.label, Math.ceil((parseInt(cost.value, 10)/unit)) * (parseInt(income.value, 10)/gcd)])
                })
                results.push([income.label, split])
            })
        }

        if (splitRule === 'even'){
            incomes.forEach((income) => {
                let split = []
                costs.forEach((cost) => {
                    split.push([cost.label, Math.ceil((parseInt(cost.value, 10)/incomes.length))])
                })
                results.push([income.label, split])
            })
        }

        setResults(results);
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
                                <input data-index={i} id={`income-label-${i}`} key={`income-label${i}`}
                                           defaultValue={income.label} onChange={updateIncomeLabel}>
                                </input>
                                <button onClick={() => {removeIncome(i)}}> - </button>
                                </div>
                            </legend>
                            <div>
                                <input data-index={i} type={'number'} id={`income-value-${i}`} key={`income-value${i}`}
                                       onChange={updateIncomeValue} defaultValue={income.value}>
                                </input>
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
                                    <input data-index={i} id="cost-label" key={`cost-label-${i}`}
                                           defaultValue={cost.label} onChange={updateCostLabel}>
                                    </input>
                                    <button onClick={() => {removeCost(i)}}> - </button>
                                </div>
                            </legend>
                            <div>
                                <input data-index={i} id="income-amount" key={`cost-value-${i}`} defaultValue={cost.value}
                                       onChange={updateCostValue}>
                                </input>
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
                                <input onChange={updateSplitRule} checked={splitRule === 'even'} disabled={incomes.length < 2} type="radio" id="even" name="split-type" value="even"/>
                                <label htmlFor="even">Evenly</label>
                            </div>

                            <div className={'column-rule'}>
                                <input onChange={updateSplitRule}  checked={splitRule === 'ratio'} disabled={incomes.length < 2} type="radio" id="ratio" name="split-type" value="ratio"/>
                                <label htmlFor="ratio">Equally</label>
                            </div>
                        </div>
                    </fieldset>
            </fieldset>

            <button onClick={calculate} className={'calculate'} disabled={(incomes.length < 2) && (costs.length < 1)}> <h2>Calculate</h2> </button>

            {results.length > 0 && (
                <fieldset>
                    <legend> <h2>Results</h2> </legend>
                    <div className={'cards'}>
                        {results.map((result) => {
                            return (
                            <fieldset key={result[0]}>
                                <legend> <h3>{result[0]}</h3> </legend>
                                {result[1].map((cost) => {
                                    return (
                                        <fieldset key={cost[0]}>
                                            <legend> <h4>{cost[0]}</h4> </legend>
                                            <input disabled value={cost[1]}/>
                                        </fieldset>
                                    )
                                })}
                            </fieldset>
                            )
                        })}
                    </div>
                </fieldset>
            )}
        </div>
    );
}