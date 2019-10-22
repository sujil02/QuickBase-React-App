import React from 'react';
import '../css/FieldBuilder.css'
import Choice from './Choice'
import MockService from "../Services/MockService";
import {Form} from "react-bootstrap";

let mockService = MockService.getInstance()
export default class FieldBuilder extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            field: props.data,
            newChoice: 'newChoice'
        }
    }

    valueChanged = (event) => {
        this.setState({
            newChoice: event.target.value
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(prevState => ({
            field: {
                ...prevState.field,
                [name]: value
            }
        }));
    }

    addChoice = () => {
        if (this.state.field.choices.length >= 50) {
            window.alert("There cannot be more than 50 choices total")
        } else if (this.state.field.choices.includes(this.state.newChoice)) {
            window.alert("Duplicates choices are not allowed.")
        } else {
            let val = mockService.addChoice(this.state.newChoice)
            this.setState(prevState => ({
                field: {
                    ...prevState.field,
                    choices: val
                }
            }));
            document.getElementById("add").value = '';
        }
    }

    deleteChoice = (choiceName) => {
        //mockService.deleteChoice(choiceName)
        // this.setState(prevState => ({
        //     field: {
        //         ...prevState.field,
        //         choices: this.state.field.choices.filter(course => course !== choiceName)
        //     }
        // }));
        this.state.field.choices = this.state.field.choices.filter(course => course !== choiceName)
        mockService.delete(choiceName)
    }

    saveChanges = () => {
        let val
        if (this.state.field.label == "") {
            window.alert("Label field is required")
        } else {
            if (this.state.field.default != "") {
                val = mockService.addChoice(this.state.field.default)
                this.setState(prevState => ({
                    field: {
                        ...prevState.field,
                        choices: val
                    }
                }));
            }
            mockService.saveField(this.state.field, val).then(response => response.json());
            //console.log(response)
        }
    }

    choiceWidget(choice) {
        // ...
        return <Choice
            choiceName={choice}
            deleteChoice={this.deleteChoice.bind(this)}
        />;
    }

    reset = () => {
        document.getElementById("form").reset();
        document.getElementById("default").value = '';
        this.setState(prevState => ({
            field: {
                ...prevState.field,
                label: "",
                default: "",
                choices: []
            }
        }));
        this.state.field.choices = []
        localStorage.removeItem("data");
        mockService.reset(this.state.field)

    }

    render() {
        return (
            <div className="container">
                <h2>Filed Builder</h2>
                <form id="form">
                    <div className="row">
                        <div className="col-sm-2">
                            <label htmlFor="label">Label<span className="alert">*</span></label>
                        </div>
                        <div className="col-sm-10">
                            <input
                                required
                                type="text"
                                id="label"
                                name="label"
                                onChange={this.handleInputChange.bind(this)}
                                placeholder="Enter Field label.."
                                defaultValue={this.state.field.label}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="type">Type</label>
                        </div>
                        <div className="col-5">
                            <select id="type" name="type">
                                <option value="multi-select">Multi-Select</option>
                                <option value="single-select">Single-Select</option>
                            </select>
                        </div>
                        <div className="col-5">
                            <input type="checkbox"
                                   name="required"
                                   id="required"
                                   onChange={this.handleInputChange.bind(this)}
                                   checked={this.state.field.required}/> A value
                            is required
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="default">Default Value</label>
                        </div>
                        <div className="col-10">
                            <input type="text"
                                   id="default"
                                   name="default"
                                   onChange={this.handleInputChange.bind(this)}
                                   placeholder="Enter Default value here.."
                                   defaultValue={this.props.data.default}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="choices">Choices</label>
                        </div>
                        <div className="col-10">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <input
                                        id="add"
                                        onChange={this.valueChanged.bind(this)}/>
                                    <a onClick={this.addChoice.bind(this)} className="btn btn-primary float-right">
                                        Add Choice
                                    </a>
                                </li>
                                {
                                    this.state.field.choices.map(
                                        choice => (this.choiceWidget(choice))
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="order">Order</label>
                        </div>
                        <div className="col-10">
                            <select id="order" name="order">
                                <option value="order-alpha">Display choices in Alphabetical Order</option>
                            </select>
                        </div>

                    </div>
                </form>

                <div>
                    <button onClick={this.saveChanges.bind(this)}
                            className="btn float-right btn-success">Save Changes
                    </button>
                    <span/>
                    <button onClick={this.reset.bind(this)}
                            className="btn  btn-danger">Reset
                    </button>
                </div>
            </div>
        )
    }


}
