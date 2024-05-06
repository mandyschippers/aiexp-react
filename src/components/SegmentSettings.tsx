import React, { useEffect } from 'react';
import api from '../api/index.ts';

interface SegmentSettingsProps {
    readOnly: boolean;
    segmentSettingsId: any;
}

const SegmentSettings: React.FC<SegmentSettingsProps> = ({ readOnly, segmentSettingsId }) => {

    useEffect(() => {
        api.get(`/get_segment_settings/${segmentSettingsId}`)
        .then((response) => {
            // console.log(response.data);
        })
        .catch((error) => {
            console.error('Error fetching segment settings', error);
        });
    },[segmentSettingsId]);
    return (
        <div>
            { readOnly && <h2>Read Only</h2>}
            { !readOnly && 
            (
                <>
                    <h2>Settings</h2>
                    <ModelSettingsDropdown />
                    <ModuleSettingsCheckboxes />
                </>
            )
            }
        </div>
    );
};

const ModelSettingsDropdown: React.FC = () => {
    return (
        <div>
            <label htmlFor="model">Model</label>
            <br />
            <select id="model">
                <option value="model1">Model 1</option>
                <option value="model2">Model 2</option>
                <option value="model3">Model 3</option>
            </select>
        </div>
    );
}

const ModuleSettingsCheckboxes: React.FC = () => {
    return (
        <div>
            <h3>Modules</h3>
            <input type="checkbox" id="module1" name="module1" value="module1" />
            <label htmlFor="module1">Module 1</label><br />
            <input type="checkbox" id="module2" name="module2" value="module2" />
            <label htmlFor="module2">Module 2</label><br />
            <input type="checkbox" id="module3" name="module3" value="module3" />
            <label htmlFor="module3">Module 3</label><br />
        </div>
    );
}

export default SegmentSettings;