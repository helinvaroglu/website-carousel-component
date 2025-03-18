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
                            <div class="${'favorite-icon-div'}">
                                <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.993 5.09691C11.0387 4.25883 9.78328 3.75 8.40796 3.75C5.42122 3.75 3 6.1497 3 9.10988C3 10.473 3.50639 11.7242 4.35199 12.67L12 20.25L19.4216 12.8944L19.641 12.6631C20.4866 11.7172 21 10.473 21 9.10988C21 6.1497 18.5788 3.75 15.592 3.75C14.2167 3.75 12.9613 4.25883 12.007 5.09692L12 5.08998L11.993 5.09691ZM12 7.09938L12.0549 7.14755L12.9079 6.30208L12.9968 6.22399C13.6868 5.61806 14.5932 5.25 15.592 5.25C17.763 5.25 19.5 6.99073 19.5 9.10988C19.5 10.0813 19.1385 10.9674 18.5363 11.6481L18.3492 11.8453L12 18.1381L5.44274 11.6391C4.85393 10.9658 4.5 10.0809 4.5 9.10988C4.5 6.99073 6.23699 5.25 8.40796 5.25C9.40675 5.25 10.3132 5.61806 11.0032 6.22398L11.0921 6.30203L11.9452 7.14752L12 7.09938Z" fill="#000"></path> </g></svg>
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

                productWidth = $(".product").outerWidth(true);
                totalProductsWidth = $(".products-wrapper").outerWidth(true);
                totalProductsDiv = $(".product").length;

                $(".left-button").click(() => rotateCarousel("left"));
                $(".right-button").click(() => rotateCarousel("right"));

                $(".products").on("click", ".product", function () {

                    let productId = $(this).attr("data-id");
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