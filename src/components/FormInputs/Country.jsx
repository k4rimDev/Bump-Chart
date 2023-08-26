import { BiRadioCircleMarked, BiSolidDownArrow, } from 'react-icons/bi'
import { GrFormClose } from 'react-icons/gr'

function Country({ handleInput, handleSubClick, data, dropdowns, inputs, changeInputs }) {


    const removeCountry = (realItem) => {
        const newArr = inputs.country.filter((item) => item !== realItem)
        changeInputs((inputs) => ({
            ...inputs,
            country: newArr,
        }))
    }

    return (
        <div className="country">
            <div className="country-title title">Country</div>
            <div className="country-container">
                <div className="country-head">
                    {
                        inputs.country.map((item, index) => {
                            return <div key={index} className="item" id={index}>
                                <p>{item}</p>
                                <button className="remove" type='button'  onClick={()=> removeCountry(item)}><GrFormClose /></button>
                            </div>
                        })
                    }
                </div>
                <div className="country-btn">
                    <button
                        type='button'
                        className="country-arrow"
                        onClick={() => handleSubClick('country')}
                    >
                        <BiSolidDownArrow />
                    </button>
                </div>
                <div className={`country-subbox subbox-container ${dropdowns.country ? 'active-subbox' : ''}`}>
                    <ul className="subbox">
                        {[...new Set(data.map((item) => item.Country))].map((countryName, index) => {
                            return <>
                                <li
                                    key={index}
                                    className="box-item"
                                    name={'country'}
                                    data-value={countryName}
                                    onClick={(e) => handleInput(e.target)}
                                >
                                    {countryName} {inputs.country.includes(countryName) ? <BiRadioCircleMarked style={{ color: 'green' }} /> : ''}
                                </li>
                            </>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Country;