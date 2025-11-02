import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import { FaShieldAlt, FaHome, FaUserCheck, FaUsers, FaRegSmile, FaRocket } from 'react-icons/fa';
import { ReactTyped } from 'react-typed';

export default function MyAbout() {
         useEffect(()=>{
            AOS.init({
          duration: 2500,
          once: true
            },[])
         })
  return (
    <div className="about-bg-gradient py-5"id='MyAbout'>
      <Container data-aos="zoom-in">
        <h2 className="text-center fw-bold mb-4 text-danger" data-aos="fade-down">
          <ReactTyped
            strings={[
              "ກ່ຽວກັບ Free Home",
              "ເປັນພື້ນທີ່ຊ່ວຍຫາຊັບສິນທີ່ດີທີ່ສຸດ",
            ]}
            typeSpeed={60}
            backSpeed={30}
            loop
          />
        </h2>
        <Row className="align-items-center mb-5">
          <Col md={6} data-aos="fade-right">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
              alt="About Free Home"
              className="img-fluid rounded shadow-lg about-img-animate"
              style={{maxHeight: '340px', objectFit: 'cover'}}
            />
          </Col>
          <Col md={6} data-aos="fade-left">
            <h3 className="fw-bold text-danger mb-3">ພັນທະ ແລະ ວິສັຍທັດ</h3>
            <p className="lead mb-3 text-secondary">
              Free Home ເປັນແພລດຟອມຊ່ວຍຫາຊັບສິນ ດິນ, ເຮືອນ, ຕຶກ, ຫ້ອງເຊົ່າ ໃນລາວ ທີ່ງ່າຍ ໄວ ແລະ ປອດໄພ.
            </p>
            <ul className="list-unstyled fs-5 mb-4">
              <li className="mb-2 d-flex align-items-center"><FaShieldAlt className="me-2 text-danger"/> ບໍລິການຟຣີ ສຳລັບທຸກຄົນ</li>
              <li className="mb-2 d-flex align-items-center"><FaHome className="me-2 text-danger"/> ຄົ້ນຫາຊັບສິນງ່າຍ ແລະ ໄວ</li>
              <li className="mb-2 d-flex align-items-center"><FaUserCheck className="me-2 text-danger"/> ຂໍ້ມູນຊັບສິນລະອຽດ ແລະ ທັນສະໄໝ</li>
              <li className="mb-2 d-flex align-items-center"><FaUsers className="me-2 text-danger"/> ທີມງານຊ່ວຍເຫຼືອ 24/7</li>
            </ul>
            <Row className="g-3">
              <Col sm={6}>
                <Card className="border-0 shadow-sm bg-light about-card-effect animate__animated animate__fadeInUp" style={{cursor: 'pointer'}}>
                  <Card.Body className="text-center">
                    <FaRegSmile className="display-6 text-danger mb-2" />
                    <h6 className="fw-bold mb-1">ລູກຄ້າພໍໃຈ</h6>
                    <p className="mb-0 text-secondary">+10,000 ຄົນ</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6}>
                <Card className="border-0 shadow-sm bg-light about-card-effect animate__animated animate__fadeInUp" style={{cursor: 'pointer'}}>
                  <Card.Body className="text-center">
                    <FaRocket className="display-6 text-danger mb-2" />
                    <h6 className="fw-bold mb-1">ຊັບສິນທີ່ປະກອບ</h6>
                    <p className="mb-0 text-secondary">+5,000 ລາຍການ</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="gy-4 mt-4">
          <Col md={4} data-aos="flip-left">
            <Card className="shadow-lg about-card-effect h-100" style={{cursor: 'pointer'}}>
              <div className="card-header bg-danger">
                <h4 className="mt-2 text-center fw-bold text-white">
                  ຄວາມປອດໄພ ແລະ ນ່າເຊື່ອຖື
                </h4>
              </div>
              <div className="card-body lead">
                <p>ລະບົບຂອງພວກເຮົາມີການລົງທະບຽນຖືກຕ້ອງຕາມກົດໝາຍ ແລະ ມີນັກການຕະຫຼາດທີ່ເຊື່ອຖືໄດ້ ພ້ອມດູແລ ແລະ ໃຫ້ຄຳປຶກສາຕ່າງໆໃຫ້ທ່ານ ພວກເຮົາພ້ອມຈະຫາທ່ານໄປເບິ່ງຊັບສິນທີ່ທ່ານຕ້ອງການໃຫ້ເຖິງທີ</p>
              </div>
            </Card>
          </Col>
          <Col md={4} data-aos="flip-up">
            <Card className="shadow-lg about-card-effect h-100" style={{cursor: 'pointer'}}>
              <div className="card-header bg-danger">
                <h4 className="mt-2 text-center fw-bold text-white">
                  ສຳລັບຜູ້ຕ້ອງການເຊົ່າ ຫຼື ຊື້
                </h4>
              </div>
              <div className="card-body lead">
                <p>ທ່ານສາມາດ ເຂົ້າມາເບິ່ງຊັບສິນທັງໝົດໄດ້ໃນເວັບໄຊ ຖ້າທ່ານສົນໃຈກະລຸນາຂຽນລະຫັດໄວ້ເພື່ອຕິດຕໍ່ພວກເຮົາ ພວກເຮົາມີພະນັກງານພ້ອມບໍລິການທ່ານໃຫ້ໄດ້ທີ່ດິນ, ເຮືອນ, ຕຶກ ຫຼື ຫ້ອງເຊົ່າໆອື່ນໃຫ້ທ່ານໄດ້ຕາມຕ້ອງການ</p>
              </div>
            </Card>
          </Col>
          <Col md={4} data-aos="flip-right">
            <Card className="shadow-lg about-card-effect h-100" style={{cursor: 'pointer'}}>
              <div className="card-header bg-danger">
                <h4 className="mt-2 text-center fw-bold text-white">
                  ສຳລັບຜູ້ຕ້ອງການປ່ອຍເຊົ່າ ຫຼື ຂາຍ
                </h4>
              </div>
              <div className="card-body lead">
                <p>ຖ້າທ່ານມີຊັບສິນທີ່ດິນ, ເຮືອນ, ຕຶກ ຫຼື ຫ້ອງເຊົ່າອື່ນໆ ທີ່ກຳລັງຈະຂາຍຫຼືເຊົ່າ ເພື່ອໃຫ້ລູກຄ້າສາມາດເຫັນໄດ້ຢ່າງທົ່ວເຖິງ ໃຫ້ທ່ານໄປຖ່າຍ ລີວິວຊັບສິນຂອງທ່ານເປັນຮູບ ແລະ ວີດີໂອ ແລ້ວຕິດຕໍ່ສົ່ງຂໍ້ມູນມາຫາພວກເຮົາ</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
