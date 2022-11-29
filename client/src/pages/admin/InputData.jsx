import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import { LogOut, reset } from '../../features/authSlice';
import '../../features/input.scss';

const InputData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate('/');
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError]);

  return (
    <>
      <section className="h-100 w-100" style={{boxSizing: 'border-box', backgroundColor: '#FFFFFF'}}>
        <div className="container-fluid mx-auto p-0 position-relative">
          <nav className="sidebar">
            <div className="profile d-flex flex-lg-row flex-column align-items-center">
              <img style={{marginRight: '0.75rem'}} src="./Assets/Images/avatar_profile.png" width={60} height={60} alt="Logo Vital Maps" />
              <p className="username">Lil Salmonella</p>
            </div>
            <ul className="nav flex-column align-content-center">
              <li className="nav-item  mb-3">
                <a className="nav-link" href="/dashboard"><span className="icon"><img src="./Assets/Icons/dashboard.png" width={20} height={20} alt="" /></span>Dashboard</a>
              </li>
              <li className="nav-item mb-3">
                <a className="nav-link" href="/hospitals"><span className="icon"><img src="./Assets/Icons/home.png" width={20} height={20} alt="" /></span>Hospitals</a>
              </li>
              <li className="nav-item mb-3 ">
                <a className="nav-link" onClick={logout}><span className="icon"><img src="./Assets/Icons/arrow-logout.png" width={20} height={20} alt="" /></span>Logout</a>
              </li>
            </ul>
          </nav>
          <div className="content">
            <div className="recently d-flex flex-column">
              <h2 className="content-title">Input Data Baru</h2>
              <div className="row justify-content-between">
                <div className="col-6 dropzone">
                  <div className="row">
                    <div className="col-md-8 offset-md-2 align-self-center">
                      <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon" width="130px" height="130px" />
                      <input type="file" name="import_file" className="form-control" />
                    </div>
                  </div>  
                </div>  
                <div className="col input-field-border-bottom">               
                  <label>Hospital</label>
                  <br />
                  <input className="form-control" type="text" />
                  <br />
                  <label>Address</label>
                  <br />
                  <input className="form-control" type="text" />
                  <br />
                  <label>Call Number</label>
                  <br />
                  <input className="form-control" type="text" />
                  <br />
                  <label>Longtitude</label>
                  <br />
                  <input className="form-control" type="text" />
                  <br />
                  <label>Latitude</label>
                  <br />
                  <input className="form-control" type="text" />
                  <br />
                  <label>Fasilitas</label>
                  <br />
                  <input className="form-check-input" type="checkbox" name="hobi1" defaultValue="IGD" /> IGD<br />
                  <input className="form-check-input" type="checkbox" name="hobi1" defaultValue="UGD" /> UGD<br />
                  <input className="form-check-input" type="checkbox" name="hobi1" defaultValue="ICU" /> ICU<br />
                  <input className="form-check-input" type="checkbox" name="hobi1" defaultValue="VACCINE" /> VACCINE<br />
                  <input className="form-check-input" type="checkbox" name="hobi1" defaultValue="Rawat Inap" /> RAWAT INAP<br />
                  <input className="form-check-input" type="checkbox" name="hobi1" defaultValue="Rawat Jalan" /> RAWAT JALAN<br />
                  <input className="form-check-input" type="checkbox" name="hobi1" defaultValue="Laboratorium" /> LABORATORIUM<br />
                  <input className="form-check-input" type="checkbox" name="hobi1" defaultValue="Medical Checkup" /> MEDICAL CHECKUP<br />
                  <br />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div></section>
    </>
  );
};

export default InputData;
