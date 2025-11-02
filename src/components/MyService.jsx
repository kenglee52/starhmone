import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function MyService() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="my-5" id='sectionService'>
      {/* ບໍລິການໃຫ້ຂໍ້ມູນ */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6} data-aos="fade-right" className="d-flex justify-content-center">
              <div className="service-img-circle shadow-lg">
                <img src="https://www.signpost.com/wp-content/uploads/2021/11/call-center-customer-service-tips-scaled.jpeg" alt="Information Service" className="img-fluid rounded-circle" style={{ maxWidth: '100%', width: 360, height: 'auto', objectFit: 'cover', border: '6px solid #fff' }} />
              </div>
            </Col>
            <Col md={6} data-aos="fade-left">
              <h2 className="mb-3 fw-bold text-primary">ບໍລິການໃຫ້ຂໍ້ມູນ</h2>
              <p className="lead text-secondary">ເຮົາມີການໃຫ້ຄຳປຶກສາ ແລະ ຂໍ້ມູນກ່ຽວກັບຊັບສິນ ເພື່ອຊ່ວຍໃຫ້ທ່ານຕັດສິນໃຈໄດ້ຖືກຕ້ອງ ແລະ ປອດໄພ.</p>
              <ul className="list-unstyled mt-4">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ຄຳປຶກສາດ້ານກົດໝາຍ</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> ຂໍ້ມູນຕະຫຼາດຊັບສິນລ່າສຸດ</li>
                <li><i className="bi bi-check-circle-fill text-success me-2"></i> ບໍລິການດ້ວຍຄວາມເປັນມືອາຊີບ</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ບໍລິການເບິ່ງຊັບສິນ, ທີ່ດິນ, ຫ້ອງເຊົ່າ ແລະ ອື່ນໆ ເຖິງທີ່ */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center flex-md-row-reverse">
            <Col md={6} data-aos="fade-left" className="d-flex justify-content-center">
              <img src="https://houseofit.ph/wp-content/uploads/2025/06/The-Ideal-Help-Desk-SERVICE-Your-Managed-Service-Provider-Should-Have.jpg" alt="On-site Service" className="img-fluid rounded shadow-lg" style={{ maxWidth: '100%', width: 600, height: 'auto', borderRadius: '2rem' }} />
            </Col>
            <Col md={6} data-aos="fade-right">
              <h2 className="mb-3 fw-bold text-success">ບໍລິການເບິ່ງຊັບສິນ ເຖິງທີ່</h2>
              <p className="lead text-secondary">ພວກເຮົາມີບໍລິການເບິ່ງຊັບສິນ, ທີ່ດິນ, ຫ້ອງເຊົ່າ ແລະ ອື່ນໆ ເຖິງສະຖານທີ່ຈິງ ເພື່ອໃຫ້ທ່ານເຫັນຄວາມແທ້ຈິງກ່ອນຕັດສິນໃຈ.</p>
              <ul className="list-unstyled mt-4">
                <li className="mb-2"><i className="bi bi-geo-alt-fill text-danger me-2"></i> ເບິ່ງສິນຄ້າຫຼາຍປະເພດ</li>
                <li className="mb-2"><i className="bi bi-calendar-check-fill text-primary me-2"></i> ຈອງນັດເບິ່ງສະດວກ</li>
                <li><i className="bi bi-people-fill text-info me-2"></i> ບໍລິການດ້ວຍທີມງານມືອາຊີບ</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ບໍລິການໃນການໂພສຊັບສິນ */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6} data-aos="fade-right" className="d-flex justify-content-center">
              <div className="service-img-circle shadow-lg">
                <img src="https://cdn-icons-png.freepik.com/256/13842/13842675.png?semt=ais_white_label" alt="Post Service" className="img-fluid rounded-circle" style={{ maxWidth: '100%', width: 360, height: 'auto', objectFit: 'cover', border: '6px solid #fff' }} />
              </div>
            </Col>
            <Col md={6} data-aos="fade-left">
              <h2 className="mb-3 fw-bold text-warning">ບໍລິການໃນການໂພສຊັບສິນ</h2>
              <p className="lead text-secondary">ທ່ານສາມາດໂພສຊັບສິນ ເພື່ອຂາຍ ຫຼື ໃຫ້ເຊົ່າ ຜ່ານເວັບໄຊຂອງເຮົາ ໄດ້ຢ່າງງ່າຍດາຍ ແລະ ມີປະສິດທິພາບ.</p>
              <ul className="list-unstyled mt-4">
                <li className="mb-2"><i className="bi bi-upload text-primary me-2"></i> ໂພສຊັບສິນງ່າຍດາຍ</li>
                <li className="mb-2"><i className="bi bi-lightning-fill text-warning me-2"></i> ປະກົບຜົນໄວ</li>
                <li><i className="bi bi-globe2 text-success me-2"></i> ສົ່ງຖຶງລູກຄ້າຫຼາຍກຸ່ມ</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Custom styles for circle images */}
      <style>{`
        .service-img-circle {
          background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
          padding: 12px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 8px 32px rgba(60, 60, 120, 0.8);
        }
        @media (max-width: 576px) {
          .service-img-circle img {
            width: 180px !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
