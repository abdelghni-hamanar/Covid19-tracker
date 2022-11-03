import React from 'react';

function LiveCases({data}) {
  return (
    <div className='table'>
       {data.map((country) =>(
          <tr>
          <td>{country.country}</td>
          <td>{country.cases}</td>
        </tr>
       ))}
    </div>
  )
}

export default LiveCases