import React,{useEffect,useState} from 'react';
import {Container,Row,Col,Card,Button,FormGroup,FormControl,InputGroup} from 'react-bootstrap';
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from 'sweetalert2';
import Swiper from 'swiper';
import {Navigation,Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {FaHeart,FaRegHeart} from 'react-icons/fa';

export default function MyProductSection() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true
    })
  },[]);

  const [Products,setProducts]=useState([]);
  const [showAll,setShowAll]=useState(false);
  const [search,setSearch]=useState("");
  const [selectedProvince,setSelectedProvince]=useState("");
  const [selectedDistrict,setSelectedDistrict]=useState("");
  const [selectedProductType,setSelectedProductType]=useState("");
  const [selectedPrice,setSelectedPrice]=useState("");
  const [selectedStatus,setSelectedStatus]=useState("");
  const [currentPage,setCurrentPage]=useState(1);
  const pageSize=16;
  const LoadData=async () => {
    const response=await fetch('http://localhost:3000/api/products',{
      method: 'GET'
    });
    if(response.status===200) {
      const responseData=await response.json();
      setProducts(responseData);
    }
  }
  useEffect(() => {
    LoadData();
    loaddistricts();
    loadproductTypes();
    loadProvinces();
  },[]);

  useEffect(() => {
    const handler=() => setShowLiked(s => !s);
    window.addEventListener('toggleLikedProducts',handler);
    return () => window.removeEventListener('toggleLikedProducts',handler);
  },[]);

  const showDetail=(product) => {
    const images=Array.isArray(product.image)? product.image:[product.image];
    const videos=Array.isArray(product.video)? product.video:[product.video];

    Swal.fire({
      title: `🏠 ${product.productName}`,
      html: `
    <style>
      @media (max-width: 600px) {
        .swal2-popup { width: 98vw !important; }
        .product-img-main { height: 220px !important; }
        .product-video-main { height: 180px !important; }
        .fs-responsive { font-size: 1rem !important; }
      }
      @media (min-width: 601px) and (max-width: 900px) {
        .swal2-popup { width: 90vw !important; }
        .product-img-main { height: 320px !important; }
        .product-video-main { height: 240px !important; }
        .fs-responsive { font-size: 1.1rem !important; }
      }
      @media (min-width: 901px) {
        .swal2-popup { width: 700px !important; }
        .product-img-main { height: 400px !important; }
        .product-video-main { height: 315px !important; }
        .fs-responsive { font-size: 1.15rem !important; }
      }
    </style>
    <div class="container-fluid">
      <div class="alert alert-primary text-center mb-3 fs-responsive">
        <h5 class="alert-heading mb-2">${product.productName}</h5>
        <p class="mb-0"><span class="badge bg-secondary">ລະຫັດ: ${product.productID}</span></p>
      </div>
      <div class="card mb-3 shadow-sm position-relative">
        <div style="border-radius: 10px; overflow: hidden; cursor: pointer;">
          <img id="mainImagePreview"
            src="http://localhost:3000/${images[0].replace(/\\/g,'/')}" 
            class="w-100 img-fluid product-img-main" 
            alt="Product Image"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
          <div class="alert alert-warning text-center m-0" style="display: none;">
            <small>ບໍ່ສາມາດໂຫຼດຮູບໄດ້</small>
          </div>
        </div>
        <div class="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white p-2">
          <div class="d-flex justify-content-between align-items-center">
            <small>🖼️ ${images.length} ຮູບທັງໝົດ</small>
            <small id="openSlideshowBtn" class="btn btn-light btn-sm">
              📱 ເບິ່ງຮູບເຕັມ
            </small>
          </div>
        </div>
      </div>
      <div class="d-flex flex-wrap justify-content-center gap-2 mb-3">
        <button id="viewVideoBtn" class="btn btn-danger btn-lg fs-responsive">
          🎥 ເບິ່ງວີດີໂອ
        </button>
        <button id="ContactBtn" class="btn btn-success btn-lg fs-responsive">
          📞 ສົນໃຈຕິດຕໍ່
        </button>
      </div>
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <h5 class="mb-3 fw-bold text-primary">ລາຍລະອຽດ</h5>
          <div class="mb-2"><span class="detail-label">📍 ທີ່ຕັ້ງ:</span> 
            <span class="badge bg-light text-dark detail-value">
              ${product.village}, ${product.District?.districtName||''}, ${product.District?.Province?.provinceName||''}
            </span>
          </div>
          <div class="mb-2"><span class="detail-label">💰 ລາຄາ:</span> 
            <span class="badge bg-warning text-dark fs-6">
              ${(product.price).toLocaleString()} ກີບ
            </span>
          </div>
          <div class="mb-2"><span class="detail-label">✅ ສະຖານະ:</span> 
            <span class="badge bg-success">${product.status}</span>
          </div>
          <div class="mb-2"><span class="detail-label">📏 ຂະໜາດ:</span> 
            <span class="badge bg-secondary detail-value">${product.size}</span>
          </div>
          <div><span class="detail-label">📝 ເພີ່ມເຕີມ:</span> 
            <p class="detail-value mt-2">${product.description}</p>
          </div>
        </div>
      </div>
    </div>
    `,
      width: '700px',
      showConfirmButton: false,
      showCloseButton: true,
      didOpen: () => {
        // Function to open image slideshow
        const openImageSlideshow=() => {
          Swal.fire({
            title: '🖼️ ຮູບພາບສິນຄ້າ',
            html: `
            <div class="container-fluid">
              <div class="swiper imageSwiper">
                <div class="swiper-wrapper">
                  ${images
                .map((img,index) => `
                      <div class="swiper-slide">
                        <div class="text-center">
                          <img src="http://localhost:3000/${img.replace(/\\/g,'/')}" 
                               class="img-fluid rounded shadow-sm" 
                               style="max-height: 70vh; max-width: 100%; object-fit: contain;" 
                               alt="Product Image ${index+1}" />
                          <div class="mt-2">
                            <small class="badge bg-secondary">ຮູບທີ່ ${index+1} ຈາກ ${images.length}</small>
                          </div>
                        </div>
                      </div>
                    `).join('')}
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
              </div>
            </div>
          `,
            width: '800px',
            showConfirmButton: false,
            showCloseButton: true,
            didOpen: () => {
              new Swiper('.imageSwiper',{
                modules: [Navigation],
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                loop: images.length>1,
                centeredSlides: true,
                spaceBetween: 10,
              });
            }
          });
        };

        // Event listener for the main preview image
        const mainImagePreview=document.getElementById('mainImagePreview');
        if(mainImagePreview) {
          mainImagePreview.style.cursor='pointer';
          mainImagePreview.addEventListener('click',openImageSlideshow);
        }

        // Event listener for the image overlay button
        const openSlideshowBtn=document.getElementById('openSlideshowBtn');
        if(openSlideshowBtn) {
          openSlideshowBtn.addEventListener('click',openImageSlideshow);
        }

        // Event listener for the main "view images" button
        const btnImages=document.getElementById('viewImagesBtn');
        if(btnImages) {
          btnImages.addEventListener('click',openImageSlideshow);
        }

        // Video button event
        const btn=document.getElementById('viewVideoBtn');
        btn.addEventListener('click',() => {
          Swal.fire({
            title: '🎥 ວີດີໂອສິນຄ້າ',
            html: `
            <div class="container-fluid">
              <div class="alert alert-info text-center mb-3">
                <h6 class="mb-0">📹 ວີດີໂອຂອງ ${product.productName}</h6>
              </div>
              
              <div class="row g-3" style="max-height: 70vh; overflow-y: auto;">
                ${videos
                .map((v,index) => `
                    <div class="col-12">
                      <div class="card shadow-sm">
                        <div class="card-header bg-dark text-white text-center py-2">
                          <small class="fw-bold">📹 ວີດີໂອທີ່ ${index+1}</small>
                        </div>
                        <div class="card-body p-0" style="background: #000;">
                          <div class="position-relative" style="width: 100%; height: 315px; background: #000;">
                            <video class="position-absolute top-50 start-50 translate-middle" 
                                   style="max-width: 100%; max-height: 100%; object-fit: contain;" 
                                   controls preload="metadata">
                              <source src="http://localhost:3000/${v.replace(/\\/g,'/')}" type="video/mp4">
                              <div class="alert alert-warning text-center position-absolute top-50 start-50 translate-middle">
                                <p class="mb-0">ໂທດເດ ບຣາວເຊີຂອງທ່ານບໍ່ສະຫນັບສະໜູນວີດີໂອນີ້ 😔</p>
                              </div>
                            </video>
                          </div>
                        </div>
                      </div>
                    </div>
                  `).join('')}
              </div>
            </div>
          `,
            width: '600px',
            showConfirmButton: false,
            showCloseButton: true
          });
        });

        // Contact button event
        const btnContact=document.getElementById('ContactBtn');
        btnContact.onclick=() => {
          const message=`ສະບາຍດີ! ຂ້ອຍສົນໃຈສິນຄ້າລະຫັດ: ${product.productID}

🏠 ຊື່ສິນຄ້າ: ${product.productName}
💰 ລາຄາ: ${(product.price).toLocaleString()} ກີບ
📍 ທີ່ຕັ້ງ: ${product.village}, ${product.District?.districtName||''}, ${product.District?.Province?.provinceName||''}
📏 ຂະໜາດ: ${product.size}

ກະລຸນາໃຫ້ຂໍ້ມູນເພີ່ມເຕີມ ແລະ ແນະນຳການນັດເຈາະຈົງ ຂອບໃຈ! 🙏`;

          const phone="8562078915900";
          const url=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
          window.open(url,"_blank");
        };
      }
    });
  };

  const handleLoadMore=() => {
    setShowAll(prev => !prev);
  };
  const visibleProducts=showAll? Products.slice(0,16):Products.slice(0,8);
  const loaddistricts=async () => {
    try {
      const response=await fetch(`http://localhost:3000/api/districts`,{
        method: "GET",
      });
      console.log("HTTP Status:",response.status);
      if(response.status===200) {
        const responseData=await response.json();
        console.log("Districts data:",responseData);
        setDistricts(responseData);
      } else {
        const errorText=await response.text();
        console.error("Failed to fetch districts:",response.status,errorText);
      }
    } catch(error) {
      console.error("Error fetching districts:",error);
    }
  };
  const [districts,setDistricts]=useState([]);

  const loadProvinces=async () => {
    try {
      const response=await fetch("http://localhost:3000/api/provinces",{
        method: "GET",
      });

      console.log("HTTP Status:",response.status);

      if(response.status===200) {
        const responseData=await response.json();
        console.log("Provinces data:",responseData);
        setProvinces(responseData);
      } else {
        const errorText=await response.text();
        console.error("Failed to fetch provinces:",response.status,errorText);
      }
    } catch(error) {
      console.error("Error fetching provinces:",error);
    }
  };
  const LoadDistrictByProvince=async (provinceID) => {
    try {
      const response=await fetch(`http://localhost:3000/api/provinces/districts/${provinceID}`,{
        method: 'GET'
      });
      if(response.status===200) {
        const responseData=await response.json();
        if(Array.isArray(responseData)&&responseData.length>0) {
          setDistricts(responseData[0].Districts||[]);
        } else {
          setDistricts([]);
        }
      }
    } catch(error) {
      alert(error);
    }
  };

  const LoadProvinceByDistrict=async (districtID) => {
    try {
      const response=await fetch(`http://localhost:3000/api/districts/province/${districtID}`,{
        method: 'GET'
      });
      if(response.status===200) {
        const responseData=await response.json();
        // responseData is an array of districts, find the one with matching districtID
        const district=responseData.find(d => d.districtID==districtID);
        if(district) {
          setSelectedProvince(district.provinceID.toString());
          // Now load districts for this province
          await LoadDistrictByProvince(district.provinceID);
        }
      }
    } catch(error) {
      alert(error);
    }
  };
  const [provinces,setProvinces]=useState([]);

  const loadproductTypes=async () => {
    try {
      const response=await fetch("http://localhost:3000/api/productTypes",{
        method: "GET",
      });
      console.log("HTTP Status:",response.status);
      if(response.status===200) {
        const responseData=await response.json();
        console.log("Product Types data:",responseData);
        setProductType(responseData); // ແນ່ໃຈ
      } else {
        const errorText=await response.text();
        console.error("Failed to fetch product types:",response.status,errorText);
      }
    } catch(error) {
      console.error("Error fetching product types:",error);
    }
  };
  const [productType,setProductType]=useState([]);

  const [likedProducts,setLikedProducts]=useState(() => {
    const saved=localStorage.getItem('likedProducts');
    return saved? JSON.parse(saved):[];
  });
  const [showLiked,setShowLiked]=useState(false);

  const toggleLike=(productID) => {
    setLikedProducts(prev => {
      let updated;
      if(prev.includes(productID)) {
        updated=prev.filter(id => id!==productID);
      } else {
        updated=[...prev,productID];
      }
      localStorage.setItem('likedProducts',JSON.stringify(updated));
      window.dispatchEvent(new Event('likedProductsChanged'));
      return updated;
    });
  };

  // Filter products based on search and selects
  const filteredAllProducts=Products.filter((product) => {
    // Search by name, id, village, etc (case-insensitive, partial match)
    const searchLower=search.toLowerCase();
    const matchesSearch=
      !search||
      product.productName?.toLowerCase().includes(searchLower)||
      product.productID?.toString().includes(searchLower)||
      product.village?.toLowerCase().includes(searchLower)||
      product.District?.districtName?.toLowerCase().includes(searchLower)||
      product.District?.Province?.provinceName?.toLowerCase().includes(searchLower);
    // Province
    const matchesProvince=!selectedProvince||product.District?.Province?.provinceID==selectedProvince;
    // District
    const matchesDistrict=!selectedDistrict||product.District?.districtID==selectedDistrict;
    // Product Type
    const matchesProductType=!selectedProductType||product.productTypeID==selectedProductType;
    // Price (less than or equal)
    const matchesPrice=!selectedPrice||Number(product.price)<=Number(selectedPrice);
    // Status
    const matchesStatus=!selectedStatus||product.status===selectedStatus;
    return matchesSearch&&matchesProvince&&matchesDistrict&&matchesProductType&&matchesPrice&&matchesStatus;
  });

  // ສ້າງ products ທີ່ຈະສະແດງຜົນ
  const productsToShow=showLiked
    ? filteredAllProducts.filter(product => likedProducts.includes(product.productID))
    :filteredAllProducts;

  const totalPages=Math.ceil(productsToShow.length/pageSize);
  const paginatedProducts=productsToShow.slice((currentPage-1)*pageSize,currentPage*pageSize);

  // Reset currentPage when switching between liked/all view
  useEffect(() => {
    setCurrentPage(1);
  },[showLiked]);

  const ProductCard=({product}) => (
    <Card className="h-100 shadow-sm border-0 MyProductSection-card" style={{cursor: 'pointer',fontSize: '0.9rem'}}>
      <div className="overflow-hidden position-relative" style={{height: '180px'}}>
        <Card.Img
          variant="top"
          src={
            Array.isArray(product.image)
              ? `http://localhost:3000/${product.image[0]?.replace(/\\/g,'/')||''}`
              :product.image
                ? `http://localhost:3000/${product.image.replace(/\\/g,'/')}`
                :''
          }
          style={{objectFit: 'cover',width: '100%',height: '100%'}}
        />

        {/* ຊັ້ນເທິງ status + like */}
        <div className="position-absolute top-0 start-0 end-0 m-2 d-flex justify-content-between align-items-center">
          <span className="fw-bold text-success bg-white px-2 py-1 rounded" style={{fontSize: '0.8rem'}}>
            {product.status}
          </span>
          <Button
            variant="link"
            style={{
              fontSize: '1.5rem',
              color: likedProducts.includes(product.productID)? 'red':'white'
            }}
            onClick={e => {
              e.stopPropagation();
              toggleLike(product.productID);
            }}
          >
            <FaHeart />
          </Button>
        </div>
      </div>
      <Card.Header className="py-2">
        <h6 className="fw-bold text-primary mb-1">ລະຫັດ: <span className="text-danger">{product.productID}</span></h6>
        <Card.Title className="fw-bold mb-0" style={{fontSize: '1rem'}}>{product.productName}</Card.Title>
      </Card.Header>
      <Card.Body className="py-2" style={{fontSize: '0.85rem'}}>
        <p className="mb-1">
          <span className='fw-bold'>ບ້ານ:</span> {product.village}<br />
          <span className='fw-bold'>ເມືອງ:</span> {product.District?.districtName}<br />
          <span className='fw-bold'>ແຂວງ:</span> {product.District?.Province?.provinceName}
        </p>
      </Card.Body>
      <Card.Footer className="bg-white border-0 d-flex align-items-center py-2" style={{fontSize: '0.85rem'}}>
        <span className="fw-bold text-danger">ລາຄາ: {Number(product.price).toLocaleString()} {product.Currency.currencyName}</span>
      </Card.Footer>
      <div className="p-2">
        <Button
          variant="danger"
          className='w-100 py-1'
          size="sm"
          onClick={() => showDetail(product)}
          style={{fontSize: '0.8rem'}}
        >
          ລາຍລະອຽດ
        </Button>
      </div>
    </Card>
  );

  return (
    <section className="py-5 bg-light" id='MyProductSection'>
      <Container data-aos="fade-up">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="fw-bold mb-4 text-center text-danger">
            {showLiked? "ສິນຄ້າທີ່ສົນໃຈ":"ລາຍການສັບສິນຫຼ້າສຸດ"}
          </h2>
        </div>

        {/* ສະແດງ Search Form ພຽງເມື່ອບໍ່ໄດ້ເບິ່ງສິນຄ້າທີ່ສົນໃຈ */}
        {!showLiked&&(
          <Card className='mb-4 shadow-lg' id='ProductList'>
            <Card.Header className='text-center bg-danger text-white'>
              <Card.Title>ຄົ້ນຫາຊັບສິນ</Card.Title>
            </Card.Header>
            <Card.Body>
              <FormGroup className='mb-3'>
                <InputGroup>
                  <span className='input-group-text'><i className="fas fa-search"></i></span>
                  <FormControl id='searchInput' placeholder='ຄົ້ນຫາຊັບສິນ'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <Row className='mb-3'>
                <Col md={6} xs={6}>
                  <FormGroup>
                    <label htmlFor="">ແຂວງ</label>
                    <select id="provinceSelect" className='form-control'
                      value={selectedProvince}
                      onChange={async e => {
                        const value=e.target.value;
                        setSelectedProvince(value);
                        if(value) {
                          await LoadDistrictByProvince(value);
                          setSelectedDistrict(""); // reset district
                        } else {
                          setDistricts([]); // clear districts
                          setSelectedDistrict("");
                        }
                      }}
                    >
                      <option value="">ກະລຸນາເລືອກແຂວງ</option>
                      {provinces.map((x) => (
                        <option value={x.provinceID} key={x.provinceID}>{x.provinceName}</option>))}
                    </select>
                  </FormGroup>
                </Col>
                <Col md={6} xs={6}>
                  <FormGroup>
                    <label htmlFor="">ເມືອງ</label>
                    <select id="districtSelect" className='form-control'
                      value={selectedDistrict}
                      onChange={async e => {
                        const value=e.target.value;
                        setSelectedDistrict(value);
                        if(value) {
                          await LoadProvinceByDistrict(value);
                        }
                      }}
                    >
                      <option value="">ກະລຸນາເລືອກເມືອງ</option>
                      {districts.map((x) => (
                        <option value={x.districtID} key={x.districtID}>{x.districtName}</option>
                      ))}
                    </select>
                  </FormGroup>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col md={6} xs={6}>
                  <FormGroup>
                    <label htmlFor="">ປະເພດຊັບສິນ</label>
                    <select id="productTypeSelect" className='form-control'
                      value={selectedProductType}
                      onChange={e => setSelectedProductType(e.target.value)}
                    >
                      <option value="">ກະລຸນາເລືອກປະເພດ</option>
                      {productType.map((x) => (
                        <option value={x.productTypeID} key={x.productTypeID}>{x.productTypeName}</option>
                      ))}
                    </select>
                  </FormGroup>
                </Col>
                <Col md={6} xs={6}>
                  <FormGroup>
                    <label htmlFor="">ງົບປະມານ</label>
                  </FormGroup>
                  <select id="priceSelect" className="form-control"
                    value={selectedPrice}
                    onChange={e => setSelectedPrice(e.target.value)}
                  >
                    <option value="">ກະລຸນາເລືອກລາຄາ</option>
                    <option value="500000">500,000 ກີບ ລົງມາ</option>
                    <option value="10000000">1,000,000 ກີບ ລົງມາ</option>
                    <option value="15000000">1,500,000 ກີບ ລົງມາ</option>
                  </select>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col md={12}>
                  <FormGroup>
                    <label htmlFor="">ສະຖານະ</label>
                  </FormGroup>
                  <select className='form-control' id="statusSelect"
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                  >
                    <option value="">ກະລຸນາເລືອກສະຖານະ</option>
                    <option value="ເຊົ່າ">ເຊົ່າ</option>
                    <option value="ຂາຍ">ຂາຍ</option>
                  </select>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {/* ສະແດງຜົນລາຍການສິນຄ້າ */}
        <Row className="g-3">
          {productsToShow.length===0? (
            <Col>
              <div className="text-center text-muted py-5">
                {showLiked? "ບໍ່ມີສິນຄ້າທີ່ສົນໃຈ":"ບໍ່ພົບສິນຄ້າທີ່ຕ້ອງການ"}
              </div>
            </Col>
          ):(
            paginatedProducts.map((product) => (
              <Col key={product.productID} xs={6} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))
          )}
        </Row>

        {/* Pagination */}
        {totalPages>1&&(
          <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
            {/* ປຸ່ມຍ້ອນກັບ */}
            <Button
              variant="outline-danger"
              className="ms-2"
              size="sm"
              disabled={currentPage===1}  // ປິດເມື່ອຢູ່ໜ້າທຳອິດ
              onClick={() => setCurrentPage(currentPage-1)}
            >
              ຍ້ອນກັບ
            </Button>

            {/* ປຸ່ມເລກໜ້າ */}
            {[...Array(totalPages)].map((_,idx) => (
              <Button
                key={idx+1}
                variant={currentPage===idx+1? "danger":"outline-danger"}
                className="mx-1"
                size="sm"
                onClick={() => {
                  setCurrentPage(idx+1);
                  if(!showLiked) {
                    window.location.href="#ProductList";
                  }
                }}
              >
                {idx+1}
              </Button>
            ))}

            {/* ປຸ່ມໄປໜ້າຖັດໄປ */}
            <Button
              variant="outline-danger"
              className="ms-2"
              size="sm"
              disabled={currentPage===totalPages} // ປິດເມື່ອຢູ່ໜ້າສຸດທ້າຍ
              onClick={() => setCurrentPage(currentPage+1)}
            >
              ໄປຫນ້າຖັດໄປ
            </Button>
          </div>
        )}

      </Container>
    </section>
  );
}