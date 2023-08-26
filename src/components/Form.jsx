import { useState } from 'react';
import Country from './FormInputs/Country';
import Sector from './FormInputs/Sector';
import Subsector from './FormInputs/Subsector';
import Indicator from './FormInputs/Indicator';
import { customFilter } from '../customFunctions/customFilter';
import { useDispatch } from 'react-redux';
import { addFilteredDatas } from '../store/bumpChartSlicer';
import { useSelector } from 'react-redux';
import { fetchCountries } from '../store/fetchDataSlicer';
function Form({ data }) {

    const bump = useSelector((state) => state.bump);
    console.log(bump);
    const dispatch = useDispatch();

    const [flags, setFlags] = useState([])

    const [dropdowns, setDropdowns] = useState({
        country: false,
        sector: false,
        subsector: false,
        indicator: false,
    });

    const [inputs, setInputs] = useState({
        country: [],
        sector: 'Economy',
        subSector: 'GDP and Economic',
        indicator: 'Gross Domestic Production'
    })


    function handleSubClick(dropdownName) {
        setDropdowns({
            ...dropdowns,
            [dropdownName]: !dropdowns[dropdownName],
        })
    }

    function handleInput(input) {
        const name = input.getAttribute('name')
        console.log(input.getAttribute('data-value'));
        name !== 'country' ?
            setInputs({
                ...inputs,
                [name]: input.getAttribute('data-value')
            }) :
            setInputs({
                ...inputs,
                [name]: [...inputs.country, input.getAttribute('data-value')]
            })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const selected = customFilter(data, inputs);
        dispatch(addFilteredDatas(selected))
        dispatch(fetchCountries());
        console.log(bump);
    }
    console.log(flags);

    return (
        <>
            <form className='form' onSubmit={handleSubmit}>
                <Country
                    handleInput={handleInput}
                    handleSubClick={handleSubClick}
                    data={data}
                    dropdowns={dropdowns}
                    inputs={inputs}
                    changeInputs={setInputs}
                />

                <Sector
                    handleInput={handleInput}
                    handleSubClick={handleSubClick}
                    data={data}
                    dropdowns={dropdowns}
                    inputs={inputs}
                />

                <Subsector
                    handleInput={handleInput}
                    handleSubClick={handleSubClick}
                    data={data}
                    dropdowns={dropdowns}
                    inputs={inputs}
                />

                <Indicator
                    handleInput={handleInput}
                    handleSubClick={handleSubClick}
                    data={data}
                    dropdowns={dropdowns}
                    inputs={inputs}
                />

                <button className="form-submit">Submit</button>
            </form>
        </>
    );
}

export default Form;