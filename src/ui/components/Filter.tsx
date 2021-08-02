import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement> | any) => {
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
        <div className="filter-cont">
            <label htmlFor="district">Filter by District: </label>
            <Form.Group>
                <Form.Select style={{marginRight: "1rem"}} className="filter-select" name="districtInput" value={state.districtInput} onChange={handleChange}>
                    <option value="1">District One</option>
                    <option value="2">District Two</option>
                </Form.Select>
                <label htmlFor="activeUsers">Active Users Only: </label>
                <Form.Check type="checkbox" name="activeToggle" checked={state.activeToggle} onChange={handleChange} />
            </Form.Group>
        </div>
    );
};

export default Filter;
