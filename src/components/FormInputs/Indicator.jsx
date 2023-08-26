import { BiSolidDownArrow, } from 'react-icons/bi'


function Indicator({ handleInput, handleSubClick, data, dropdowns, inputs }) {
    return (
        <div className="indicator">
            <div className="indicator-title">Indicator</div>
            <div className="indicator-container" onClick={() => handleSubClick('indicator')}>
                <div className="indicator-head">{inputs.indicator}</div>
                <div className="indicator-btn">
                    <button type='button' className="indicator-arrow" ><BiSolidDownArrow /></button>
                </div>

                <div className={`indicator-subbox subbox-container ${dropdowns.indicator ? 'active-subbox' : ''}`}>
                    <ul className="subbox">
                        {[...new Set(data.filter((item) => item.Subsector == inputs.subSector).map((item) => item.Indicator))].map((indicatorName, index) => {
                            return <li key={index} className="box-item" name={'indicator'} data-value={indicatorName} onClick={(e) => handleInput(e.target)}>{indicatorName}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Indicator;