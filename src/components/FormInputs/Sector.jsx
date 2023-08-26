import { BiSolidDownArrow, } from 'react-icons/bi'


function Sector({ handleInput, handleSubClick, data, dropdowns, inputs }) {
    return (
        <div className="sector">
            <div className="sector-title">Sector</div>
            <div className="sector-container" onClick={() => handleSubClick('sector')}>
                <div className="sector-head">{inputs.sector}</div>
                <div className="sector-btn">
                    <button className="sector-arrow" type='button' ><BiSolidDownArrow /></button>
                </div>
                {/* Sector Subbox */}
                <div className={`subbox-container ${dropdowns.sector ? 'active-subbox' : ''}`}>
                    <ul className="subbox">
                        {[...new Set(data.map((item) => item.Sector))].map((sectorName, index) => {
                            return <li key={index} className="box-item" name={'sector'} data-value={sectorName} onClick={(e) => handleInput(e.target)}>{sectorName}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sector;