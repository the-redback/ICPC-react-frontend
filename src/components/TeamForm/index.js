import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';

import {
    Input,
    Select,
    Row,
    Col,
    Button,
    DatePicker,
} from 'antd';
// import {validateState} from "../../utils/validators";
import moment from "moment";
import { isEmpty, isNumber } from "../../utils/utils";

const { Option } = Select;
const InputGroup = Input.Group;


export const msgType = Object.freeze({ 'SUCCESS': 'Success', 'ERROR': 'error' });

/**
 * Class component for displaying form, handling validation of input and triggering submission.
 */
export class TeamForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            rank: "",
            state: "",
            validation: {
                name: {
                    required: true,
                    error: ""
                },
                rank: {
                    required: false,
                    error: ""
                },
                state: {
                    required: true,
                    error: ""
                }
            },
        }
    }

    // This function is invoked during an update.
    // Set conditions so the update does not go on loop
    onUpdate(prevProps, prevState) {
        const { clearFlag, setClearFlag, selectedTeam } = this.props;
        //checking whether to clear fields or not
        if ((clearFlag !== prevProps.clearFlag) &&
            clearFlag) {
            this.clearForm();
            setClearFlag(false);
        }

        if (!isEmpty(selectedTeam) && (prevProps.selectedTeam.key !== selectedTeam.key)) {
            let { validation } = this.state;
            validation.name.error = "";
            validation.state.error = "";
            validation.rank.error = "";

            this.setState({
                name: selectedTeam.name,
                state: selectedTeam.state,
                rank: selectedTeam.rank,
                validation: validation,
            })
        }
    }

    clearForm = () => {
        let {
            name, state, rank, validation
        } = this.state;
        name = "";
        state = "";
        rank = "";
        validation.name.error = "";
        validation.state.error = "";
        validation.rank.error = "";
        this.setState({
            name, state, rank, validation
        });
    };

    // checks if there are validation errors and then calls the create or update accordingly.
    onSubmit = e => {
        e.preventDefault();
        const { name, state, rank, validation } = this.state;
        const { selectedTeam, createTeam, updateTeam } = this.props;
        if (!(validation.name.error || validation.rank.error || validation.state.error)) {
            if (isEmpty(selectedTeam)) {
                createTeam(
                    name, state, rank
                );
            } else {
                updateTeam(
                    selectedTeam.key, name, state, rank
                );
            }
        }
    };

    onNameChange = e => {
        this.setState({ name: e.target.value });
    };

    onStateChange = e => {
        this.setState({ state: e.target.value });
    };

    onRankChange = e => {
        this.setState({ rank: e.target.value });
    };

    // onStateChange = e => {
    //     this.setState({ state: e.target.value });
    // };

    // onTypeChange = e => {
    //     this.setState({ type: e.target.value });
    // };

    // onDescriptionChange = e => {
    //     this.setState({ description: e.target.value });
    // };

    validateName = () => {
        let { validation } = this.state;
        if (validation.name.required && this.state.name === "") {
            validation.name.error = "This field is required";
        } else {
            validation.name.error = "";
        }
        this.setState({ validation: validation });
    };

    validateState = () => {
        let { validation } = this.state;

        this.setState({ validation: validation });
    };

    // validateType = () => {
    //     let { validation } = this.state;
    //     if (validation.type.required && this.state.type === "") {
    //         validation.type.error = "This field is required.";
    //     } else {
    //         validation.type.error = ""
    //     }
    //     this.setState({ validation: validation });
    // };

    disablePastDays = current => {
        return current && current <= moment().endOf('day');
    };

    render() {
        const { selectedTeam, clearStatus } = this.props;

        return (
            <Fragment>
                <form>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Name</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.state.name}
                                    onChange={this.onNameChange}
                                    onBlur={this.validateName}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.name.error &&
                                    <div className="input-error">{this.state.validation.name.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label className="required-field">State</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.state.state}
                                    onChange={this.onStateChange}
                                    // onBlur={this.validateState}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.state.error &&
                                    <div className="input-error">{this.state.validation.state.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label>Rank</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.state.rank}
                                    onChange={this.onRankChange}
                                    // onBlur={this.validateState}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.rank.error &&
                                    <div className="input-error">{this.state.validation.rank.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
                        {isEmpty(selectedTeam) ? "Create" : "Update"}
                    </Button>
                </form>
            </Fragment>
        );
    }
}

TeamForm.propTypes = {
    createTeam: PropTypes.func.isRequired,
    fetchTeamsInfo: PropTypes.func.isRequired,
    updateTeam: PropTypes.func.isRequired,
    clearFlag: PropTypes.bool.isRequired,
    setClearFlag: PropTypes.func.isRequired,
    selectedTeam: PropTypes.object.isRequired,
    clearStatus: PropTypes.func.isRequired
};

export default TeamForm;