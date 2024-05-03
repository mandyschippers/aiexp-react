import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StartPage() {

    const [talk, setTalk] = useState('');

    const handleInputChange = (event) => {
        setTalk(event.target.value);
    }

    const sendMessage = () => {
        const message = talk;
        axios.post('http://localhost:5000/api/message', { message } , {
            headers: {
                Authorization: `Bearer not_so_secret_key` // Retrieve and use token
            }
        })
            .then(response => {
                setTalk('');
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error sending message', error);
            });
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/hello', {
            headers: {
                Authorization: `Bearer not_so_secret_key` // Retrieve and use token
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching protected data', error);
            });

    })

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