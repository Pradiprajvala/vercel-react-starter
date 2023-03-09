import '../styles/Sidebar.css'
import {Link} from 'react-router-dom'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import React, { useState } from 'react'
import { Slider } from '@mui/material';
import { useDataLayerValue } from '../DataLayers/DataLayer';
const Sidebar = () => {
    const [selectedCatagories, setSelectedCatagories] = useState({Sport: false, SUV: false, MPV: false, Sedan: false, Coupe: false, Hatchback: false });
    const [selectedCapacity, setSelectedCapacity] = useState({2: false, 4: false, 6: false, 8: false});
    return (
    <div className="sidebar">
        <Link to='/postCar' className='postCarLink'> Post Car</Link>
        <div className="sidebar__container">
        <p>TYPE</p>
        <SidebarCarCatagory selectedCatagories={selectedCatagories} setSelectedCatagories={setSelectedCatagories} title='Sport' availableCars={10}/>
        <SidebarCarCatagory selectedCatagories={selectedCatagories} setSelectedCatagories={setSelectedCatagories} title='SUV' availableCars={12}/>
        <SidebarCarCatagory selectedCatagories={selectedCatagories} setSelectedCatagories={setSelectedCatagories} title='MPV' availableCars={16}/>
        <SidebarCarCatagory selectedCatagories={selectedCatagories} setSelectedCatagories={setSelectedCatagories} title='Sedan' availableCars={20}/>
        <SidebarCarCatagory selectedCatagories={selectedCatagories} setSelectedCatagories={setSelectedCatagories} title='Coupe' availableCars={14}/>
        <SidebarCarCatagory selectedCatagories={selectedCatagories} setSelectedCatagories={setSelectedCatagories} title='Hatchback' availableCars={14}/>
        <p>CAPACITY</p>
        <SidebarCarCapacity selectedCapacity={selectedCapacity} setSelectedCapacity={setSelectedCapacity} title='2 Person' availableCars={10}/>
        <SidebarCarCapacity selectedCapacity={selectedCapacity} setSelectedCapacity={setSelectedCapacity} title='4 Person' availableCars={14}/>
        <SidebarCarCapacity selectedCapacity={selectedCapacity} setSelectedCapacity={setSelectedCapacity} title='6 Person' availableCars={12}/>
        <SidebarCarCapacity selectedCapacity={selectedCapacity} setSelectedCapacity={setSelectedCapacity} title='8 or More' availableCars={16}/>
        <p>PRICE</p>
        <div className='slider'>
        <Slider />
        </div>
        <h4>Max. $100.00</h4>
        </div>
    </div>
  )
}

const SidebarCarCatagory = ({title,availableCars,selectedCatagories,setSelectedCatagories}) => {
    const [,dispatch] = useDataLayerValue();
    const [selected, setSelected] = useState(selectedCatagories[title]);
    const handleChange = (newValue) => {
        setSelected(newValue);
        setSelectedCatagories({...selectedCatagories, [title]: newValue});
        dispatch({
            type: 'SET_FILTER_CATAGORY',
            filterCatagory: {...selectedCatagories, [title]: newValue}
        });
    };
    return (
        <div className='sidecar__carCatagory'>  
            {  
                selected ? <CheckBoxIcon style={{color: '#3563E9', width: '24px'}}  className='sidecar__carCatagoryIcon' onClick={() => handleChange(false)} /> : <CheckBoxOutlineBlankIcon style={{color: '#90A3BF', width: '24px'}} className='sidecar__carCatagoryIcon' onClick={() => handleChange(true) }/>
            }
            <h4>{title}</h4>
            <p>({availableCars})</p>
        </div>
    )
}


const SidebarCarCapacity = ({selectedCapacity, setSelectedCapacity, title, availableCars}) => {
    const [,dispatch] = useDataLayerValue();
    const [selected, setSelected] = useState(selectedCapacity[title=== '2 Person' ? '2' : title === '4 Person' ? '4' : title === '6 Person' ? '6' : '8']);
    const handleChange = (newValue) => {
        setSelected(newValue);
        setSelectedCapacity({...selectedCapacity, [title=== '2 Person' ? '2' : title === '4 Person' ? '4' : title === '6 Person' ? '6' : '8']: newValue});
        dispatch({
            type: 'SET_FILTER_CAPACITY',
            filterCapacity: {...selectedCapacity, [title=== '2 Person' ? '2' : title === '4 Person' ? '4' : title === '6 Person' ? '6' : '8']: newValue}
        });
    };

    return (
        <div className='sidecar__carCatagory'>
            {  
                selected ? <CheckBoxIcon style={{color: '#3563E9', width: '24px'}}   className='sidecar__carCatagoryIcon' onClick={() => handleChange(false)} /> : <CheckBoxOutlineBlankIcon style={{color: '#90A3BF', width: '24px'}} className='sidecar__carCatagoryIcon' onClick={() => handleChange(true)} />
            }
            <h4>{title}</h4>
            <p>({availableCars})</p>
        </div>
    )
}


export default Sidebar