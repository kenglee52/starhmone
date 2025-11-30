import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyFooter() {
  return (
    <footer className="bg-danger text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="fw-bold mb-2">@Star Home Web service 2025</h5>
            <p className="mb-1">ຮັບພັດທະນາແອັບ, ເວັບໄຊ ແລະ ຂຽນໂປຣແກຣມຕ່າງໆ</p>
          <a href="https://wa.me/8562054024453" className="text-white fw-bold text-decoration-underline">02054024453</a>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="mb-2">
              <a href="#" className="text-white me-3" title="Facebook" style={{fontSize: '1.5rem'}}><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-3" title="Instagram" style={{fontSize: '1.5rem'}}><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white me-3" title="Line" style={{fontSize: '1.5rem'}}><i className="bi bi-line"></i></a>
              <a href="mailto:info@starhome.com" className="text-white" title="Email" style={{fontSize: '1.5rem'}}><i className="bi bi-envelope"></i></a>
            </div>
            <small className="d-block">&copy; {new Date().getFullYear()} Star Home. All rights reserved.</small>
          </div>
        </div>
      </div>
    </footer>
  )
}
