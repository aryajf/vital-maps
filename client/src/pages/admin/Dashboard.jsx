import React from "react"
import Sidebar from "../../components/Sidebar"
import "../../features/Hospital.scss"

const Dashboard = () => {
  return (
    <>
      <section
        className="h-100 w-100"
        style={{ boxSizing: "border-box", backgroundColor: "#FFFFFF" }}
      >
        <div className="container-fluid mx-auto p-0 position-relative">
          <Sidebar />
          <div className="content">
            <div className="recently d-flex flex-column">
              <h2 className="content-title">Recent Hospital Data</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard
