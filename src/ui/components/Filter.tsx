import React, { useState, useEffect } from 'react';

interface Props {
    filterUsers: (options: {district: number, active: boolean}) => void
}

interface FilterState {
    [index: string]: number | boolean,
    districtInput: number,
    activeToggle: boolean
}

const Filter: React.FC<Props> = ({filterUsers}: Props) => {

    const [state, setState] = useState<FilterState>({
        districtInput: 1,
        activeToggle: false
    });

    useEffect(() => {
        filterUsers({district: state.districtInput, active: state.activeToggle});
    }, [state]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setState(state => {
            if (e.target.type === 'checkbox') {
                return {
                    ...state,
                    [e.target.name]: !state[e.target.name]
                };
            } else {
                return {
                    ...state,
                    [e.target.name]: parseInt(e.target.value)
                };
            }
        });
    };

    return (
        <div>
            <label htmlFor="district">Filter by District: </label>
            <select name="districtInput" value={state.districtInput} onChange={handleChange}>
                <option value="1">District One</option>
                <option value="2">District Two</option>
            </select>
            <br/>
            <label htmlFor="activeUsers">Active Users Only: </label>
            <input type="checkbox" name="activeToggle" checked={state.activeToggle} onChange={handleChange} />
        </div>
    );
};

export default Filter;
