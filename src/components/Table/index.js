import React from 'react';
import PropTypes from 'prop-types';
import { middleware } from 'yargs';

const Table = (props) => {
    return (
        <table width='100%' border='1'>
            <thead>
                <tr>
                    { props.schema.map((h, i) => <th key={ i }>{ h.name }</th>)}
                </tr>
            </thead>
            <tbody>
                { props.data.map( (item, j) => { return (
                    <tr key={ j }>
                        {props.schema.map((h, i) => {
                            const [prop, nested] = h.field.split('>');
                            const val = nested ? item[prop][nested] : item[prop]; 
                            return <td key={ i }>{val}</td>;
                        })}
                    </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    schema: PropTypes.array.isRequired
}

export default Table;

