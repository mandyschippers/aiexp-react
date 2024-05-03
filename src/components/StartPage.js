import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StartPage() {

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
        </div>
    )
}

export default StartPage;