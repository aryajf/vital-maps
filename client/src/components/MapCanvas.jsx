import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getHospital } from '../features/mapSlice'
import Offcanvas from 'react-bootstrap/Offcanvas';
import appConfig from "../app/config"
import { BiPhoneCall, BiMapAlt, BiPencil, BiListCheck } from "react-icons/bi"

function MapCanvas(props){
    const { hospital } = useSelector((state) => state.map)
    const dispatch = useDispatch()

    useEffect(() => {
        if(props.slug) dispatch(getHospital(props.slug))
    }, [props.slug])

    return(
        <Offcanvas show={props.show} onHide={props.handleClose}>
            <img className='w-100 img-fluid' src={appConfig.apiURL + 'images/hospital/' + hospital?.cover} alt={hospital?.title} />
            <Offcanvas.Body>
                <div className='mb-3'>
                    <h4 className='text-center'>{hospital?.title}</h4>
                </div>
                <hr />
                <div className='mb-3'>
                    <h5><BiPhoneCall /> Phone</h5>
                    <p>{hospital?.phone}</p>
                </div>
                <div className='mb-3'>
                    <h5><BiMapAlt /> Alamat</h5>
                    <p>{hospital?.alamat}</p>
                </div>
                <div className='mb-3'>
                    <h5><BiPencil /> Deskripsi</h5>
                    <p>{hospital?.description}</p>
                </div>
                <div className='mb-3'>
                    <h5><BiListCheck/> Fasilitas</h5>
                    <ul>
                        {hospital?.igd && <li>IGD</li>}
                        {hospital?.ugd && <li>UGD</li>}
                        {hospital?.vaksin && <li>Vaksin</li>}
                        {hospital?.rawatInap && <li>Rawat Inap</li>}
                        {hospital?.rawatJalan && <li>rawat Jalan</li>}
                        {hospital?.lab && <li>Lab</li>}
                        {hospital?.medicalCheckup && <li>Medical Checkup</li>}
                    </ul>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default MapCanvas