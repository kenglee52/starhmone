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
          <Button variant="success" className="fw-bold px-4">ຕິດຕໍ່</Button>
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
            <Nav.Link className="text-danger" href="#sectionService">ບໍລິການ</Nav.Link>
            <Nav.Link className="text-danger" href="#MyAbout">ລາຍລະອຽດ</Nav.Link>
            <Nav.Link className="text-danger" href="#sectionPolicy">ນະໂຍບາຍ</Nav.Link>
            <Button
              variant="danger"
              className="fw-bold px-4"
              onClick={() => {
                window.location.href="#MyProductSection"
                window.dispatchEvent(new CustomEvent('toggleLikedProducts'));
              }}
            >
              ຊັບທີ່ສົນໃຈ
            </Button>
            &nbsp;
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
