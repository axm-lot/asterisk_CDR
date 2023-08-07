import axios from 'axios'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const View = () => {

    const [tableData, setTableData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [nbData, setNbData] = useState([])

    useEffect(() => {
        getData();
        getNb();
    }, [])

    const getData = async () => {
        const response = await axios.get(`http://192.168.1.114:3000/data`)
        const data = response.data
        setTableData(data)
        setFilteredData(data)
    }

    const getNb = async () => {
        const response = await axios.get(`http://192.168.1.114:3000/count_cdr`)
        const data = response.data[0]
        setNbData(data)
    }

    const filter = async (key) => {
        const useful = tableData.filter((room) =>
            room.src.includes(key) ||
            room.dst.includes(key) ||
            room.billsec.toString().includes(key) ||
            (`${new Date(room.calldate).getFullYear()} - ${(new Date(room.calldate).getMonth() + 1).toString().padStart(2, '0')}-${new Date(room.calldate).getDate().toString().padStart(2, '0')} at ${new Date(room.calldate).getHours().toString().padStart(2, '0')}:${new Date(room.calldate).getMinutes().toString().padStart(2, '0')}:${new Date(room.calldate).getSeconds().toString().padStart(2, '0')}`).toString().includes(key) ||
            room.disposition.includes(key.toUpperCase())
        );
        setFilteredData(useful);
    }

    const handleKeyChange = (event) => {
        const enteredKey = event.target.value;
        filter(enteredKey)
    };



    return (
        <>
            <h1>Call Details Record</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px' }}>
                <button className='btn btn-primary' onClick={() => { getData(); getNb() }}>Refresh</button>
                <input type='text' placeholder='Search' onChange={handleKeyChange} style={{ padding: '5px' }} />
                <button className='btn btn-danger' onClick={() => { window.location.href = "/" }}>Logout</button>
            </div>

            <div style={{ height: '370px', overflow: 'scroll' }}>
                <table className="table table-hover table-bordered">
                    <thead style={{ height: '50px', fontWeight: 'bold', borderWidth: '4px' }}>
                        <tr>
                            <th>
                                Source
                            </th>
                            <th>
                                Destination
                            </th>
                            <th>
                                Call date
                            </th>
                            <th>
                                Duration
                            </th>
                            <th>
                                Disposition
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((item, i) => (
                                <tr key={i}>
                                    <td>
                                        {item.src}
                                    </td>
                                    <td>
                                        {item.dst}
                                    </td>
                                    <td>
                                        {
                                            `${new Date(item.calldate).getFullYear()}-${(new Date(item.calldate).getMonth() + 1).toString().padStart(2, '0')}-${new Date(item.calldate).getDate().toString().padStart(2, '0')} at ${new Date(item.calldate).getHours().toString().padStart(2, '0')}:${new Date(item.calldate).getMinutes().toString().padStart(2, '0')}:${new Date(item.calldate).getSeconds().toString().padStart(2, '0')}`
                                        }
                                    </td>
                                    <td>
                                        {item.billsec} s
                                    </td>
                                    <td>
                                        {item.disposition}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <div style={{ border: '1px solid blue', height: '100px', width: '200px', margin: '20px', padding: '4px' }}>
                    <h4>Total call</h4>
                    {/* <h2>{nbData.tot}</h2> */}
                </div>
                <div style={{ border: '1px solid green', height: '100px', width: '200px', margin: '20px', padding: '4px' }}>
                    <h4>Today's call</h4>
                    {/* <h2>{nbData.today}</h2> */}
                </div>
                <div style={{ border: '1px solid red', height: '100px', width: '200px', margin: '20px', padding: '4px' }}>
                    <h4>Longest call</h4>
                    {/* <h2>{nbData.max}s</h2> */}
                </div>
            </div>

        </>
    );
}

export default View;
