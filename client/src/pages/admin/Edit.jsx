import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import MapPicker from "../../components/MapPicker";
import { getHospital, getHospitals, editHospital, reset } from "../../features/mapSlice";

const Create = () => {
  const { hospital } = useSelector((state) => state.map)
  const [cover, setCover] = useState("");
  const [title, setTitle] = useState("");
  const [alamat, setAlamat] = useState("");
  const [phone, setPhone] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [igd, setIgd] = useState("");
  const [ugd, setUgd] = useState("");
  const [icu, setIcu] = useState("");
  const [vaksin, setVaksin] = useState("");
  const [rawatInap, setRawatInap] = useState("");
  const [rawatJalan, setRawatJalan] = useState("");
  const [lab, setLab] = useState("");
  const [medicalCheckup, setMedicalCheckup] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, message } = useSelector((state) => state.map);
  const {slug} = useParams()

  const updateData = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("cover", cover);
    data.append("title", title);
    data.append("alamat", alamat);
    data.append("phone", phone);
    data.append("capacity", capacity);
    data.append("description", description);
    data.append("long", long);
    data.append("lat", lat);
    data.append("igd", igd);
    data.append("ugd", ugd);
    data.append("icu", icu);
    data.append("vaksin", vaksin);
    data.append("rawatInap", rawatInap);
    data.append("rawatJalan", rawatJalan);
    data.append("lab", lab);
    data.append("medicalCheckup", medicalCheckup);
    dispatch(editHospital({slug, data}));
    dispatch(getHospitals());
    navigate("/hospital");
  };

  useEffect(() => {
    dispatch(getHospital(slug)).then((res) => {
      if(res.payload.hospital){
        let hospital = res.payload.hospital
        setTitle(hospital.title)
        setAlamat(hospital.alamat)
        setPhone(hospital.phone)
        setCapacity(hospital.capacity)
        setDescription(hospital.description)
        setLat(hospital.lat)
        setLong(hospital.long)
        setIgd(hospital.igd)
        setUgd(hospital.ugd)
        setIcu(hospital.icu)
        setVaksin(hospital.vaksin)
        setRawatInap(hospital.rawatInap)
        setRawatJalan(hospital.rawatJalan)
        setLab(hospital.lab)
        setMedicalCheckup(hospital.medicalCheckup)
      }
    })
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/hospital");
    }
    dispatch(reset());
  }, [isSuccess, dispatch, navigate]);

  function toggle(value) {
    return !value;
  }

  function handleChangeMap(e) {
    setLat(e.lat);
    setLong(e.lng);
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
            <form onSubmit={updateData}>
              <div className="recently d-flex flex-column">
                {isError && (
                  <p className="alert alert-danger has-text-centered">
                    {message}
                  </p>
                )}
                <h2 className="content-title">Edit Data</h2>
                <div className="row justify-content-center">
                  <div className="col-10 dropzone">
                    <div className="row my-5">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-12 d-flex justify-content-center">
                            <label htmlFor="cover">
                              <img
                                src="http://100dayscss.com/codepen/upload.svg"
                                style={{ cursor: "pointer" }}
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
                </div>
                <div className="row justify-content-center">
                  <div className="col-10 input-field-border-bottom">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="title">Nama Rumah Sakit</label>
                        <br />
                        <input
                          id="title"
                          className="form-control"
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone">Nomor Telepon</label>
                        <br />
                        <input
                          id="phone"
                          className="form-control"
                          type="number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="alamat">Alamat</label>
                        <br />
                        <input
                          id="alamat"
                          className="form-control"
                          type="text"
                          value={alamat}
                          onChange={(e) => setAlamat(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="capacity">
                          Kapasitas (Per Ruangan)
                        </label>
                        <br />
                        <input
                          id="capacity"
                          className="form-control"
                          type="number"
                          value={capacity}
                          onChange={(e) => setCapacity(e.target.value)}
                        />
                      </div>
                    </div>
                    <br />
                    <label htmlFor="description">Deskripsi Rumah Sakit</label>
                    <br />
                    <textarea
                      id="description"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <br />
                    <MapPicker width="100" onChange={handleChangeMap} />
                    <br />
                    <div className="row">
                      <div className="col">
                        <label htmlFor="lat">Latitude</label>
                        <br />
                        <input
                          id="lat"
                          className="form-control"
                          type="number"
                          value={lat}
                          onChange={(e) => setLat(e.target.value)}
                          disabled
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="long">Longitude</label>
                        <br />
                        <input
                          id="long"
                          className="form-control"
                          type="number"
                          value={long}
                          onChange={(e) => setLong(e.target.value)}
                          disabled
                        />
                      </div>
                    </div>
                    <br />
                    <label>Fasilitas</label>
                    <div className="row">
                      <div className="col-md-3">
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
                      </div>
                      <div className="col-md-3">
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
                      </div>
                      <div className="col-md-3">
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
                      </div>
                      <div className="col-md-3">
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
                      </div>
                      <div className="col-md-3">
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
                      </div>
                      <div className="col-md-3">
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
                      </div>
                      <div className="col-md-3">
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
                      </div>
                      <div className="col-md-3">
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
                      </div>
                    </div>
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
  );
};

export default Create;
