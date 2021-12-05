import React, {Fragment, useEffect, useState} from 'react';
import {APIUrls} from "../../constants/urls";
import TeamForm, {msgType} from "../TeamForm";
import TeamTable from "../TeamTable";
import LayoutWrapper from "../LayoutWrapper";

export function TeamPage() {

    const [teamsInfo, setTeamsInfo] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState({});
    const [statusMsgType, setStatusMsgType] = useState(msgType.SUCCESS);
    const [statusMsg, setStatusMsg] = useState("");
    const [clearFlag, setClearFlag] = useState(false);

    const fetchTeamsInfo = async () => {
        await fetch(`${APIUrls.Team}`)
            .then(res => {
                if (res.ok){
                    return res.json();
                } else {
                    throw new Error("Error while fetching team details");
                }
            })
            .then(data => {
                setTeamsInfo(data);
                setStatusMsgType(msgType.SUCCESS);
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                setStatusMsg(error.toString());
            });
    };

    //Is equivalent to class component's componentDidMount,
    // componentDidUpdate and componentWillUnmount lifecycle
    // use of the second argument tells it to run only when it mounts
    // if something is provided in second argument then it
    // runs only when the provided value changes
    useEffect(() => {
        fetchTeamsInfo();
    }, []);

    //REST API call
    const createTeam = (name, emailOfCreator, dateOfCreation, type, description) => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': name,
                'emailOfCreator': emailOfCreator,
                'dateOfCreation': dateOfCreation,
                'type': type,
                'description': description,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Team, data)
            .then(res => {
                if (res.ok) {
                 return res.json();
                } else {
                    throw new Error("EmailOfCreator must be unique.")
                }
            })
            .then(data => {
                fetchTeamsInfo();
                setClearFlag(true);
                setStatusMsgType(msgType.SUCCESS);
                setStatusMsg("Saved successfully");
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                console.log(error);
                setStatusMsg( error.toString());
            });
    };

    const updateTeam = async (id, name, emailOfCreator, dateOfCreation, type, description) => {
        let data = {
            method: 'PUT',
            body: JSON.stringify({
                'id': id,
                'name': name,
                'emailOfCreator': emailOfCreator,
                'dateOfCreation': dateOfCreation,
                'type': type,
                'description': description,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Team, data)
            .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("\"Email of Creator must be unique.\"");
            }
            })
            .then(data => {
                fetchTeamsInfo();
                setClearFlag(true);
                setStatusMsgType(msgType.SUCCESS);
                setSelectedTeam({});
                setStatusMsg("Updated successfully");
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                setStatusMsg(error.toString());
            });
    };

    const deleteTeam = (id) => {
        let fetchData = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${APIUrls.Team}delete/${id}`, fetchData)
            .then(res => {
                if (res.ok) {
                fetchTeamsInfo();
                } else {
                    throw new Error("Error while deleting team.");
                }
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                setStatusMsg(error.toString());
            });
    };

    const clearStatus = () => {
        setStatusMsgType(msgType.SUCCESS);
        setStatusMsg("");
    };

    const statusClassName = statusMsgType === msgType.ERROR?'error-status': 'success-status';

    //Fragment allows to group a list of children without adding extra nodes to the DOM
    return (
        <Fragment>
            <TeamForm
                createTeam={createTeam}
                fetchTeamsInfo={fetchTeamsInfo}
                updateTeam={updateTeam}
                clearFlag={clearFlag}
                setClearFlag={setClearFlag}
                selectedTeam={selectedTeam}
                clearStatus={clearStatus}
            />
            {statusMsg && <div className={statusClassName}>{statusMsg}</div>}
            <TeamTable
                teamsInfo={teamsInfo}
                setSelectedTeam={setSelectedTeam}
                deleteTeam={deleteTeam}
            />
        </Fragment>
    )
}

const WrappedTeamPage = LayoutWrapper(TeamPage);
export default WrappedTeamPage;