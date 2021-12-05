import React from 'react';
import PropTypes from 'prop-types';

import {Divider, Table} from 'antd';
import {isEmpty} from "../../utils/utils";

function ContestTable(props) {
    const {ContestsInfo, setSelectedContest, deleteContest} = props;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: name => <div>{name}</div>
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            key: 'capacity',
            render: capacity => <div>{capacity}</div>
        },
        {
            title: 'Registration From',
            dataIndex: 'registration_from',
            key: 'registration_from',
            render: registration_from => <div>{isEmpty(registration_from) ? "-" : registration_from.substring(0, 10)}</div>
        },
        {
            title: 'Registration To',
            dataIndex: 'registration_to',
            key: 'registration_to',
            render: registration_to => <div>{isEmpty(registration_to) ? "-" : registration_to.substring(0, 10)}</div>
        },
        {
            title: 'Editable',
            dataIndex: 'editable',
            key: 'editable',
            render: editable => <div>{editable}</div>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, Contest) => (
                <span>
                        <a onClick={() => setSelectedContest(Contest)}>Edit</a>
                        <Divider type="vertical"/>
                        <a onClick={() => deleteContest(Contest.key)}>Delete</a>
                    </span>
            )
        },
    ];
    const ContestsData = ContestsInfo.map(Contest => {
        return ({
            key: Contest.id,
            name: Contest.name,
            capacity: Contest.capacity,
            registration_from: Contest.registration_from,
            registration_to: Contest.registration_to,
            editable: Contest.editable,
        })
    });
    return (
        <Table columns={columns} dataSource={ContestsData}/>
    )
}

ContestTable.propTypes = {
    ContestsInfo: PropTypes.array.isRequired,
    setSelectedContest: PropTypes.func.isRequired,
    deleteContest: PropTypes.func.isRequired
};

export default ContestTable;