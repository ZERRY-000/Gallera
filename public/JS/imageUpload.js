
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');

    uploadArea.addEventListener('click', () => imageInput.click());

    imageInput.addEventListener('change', showImages);

    uploadArea.addEventListener('dragover', (e) => e.preventDefault());
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
        if (files.length > 0) {
            imageInput.files = createFileList(files);
            showImages();
        }
    });

    function showImages() {
        imagePreview.innerHTML = '';
        Array.from(imageInput.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                imagePreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }

    function createFileList(files) {
        const dt = new DataTransfer();
        files.forEach(file => dt.items.add(file));
        return dt.files;
    }
});