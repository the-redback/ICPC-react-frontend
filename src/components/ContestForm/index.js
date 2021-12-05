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
import {
    validateEmailOfCreator
} from "../../utils/validators";
import moment from "moment";
import { isEmpty, isNumber } from "../../utils/utils";

const { Option } = Select;
const InputGroup = Input.Group;


export const msgType = Object.freeze({ 'SUCCESS': 'Success', 'ERROR': 'error' });

/**
 * Class component for displaying form, handling validation of input and triggering submission.
 */
export class ContestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            capacity: "",
            registration_from: "",
            registration_to: "",
            editable: "",
            validation: {
                name: {
                    required: true,
                    error: ""
                },
                capacity: {
                    required: true,
                    error: ""
                },
                registration_from: {
                    required: true,
                    error: ""
                },
                registration_to: {
                    required: true,
                    error: ""
                },
                editable: {
                    required: false,
                    error: ""
                }
            },
        }
    }

    // This function is invoked during an update.
    // Set conditions so the update does not go on loop
    onUpdate(prevProps, prevState) {
        const { clearFlag, setClearFlag, selectedContest } = this.props;
        //checking whether to clear fields or not
        if ((clearFlag !== prevProps.clearFlag) &&
            clearFlag) {
            this.clearForm();
            setClearFlag(false);
        }

        if (!isEmpty(selectedContest) && (prevProps.selectedContest.key !== selectedContest.key)) {
            let { validation } = this.state;
            validation.name.error = "";
            validation.capacity.error = "";
            validation.registration_from.error = "";
            validation.registration_to.error = "";
            validation.editable.error = "";
            this.setState({
                name: selectedContest.name,
                capacity: selectedContest.capacity,
                registration_from: selectedContest.registration_from,
                registration_to: selectedContest.registration_to,
                editable: selectedContest.editable,
                validation: validation,
            })
        }
    }

    clearForm = () => {
        let {
            name, capacity, registration_from, registration_to, editable, validation
        } = this.state;
        name = "";
        capacity = "";
        registration_from = "";
        registration_to = "";
        editable = "";
        validation.name.error = "";
        validation.capacity.error = "";
        validation.registration_from.error = "";
        validation.registration_to.error = "";
        validation.editable.error = "";
        this.setState({
            name, capacity, registration_from, registration_to, editable, validation
        });
    };

    // checks if there are validation errors and then calls the create or update accordingly.
    onSubmit = e => {
        e.preventDefault();
        const { name, capacity, registration_from, registration_to, editable, validation } = this.state;
        const { selectedContest, createContest, updateContest } = this.props;
        if (!(validation.name.error || validation.registration_from.error || validation.capacity.error
            || validation.registration_to.error || validation.editable.error)) {
            if (isEmpty(selectedContest)) {
                createContest(
                    name, capacity, registration_from, registration_to, editable
                );
            } else {
                updateContest(
                    selectedContest.key, name, capacity, registration_from, registration_to, editable
                );
            }
        }
    };

    onNameChange = e => {
        this.setState({ name: e.target.value });
    };

    onCapacityChange = e => {
        this.setState({ capacity: e.target.value });
    };

    onDateOfCreationChange = value => {
        this.setState({ registration_from: value });
    };

    onDateOfCreationChange2 = value => {
        this.setState({ registration_to: value });
    };

    onTypeChange = e => {
        this.setState({ registration_to: e.target.value });
    };

    onEditableChange = e => {
        this.setState({ editable: e.target.value });
    };

    validateName = () => {
        let { validation } = this.state;
        if (validation.name.required && this.state.name === "") {
            validation.name.error = "This field is required";
        } else {
            validation.name.error = "";
        }
        this.setState({ validation: validation });
    };

    validateEmailOfCreator
        = () => {
            let { validation } = this.state;
            if (this.state.capacity !== "") {
                if (!validateEmailOfCreator
                    (this.state.capacity)) {
                    validation.capacity.error = "This field is not valid email.";
                } else {
                    validation.capacity.error = "";
                }
                this.setState({ validation: validation });
            } else {
                if (validation.capacity.required) {
                    validation.capacity.error = "This field is required.";
                    this.setState({ validation: validation });
                }
            }
        };

    validateType = () => {
        let { validation } = this.state;
        if (validation.registration_to.required && this.state.registration_to === "") {
            validation.registration_to.error = "This field is required.";
        } else {
            validation.registration_to.error = ""
        }
        this.setState({ validation: validation });
    };

    disablePastDays = current => {
        return current && current <= moment().endOf('day');
    };

    render() {
        const { selectedContest, clearStatus } = this.props;

        return (
            <Fragment>
                <form>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Contest Name</label>
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
                                <label className="required-field">Capacity</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.state.capacity}
                                    onChange={this.onCapacityChange}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.capacity.error &&
                                    <div className="input-error">{this.state.validation.capacity.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label>Registration From</label>
                            </Col>
                            <div className={{ "display": "flex" }} onClick={clearStatus}>
                                <DatePicker
                                    style={{ "display": "flex" }}
                                    value={this.state.registration_from ? moment(this.state.registration_from) : null}
                                    onChange={this.onDateOfCreationChange}
                                    disabledDate={this.disablePastDays}
                                />
                            </div>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label className="required-field">Registration To</label>
                            </Col>
                            <div className={{ "display": "flex" }} onClick={clearStatus}>
                                <DatePicker
                                    style={{ "display": "flex" }}
                                    value={this.state.registration_to ? moment(this.state.registration_to) : null}
                                    onChange={this.onDateOfCreationChange2}
                                    disabledDate={this.disablePastDays}
                                />
                            </div>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label>Editable</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.state.editable}
                                    onChange={this.onEditableChange}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.editable.error &&
                                    <div className="input-error">{this.state.validation.editable.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <Button registration_to="primary" htmlType="submit" onClick={this.onSubmit}>
                        {isEmpty(selectedContest) ? "Create" : "Update"}
                    </Button>
                </form>
            </Fragment>
        );
    }
}

ContestForm.propTypes = {
    createContest: PropTypes.func.isRequired,
    fetchContestsInfo: PropTypes.func.isRequired,
    updateContest: PropTypes.func.isRequired,
    clearFlag: PropTypes.bool.isRequired,
    setClearFlag: PropTypes.func.isRequired,
    selectedContest: PropTypes.object.isRequired,
    clearStatus: PropTypes.func.isRequired
};

export default ContestForm;