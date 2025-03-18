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
                padding: 10px 15px;
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
                padding: 10px 15px;
                cursor: pointer;
                font-size: 20px;
                font-weight: bolder;
                left: 10px;
            }

            
        `;

        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    const setEvents = () => {
        $('').on('click', () => {
            console.log('clicked');
        });
    };

    init();
})();