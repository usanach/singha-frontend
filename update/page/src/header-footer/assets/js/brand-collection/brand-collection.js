var brandCollections = document.querySelectorAll('.brand-collection li');
for (var i = 0; i < brandCollections.length; i++) {
    brandCollections[i].addEventListener('mouseenter', function (event) {
        for (var i = 0; i < brandCollections.length; i++) {
            brandCollections[i].classList.remove('active');
        }
        event.target.classList.add('active');
        event.preventDefault();
    });
}