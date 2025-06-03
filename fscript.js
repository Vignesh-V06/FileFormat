const products = document.getElementById("Products");
const dropdown = document.getElementById("product-dropdown");

let isInsideDropdown = false;

products.addEventListener("mouseenter", () => {
    dropdown.style.display = "flex";
});

products.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!isInsideDropdown) {
            dropdown.style.display = "none";
        }
    }, 90);
});

dropdown.addEventListener("mouseenter", () => {
    isInsideDropdown = true;
    dropdown.style.display = "flex";
});

dropdown.addEventListener("mouseleave", () => {
    isInsideDropdown = false;
    dropdown.style.display = "none";
});

const support = document.getElementById("support");
const sdropdown = document.getElementById("support-dropdown");

let isInsideDropdown1 = false;

support.addEventListener("mouseenter", () => {
    sdropdown.style.display = "flex";
});

support.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!isInsideDropdown1) {
            sdropdown.style.display = "none";
        }
    }, 90);
});

sdropdown.addEventListener("mouseenter", () => {
    isInsideDropdown1 = true;
    sdropdown.style.display = "flex";
});

sdropdown.addEventListener("mouseleave", () => {
    isInsideDropdown1 = false;
    sdropdown.style.display = "none";
});
const webiste = document.getElementById("website");
const wdropdown = document.getElementById("website-dropdown");
let isInsideDropdown2 = false;

webiste.addEventListener("mouseenter", () => {
    wdropdown.style.display = "flex";
});

webiste.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!isInsideDropdown2) {
            wdropdown.style.display = "none";
        }
    }, 90);
});

wdropdown.addEventListener("mouseenter", () => {
    isInsideDropdown2 = true;
    wdropdown.style.display = "flex";
});

wdropdown.addEventListener("mouseleave", () => {
    isInsideDropdown2 = false;
    wdropdown.style.display = "none";
});

const about = document.getElementById("about");
const adropdown = document.getElementById("about-dropdown");
let isInsideDropdown3 = false;

about.addEventListener("mouseenter", () => {
    adropdown.style.display = "flex";
});

about.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!isInsideDropdown3) {
            adropdown.style.display = "none";
        }
    }, 90);
});

adropdown.addEventListener("mouseenter", () => {
    isInsideDropdown3 = true;
    adropdown.style.display = "flex";
});

adropdown.addEventListener("mouseleave", () => {
    isInsideDropdown3 = false;
    adropdown.style.display = "none";
});

const lang = document.getElementById("lang");
const mul = document.getElementById("mul");
let isInsideLang = false;

lang.addEventListener("mouseenter", () => {
    mul.style.display = "flex";
});

lang.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!isInsideLang) {
            mul.style.display = "none";
        }
    }, 90);
});

mul.addEventListener("mouseenter", () => {
    isInsideLang = true;
    mul.style.display = "flex";
});

mul.addEventListener("mouseleave", () => {
    isInsideLang = false;
    mul.style.display = "none";
});

/* Slide options -icons */
const toggleBtn = document.getElementById("togglePanel");
const panel = document.getElementById("slidePanel");
const toolcontainer = document.querySelector('.tool');
toggleBtn.addEventListener('click', () => {
    panel.classList.toggle('open');
    toolcontainer.classList.toggle('panel-open');

    const icon = toggleBtn.querySelector('ion-icon');
    icon.setAttribute(
        'name',
        panel.classList.contains('open') ? 'chevron-forward-outline' : 'chevron-back-outline'
    );
    toggleBtn.setAttribute(
        'title',
        panel.classList.contains('open') ? 'Hide Features' : 'Show Features'
    );
});

document.getElementById("fileInput").addEventListener("change", (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            panel.classList.add('open');
            toolcontainer.classList.add('panel-open');

            const icon = toggleBtn.querySelector('ion-icon');
            icon.setAttribute('name', 'chevron-forward-outline');
            toggleBtn.setAttribute('title', 'Hide Features');
        }
});

const up = document.getElementById("up");
up.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/*File upload */
let uploadedFiles = [];

document.addEventListener("DOMContentLoaded", () => {
    const uploadBtn = document.getElementById("uploadBtn");
    const fileInput = document.getElementById("fileInput");
    const fileList = document.querySelector(".file-list");
    const countDiv = document.querySelector(".no");
    const clearList = document.getElementById('trash');
    const clearList1 = document.getElementById("trash1");

    uploadBtn.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", async (event) => {
        const files = event.target.files;
        for (const file of files) {
            if (file.type !== "application/pdf") {
                alert("Only PDF files allowed: " + file.name);
                continue;
            }

            uploadedFiles.push(file); // ✅ Store uploaded file

            const fileURL = URL.createObjectURL(file);
            const thumbnail = await renderPDFThumbnail(fileURL);
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

            const fileItem = document.createElement("div");
            fileItem.className = "file-item";
            fileItem.innerHTML = `
                <span class="drag-handle">⋮⋮</span>
                <img src="${thumbnail}" alt="PDF thumbnail" class="file-thumb" />
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${sizeMB} MB</div>
                </div>
                <div class="file-delete" title="Delete file">
                    <ion-icon name="trash-outline"></ion-icon>
                </div>
            `;

            fileItem.querySelector(".file-delete").addEventListener("click", () => {
                fileItem.remove();
                URL.revokeObjectURL(fileURL);
                updateFileCount();

                // Also remove from uploadedFiles
                uploadedFiles = uploadedFiles.filter(f => f.name !== file.name);
            });

            fileList.appendChild(fileItem);
            updateFileCount();
        }

        fileInput.value = "";
    });

    function updateFileCount() {
        const count = fileList.querySelectorAll(".file-item").length;
        countDiv.textContent = count;
    }

    async function renderPDFThumbnail(pdfUrl) {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const scale = 0.5;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");
        await page.render({ canvasContext: context, viewport }).promise;
        return canvas.toDataURL();
    }

    clearList.addEventListener("click", () => {
        document.querySelectorAll(".file-item").forEach(fileItem => {
            const img = fileItem.querySelector("img.file-thumb");
            if (img && img.src.startsWith("blob:")) {
                URL.revokeObjectURL(img.src);
            }
            fileItem.remove();
        });

        uploadedFiles = []; // ✅ clear files
        updateFileCount();
    });

    clearList1.addEventListener("click", () => {
        document.querySelectorAll(".file-item").forEach(fileItem => {
            const img = fileItem.querySelector("img.file-thumb");
            if (img && img.src.startsWith("blob:")) {
                URL.revokeObjectURL(img.src);
            }
            fileItem.remove();
        });

        uploadedFiles = []; // ✅ clear files
        updateFileCount();
    });
});

/* File Compression */
document.getElementById('compress').addEventListener('click', async () => {
    const radios = document.getElementsByName('level');
    let level = null;

    for (const radio of radios) {
        if (radio.checked) {
            level = radio.value;
            break;
        }
    }

    const file = uploadedFiles[0]; // ✅ Get file from stored list

    console.log('Selected file:', file);
    console.log('Selected level:', level);

    if (!file || !level) {
        alert('Please upload a PDF and select a compression level.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('level', level);

    try {
       const response = await fetch('https://pdf-compressor.onrender.com/compress', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Compression failed.');

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'compressed.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to compress PDF. Make sure the server is running.');
    }
});
