import React, { useEffect, useReducer } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';

import { listTalks } from '../graphql/queries';
import { onCreateTalk } from '../graphql/subscriptions';
import { TalkerForm } from './newTalkerForm'

// Action Types
const QUERY = 'QUERY';
const SUBSCRIPTION = 'SUBSCRIPTION';

const initialState = {
    talkers: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case QUERY:
            return { ...state, talkers: action.talkers };
        case SUBSCRIPTION:
            return { ...state, talkers: [...state.talkers, action.talker] }
        default:
            return state;
    }
};

function Talkers() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function getData() {
            const todoData = await API.graphql(graphqlOperation(listTalks));
            dispatch({ type: QUERY, talkers: todoData.data.listTalks.items });
        }
        getData();

        const subscription = API.graphql(graphqlOperation(onCreateTalk)).subscribe({
            next: (eventData) => {
                const talker = eventData.value.data.onCreateTalk;
                dispatch({ type: SUBSCRIPTION, talker });
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const ListView = ({ talkers }) => (
        <div>
            <h3>All Talkers</h3>
            <ul>
                {talkers.map(talker =>
                    <li key={talker.id}>{talker.name} | {talker.speakerName}</li>
                )}
            </ul>
        </div>
    )

    return (
        <div className="App">
            <div>
                <TalkerForm />
                <ListView talkers={state.talkers} />
            </div>
        </div>
    );
}

export default Talkers;