import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/index.ts';

/** typescript function **/
function StartPage() {
    
        const [talk, setTalk] = useState<string>('');
    
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setTalk(event.target.value);
        }
    
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
                <p>Welcome to AIExp</p>
                <input                 
                    type="text"
                    name="message"
                    value={talk}
                    onChange={handleInputChange}></input>
                <button onClick={() => sendMessage()}>Send</button>
            </div>
        )
    
}

export default StartPage;