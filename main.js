// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Camera position
camera.position.z = 5;

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Book model
const createBook = () => {
    const bookGroup = new THREE.Group();
    
    // Book cover
    const coverGeometry = new THREE.BoxGeometry(3, 4, 0.2);
    const coverMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8B4513,
        specular: 0x111111,
        shininess: 30
    });
    const cover = new THREE.Mesh(coverGeometry, coverMaterial);
    bookGroup.add(cover);

    // Pages
    const pagesGeometry = new THREE.BoxGeometry(2.9, 3.9, 0.1);
    const pagesMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFFFFF,
        specular: 0x111111,
        shininess: 10
    });
    const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
    pages.position.z = 0.1;
    bookGroup.add(pages);

    return bookGroup;
};

const book = createBook();
scene.add(book);

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Show journal interface when book is clicked
book.addEventListener('click', () => {
    document.getElementById('journal-interface').classList.remove('hidden');
});

// Handle journal entry submission
document.getElementById('journal-entry').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const entry = e.target.value;
        // TODO: Connect to AI API and get response
        // For now, just show a placeholder response
        document.getElementById('ai-response').textContent = "Thank you for sharing your thoughts. I'm here to listen and support you.";
    }
}); 