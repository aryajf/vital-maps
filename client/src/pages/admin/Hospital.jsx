import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHospitals, deleteHospital } from '../../features/mapSlice'
import Sidebar from "../../components/Sidebar"
import { Link } from "react-router-dom"
import "../../assets/scss/Hospital.scss"
import { FaTrash, FaPen } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

const Hospital = () => {
  const dispatch = useDispatch()
  const { hospitals } = useSelector((state) => state.map)

  useEffect(() => {
    dispatch(getHospitals())
  }, [dispatch])

  function deleteData(slug){
    dispatch(deleteHospital(slug))
    dispatch(getHospitals())
  }

  return (
    <section className="h-100 w-100" style={{boxSizing: 'border-box', backgroundColor: '#FFFFFF'}}>
      <div className="container-fluid mx-auto p-0 position-relative">
        <Sidebar />
        <div className="content">
          <div className="recently d-flex flex-column">
            <h2 className="content-title">Recent Hospital Data</h2>
            <Link to="/hospital/create">
              <button className='btn btn-primary'><AiOutlinePlus className='mb-1'/> Tambah Data</button>
            </Link>
            {/* Table Start */}
            <table className="table table-responsive table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Nomor Telepon</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {hospitals ?
                  hospitals.length != 0 ? 
                    hospitals.map((hospital, i) => (
                      <tr key={i}>
                        <td className='text-center'>{++i}</td>
                        <td>{hospital.title}</td>
                        <td>{hospital.alamat}</td>
                        <td className='text-center'>{hospital.phone}</td>
                        <td>
                          <div className='d-flex justify-content-center align-items-center'>
                            <Link to={'/hospital/'+hospital.slug+'/edit'}>
                            <FaPen className='edit' />
                            </Link>
                            <FaTrash className='delete' onClick={() => deleteData(hospital.slug)} />
                          </div>
                        </td>
                      </tr>
                    ))
                    : null
                  : null
                }
              </tbody>
            </table>
            {/* Table End */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hospital
