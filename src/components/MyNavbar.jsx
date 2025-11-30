import React,{useEffect,useState} from 'react';
import {Navbar,Container,Nav,Button} from 'react-bootstrap';
import AOS from "aos";
import "aos/dist/aos.css";

export default function MyNavbar() {
  const [likedCount,setLikedCount]=useState(() => {
    const saved=localStorage.getItem('likedProducts');
    return saved? JSON.parse(saved).length:0;
  });

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true
    });
  },[]);

  useEffect(() => {
    const updateCount=() => {
      const saved=localStorage.getItem('likedProducts');
      setLikedCount(saved? JSON.parse(saved).length:0);
    };
    window.addEventListener('likedProductsChanged',updateCount);
    updateCount();
    return () => window.removeEventListener('likedProductsChanged',updateCount);
  },[]);

  return (
    <Navbar
      data-aos="zoom-out"
      expand="lg"
      fixed="top"
      className="shadow-lg py-3 bg-white"
    >
      <Container>
        <Navbar.Brand href="#home" className="fw-bold text-danger">
          Star Home
        </Navbar.Brand>

        {/* ใช้ div ครอบปุ่มแล้วดันไปขวา */}
        <div className="ms-auto d-flex gap-2 order-lg-last" >
          <Button
            variant="success"
            className="fw-bold px-4"
            as="a" // ບອກ React Bootstrap ວ່າໃຫ້ໃຊ້ເປັນ <a> tag
            href="https://wa.me/8562051519883" // ເບີໂທລະສັບ 856 + 20 + 54024453
            target="_blank" // ເປີດໃນໜ້າຕ່າງໃໝ່ (ແນະນຳສຳລັບລິ້ງພາຍນອກ)
            rel="noopener noreferrer" // ແນະນຳເພື່ອຄວາມປອດໄພ
          >
            ຕິດຕໍ່
          </Button>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler ms-2">
          <span className="toggler-bar"></span>
          <span className="toggler-bar"></span>
          <span className="toggler-bar"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home" className="active text-danger">ໜ້າຫຼັກ</Nav.Link>
            <Nav.Link className="text-danger" href="#MyProductSection">ຊັບສິນຫຼ້າສຸດ</Nav.Link>
            &nbsp;
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
