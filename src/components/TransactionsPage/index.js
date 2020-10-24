import React, { useContext, useEffect, useState } from 'react'
import Card from '../Card'
import { PieChart } from 'react-minimal-pie-chart'
import NewTransfer from '../NewTransfer'
import Table from '../Table'
import { AppContext } from '../../lib/context'

export default function TransactionsPage() {
    const { transactions, setTransactions, accounts } = useContext(AppContext);
    const [ transfer, setTransfer ] = useState(1);
    const [groupData, setGroupData] = useState({});

    const colors = [
        Math.floor(Math.random()*16777215).toString(16),
        Math.floor(Math.random()*16777215).toString(16),
        Math.floor(Math.random()*16777215).toString(16),
        Math.floor(Math.random()*16777215).toString(16),
        Math.floor(Math.random()*16777215).toString(16),
        Math.floor(Math.random()*16777215).toString(16),
        Math.floor(Math.random()*16777215).toString(16)
    ]

    useEffect(() => {
        const fetchData = async () => {

            const res = await fetch('/api/transactions');
            const data = await res.json();
            setTransactions(data);
            const groups = data.reduce((acc, t) => {
                const key = t.toAccount;
                if(!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(t);
                return acc;
            }, {});
            setGroupData(groups)
        }
        fetchData();
        return () => null
    }, [transfer])

    return (
        <section>

            <div className="main">
                <Card>
                    <NewTransfer save={() => { setTransfer(transfer + 1)}}/>
                </Card>
                <Card border={ false }>
                    <PieChart
                        data={
                            Object.keys(groupData).map((g,i) => ({ title: g, label: g, value: groupData[g].length, color: `#${colors[i]}` }))
                            // [
                            // { title: 'One', value: 10, color: '#E38627' },
                            // { title: 'Two', value: 15, color: '#C13C37' },
                            // { title: 'Three', value: 20, color: '#6A2135' },
                            // ]
                        }
                            />
                </Card>
            </div>
            <div>
                {
                    accounts.map(a => {
                        return (
                            <Table 
                                key={a.account}
                                schema={ [
                                    { name: 'Origin account', field: 'fromAccount'},
                                    { name: 'Destination account', field: 'toAccount'},
                                    { name: 'Transfer date', field: 'sentAt'},
                                    { name: 'Amount', field: 'amount>value'}
                                ] }
                                data={ transactions.filter(t => t.fromAccount === a.account) }
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}
