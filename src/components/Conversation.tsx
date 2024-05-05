import React, { useState, useEffect } from 'react';
import api from '../api/index.ts';
import { useParams } from 'react-router-dom';


interface ConversationInterface {
    name: string;
}

const Conversation: React.FC = () => {

    const { conversationId } = useParams();
    const [talk, setTalk] = useState('');
    const [conversation, setConversation] = useState({} as ConversationInterface); 

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTalk(event.target.value);
    };

    const sendMessage = () => {
        const message = talk;
        api.post(`/message/${conversationId}`, { message })
        .then(response => {
            setTalk('');
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error sending message', error);
        });
    }

    useEffect(() => {
        console.log(conversationId)
        api.get(`/get_conversation/${conversationId}`)
        .then(response => {
            setConversation(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error fetching conversation', error);
        });
    },[conversationId]);

    return (
        <div>
            <h1>{conversation ? conversation.name : ''}</h1>
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