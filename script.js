const variants = {
    Sonet: ["HTE", "HTK", "HTK+", "GTX", "GTX+"],
    Seltos: ["HTE", "HTK", "HTK+", "HTX", "GTX+"],
    Carens: ["Premium", "Premium(O)", "Gravity", "Prestige", "Prestige(O)", "Prestige Plus", "Prestige Plus(O)", "Luxury Plus", "X-Line"],
    Syros: ["HTK", "HTK(O)", "HTK+", "HTX", "HTX+", "HTX+O"]
};

// Populate variants dynamically
document.getElementById("model").addEventListener("change", function () {
    let model = this.value;
    let variantSelect = document.getElementById("variant");
    variantSelect.innerHTML = "";
    
    if (variants[model]) {
        variants[model].forEach(variant => {
            let option = document.createElement("option");
            option.value = variant;
            option.textContent = variant;
            variantSelect.appendChild(option);
        });
    }
});

// Show photos with carousel
function showPhotos() {
    let year = document.getElementById("year").value;
    let model = document.getElementById("model").value;
    let variant = document.getElementById("variant").value;
    let color = document.getElementById("color").value.replace(/ /g, "_"); // Format spaces

    let gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear previous images

    // Assuming images are stored in /images/{year}/{model}/{variant}/{color}/
    for (let i = 1; i <= 10; i++) {
        let img = document.createElement("img");
        img.src = `/images/${year}/${model}/${variant}/${color}/img${i}.jpg`;
        img.alt = `Image ${i}`;
        gallery.appendChild(img);
    }

    // Initialize the carousel
    $(".image-carousel").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000
    });
}

// Download current image
function downloadCurrent() {
    let activeImage = document.querySelector(".slick-current img");
    if (activeImage) {
        let link = document.createElement("a");
        link.href = activeImage.src;
        link.download = activeImage.src.split('/').pop();
        link.click();
    } else {
        alert("No image selected!");
    }
}

// Download all images as ZIP
function downloadAll() {
    alert("This feature needs a backend server to generate ZIP files.");
}
function downloadBrochure() {
    let model = document.getElementById('brochureModel').value;
    let brochurePath = `brochures/${model}.pdf`;

    let link = document.createElement("a");
    link.href = brochurePath;
    link.download = `${model}-Brochure.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
