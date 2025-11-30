import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FormGroup,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// ✅ Swiper v11+
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaHeart, FaSearch, FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function MyProductSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // --- state ---
  const [Products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // ✅ Changed from 16 to 8

  // lookup lists
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [productType, setProductType] = useState([]);
  // ... (Rest of the component code, including data fetching, helper getters, and the toggleLike function, remains the same)

  // liked products persisted to localStorage
  const [likedProducts, setLikedProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("likedProducts");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load likedProducts from localStorage", e);
      return [];
    }
  });
  const [showLiked, setShowLiked] = useState(false);

  // --- helper getters to tolerate API casing differences ---
  const getDistrict = useCallback((p) => p.District || p.district || {}, []);
  const getProvince = useCallback((p) => {
    const d = getDistrict(p);
    return d.Province || d.province || {};
  }, [getDistrict]);

  // --- data loaders ---
  const LoadData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://costs-searches-machines-weights.trycloudflare.com/api/products"
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } else {
        console.error("LoadData failed", response.status, await response.text());
      }
    } catch (err) {
      console.error("LoadData error", err);
    }
  }, []);

  const loadProvinces = useCallback(async () => {
    try {
      const response = await fetch(
        "https://costs-searches-machines-weights.trycloudflare.com/api/provinces"
      );
      if (response.ok) {
        const data = await response.json();
        setProvinces(Array.isArray(data) ? data : []);
      } else {
        console.error("loadProvinces failed", response.status);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadproductTypes = useCallback(async () => {
    try {
      const response = await fetch(
        "https://costs-searches-machines-weights.trycloudflare.com/api/productTypes"
      );
      if (response.ok) {
        const data = await response.json();
        setProductType(Array.isArray(data) ? data : []);
      } else {
        console.error("loadproductTypes failed", response.status);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // load districts for a province
  const LoadDistrictByProvince = useCallback(async (provinceID) => {
    try {
      if (!provinceID) {
        setDistricts([]);
        return;
      }
      const response = await fetch(
        `https://costs-searches-machines-weights.trycloudflare.com/api/provinces/districts/${provinceID}`
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const districtsFromApi = data[0].districts || data[0].Districts || data;
          setDistricts(Array.isArray(districtsFromApi) ? districtsFromApi : []);
        } else if (Array.isArray(data)) {
          setDistricts(data);
        } else {
          setDistricts([]);
        }
      } else {
        setDistricts([]);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const LoadProvinceByDistrict = useCallback(async (districtID) => {
    try {
      if (!districtID) return;
      const response = await fetch(
        `https://costs-searches-machines-weights.trycloudflare.com/api/districts/province/${districtID}`
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const found = data.find((d) => d.districtID == districtID || d.districtID == +districtID);
          if (found) {
            setSelectedProvince(found.provinceID?.toString() || "");
            await LoadDistrictByProvince(found.provinceID);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [LoadDistrictByProvince]);

  // initial load
  useEffect(() => {
    LoadData();
    loadproductTypes();
    loadProvinces();
  }, [LoadData, loadproductTypes, loadProvinces]);

  // sync liked products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    } catch (e) {
      console.error("save likedProducts failed", e);
    }
  }, [likedProducts]);

  // toggle like
  const toggleLike = (productID) => {
    setLikedProducts((prev) => {
      const exists = prev.includes(productID);
      return exists ? prev.filter((id) => id !== productID) : [...prev, productID];
    });
  };

  // filtering logic
  const filterProducts = useCallback(() => {
    const searchLower = search.trim().toLowerCase();

    return Products.filter((product) => {
      // tolerant accessors
      const name = (product.productName || product.name || "") + "";
      const id = (product.productID || product.id || "") + "";
      const village = (product.village || product.villageName || "") + "";
      const districtObj = getDistrict(product);
      const provinceObj = getProvince(product);

      // search
      const matchesSearch =
        !searchLower ||
        name.toLowerCase().includes(searchLower) ||
        id.toLowerCase().includes(searchLower) ||
        village.toLowerCase().includes(searchLower) ||
        (districtObj.districtName || "").toLowerCase().includes(searchLower) ||
        (provinceObj.provinceName || "").toLowerCase().includes(searchLower);

      // province
      const matchesProvince =
        !selectedProvince ||
        provinceObj.provinceID == selectedProvince ||
        provinceObj.provinceID == +selectedProvince;

      // district
      const matchesDistrict =
        !selectedDistrict ||
        districtObj.districtID == selectedDistrict ||
        districtObj.districtID == +selectedDistrict;

      // product type
      const matchesType = !selectedProductType || product.productTypeID == selectedProductType || product.productTypeID == +selectedProductType;

      // price (<=)
      const matchesPrice = !selectedPrice || Number(product.price) <= Number(selectedPrice);

      // status
      const matchesStatus = !selectedStatus || (product.status || "") === selectedStatus;

      return (
        matchesSearch &&
        matchesProvince &&
        matchesDistrict &&
        matchesType &&
        matchesPrice &&
        matchesStatus
      );
    });
  }, [Products, search, selectedProvince, selectedDistrict, selectedProductType, selectedPrice, selectedStatus, getDistrict, getProvince]);

  // choose products to show (all or liked) then paginate
  const filteredAllProducts = filterProducts();
  const productsToShow = showLiked
    ? filteredAllProducts.filter((p) => likedProducts.includes(p.productID))
    : filteredAllProducts;

  const totalPages = Math.max(1, Math.ceil(productsToShow.length / pageSize));
  const paginatedProducts = productsToShow.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // when filters change or toggling liked view, reset pagination
  useEffect(() => {
    setCurrentPage(1);
  }, [showLiked, search, selectedProvince, selectedDistrict, selectedProductType, selectedPrice, selectedStatus]);


  // UI handlers
  const handleProvinceChange = async (value) => {
    setSelectedProvince(value);
    setSelectedDistrict("");
    await LoadDistrictByProvince(value);
  };

  const handleDistrictChange = async (value) => {
    setSelectedDistrict(value);
    if (value) {
      await LoadProvinceByDistrict(value);
    }
  };


  // --- product detail modal ---
  const showDetail = (product) => {
    const images = Array.isArray(product.image) ? product.image : product.image ? [product.image] : [];
    const videos = Array.isArray(product.video) ? product.video : product.video ? [product.video] : [];

    const safePath = (path) => (path && path.replace) ? path.replace(/\\/g, "/") : "";

    Swal.fire({
      title: `🏠 ${product.productName || product.name}`,
      html: `
        <style>
          /* Responsive styles for Swal popup */
          @media (max-width: 600px) { .swal2-popup{width:98vw !important} .product-img-main{height:220px !important; object-fit: cover !important;} }
          @media (min-width:601px) and (max-width:900px){ .swal2-popup{width:90vw !important} .product-img-main{height:320px !important; object-fit: cover !important;} }
          @media (min-width:901px){ .swal2-popup{width:700px !important} .product-img-main{height:400px !important; object-fit: cover !important;} }
          .product-img-main { width: 100%; } /* Ensure image takes full width of container */
        </style>
        <div class="container-fluid text-start">
          <div class="alert alert-primary text-center mb-3">
            <h5 class="mb-1">${product.productName || product.name}</h5>
            <small class="text-muted">ລະຫັດ: ${product.productID}</small>
          </div>

          <div class="card mb-3 shadow-sm">
            <div style="border-radius:10px; overflow:hidden; position:relative;">
              ${images.length>0 ?
                `<img id="mainImagePreview" src="${safePath(images[0])}" class="w-100 img-fluid product-img-main" alt="Product" style="cursor:pointer;"/>`
                :
                `<div class="p-4 text-center text-muted">ບໍ່ມີຮູບພາບ</div>`
              }
            </div>
            <div class="p-2 d-flex justify-content-between align-items-center">
              <small>🖼️ ${images.length} ຮູບ</small>
              ${images.length > 0 ? `<small id="openSlideshowBtn" class="btn btn-sm btn-light">📱 ເບິ່ງຮູບເຕັມ</small>` : ''}
            </div>
          </div>

          <div class="card shadow-sm">
            <div class="card-body">
              <h6 class="text-primary">ລາຍລະອຽດ</h6>
              <p class="mb-1">📍 ທີ່ຕັ້ງ: ${product.village || ''}, ${getDistrict(product).districtName || ''}, ${getProvince(product).provinceName || ''}</p>
              <p class="mb-1">💰 ລາຄາ: ${Number(product.price||0).toLocaleString()} ${product.currency?.currencyName||''}</p>
              <p class="mb-1">✅ ສະຖານະ: ${product.status||''}</p>
              <p class="mb-1">📏 ຂະໜາດ: ${product.size||''}</p>
              <p class="mt-2">ເບີຕິດຕໍ່:  020 51519883</p>
              <p class="mt-2">📝 ລາຍລະອຽດ: ${product.description||''}</p>
            </div>
          </div>

          <div class="d-flex gap-2 justify-content-center mt-3">
            <button id="viewVideoBtn" class="btn btn-danger" ${videos.length === 0 ? 'disabled' : ''}>🎥 ເບິ່ງວີດີໂອ</button>
            <button id="ContactBtn" class="btn btn-success">📞 ສົນໃຈຕິດຕໍ່</button>
          </div>
        </div>
        `,
      width: "700px",
      showConfirmButton: false,
      showCloseButton: true,
      didOpen: () => {
        const openImageSlideshow = () => {
          Swal.fire({
            title: "🖼️ ຮູບພາບ",
            html: `
              <div class="container-fluid">
                <div class="swiper imageSwiper">
                  <div class="swiper-wrapper">
                    ${images
                      .map(
                        (img, idx) => `
                      <div class="swiper-slide text-center">
                        <img src="${safePath(img)}" style="max-height:70vh; max-width:100%; object-fit:contain;" class="img-fluid rounded" />
                        <div class="mt-2"><small class="badge bg-secondary">ຮູບທີ່ ${idx + 1} / ${images.length}</small></div>
                      </div>`
                      )
                      .join("")}
                  </div>
                  <div class="swiper-button-next" style="color: #dc3545;"></div>
                  <div class="swiper-button-prev" style="color: #dc3545;"></div>
                </div>
              </div>
            `,
            width: "800px",
            showConfirmButton: false,
            showCloseButton: true,
            didOpen: () => {
              new Swiper('.imageSwiper', {
                modules: [Navigation],
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                loop: images.length > 1,
                centeredSlides: true,
                spaceBetween: 10,
              });
            },
          });
        };

        const mainImagePreview = document.getElementById("mainImagePreview");
        if (mainImagePreview && images.length > 0) {
          mainImagePreview.addEventListener("click", openImageSlideshow);
        }

        const openSlideshowBtn = document.getElementById("openSlideshowBtn");
        if (openSlideshowBtn && images.length > 0) openSlideshowBtn.addEventListener("click", openImageSlideshow);

        const btnVideos = document.getElementById("viewVideoBtn");
        if (btnVideos && videos.length > 0) {
          btnVideos.addEventListener("click", () => {
            Swal.fire({
              title: "🎥 ວີດີໂອ",
              html: `
                <div class="container-fluid">
                  <div class="row g-3" style="max-height:70vh; overflow:auto;">
                    ${videos
                      .map(
                        (v) => `
                      <div class="col-12">
                        <div class="card">
                          <div class="card-body p-0" style="background:#000">
                            <video controls style="width:100%; max-height:70vh; object-fit:contain;">
                              <source src="${safePath(v)}" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </div>
                      </div>`
                      )
                      .join("")}
                  </div>
                </div>
              `,
              width: "700px",
              showConfirmButton: false,
              showCloseButton: true,
            });
          });
        }

        const btnContact = document.getElementById("ContactBtn");
        if (btnContact) {
          btnContact.onclick = () => {
            const message = `ສະບາຍດີ! ຂ້ອຍສົນໃຈສິນຄ້າ: ${product.productName || product.name}\nລະຫັດ: ${product.productID}\nລາຄາ: ${Number(product.price||0).toLocaleString()}\nທີ່ຕັ້ງ: ${product.village || ''} ${getDistrict(product).districtName || ''}`;
            const phone = "8562051519883";
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
          };
        }
      },
    });
  };

  // Product Card subcomponent
  const ProductCard = ({ product }) => {
    const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;
    const districtObj = getDistrict(product);
    const provinceObj = getProvince(product);

    const safePath = (path) => (path && path.replace) ? path.replace(/\\/g, "/") : "";

    return (
      <Card className="h-100 shadow-sm border-0 MyProductSection-card" style={{ cursor: "pointer", fontSize: "0.9rem" }}>
        <div className="overflow-hidden position-relative" style={{ height: "180px" }} onClick={() => showDetail(product)}>
          <Card.Img
            variant="top"
            src={safePath(firstImage)}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />

          <div className="position-absolute top-0 start-0 end-0 m-2 d-flex justify-content-between align-items-center">
            <span className="fw-bold text-success bg-white px-2 py-1 rounded" style={{ fontSize: "0.8rem" }}>
              {product.status}
            </span>
            <Button
              variant="link"
              style={{ fontSize: "1.5rem", color: likedProducts.includes(product.productID) ? "red" : "white", textShadow: "0 0 5px black" }}
              onClick={(e) => {
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
          <Card.Title className="fw-bold mb-0" style={{ fontSize: "1rem" }}>{product.productName}</Card.Title>
        </Card.Header>

        <Card.Body className="py-2" style={{ fontSize: "0.85rem" }}>
          <p className="mb-1">
            <span className="fw-bold">ບ້ານ:</span> {product.village} <br />
            <span className="fw-bold">ເມືອງ:</span> {districtObj.districtName} <br />
            <span className="fw-bold">ແຂວງ:</span> {provinceObj.provinceName}
          </p>
        </Card.Body>

        <Card.Footer className="bg-white border-0 d-flex align-items-center py-2" style={{ fontSize: "0.85rem" }}>
          <span className="fw-bold text-danger">ລາຄາ: {Number(product.price).toLocaleString()} {product.currency?.currencyName}</span>
        </Card.Footer>

        <div className="p-2">
          <Button variant="danger" className="w-100 py-1" size="sm" onClick={() => showDetail(product)} style={{ fontSize: "0.8rem" }}>
            ລາຍລະອຽດ
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <section className="py-5 bg-light" id="MyProductSection">
      <Container data-aos="fade-up">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="fw-bold mb-4 text-center text-danger">
            {showLiked ? "ສິນຄ້າທີ່ສົນໃຈ" : "ລາຍການສິນຄ້າ"} ({productsToShow.length})
          </h2>
          <div>
            <Button variant={showLiked ? "danger" : "outline-danger"} size="sm" onClick={() => setShowLiked((s) => !s)}>
              {showLiked ? "ເບິ່ງທັງໝົດ" : "ເບິ່ງສິນຄ້າທີ່ສົນໃຈ"}
            </Button>
          </div>
        </div>

        <hr/>

        {!showLiked && (
          <Card className="mb-4 shadow-lg" id="ProductList">
            <Card.Header className="text-center bg-danger text-white">
              <Card.Title className="fs-6 fs-sm-5">ຄົ້ນຫາຊັບສິນ</Card.Title>
            </Card.Header>

            {/* ✅ ຫຼຸດຂະໜາດຕົວອັກສອນ ແລະ ໄລຍະຫ່າງໂດຍໃຊ້ຄລາດ Bootstrap */}
            <Card.Body className="p-2 p-md-3">
              <FormGroup className="mb-2 mb-md-3">
                <InputGroup size="sm">
                  <span className="input-group-text"><FaSearch /></span>
                  <FormControl
                    id="searchInput"
                    placeholder="ຄົ້ນຫາຊັບສິນ (ຊື່, ລະຫັດ, ບ້ານ, ເມືອງ, ແຂວງ)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="small"
                  />
                </InputGroup>
              </FormGroup>

              <Row className="mb-2 mb-md-3 small">
                <Col md={6} xs={6}>
                  <FormGroup>
                    <label className="d-block mb-1">ແຂວງ</label>
                    <select className="form-control form-control-sm" value={selectedProvince} onChange={(e) => handleProvinceChange(e.target.value)}>
                      <option value="">ກະລຸນາເລືອກແຂວງ</option>
                      {provinces.map((x) => (
                        <option value={x.provinceID} key={x.provinceID}>{x.provinceName}</option>
                      ))}
                    </select>
                  </FormGroup>
                </Col>

                <Col md={6} xs={6}>
                  <FormGroup>
                    <label className="d-block mb-1">ເມືອງ</label>
                    <select className="form-control form-control-sm" value={selectedDistrict} onChange={(e) => handleDistrictChange(e.target.value)} disabled={!selectedProvince && districts.length === 0}>
                      <option value="">ກະລຸນາເລືອກເມືອງ</option>
                      {districts.map((x) => (
                        <option value={x.districtID} key={x.districtID}>{x.districtName}</option>
                      ))}
                    </select>
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-2 mb-md-3 small">
                <Col md={6} xs={6}>
                  <FormGroup>
                    <label className="d-block mb-1">ປະເພດຊັບສິນ</label>
                    <select className="form-control form-control-sm" value={selectedProductType} onChange={(e) => setSelectedProductType(e.target.value)}>
                      <option value="">ກະລຸນາເລືອກປະເພດ</option>
                      {productType.map((x) => (
                        <option value={x.productTypeID} key={x.productTypeID}>{x.productTypeName}</option>
                      ))}
                    </select>
                  </FormGroup>
                </Col>

                <Col md={6} xs={6}>
                  <FormGroup>
                    <label className="d-block mb-1">ງົບປະມານ (ສູງສຸດ)</label>
                    <select className="form-control form-control-sm" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
                      <option value="">ທຸກລາຄາ</option>
                      <option value="500000">500,000 ກີບ ລົງມາ</option>
                      <option value="1000000">1,000,000 ກີບ ລົງມາ</option>
                      <option value="1500000">1,500,000 ກີບ ລົງມາ</option>
                    </select>
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-0 small">
                <Col>
                  <FormGroup>
                    <label className="d-block mb-1">ສະຖານະ</label>
                    <select className="form-control form-control-sm" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                      <option value="">ກະລຸນາເລືອກສະຖານະ</option>
                      <option value="ເຊົ່າ">ເຊົ່າ</option>
                      <option value="ຂາຍ">ຂາຍ</option>
                    </select>
                  </FormGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        <Row className="g-3">
          {productsToShow.length === 0 ? (
            <Col>
              <div className="text-center text-muted py-5">{Products.length === 0 ? "ກຳລັງໂຫລດຂໍ້ມູນ..." : (showLiked ? "ບໍ່ມີສິນຄ້າທີ່ສົນໃຈ" : "ບໍ່ພົບສິນຄ້າທີ່ກົງກັບການຄົ້ນຫາ")}</div>
            </Col>
          ) : (
            paginatedProducts.map((product) => (
              <Col key={product.productID} xs={6} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))
          )}
        </Row>

        {/* Pagination */}
        {productsToShow.length > 0 && totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
            <Button variant="outline-danger" className="ms-2" size="sm" disabled={currentPage === 1} onClick={() => { setCurrentPage((p) => Math.max(1, p - 1)); window.location.hash = "#ProductList"; }}>
              <FaAngleLeft /> ຍ້ອນກັບ
            </Button>

            {[...Array(totalPages)].map((_, idx) => {
              const page = idx + 1;
              const isCurrent = currentPage === page;
              const isNearCurrent = page >= currentPage - 2 && page <= currentPage + 2;
              const isFirstOrLast = page === 1 || page === totalPages;

              if (isNearCurrent || isFirstOrLast) {
                return (
                  <Button
                    key={page}
                    variant={isCurrent ? "danger" : "outline-danger"}
                    className="mx-1 d-none d-sm-inline-block"
                    size="sm"
                    onClick={() => { setCurrentPage(page); window.location.hash = "#ProductList"; }}
                  >
                    {page}
                  </Button>
                );
              }
              if (page === currentPage - 3 || page === currentPage + 3) {
                return <span key={`dots-${page}`} className="mx-1 d-none d-sm-inline-block">...</span>;
              }
              return null;
            })}

            <span className="mx-3 d-sm-none">ໜ້າ {currentPage} / {totalPages}</span>

            <Button variant="outline-danger" className="ms-2" size="sm" disabled={currentPage === totalPages} onClick={() => { setCurrentPage((p) => Math.min(totalPages, p + 1)); window.location.hash = "#ProductList"; }}>
              ໄປຫນ້າຖັດໄປ <FaAngleRight />
            </Button>
          </div>
        )}

      </Container>
    </section>
  );
}