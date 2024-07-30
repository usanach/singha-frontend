const galleryImage = [
    { src: './../../../assets/image-extro/gallery01.png', type: 'image', category: ['Exterior'] },
    { src: './../../../assets/image-extro/gallery02.png', type: 'image', category: ['Interior'] },
    { src: './../../../assets/image-extro/gallery03.png', type: 'image', category: ['Exterior'] },
    { src: './../../../assets/image-extro/gallery04.png', type: 'image', category: ['Interior', 'Facilities'] },
    { src: './../../../assets/image-extro/gallery05.png', type: 'image', category: ['Interior'] },
    { src: './../../../assets/image-extro/gallery06.png', type: 'image', category: ['Interior'] },
    { src: './../../../assets/image-extro/gallery03.png', type: 'image', category: ['Exterior'] },
    { src: './../../../assets/image-extro/gallery04.png', type: 'image', category: ['Interior', 'Facilities'] },
    { src: './../../../assets/image-extro/gallery05.png', type: 'image', category: ['Interior'] },
    { src: './../../../assets/image-extro/gallery06.png', type: 'image', category: ['Interior'] },
    { src: '../../../assets/vdo/Screen Recording 2567-05-28 at 21.38.26.mp4', type: 'video', category: ['Vdo'] },
];

function getImageDimensions(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve({ width: img.width, height: img.height });
        };
        img.onerror = () => {
            reject(new Error(`Error loading image: ${src}`));
        };
        img.src = src;
    });
}

let categorizedImages = {
    All: { verticle: [], horizontal: [] },
    Exterior: { verticle: [], horizontal: [] },
    Interior: { verticle: [], horizontal: [] },
    Facilities: { verticle: [], horizontal: [] },
    Vdo: { verticle: [], horizontal: [] }
};
let imagesCategorized = false;

async function categorizeImages() {
    if (imagesCategorized) {
        return; // Skip categorization if already done
    }

    console.log("Starting categorization...");
    for (const image of galleryImage) {
        try {
            const { width, height } = await getImageDimensions(image.src);
            const aspectRatio = width / height;
            const orientation = aspectRatio > 1 ? 'horizontal' : 'verticle';

            // Add to "All" category
            categorizedImages.All[orientation].push(image);

            for (const category of image.category) {
                if (categorizedImages[category]) {
                    categorizedImages[category][orientation].push(image);
                }
            }
        } catch (error) {
            console.error(`Error processing image ${image.src}:`, error);
        }
    }

    imagesCategorized = true;
    initializeSwipers();
    console.log('Categorized Images:', categorizedImages);
}

let swiperInstances = {};

function initializeSwipers() {
    const swiperOptions = {
        loop: false,
        pagination: {
            clickable: true,
        },
        navigation: {
            nextEl: '.button-next',
            prevEl: '.button-prev',
        },
    };

    swiperInstances = {
        All: new Swiper('#all-slider', {
            ...swiperOptions,
            slidesPerView: 1,
            pagination: { el: '#all-slider .swiper-pagination' },
        }),
        Exterior: new Swiper('#exterior-slider', {
            ...swiperOptions,
            slidesPerView: 1,
            pagination: { el: '#exterior-slider .swiper-pagination' },
        }),
        Interior: new Swiper('#interior-slider', {
            ...swiperOptions,
            slidesPerView: 1,
            pagination: { el: '#interior-slider .swiper-pagination' },
        }),
        Facilities: new Swiper('#facilities-slider', {
            ...swiperOptions,
            slidesPerView: 1,
            pagination: { el: '#facilities-slider .swiper-pagination' },
        }),
        Vdo: new Swiper('#vdo-slider', {
            ...swiperOptions,
            slidesPerView: 1,
            pagination: { el: '#vdo-slider .swiper-pagination' },
        })
    };

    rebuildSlides();
}

function rebuildSlides() {
    for (const swiper of Object.values(swiperInstances)) {
        swiper.removeAllSlides();
    }
    addImagesToSwipers();
}

function addImagesToSwipers() {
    function createSlide(content, widthClass) {
        return `<div class="swiper-slide ${widthClass}">${content}</div>`;
    }

    function getWrappersPerSlide() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 560) return 1;
        if (screenWidth < 768) return 2;
        if (screenWidth < 1024) return 3;
        if (screenWidth < 1366) return 4;
        if (screenWidth < 1440) return 5;
        return 6; // Default for larger screens
    }

    for (const [category, sw] of Object.entries(swiperInstances)) {
        if (!sw) {
            console.error(`Swiper instance for ${category} is not initialized.`);
            continue;
        }

        const images = categorizedImages[category];
        let wrappers = [];
        let horizontalIndex = 0;

        function getNextHorizontalWrapper() {
            let horizontalWrapper = '';
            if (horizontalIndex < images.horizontal.length) {
                for (let i = 0; i < 2 && horizontalIndex < images.horizontal.length; i++, horizontalIndex++) {
                    if (i === 0) horizontalWrapper = '<div class="horizontal-wrapper">';
                    horizontalWrapper += `<a href="${images.horizontal[horizontalIndex].src}" data-lightbox="image-gallery" data-title="Gallery Image">
                        <img src="${images.horizontal[horizontalIndex].src}" alt="Gallery Image" />
                    </a>`;
                }
                horizontalWrapper += '</div>';
            }
            return horizontalWrapper;
        }

        let verticleIndex = 0;
        let useverticle = true;
        while (verticleIndex < images.verticle.length || horizontalIndex < images.horizontal.length) {
            if (useverticle && verticleIndex < images.verticle.length) {
                wrappers.push(`<div class="verticle-wrapper"><a href="${images.verticle[verticleIndex].src}" data-lightbox="image-gallery" data-title="Gallery Image">
                    <img src="${images.verticle[verticleIndex].src}" alt="Gallery Image" />
                </a></div>`);
                verticleIndex++;
                useverticle = false;
            } else {
                const horizontalWrapper = getNextHorizontalWrapper();
                if (horizontalWrapper) {
                    wrappers.push(horizontalWrapper);
                }
                useverticle = true;
            }
        }

        const wrappersPerSlide = getWrappersPerSlide();
        const widthClass = `slide-width-${wrappersPerSlide}`;
        let slideContent = '';

        wrappers.forEach((wrapper, index) => {
            if (index % wrappersPerSlide === 0 && slideContent) {
                try {
                    sw.appendSlide(createSlide(slideContent, widthClass));
                } catch (error) {
                    console.error(`Error appending slide to ${category} Swiper:`, error);
                }
                slideContent = '';
            }
            slideContent += wrapper;
        });
        if (slideContent) {
            try {
                sw.appendSlide(createSlide(slideContent, widthClass));
            } catch (error) {
                console.error(`Error appending slide to ${category} Swiper:`, error);
            }
        }
    }
}

function setupTabClickListeners() {
    const tabs = document.querySelectorAll('.gallery-tabs .tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.swiper-container').forEach(container => {
                container.classList.remove('show');
                container.classList.add('hide');
            });

            tab.classList.add('active');
            const selectedSlider = document.querySelector(`#${category}-slider`);
            if (selectedSlider) {
                selectedSlider.classList.remove('hide');
                selectedSlider.classList.add('show');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (imagesCategorized) {
        initializeSwipers();
        return;
    } else {
        categorizeImages().then(() => {
            setupTabClickListeners();
        });
    }

    window.addEventListener('resize', rebuildSlides);
});


<iframe width="1903" height="742" 
src="https://www.youtube.com/embed/ZybcLbb0AQk" 
title="Teemo top พี่ๆก็รีบเกินนน ▬ league of legends TH ▬" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
    
</iframe>