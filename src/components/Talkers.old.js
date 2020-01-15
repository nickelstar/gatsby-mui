/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Connect } from "aws-amplify-react";
// eslint-disable-next-line no-unused-vars
import Amplify, { graphqlOperation } from "aws-amplify";

import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';

class AddTalker extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            name: '',
            description: '',
            speakerName: ''
        };
    }

    handleChange(name, event) {
        this.setState({ [name]: event.target.value });
    }

    async submit() {
        const { onCreate } = this.props;
        const input = {
            name: this.state.name,
            description: this.state.description,
            speakerName: this.state.speakerName

        }
        console.log(input);

        try {
            await onCreate({ input })
        } catch (err) {
            console.error(err);
        }

    }

    render() {
        return (
            <div>
                <input
                    name="name"
                    placeholder="name"
                    onChange={(event) => { this.handleChange('name', event) }}
                />
                <input
                    name="description"
                    placeholder="description"
                    onChange={(event) => { this.handleChange('description', event) }}
                />
                <input
                    name="speakerName"
                    placeholder="speakerName"
                    onChange={(event) => { this.handleChange('speakerName', event) }}
                />
                <button onClick={this.submit}>
                    Add
            </button>
            </div>
        );
    }
}

class Talkers extends Component {
    render() {

        const ListView = ({ todos }) => (
            <div>
                <h3>All Talkers</h3>
                <ul>
                    {todos.map(todo => <li key={todo.id}>{todo.name}</li>)}
                </ul>
            </div>
        )

        return (
            <div className="App">
                <Connect mutation={graphqlOperation(mutations.createTalk)}>
                    {({ mutation }) => (
                        <AddTalker onCreate={mutation} />
                    )}
                </Connect>

                <Connect query={graphqlOperation(queries.listTalks)}
                    subscription={graphqlOperation(subscriptions.onCreateTalk)}
                    onSubscriptionMsg={(prev, { onCreateTalk }) => {
                        console.log('Subscription data:', onCreateTalk)
                        return prev;
                    }
                    }>
                    {({ data: { listTalks }, loading, error }) => {
                        if (error) return <h3>Error</h3>;
                        if (loading || !listTalks) return <h3>Loading...</h3>;
                        return (<ListView todos={listTalks.items} />);
                    }}
                </Connect>
            </div>

        );
    }
}

export default Talkers;