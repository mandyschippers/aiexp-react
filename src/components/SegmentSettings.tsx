import React, { useEffect, useState } from 'react';
import api from '../api/index.ts';

interface SegmentSettingsProps {
    readOnly: boolean;
    segmentSettingsId: any;
}

interface SegmentSettingsInterface {
    id: string;
    model_id: string;
    model: {
        id: number;
        name: string;
        description: string;
    };
    modules: string[];
}

const SegmentSettings: React.FC<SegmentSettingsProps> = ({ readOnly, segmentSettingsId }) => {

    const [segmentSettings, setSegmentSettings] = useState({});

    const handleModelChange = (selectedOption) => {
        console.log(selectedOption);
      };

    const handleModuleChange = (selectedOptions) => {
        console.log(selectedOptions);
    };

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
                    <ModuleSettingsCheckboxes onChange={handleModuleChange} selectedModules={segmentSettings && segmentSettings.modules ? segmentSettings.modules : []} />
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
            console.log(response.data);
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
            <select id="model" onChange={(event) => onChange(event.target.value)}>
                {modelOptions.map((model: any) => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                ))}
            </select>
        </div>
    );
}

interface ModuleSettingsProps {
    onChange: any;
    selectedModules: string[];
}

const ModuleSettingsCheckboxes: React.FC<ModuleSettingsProps> = ({onChange, selectedModules}) => {

    const [moduleOptions, setModuleOptions] = useState([]);

    useEffect(() => {
        api.get(`/get_module_options`)
        .then((response) => {
            console.log('test', response.data);
            response.data.map ((module: any) => {
                console.log('includes', module, selectedModules);
                module.checked = selectedModules.includes(module.id);
                return module;
            });
            console.log(response.data);
            setModuleOptions(response.data);
        })
        .catch((error) => {
            console.error('Error fetching modules', error);
        });
    
    },[])

    return (
        <div>
            <h3>Modules</h3>
            {/* loop through ModuleOptions and create checkbox input and label for each */}
            {moduleOptions.map((module: any) => (
                <div key={module.id}>
                    <input type="checkbox" id={module.id} name={module.id} value={module.id} defaultChecked={module.checked} />
                    <label htmlFor={module.id}>{module.name}</label><br />
                </div>
            ))}
        </div>
    );
}

export default SegmentSettings;