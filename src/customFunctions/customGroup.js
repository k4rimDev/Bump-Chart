import * as d3 from 'd3';

export const customGroup = (filteredData) => {
    const groupedData = d3.group(filteredData, d => d.Country)
    groupedData.forEach((country, year) => {
        country.sort((a, b) => a.Year - b.Year)
    })
    return groupedData;
}