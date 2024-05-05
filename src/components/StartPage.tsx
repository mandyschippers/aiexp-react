import React, { useState, useEffect } from 'react';
import api from '../api/index.ts';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

/** typescript function **/
function StartPage() {

    const [name, setName] = useState('');
    const [conversations, setConversations] = useState([]); // [conversation1, conversation2, conversation3
    const navigate = useNavigate();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const startNewConversation = () => {
        api.post('/new_conversation', { name })
            .then(response => {
                setName('');
                if (response.data.conversation_id) {
                    navigate(`/conversation/${response.data.conversation_id}`);
                }  
            })
            .catch(error => {
                console.error('Error starting new conversation', error);
            });
    }

    useEffect(() => {
        api.get('/get_conversations')
            .then(response => {
                setConversations(response.data);
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
            {conversations.map((conversation: any) => (
                <li key={conversation.id}>
                    <Link to={`/conversation/${conversation.id}`}>{conversation.name}</Link>
                </li>
            ))}
        </ul>
        <h2>Start a new conversation</h2>
        <label htmlFor="name">Please name your new conversation</label>
        <br />
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