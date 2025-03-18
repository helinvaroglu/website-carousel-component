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
                min-width: 100px;
                border: 0px;
                padding: 10px;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                flex-grow: 1 !important;
                width: max-content !important;
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

            .favorite-icon-div {
                position: absolute;
                right: 1rem;
                margin: 1rem;
                background-color: #fff;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
                width: 4rem;
                height: 4rem;
                border-radius: 5px;
                display: flex;
                justify-content: center; 
                align-items: center;
                z-index: 10;
            }

            .heart-icon {
                cursor: pointer;
            }

            .heart-icon.filled path {
                fill: blue !important; 
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
            let favoriteList = JSON.parse(localStorage.getItem("favoriteProducts")) || {}; 

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

            function toggleFavorite(productId, iconElement) {
                let favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || {};

                if (favoriteProducts[productId]) {
                    delete favoriteProducts[productId];
                    $(iconElement).removeClass("filled");
                } else {
                    favoriteProducts[productId] = true;
                    $(iconElement).addClass("filled");
                }

                localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
            }

            function renderProducts(products) {

                products.forEach((product) => {

                    let productId = $(this).attr("data-id");
                    let isFavorite = favoriteList[productId] ? "filled" : "";

                    let productHTML = `
                        <div class="${'product'}" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">
                            <div class="${'favorite-icon-div'}">
                                <svg class="heart-icon ${isFavorite}" data-id="${product.id}" width="36px" height="36px" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z" fill="none" stroke="#222222" stroke-width="1"></path> </g></svg>
                            </div>
                            <img src="${product.img}" alt="${product.name}">
                            <div class="${'product-text'}">
                                <p class="${'product-header'}">${product.name}</p>
                                <h3 class="${'product-price'}">${product.price} TL</h3>
                            </div>
                        </div>
                    `;
                    $('.products').append(productHTML);
                });
                $(".heart-icon").click(function (event) {
                    event.stopPropagation();
                    let productId = $(this).data("id");
                    toggleFavorite(productId, this);
                });    

                productWidth = $(".product").outerWidth(true);
                totalProductsWidth = $(".products-wrapper").outerWidth(true);
                totalProductsDiv = $(".product").length;

                $(".left-button").click(() => rotateCarousel("left"));
                $(".right-button").click(() => rotateCarousel("right"));

                $(".products").on("click", ".product", function () {

                    let productName = $(this).attr("data-name");
                    let productPrice = $(this).attr("data-price");
                    let productImg = $(this).attr("data-img");

                    let newTab = window.open();
                    newTab.document.write(`
                        <html>
                        <head>
                            <title>${productName}</title>
                            <style>
                                body {text-align: center; padding: 20px; font-family: Open Sans, sans-serif;}
                                .product-container { width: 50%; margin: auto; padding: 20px; box-shadow:  0px 0px 10px rgba(0, 0, 0, 0.3); background-color: #fff}
                                img { width: 20rem; height: 30rem; object-fit: cover; }
                                h2 { font-size: 18px; margin: 10px 0; font-weight: lighter; }
                                p { color: #193db0; font-size: 24px; display: inline-block; font-weight: bold; margin: 10px !important; }
                            </style>
                        </head>
                        <body>
                            <div class="product-container">
                                                                
                                <img src="${productImg}">
                                <h2>${productName}</h2>
                                <p>${productPrice} TL</p>
                            </div>

                        </body>
                        </html>
                    `);
                });
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