const carVariants = {
    sonet: ["HTE", "HTE (O)", "HTK", "HTK (O)", "HTK Plus (O)", "HTX", "GTX Plus", "X-Line"],
    seltos: ["HTE", "HTE (O)", "HTK", "HTK (O)", "HTK Plus (O)", "HTX", "HTX (O)", "GTX Plus", "X-Line"],
    carens: ["Premium", "Prestige", "Luxury", "Luxury Plus"],
    sorento: ["LX", "EX", "SX", "SX Prestige"]
};

function updateVariants() {
    let model = document.getElementById("carModel").value;
    let variantSelect = document.getElementById("carVariant");
    variantSelect.innerHTML = `<option value="" disabled selected>Select Variant</option>`;

    if (carVariants[model]) {
        carVariants[model].forEach(variant => {
            let className = variant.toLowerCase().replace(/\s+|\(|\)/g, '');
            variantSelect.innerHTML += `<option value="${className}">${variant}</option>`;
        });
    }
}

function filterImages() {
    let year = document.getElementById("carYear").value;
    let model = document.getElementById("carModel").value;
    let variant = document.getElementById("carVariant").value;
    let color = document.getElementById("carColor").value;
    let gallery = document.getElementById("gallery");

    if (!year || !model || !variant || !color) {
        alert("Please select all options to proceed.");
        return;
    }

    gallery.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        let imagePath = `images/${year}/${model}/${variant}/${color}_${i}.jpg`;
        let imgElement = document.createElement("img");
        imgElement.src = imagePath;
        imgElement.alt = `${year} ${model} ${variant} ${color}`;
        imgElement.classList.add("car-image");
        imgElement.onerror = function () { this.style.display = 'none'; };
        gallery.appendChild(imgElement);
    }
}

function downloadImage() {
    let images = document.querySelectorAll(".car-image");
    if (images.length === 0) return alert("No images available.");
    let link = document.createElement("a");
    link.href = images[0].src;
    link.download = images[0].src.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadZip() {
    let zip = new JSZip();
    let folder = zip.folder("Kia_Car_Images");
    let images = document.querySelectorAll(".car-image");

    if (images.length === 0) return alert("No images available.");

    let promises = [...images].map((img, i) =>
        fetch(img.src).then(r => r.blob()).then(b => folder.file(`image_${i + 1}.jpg`, b))
    );

    Promise.all(promises).then(() =>
        zip.generateAsync({ type: "blob" }).then(content => saveAs(content, "Kia_Car_Images.zip"))
    );
}
