import React, { Fragment, useEffect, useState } from 'react';
import { APIUrls } from "../../constants/urls";
import ContestForm, { msgType } from "../ContestForm";
import ContestTable from "../ContestTable";
import LayoutWrapper from "../LayoutWrapper";

export function ContestPage() {

    const [ContestsInfo, setContestsInfo] = useState([]);
    const [selectedContest, setSelectedContest] = useState({});
    const [statusMsgType, setStatusMsgType] = useState(msgType.SUCCESS);
    const [statusMsg, setStatusMsg] = useState("");
    const [clearFlag, setClearFlag] = useState(false);

    const fetchContestsInfo = async () => {
        await fetch(`${APIUrls.Contest}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Error while fetching Contest details");
                }
            })
            .then(data => {
                setContestsInfo(data);
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
        fetchContestsInfo();
    }, []);

    //REST API call
    const createContest = (name, capacity, registration_from, registration_to, editable) => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': name,
                'capacity': capacity,
                'registration_from': registration_from,
                'registration_to': registration_to,
                'editable': editable,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Contest, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("capacity must be unique.")
                }
            })
            .then(data => {
                fetchContestsInfo();
                setClearFlag(true);
                setStatusMsgType(msgType.SUCCESS);
                setStatusMsg("Saved successfully");
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                console.log(error);
                setStatusMsg(error.toString());
            });
    };

    const updateContest = async (id, name, capacity, registration_from, registration_to, editable) => {
        let data = {
            method: 'PUT',
            body: JSON.stringify({
                'id': id,
                'name': name,
                'capacity': capacity,
                'registration_from': registration_from,
                'registration_to': registration_to,
                'editable': editable,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Contest, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("\"Found error.\"");
                }
            })
            .then(data => {
                fetchContestsInfo();
                setClearFlag(true);
                setStatusMsgType(msgType.SUCCESS);
                setSelectedContest({});
                setStatusMsg("Updated successfully");
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                setStatusMsg(error.toString());
            });
    };

    const deleteContest = (id) => {
        let fetchData = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${APIUrls.Contest}delete/${id}`, fetchData)
            .then(res => {
                if (res.ok) {
                    fetchContestsInfo();
                } else {
                    throw new Error("Error while deleting Contest.");
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

    const statusClassName = statusMsgType === msgType.ERROR ? 'error-status' : 'success-status';

    //Fragment allows to group a list of children without adding extra nodes to the DOM
    return (
        <Fragment>
            <ContestForm
                createContest={createContest}
                fetchContestsInfo={fetchContestsInfo}
                updateContest={updateContest}
                clearFlag={clearFlag}
                setClearFlag={setClearFlag}
                selectedContest={selectedContest}
                clearStatus={clearStatus}
            />
            {statusMsg && <div className={statusClassName}>{statusMsg}</div>}
            <ContestTable
                ContestsInfo={ContestsInfo}
                setSelectedContest={setSelectedContest}
                deleteContest={deleteContest}
            />
        </Fragment>
    )
}

const WrappedContestPage = LayoutWrapper(ContestPage);
export default WrappedContestPage;