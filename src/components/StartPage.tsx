import React, { useState, useEffect } from 'react';
import api from '../api/index.ts';

/** typescript function **/
function StartPage() {

    const [name, setName] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const startNewConversation = () => {
        api.post('/new_conversation', { name })
            .then(response => {
                console.log(response.data);
                setName('');
            })
            .catch(error => {
                console.error('Error starting new conversation', error);
            });
    }

    useEffect(() => {
        api.get('/hello')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching protected data', error);
            });
    },[])

    return (
        <div>
        <h1>Welcome to AIExp</h1>
        <h2>Conversations</h2>
        <ul style={{ listStyleType: 'none' }}>
            <li><a href="/">Testing basic conversation - March 27, 2024 09:00</a></li>
            <li><a href="/">Testing conversation with emotions - March 28, 2024 09:00</a></li>
        </ul>
        <h2>Start a new conversation</h2>
        <input
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
            />
        <button onClick={startNewConversation}>Start</button>
        </div>
    )

}

export default StartPage;