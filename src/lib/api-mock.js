import { createServer } from 'miragejs';

const transactions = [
    {fromAccount: '12345678', toAccount: '29873465', sentAt: new Date().toISOString(), amount: { currency: '$', value: 400}}
];
const accounts = [
    { owner: '000000001', account: '12345678', balance: {currency: '$', value: 15000 }, createdAt: "2020-10-23T18:00:00.000Z"},
    { owner: '000000001', account: '37485726', balance: {currency: '€', value: 8000 }, createdAt: "2020-10-23T18:00:00.000Z"},
];

const getAccount = (id) => {
    const acc = accounts.find(acc => acc.account === id);
    return acc;
}

const main = () => {
    createServer({
        routes() {
            this.namespace = "api";

            this.post('/transfer', (schema, request) => {
                const model = JSON.parse(request.requestBody);
                const account = getAccount(model.fromAccount);
                if(account.balance.value >= model.amount) {
                    const m = {
                        fromAccount: model.fromAccount,
                        toAccount: model.toAccount,
                        amount: {
                            currency: account.currency,
                            value: model.amount
                        },
                        sentAt: new Date().toISOString()
                    };
                    transactions.push(m);
                    return m;
                }
                return false;
            })

            this.get('/accounts', () => accounts)

            this.get('/transactions', () => transactions)
        }
    })
}

export default main;