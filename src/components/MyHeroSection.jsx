import React from 'react';
import {Container,Row,Col,Button} from 'react-bootstrap';
import {ReactTyped} from 'react-typed'; // ✅ default import
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from 'react';
export default function MyHeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true
    })
  },[])
  return (
    <section className="hero-section-mallow d-flex align-items-center position-relative text-white" style={{marginTop: '73px'}} id='home'>
      <Container>
        <Row className="align-items-center">
          <Col md={12} className="mb-4 mb-md-0">
            <h1 className="display-5 fw-bold mb-3 text-center" data-aos="fade-right" style={{fontSize: 'clamp(1.5rem, 5vw, 3rem)'}}>
              <ReactTyped
                strings={[
                  "Star Home ຍິນດີຕ້ອນຮັບ",
                  "ຊ່ວຍຫາຊັບສິນທີ່ທ່ານຕ້ອງການ",
                  "ບໍລິການຟຣີ ໄວ້ໃຈໄດ້!"
                ]}
                typeSpeed={60}
                backSpeed={30}
                loop
              />
            </h1>
            <p
              className="mb-4 text-center"
              data-aos="fade-right"
              style={{fontSize: 'clamp(1rem, 2.5vw, 1.2rem)'}}
            >
              ພວກເຮົາພ້ອມທີ່ຈະຊ່ວຍທ່ານໃຫ້ໄດ້ທີ່ດິນ, ຕຶກ, ຄອນໂດ ຫຼື ຫ້ອງເຊົ່າ ໄດ້ຕາມທີ່ທ່ານຕ້ອງການໄດ້<br />
              ຖ້າທ່ານມີຊັບສິນທີ່ຢ່າປ່ອຍໃຫ້ເຊົ່າ ຫຼື ຂາຍ ສາມາດກົດປຸ່ມຕິດຕໍ່ແລ້ວໃຫ້ຂໍ້ມູນມາຫາພວກເຮົາ<br />
              ພວກເຮົາພ້ອມຈະຊ່ວຍທ່ານ
            </p>
            <a data-aos="fade-up" href='#MyProductSection'
              variant="info"
              className="fw-bold btn btn-info btn-lg px-4"
              style={{borderRadius: '30px'}}
            >
              ເບິ່ງຊັບສິນທັງໝົດ
            </a>&nbsp;&nbsp;
          </Col>
        </Row>
      </Container>
      <div className="mallow-wave">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,224L48,197.3C96,171,192,117,288,117.3C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,122.7C1248,128,1344,192,1392,224L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
