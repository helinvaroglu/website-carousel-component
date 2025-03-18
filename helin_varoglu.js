(() => {
    const init = () => {
        buildHTML();
        buildCSS();
        setEvents();
    };

    const buildHTML = () => {
        const html = `
            <div class="container">
                <h1>You Might Also Like</h1>
                <button class="left-button">&lt;</button>
                <div class="products-wrapper">
                    <div class="products">

                    </div>     
                </div>
                <button class="right-button">&gt;</button>
            </div>
        `;

        $('.product-detail').append(html);
    };

    const buildCSS = () => {
        const css = `
            .container {
                background-color: transparent;
                position: relative;
                padding: 0 0;
            }
            
            h1 {
                font-size: 24px;
                color: #29323b;
                line-height: 33px;
                font-weight: lighter;
                padding: 15px 0;
                margin: 0;
            }

            .products-wrapper {
                overflow: hidden;
                width: 90%;
                margin: auto;
            }

            .right-button {
                position: absolute;
                top: 50%;
                color: #29323b;
                background-color: transparent;
                border: none;
                cursor: pointer;
                font-size: 20px;
                font-weight: bolder;
                right: 10px;
            }

            .left-button {
                position: absolute;
                top: 50%;
                color: #29323b;
                background-color: transparent;
                border: none;
                cursor: pointer;
                font-size: 20px;
                font-weight: bolder;
                left: 10px;
            }

            .products {
                display: flex;
                flex-wrap: nowrap;
                transition: transform 0.5s ease-in-out;
                width: max-content;
                height: max-content !important;
            }

            .product {
                flex: 0 0 calc(100%/8);
                min-width: 100px;
                border: 0px;
                padding: 10px;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                flex-grow: 1 !important;
            }

            .product img {
                width: 20rem;
                height: 30rem;
                object-fit: cover;
            }

            .product-text {
                background-color: #fffff;
            }

            .product-price {
                color: #193db0;
                font-size: 18px;
                display: inline-block;
                line-height: 22px;
                font-weight: bold;
                position: absolute;
                bottom: 0; 
            } 

            .product-header {
                padding: 8px 0;
                max-width: 20rem;
                color: #302e2b;
                overflow-wrap: fit-content;
                font-size: 14px;
            }

            
        `;

        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    const setEvents = () => {
        $('').on('click', () => {
            console.log('clicked');
        });

        $(document).ready(function () {
            const api = "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";
            let currIndex = 1;
            let productWidth = 0;
            let totalProductsDiv = 0;
            let totalProductsWidth = 0;

            let productList = JSON.parse(localStorage.getItem("productList"));

            if (productList) {
                console.log("Fetching products from local storage.");
                renderProducts(productList);
            } else {
                console.log("Fetching products from url.");
                $.getJSON(api, function (data) {
                    localStorage.setItem("productList", JSON.stringify(data));
                    renderProducts(data);
                }).fail(() => {
                    console.error("Error fetching products.");
                });
            }


            function renderProducts(products) {
                products.forEach((product) => {

                    let productHTML = `
                        <div class="${'product'}" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">
                            <img src="${product.img}" alt="${product.name}">
                            <div class="${'product-text'}">
                                <p class="${'product-header'}">${product.name}</p>
                                <h3 class="${'product-price'}">${product.price} TL</h3>
                            </div>
                        </div>
                    `;
                    $('.products').append(productHTML);
                });

                productWidth = $(".product").outerWidth(true);
                totalProductsWidth = $(".products-wrapper").outerWidth(true);
                totalProductsDiv = $(".product").length;

                $(".left-button").click(() => rotateCarousel("left"));
                $(".right-button").click(() => rotateCarousel("right"));
            }

            function rotateCarousel(direction) {

                let visibleProducts = totalProductsWidth / productWidth;

                if (direction === "right" && currIndex < totalProductsDiv - visibleProducts) {
                    currIndex++;
                } else if (direction === "left" && currIndex > 0) {
                    currIndex--;
                }

                let translateX = -currIndex * productWidth;
                $('.products').css("transform", `translateX(${translateX}px)`);
            }

        });
    };

    init();
})();