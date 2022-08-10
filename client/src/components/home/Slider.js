import "../../App.css";
import "../home/css/Slider.css"
function Slider() {

    return (
        <>
            <section id="slider" className="slider">
                <div className="slideshow-all">
                    <div className="slideshow-container">
                        <img src="https://www.duchuymobile.com/images/promo/51/samsung-s22-ULTRA-MAU-MOI-banner-1366-459-1.jpg" />
                    </div>

                    <div className="khungDot">
                        <span className="dot" string="currentSlide(0)">Chọn ngay quà ngon
                            Giảm đến tiền triệu cho nửa kia!!!</span>
                        <span className="dot" string="currentSlide(1)">Chọn iPhone VN/A
                            Đến Clickbuy có giá tốt nhất!</span>
                        <span className="dot" string="currentSlide(2)">Vui đường đến trường
                            Đẩy lùi Covid - không sợ gian lao</span>
                        <span className="dot" string="currentSlide(3)">Khai xuân cùng A8s
                            Rinh ngay siêu phẩm </span>
                        <span className="dot" string="currentSlide(4)">Big sale - giá shock bốc quà to ngay tại Clickbuy </span>
                    </div>
                </div>

                <div className="khung-images">
                    <div className="images">
                        <a href="#"><img src="https://vnreview.vn/image/21/83/76/2183767.jpg?t=1617090878390" alt="" /></a>
                    </div>
                    <div className="noiBat">
                        <div className="hot">
                            <span>Tin nổi bật</span>
                        </div>
                        <div className="tin">
                            <a href="">
                                <div className="anhNho">
                                    <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/07/21/oppo-gia-soc-a55-2.jpg" alt="" />
                                </div>
                                <div className="noiDung">
                                    Siêu bão khuyến mãi - xiaomi - realme - asus từ 09/05
                                </div>
                            </a>
                        </div>
                        <div className="tin">
                            <a href="">
                                <div className="anhNho">
                                    <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/05/19/san-pham-hot.png" alt="" />
                                </div>
                                <div className="noiDung">
                                    Mua hàng online - an toàn mùa dịch
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}

export default Slider;