import React, { useEffect, useState } from 'react';
import api from '../api/index.ts';

interface SegmentSettingsProps {
    readOnly: boolean;
    segmentSettingsId: any;
    onSettingsChange: any;
}

interface SegmentSettingsInterface {
    id?: string;
    model_id?: string;
    model?: {
        id: number;
        name: string;
        description: string;
    };
    modules?: any
}

const SegmentSettings: React.FC<SegmentSettingsProps> = ({ readOnly, segmentSettingsId, onSettingsChange }) => {

    const [segmentSettings, setSegmentSettings] = useState<SegmentSettingsInterface>({});

    const handleModelChange = (selectedOption: string) => {
        setSegmentSettings(prevSettings => ({
            ...prevSettings,
            model_id: selectedOption
        }));
        console.log(selectedOption);
    };

    const handleModuleChange = (moduleId: string) => {
        setSegmentSettings(prevSettings => ({
            ...prevSettings,
            modules: prevSettings.modules.map(module =>
                module.id === moduleId ? { ...module, checked: !module.checked } : module
            )
        }));
    };

    //useEffect when segmentSettings changes to call parent component with updated settings
    useEffect(() => {
        onSettingsChange(segmentSettings);
    },[segmentSettings]);

    useEffect(() => {
        api.get(`/get_segment_settings/${segmentSettingsId}`)
        .then((response) => {
            console.log('settings', response.data);
            setSegmentSettings(response.data);
        })
        .catch((error) => {
            console.error('Error fetching segment settings', error);
        });
    },[segmentSettingsId]);

    interface ModelSettingsProps {
        onChange: (selectedOption: string) => void; // Update the return type to void
        selectedModel: string;
    }

    return (
        <div>
            { readOnly && <h2>Read Only</h2>}
            { !readOnly && segmentSettings &&
            (
                <>
                    <h2>Settings</h2>
                    <ModelSettingsDropdown onChange={handleModelChange} selectedModel={segmentSettings && segmentSettings.model ? segmentSettings.model.name : ''} />
                    <ModuleSettings modules={segmentSettings.modules} onChange={handleModuleChange} />
                </>
            )
            }
        </div>
    );
};

interface ModelSettingsProps {
    onChange: any
    selectedModel: string;
}

const ModelSettingsDropdown: React.FC<ModelSettingsProps> = ({onChange, selectedModel}) => {

    const [modelOptions, setModelOptions] = useState([]);

    useEffect(() => {
        api.get(`/get_model_options`)
        .then((response) => {
            // console.log(response.data);
            setModelOptions(response.data);
        })
        .catch((error) => {
            console.error('Error fetching models', error);
        });
    
    },[])

    

    return (
        <div>
            <label htmlFor="model">Model</label>
            <br />
            <select id="model">
                {modelOptions.map((model: any) => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                ))}
            </select>
        </div>
    );
}


const ModuleSettings: React.FC<any> = ({modules, onChange}) => {
    return (
        <div>
            <h3>Modules</h3>
            {modules && modules.map((module: any) => (
                <div key={module.id}>
                    <input type="checkbox" id={module.id} name={module.name} checked={module.checked} onChange={() => onChange(module.id)} />
                    <label htmlFor={module.id}>{module.name}</label>
                </div>
            ))}
        </div>
    );
}

export default SegmentSettings;