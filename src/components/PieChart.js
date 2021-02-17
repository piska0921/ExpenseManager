import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { Colors } from '../utility'

const pieColors = Object.values(Colors)

const customizedPieChart = ({ title, data }) => {
    if (data.length === 0) {
        return <h3 className="text-center mx-3">No records for {title}</h3>
    }
    return (<div className="mt-3">
        <h4 className="text-center mx-3" style={{ color: "#555"}}>{title}</h4>
        <ResponsiveContainer width={320} height={300}>
            <PieChart>
            <Legend verticalAlign="bottom" align="center" />
                <Pie
                    data={data}
                    cx={'50%'}
                    cy={'50%'}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label>

                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    </div>)


}
customizedPieChart.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
}
export default customizedPieChart