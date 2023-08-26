export const customFilter = (filterData, filterInputs) => {
    return filterData.filter((item) =>
        filterInputs.country.includes(item.Country) &&
        item.Sector === filterInputs.sector &&
        item.Subsector === filterInputs.subSector &&
        item.Indicator === filterInputs.indicator
    )
}