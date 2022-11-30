import React from 'react'
import Sidebar from "../../components/Sidebar"
import { Link } from "react-router-dom"
import '../../features/Hospital.scss'

const Hospital = () => {
  return (
    <section className="h-100 w-100" style={{boxSizing: 'border-box', backgroundColor: '#FFFFFF'}}>
      <div className="container-fluid mx-auto p-0 position-relative">
        <Sidebar />
        <div className="content">
          <div className="recently d-flex flex-column">
            <h2 className="content-title">Recent Hospital Data</h2>
            <Link to="/hospital/create">
              <input className='btn btn-primary' type="button" value="Input Data" />
            </Link>
            {/* Table Start */}
            <table className="table table-responsive table-striped">
              <thead>
                <tr>
                  <th style={{borderRadius: '0.5em 0 0 0'}}>No</th>
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
                <tr>
                  <td>6</td>
                  <td>Rumah Sakit Santo Borromeus</td>
                  <td>4H2X+P9 Pasteur, Kota Bandung, Jawa Barat</td>
                  <td>Jl. Pasteur No.38, Pasteur, Kec. Sukajadi, Kota Bandung, Jawa Barat 40161</td>
                  <td>(022) 2034953</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Rumah Sakit Santo Borromeus</td>
                  <td>4H2X+P9 Pasteur, Kota Bandung, Jawa Barat</td>
                  <td>Jl. Pasteur No.38, Pasteur, Kec. Sukajadi, Kota Bandung, Jawa Barat 40161</td>
                  <td>(022) 2034953</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Rumah Sakit Santo Borromeus</td>
                  <td>4H2X+P9 Pasteur, Kota Bandung, Jawa Barat</td>
                  <td>Jl. Pasteur No.38, Pasteur, Kec. Sukajadi, Kota Bandung, Jawa Barat 40161</td>
                  <td>(022) 2034953</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Rumah Sakit Santo Borromeus</td>
                  <td>4H2X+P9 Pasteur, Kota Bandung, Jawa Barat</td>
                  <td>Jl. Pasteur No.38, Pasteur, Kec. Sukajadi, Kota Bandung, Jawa Barat 40161</td>
                  <td>(022) 2034953</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Rumah Sakit Santo Borromeus</td>
                  <td>4H2X+P9 Pasteur, Kota Bandung, Jawa Barat</td>
                  <td>Jl. Pasteur No.38, Pasteur, Kec. Sukajadi, Kota Bandung, Jawa Barat 40161</td>
                  <td>(022) 2034953</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Rumah Sakit Santo Borromeus</td>
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
  )
}

export default Hospital
