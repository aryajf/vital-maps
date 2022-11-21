import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import { LogOut, reset } from '../../features/authSlice';
import '../../features/Hospital.scss';

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isError } = useSelector((state) => state.auth)

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
      <section className="h-100 w-100" style={{ boxSizing: 'border-box', backgroundColor: '#FFFFFF' }}>
        <div className="container-fluid mx-auto p-0 position-relative">
          <nav className="sidebar">
            <div className="profile d-flex flex-lg-row flex-column align-items-center">
              <img style={{ marginRight: '0.75rem' }} src="./Assets/Images/avatar_profile.png" width={60} height={60} alt="Logo Vital Maps" />
              <p className="username">{user?.name}</p>
            </div>
            <ul className="nav flex-column align-content-center">
              <li className="nav-item active mb-3 dashboard">
                <a className="nav-link" href="#">
                  <span className="icon">
                    <img src="./Assets/Icons/dashboard.png" width={20} height={20} alt="" />
                  </span>
                  Dashboard
                </a>
              </li>
              <li className="nav-item mb-3">
                <a className="nav-link" href="./Hospital.jsx">
                  <span className="icon">
                    <img src="./Assets/Icons/home.png" width={20} height={20} alt="" />
                  </span>
                  Hospitals
                </a>
              </li>
              <li className="nav-item mb-3">
                <a className="nav-link" onClick={logout}>
                  <span className="icon">
                    <img src="./Assets/Icons/arrow-logout.png" width={20} height={20} alt="" />
                  </span>
                  Logout
                </a>
              </li>
            </ul>
          </nav>
          <div className="content">
            <div className="recently d-flex flex-column">
              <h2 className="content-title">Recent Hospital Data</h2>
              {/* Table Start */}
              <table className="table table-responsive table-striped">
                <thead>
                  <tr>
                    <th style={{ borderRadius: '0.5em 0 0 0' }}>No</th>
                    <th>Hospital</th>
                    <th>Code</th>
                    <th>Address</th>
                    <th>Call Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Rumah Sakit Umum Daerah Hasan Sadikin</td>
                    <td>4H2X+P9 Pasteur, Kota Bandung, Jawa Barat</td>
                    <td>Jl. Pasteur No.38, Pasteur, Kec. Sukajadi, Kota Bandung, Jawa Barat 40161</td>
                    <td>(022) 2034953</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Rumah Sakit Al Islam</td>
                    <td>3M69+9M Manjahlega, Kota Bandung, Jawa Barat</td>
                    <td>Jl. Soekarno Hatta No.644, Manjahlega, Kec. Rancasari, Kota Bandung, Jawa Barat 40286</td>
                    <td>(022) 7562046</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Rumah Sakit Umum Daerah Hasan Sadikin</td>
                    <td>4H2X+P9 Pasteur, Kota Bandung, Jawa Barat</td>
                    <td>Jl. Pasteur No.38, Pasteur, Kec. Sukajadi, Kota Bandung, Jawa Barat 40161</td>
                    <td>(022) 2034953</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Rumah Sakit Umum Daerah Hasan Sadikin</td>
                    <td>4H2X+P9 Pasteur, Kota Bandung, Jawa Barat</td>
                    <td>Jl. Pasteur No.38, Pasteur, Kec. Sukajadi, Kota Bandung, Jawa Barat 40161</td>
                    <td>(022) 2034953</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Rumah Sakit Umum Daerah Hasan Sadikin</td>
                    <td>4H2X+P9 Pasteur, Kota Bandung, Jawa Barat</td>
                    <td>Jl. Pasteur No.38, Pasteur, Kec. Sukajadi, Kota Bandung, Jawa Barat 40161</td>
                    <td>(022) 2034953</td>
                  </tr>
                </tbody>
              </table>
              {/* Table End */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
