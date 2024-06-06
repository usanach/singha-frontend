var houseCollections = document.querySelectorAll('.house-collection li');
var brandsHouseImgList = document.querySelectorAll('.brands-house-img-list li');
for (var i = 0; i < houseCollections.length; i++) {
    houseCollections[i].addEventListener('mouseenter', function (event) {
        for (var i = 0; i < houseCollections.length; i++) {
            houseCollections[i].classList.remove('active');
            brandsHouseImgList[i].classList.remove('active');
        }
        document.querySelector('.brands-house-img-list li[data-name="' + event.target.dataset.name + '"').classList.add('active');
        event.target.classList.add('active');
        event.preventDefault();
    });
}
var condoCollections = document.querySelectorAll('.condo-collection li');
var brandsCondoImgList = document.querySelectorAll('.brands-condo-img-list li');
for (var i = 0; i < condoCollections.length; i++) {
    condoCollections[i].addEventListener('mouseenter', function (event) {
        for (var i = 0; i < condoCollections.length; i++) {
            condoCollections[i].classList.remove('active');
            brandsCondoImgList[i].classList.remove('active');
        }
        document.querySelector('.brands-condo-img-list li[data-name="' + event.target.dataset.name + '"').classList.add('active')
        event.target.classList.add('active');
        event.preventDefault();
    });
}
document.querySelector('.trigger-brand-collection li.house-projects button').addEventListener('click', e => {
    document.querySelector('.trigger-brand-collection li.house-projects button').classList.add('underline');
    document.querySelector('.trigger-brand-collection li.condo-projects button').classList.remove('underline');
    document.querySelector('.trigger-brand-collection .condo-collection').classList.add('hidden');
    document.querySelector('.trigger-brand-collection .house-collection').classList.remove('hidden');
    document.querySelector('.trigger-brand-collection .brands-house-img-list').classList.remove('hidden');
    document.querySelector('.trigger-brand-collection .brands-condo-img-list').classList.add('hidden');
})
document.querySelector('.trigger-brand-collection li.condo-projects button').addEventListener('click', e => {
    document.querySelector('.trigger-brand-collection li.condo-projects button').classList.add('underline');
    document.querySelector('.trigger-brand-collection li.house-projects button').classList.remove('underline');
    document.querySelector('.trigger-brand-collection .house-collection').classList.add('hidden');
    document.querySelector('.trigger-brand-collection .condo-collection').classList.remove('hidden');
    document.querySelector('.trigger-brand-collection .brands-house-img-list').classList.add('hidden');
    document.querySelector('.trigger-brand-collection .brands-condo-img-list').classList.remove('hidden');
})