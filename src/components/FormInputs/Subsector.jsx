import { BiSolidDownArrow, } from 'react-icons/bi'


function Subsector({ handleInput, handleSubClick, data, dropdowns, inputs }) {
    return (
        <div className="subsector">
            <div className="subsector-title">Subsector</div>
            <div className="subsector-container" onClick={() => handleSubClick('subsector')}>
                <div className="subsector-head">{inputs.subSector}</div>
                <div className="subsector-btn">
                    <button type='button' className="subsector-arrow" ><BiSolidDownArrow /></button>
                </div>
                {/* SubSector box */}
                <div className={`subbox-container ${dropdowns.subsector ? 'active-subbox' : ''}`}>
                    <ul className="subbox">
                        {[...new Set(data.filter((item) => item.Sector == inputs.sector).map((item) => item.Sector == inputs.sector ? item.Subsector : ''))].map((subSectorName, index) => {
                            return <li key={index} className="box-item" name={'subSector'} data-value={subSectorName} onClick={(e) => handleInput(e.target)}>{subSectorName}</li>
                        })}

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Subsector;