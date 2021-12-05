import React from 'react';
import PropTypes from 'prop-types';

import {Divider, Table} from 'antd';
import {isEmpty} from "../../utils/utils";

function TeamTable(props) {
    const {teamsInfo, setSelectedTeam, deleteTeam} = props;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: name => <div>{name}</div>
        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            render: rank => <div>{rank}</div>
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            render: state => <div>{isEmpty(state) ? "-" : state.substring(0, 10)}</div>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, team) => (
                <span>
                        <a onClick={() => setSelectedTeam(team)}>Edit</a>
                        <Divider type="vertical"/>
                        <a onClick={() => deleteTeam(team.key)}>Delete</a>
                    </span>
            )
        },
    ];
    const teamsData = teamsInfo.map(team => {
        return ({
            key: team.id,
            name: team.name,
            rank: team.rank,
            state: team.state,
        })
    });
    return (
        <Table columns={columns} dataSource={teamsData}/>
    )
}

TeamTable.propTypes = {
    teamsInfo: PropTypes.array.isRequired,
    setSelectedTeam: PropTypes.func.isRequired,
    deleteTeam: PropTypes.func.isRequired
};

export default TeamTable;