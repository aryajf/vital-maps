import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import { createHospital } from "../../features/mapSlice"
import "../../features/input.scss"

const InputData = () => {
  const [cover, setCover] = useState("")
  const [title, setTitle] = useState("")
  const [alamat, setAlamat] = useState("")
  const [phone, setPhone] = useState("")
  const [capacity, setCapacity] = useState("")
  const [description, setDescription] = useState("")
  const [long, setLong] = useState("")
  const [lat, setLat] = useState("")
  const [igd, setIgd] = useState(false)
  const [ugd, setUgd] = useState(false)
  const [icu, setIcu] = useState(false)
  const [vaksin, setVaksin] = useState(false)
  const [rawatInap, setRawatInap] = useState(false)
  const [rawatJalan, setRawatJalan] = useState(false)
  const [lab, setLab] = useState(false)
  const [medicalCheckup, setMedicalCheckup] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError, isSuccess, message } = useSelector((state) => state.map)

  const createData = (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append("cover", cover)
    data.append("title", title)
    data.append("alamat", alamat)
    data.append("phone", phone)
    data.append("capacity", capacity)
    data.append("description", description)
    data.append("long", long)
    data.append("lat", lat)
    data.append("igd", igd)
    data.append("ugd", ugd)
    data.append("icu", icu)
    data.append("vaksin", vaksin)
    data.append("rawatInap", rawatInap)
    data.append("rawatJalan", rawatJalan)
    data.append("lab", lab)
    data.append("medicalCheckup", medicalCheckup)
    dispatch(createHospital(data))
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/hospital')
    }
    // dispatch(reset())
  }, [isSuccess, dispatch, navigate])

  function toggle(value) {
    return !value
  }

  return (
    <>
      <section
        className="h-100 w-100"
        style={{ boxSizing: "border-box", backgroundColor: "#FFFFFF" }}
      >
        <div className="container-fluid mx-auto p-0 position-relative">
          <Sidebar />
          <div className="content">
            <form onSubmit={createData}>
              <div className="recently d-flex flex-column">
                {isError && <p className="alert alert-danger has-text-centered">{message}</p>}
                <h2 className="content-title">Input Data Baru</h2>
                <div className="row justify-content-between">
                  <div className="col-6 dropzone">
                    <div className="row">
                      <div className="col-md-8 offset-md-2 align-self-center">
                        <div className="row">
                          <div className="col-12 d-flex justify-content-center">
                            <label htmlFor="cover">
                              <img
                                src="http://100dayscss.com/codepen/upload.svg"
                                className="upload-icon"
                                width="130px"
                                height="130px"
                              />
                            </label>
                          </div>
                          <div className="col-12 mt-3">
                            <input
                              id="cover"
                              type="file"
                              name="cover"
                              className="form-control"
                              onChange={(e) => setCover(e.target.files[0])}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col input-field-border-bottom">
                    <label htmlFor="title">Nama Rumah Sakit</label>
                    <br />
                    <input
                      id="title"
                      className="form-control"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                    <label htmlFor="alamat">Alamat</label>
                    <br />
                    <input
                      id="alamat"
                      className="form-control"
                      type="text"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                    />
                    <br />
                    <label htmlFor="phone">Call Number</label>
                    <br />
                    <input
                      id="phone"
                      className="form-control"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <br />
                    <label htmlFor="capacity">Capacity</label>
                    <br />
                    <input
                      id="capacity"
                      className="form-control"
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                    <br />
                    <label htmlFor="description">Description</label>
                    <br />
                    <textarea
                      id="description"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)} />
                    <br />
                    <label htmlFor="long">Longitude</label>
                    <br />
                    <input
                      id="long"
                      className="form-control"
                      type="number"
                      value={long}
                      onChange={(e) => setLong(e.target.value)}
                    />
                    <br />
                    <label htmlFor="lat">Latitude</label>
                    <br />
                    <input
                      id="lat"
                      className="form-control"
                      type="number"
                      value={lat}
                      onChange={(e) => setLat(e.target.value)}
                    />
                    <br />
                    <label>Fasilitas</label>
                    <br />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hobi1"
                      defaultValue="IGD"
                      id="igd"
                      checked={igd}
                      onChange={(e) => setIgd(toggle)}
                    />{" "}
                    <label htmlFor="igd">IGD</label>
                    <br />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hobi1"
                      defaultValue="UGD"
                      id="ugd"
                      checked={ugd}
                      onChange={(e) => setUgd(toggle)}
                    />{" "}
                    <label htmlFor="ugd">UGD</label>
                    <br />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hobi1"
                      defaultValue="ICU"
                      id="icu"
                      checked={icu}
                      onChange={(e) => setIcu(toggle)}
                    />{" "}
                    <label htmlFor="icu">ICU</label>
                    <br />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hobi1"
                      defaultValue="VACCINE"
                      id="vaccine"
                      checked={vaksin}
                      onChange={(e) => setVaksin(toggle)}
                    />{" "}
                    <label htmlFor="vaccine">VACCINE</label>
                    <br />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hobi1"
                      defaultValue="Rawat Inap"
                      id="rawatInap"
                      checked={rawatInap}
                      onChange={(e) => setRawatInap(toggle)}
                    />{" "}
                    <label htmlFor="rawatInap">RAWAT INAP</label>
                    <br />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hobi1"
                      defaultValue="Rawat Jalan"
                      id="rawatJalan"
                      checked={rawatJalan}
                      onChange={(e) => setRawatJalan(toggle)}
                    />{" "}
                    <label htmlFor="rawatJalan">RAWAT JALAN</label>
                    <br />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hobi1"
                      defaultValue="Laboratorium"
                      id="lab"
                      checked={lab}
                      onChange={(e) => setLab(toggle)}
                    />{" "}
                    <label htmlFor="lab">LABORATORIUM</label>
                    <br />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hobi1"
                      defaultValue="Medical Checkup"
                      id="medicalCheckup"
                      checked={medicalCheckup}
                      onChange={(e) => setMedicalCheckup(toggle)}
                    />{" "}
                    <label htmlFor="medicalCheckup">MEDICAL CHECKUP</label>
                    <br />
                    <br />
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default InputData
