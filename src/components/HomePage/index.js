import React, { useContext } from 'react';
import { AppContext } from '../../lib/context';
import { PieChart } from 'react-minimal-pie-chart';
import Card from '../Card';
import { getUserAccounts } from '../../lib/api-mock';

import './style.css';
import Table from '../Table';

const HomePage = () => {
    const { user, accounts } = useContext(AppContext);

    return (
        <section>
            <div className="hero"><h2>Welcome to your online banking {user}</h2></div>
            <div className="main">
                <Card>
                    <div>
                        <PieChart
                            data={[
                                { title: 'One', value: 10, color: '#E38627' },
                                { title: 'Two', value: 15, color: '#C13C37' },
                                { title: 'Three', value: 20, color: '#6A2135' },
                            ]}
                        />
                    </div>
                    <div className="desc">
                        <h3>Transactions history</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique eros justo, ut porttitor eros placerat at. In hac habitasse platea dictumst. Sed consectetur sem a sagittis sollicitudin.</p>
                    </div>
                </Card>
                <Card>
                    <div>
                        <img src="https://dummyimage.com/320x200" alt="dummy"></img>
                    </div>
                    <div className="desc">
                        <h3>Main Expenses</h3>
                        <p>
                        Praesent fermentum nisi non est venenatis luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis vitae purus non neque volutpat porta. Fusce et turpis metus. Etiam consequat quis nulla in semper. Nullam dictum interdum dui. Fusce mi lectus, bibendum vel luctus ut, luctus non eros. Nulla sit amet dolor interdum, feugiat ex in, malesuada turpis. Sed condimentum dictum mauris, quis tempor augue sollicitudin ac.
                        </p>
                    </div>
                </Card>
                <Card>
                    <div className="desc">
                        <h3>Current Balance</h3>
                    </div>
                    <Table
                        schema={ [
                            { name: 'Account No.', field: 'account'},
                            { name: 'Balance', field: 'balance>value'},
                            { name: 'Date of Latest Transfer', field: ''},
                        ] }
                        data={ accounts }
                    />
                </Card>
            </div>
        </section>
    )
};

export default HomePage;
