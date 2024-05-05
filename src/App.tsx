import './App.css';
import React from 'react';
import StartPage from './components/StartPage.tsx';
import Conversation from './components/Conversation.tsx';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

function App() {
  const { conversationId = '' } = useParams();
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/conversation/:conversationId" element={<Conversation conversationId={conversationId} />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
