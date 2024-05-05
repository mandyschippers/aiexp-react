import React, { useState } from 'react';
import api from '../api/index.ts';

const Conversation: React.FC = () => {
    const [talk, setTalk] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTalk(event.target.value);
    };

    const sendMessage = () => {
        const message = talk;
        api.post('/message', { message })
        .then(response => {
            setTalk('');
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error sending message', error);
        });
    }

    return (
        <div>
            <input
                type="text"
                name="message"
                value={talk}
                onChange={handleInputChange}
            />
            <button onClick={() => sendMessage()}>Send</button>
        </div>
    );
};

export default Conversation;