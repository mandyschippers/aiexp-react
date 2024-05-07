import React, { useState, useEffect } from 'react';
import api from '../api/index.ts';
import { Link, useParams } from 'react-router-dom';
import SegmentSettings from './SegmentSettings.tsx';

interface ConversationInterface {
    name: string;
}

const Conversation: React.FC = () => {

    const { conversationId } = useParams();
    const [talk, setTalk] = useState('');
    const [conversation, setConversation] = useState({} as ConversationInterface); 
    const [segments, setSegments] = useState([]);
    const [segmentSettingsId, setSegmentSettingsId] = useState(0);
    const [segmentSettings, setSegmentSettings] = useState<any>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTalk(event.target.value);
    };

    const sendMessage = () => {
        const message = talk;
        api.post(`/message`, { 'message': message, 'conversation_id': conversationId, 'message_history' : segments, 'segment_settings' : formatSegmentSettings() })
        .then(response => {
            setTalk('');
            getSegments();
            // console.log(response.data);
        })
        .catch(error => {
            console.error('Error sending message', error);
        });
    }

    const getSegments = () => {
        return api.get(`/get_segments/${conversationId}`)
        .then(response => {
            setSegments(response.data);
            // console.log('segments', response.data);
        })
        .catch(error => {
            console.error('Error fetching segments', error);
        });
    }


    const onSettingsChange = (settings: any) => {
        console.log('settings updated', settings);
        setSegmentSettings(settings);
      
        
    }

    const formatSegmentSettings = () => {
        if (segmentSettings  && segmentSettings.modules) {
            const moduleIds = segmentSettings.modules.map((module: any) => module.id);
            const formattedSettings =
            {
                'segment_id': segmentSettings.id,
                'model_id': segmentSettings.model_id,
                'modules': moduleIds
            };  
            return formattedSettings;
        }
    }

    useEffect(() => {
        // console.log(conversationId)
        api.get(`/get_conversation/${conversationId}`)
        .then(response => {
            setConversation(response.data);
            api.get(`/get_segments/${response.data.id}`)
            .then(response => {
                setSegments(response.data);
                setSegmentSettingsId(response.data[response.data.length - 1].segment_settings_id);
            })
        })
        .catch(error => {
            console.error('Error fetching conversation', error);
        });
    },[conversationId]);

    return (
        <div>
            <h1>{conversation ? conversation.name : ''}</h1>
            <SegmentSettings 
                readOnly={false} 
                segmentSettingsId={segmentSettingsId}
                onSettingsChange={onSettingsChange}
            />
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {segments.map((segment: any) => (
                    <li key={segment.id}>
                        <strong>My message:</strong>
                        <br />
                        {segment.message}
                        <br />
                        <strong>Reply:</strong>
                        <br/>
                        {segment.reply}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                name="message"
                value={talk}
                onChange={handleInputChange}
            />
            <button onClick={() => sendMessage()}>Send</button>
            <br/><br/>
            <Link to="/">Back to Conversations</Link>
        </div>
    );
};

export default Conversation;