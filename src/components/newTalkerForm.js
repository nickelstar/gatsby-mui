import React from "react";
import { useInput } from '../hooks/formInput';

import API, { graphqlOperation } from '@aws-amplify/api';
import { createTalk } from '../graphql/mutations';

export function TalkerForm() {
    const { value: name, bind: bindName, reset: resetName } = useInput('');
    const { value: description, bind: bindDescription, reset: resetDescription } = useInput('');
    const { value: speakerName, bind: bindSpeakerName, reset: resetSpeakerName } = useInput('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(`Submitting: ${name} ${description} ${speakerName}`);

        await API.graphql(graphqlOperation(createTalk, {
            input: {
                name,
                description,
                speakerName
            }
        }));

        resetName();
        resetDescription();
        resetSpeakerName()
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                placeholder="name"
                {...bindName}
            />
            <input
                name="description"
                placeholder="description"
                {...bindDescription}
            />
            <input
                name="speakerName"
                placeholder="speakerName"
                {...bindSpeakerName}
            />
            <button onClick={handleSubmit}>
                Add
            </button>
        </form>
    );
}