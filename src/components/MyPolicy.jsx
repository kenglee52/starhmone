import React, { useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const policyList = [
  'ຂໍ້ມູນທີ່ສົ່ງມາຕ້ອງເປັນຄວາມຈິງ ແລະ ຖືກຕ້ອງ',
  'ຫ້າມໂພສຊັບສິນທີ່ບໍ່ມີຢູ່ຈິງ ຫຼື ບໍ່ມີສິດຂາຍ/ເຊົ່າ',
  'ຮູບພາບ ແລະ ຂໍ້ມູນຕ້ອງບໍ່ລະເມີດກົດໝາຍ ແລະ ຈັດຫາມາດ້ວຍຕົນເອງ',
  'ຫ້າມໃສ່ຂໍ້ມູນຫຼອກລວງ ຫຼື ສິ່ງທີ່ຜິດກົດໝາຍ',
  'ທຸກການສົ່ງຂໍ້ມູນມາຈະຖືວ່າຍິນຍອມໃຫ້ເຮົາເກັບຮັບ ແລະ ເຜີຍແຜ່ຂໍ້ມູນນັ້ນ',
  'ຫາກພົບການລະເມີດ ທາງເວັບມີສິດລົບ ຫຼື ບລັອກການໃຊ້ງານໄດ້',
];

export default function MyPolicy() {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);

  return (
    <div className="about-bg-gradient" style={{minHeight: '50vh'}} id='sectionPolicy'>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={8} data-aos="fade-down">
            <Card className="shadow-lg border-0" style={{cursor: 'pointer'}}>
              <Card.Body>
                <h2 className="fw-bold text-danger mb-3 text-center">ນະໂຍບາຍການໂພສຊັບສິນ</h2>
                <ul className="fs-5 mb-0">
                  {policyList.map((item, idx) => (
                    <li key={idx} className="mb-2"><i className="bi bi-check-circle-fill text-danger me-2"></i>{item}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
