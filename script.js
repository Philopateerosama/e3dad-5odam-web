// Configuration
const CONFIG = {
    lecturesPath_S1: './Mo7drat_S1/',
    lecturesPath_S2: './Mo7drat_S2/',
    hymnsPath_S1: './al7an_S1/',
    hymnsPath_S2: './al7an_S2/',
    supportedAudioFormats: ['.ogg', '.mp3'],
    supportedImageFormats: ['.jpg', '.jpeg', '.png']
};

// Import data from data.js
// Data will be loaded from LECTURES_DATA and HYMNS_DATA in data.js

// Data storage
let lectures = [];
let hymns = [];
let currentAudio = null;
let isPlaying = false;
let currentHymnImages = [];
let currentImageIndex = 0;
let currentSemester = null;
let filteredLectures = [];
let filteredHymns = [];

// DOM Elements
const contentSections = document.querySelectorAll('.content-section');
const searchInput = document.getElementById('searchInput');
const pdfModal = document.getElementById('pdfModal');
const hymnModal = document.getElementById('hymnModal');
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const timeDisplay = document.getElementById('timeDisplay');
const lecturesCard = document.getElementById('lecturesCard');
const hymnsCard = document.getElementById('hymnsCard');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadLectures();
    loadHymns();
    setupEventListeners();
    showSemesterSelection(); // Start with semester selection screen
});

// Load lectures data
async function loadLectures() {
    try {
        // Use data from data.js with semester-specific paths
        lectures = LECTURES_DATA.map(lecture => ({
            id: lecture.id,
            name: lecture.title,
            filename: lecture.path.split('/').pop(),
            path: lecture.path,
            semester: lecture.semester
        }));

        console.log('Loaded lectures:', lectures);
    } catch (error) {
        console.error('Error loading lectures:', error);
    }
}

// Load hymns data
async function loadHymns() {
    try {
        // Use data from data.js with semester-specific paths
        hymns = HYMNS_DATA.map(hymn => ({
            id: hymn.id,
            name: hymn.title,
            audioFile: hymn.audioFile,
            images: hymn.images,
            semester: hymn.semester,
            // Add semester-specific path for audio files
            audioPath: hymn.semester === 1 ? `al7an_S1/${hymn.audioFile}` : `al7an_S2/${hymn.audioFile}`,
            // Add semester-specific paths for image files
            imagePaths: hymn.images.map(image => 
                hymn.semester === 1 ? `al7an_S1/${image}` : `al7an_S2/${image}`
            )
        }));

        console.log('Loaded hymns:', hymns);
    } catch (error) {
        console.error('Error loading hymns:', error);
    }
}

// Display lectures
function displayLectures(searchTerm = '') {
    const lecturesList = document.getElementById('lecturesList');
    const searchFilteredLectures = filteredLectures.filter(lecture => 
        lecture.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    lecturesList.innerHTML = searchFilteredLectures.map(lecture => `
        <div class="lecture-card" onclick="openPdfModal('${lecture.name}', '${lecture.path}')">
            <div class="flex items-center space-x-reverse space-x-3">
                <div class="mary-blue p-3 rounded-full">
                    <i class="fas fa-file-pdf light-blue-accent text-lg"></i>
                </div>
                <div class="flex-1">
                    <h3 class="lecture-title">${highlightSearchTerm(lecture.name, searchTerm)}</h3>
                    <div class="lecture-meta">
                        <i class="fas fa-eye ml-2 text-xs gold-accent"></i>
                        اضغط لعرض المحاضرة
                    </div>
                </div>
                <i class="fas fa-chevron-left text-gray-400"></i>
            </div>
        </div>
    `).join('');

    updateCounts();
}

// Display hymns
function displayHymns(searchTerm = '') {
    const hymnsList = document.getElementById('hymnsList');
    const searchFilteredHymns = filteredHymns.filter(hymn => 
        hymn.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    hymnsList.innerHTML = searchFilteredHymns.map(hymn => `
        <div class="hymn-card" onclick="openHymnModal('${hymn.name}', '${hymn.audioFile}', ${JSON.stringify(hymn.images).replace(/"/g, '&quot;')})">
            <div class="flex items-center space-x-reverse space-x-3">
                <div class="mary-blue p-3 rounded-full">
                    <i class="fas fa-music light-blue-accent text-lg"></i>
                </div>
                <div class="flex-1">
                    <h3 class="lecture-title">${highlightSearchTerm(hymn.name, searchTerm)}</h3>
                    <div class="lecture-meta">
                        <i class="fas fa-headphones ml-2 text-xs gold-accent"></i>
                        اضغط للاستماع والمشاهدة
                        ${hymn.images.length > 1 ? `<span class="ml-2 text-xs text-gray-500">(${hymn.images.length} صور)</span>` : ''}
                    </div>
                </div>
                <i class="fas fa-chevron-left text-gray-400"></i>
            </div>
        </div>
    `).join('');

    updateCounts();
}

// Highlight search term
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value;
        const activeSection = document.querySelector('.content-section:not(.hidden)');
        
        if (activeSection.id === 'lecturesSection') {
            displayLectures(searchTerm);
        } else {
            displayHymns(searchTerm);
        }
    });

    // Audio player controls
    playBtn.addEventListener('click', togglePlayPause);
    progressBar.addEventListener('click', seekAudio);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('loadedmetadata', updateDuration);
    audioPlayer.addEventListener('ended', function() {
        isPlaying = false;
        updatePlayButton();
    });

    // Close modals on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePdfModal();
            closeHymnModal();
        }
    });

    // Handle mobile viewport height changes
    window.addEventListener('resize', function() {
        // Adjust modal heights for mobile browsers
        const modals = document.querySelectorAll('.mobile-modal');
        modals.forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                // Trigger reflow to adjust height
                modal.style.height = '100vh';
                modal.style.height = window.innerHeight + 'px';
            }
        });
    });
}

// Navigate to section with smooth scrolling and active state
function navigateToSection(section) {
    // Update active state on cards
    lecturesCard.classList.remove('active');
    hymnsCard.classList.remove('active');
    
    if (section === 'lectures') {
        lecturesCard.classList.add('active');
        // Show lectures section, hide hymns
        document.getElementById('lecturesSection').classList.remove('hidden');
        document.getElementById('hymnsSection').classList.add('hidden');
        // Smooth scroll to lectures section
        setTimeout(() => {
            document.getElementById('lecturesSection').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    } else if (section === 'hymns') {
        hymnsCard.classList.add('active');
        // Show hymns section, hide lectures
        document.getElementById('hymnsSection').classList.remove('hidden');
        document.getElementById('lecturesSection').classList.add('hidden');
        // Smooth scroll to hymns section
        setTimeout(() => {
            document.getElementById('hymnsSection').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    }
}

// Open PDF modal
function openPdfModal(title, path) {
    console.log('Attempting to open PDF:', path);
    document.getElementById('pdfTitle').textContent = title;
    // Encode the path to handle Arabic characters properly
    const encodedPath = encodeURI(path);
    console.log('Encoded PDF path:', encodedPath);
    document.getElementById('pdfViewer').src = encodedPath;
    
    // Set up fallback link
    const pdfLink = document.getElementById('pdfLink');
    const pdfFallback = document.getElementById('pdfFallback');
    pdfLink.href = encodedPath;
    
    pdfModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Adjust for mobile viewport
    if (window.innerWidth < 768) {
        pdfModal.style.height = window.innerHeight + 'px';
    }
    
    // Show fallback after a delay if PDF doesn't load
    setTimeout(() => {
        const iframe = document.getElementById('pdfViewer');
        if (!iframe.contentDocument && !iframe.contentWindow) {
            pdfFallback.classList.remove('hidden');
        }
    }, 3000);
}

// Close PDF modal
function closePdfModal() {
    pdfModal.classList.add('hidden');
    document.getElementById('pdfViewer').src = '';
    document.getElementById('pdfFallback').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Open hymn modal
function openHymnModal(title, audioFile, images) {
    console.log('Attempting to open hymn:', { title, audioFile, images });
    document.getElementById('hymnTitle').textContent = title;
    
    // Find the hymn data to get semester-specific paths
    const hymnData = hymns.find(h => h.name === title && h.audioFile === audioFile);
    if (!hymnData) {
        console.error('Hymn data not found:', { title, audioFile });
        return;
    }
    
    // Store images and reset index
    currentHymnImages = hymnData.imagePaths; // Use full paths
    currentImageIndex = 0;
    
    // Load audio with semester-specific path
    console.log('Audio path:', hymnData.audioPath);
    audioPlayer.src = hymnData.audioPath;
    audioPlayer.type = 'audio/ogg';
    currentAudio = hymnData.audioPath;
    
    // Load first image
    loadCurrentImage();
    
    // Update navigation UI
    updateImageNavigation();
    
    hymnModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Adjust for mobile viewport
    if (window.innerWidth < 768) {
        hymnModal.style.height = window.innerHeight + 'px';
    }
    
    // Reset player
    isPlaying = false;
    updatePlayButton();
    audioPlayer.load();
}

// Load current image in slider
function loadCurrentImage() {
    const hymnImage = document.getElementById('hymnImage');
    const imagePath = currentHymnImages[currentImageIndex]; // Already full path
    
    console.log('Loading image:', imagePath);
    hymnImage.src = imagePath;
    hymnImage.style.display = 'block';
    
    // Add error handling
    hymnImage.onerror = function() {
        console.log('Image failed to load, trying alternative...');
        this.onerror = function() {
            console.log('Alternative failed, showing placeholder...');
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjlGQUZCIi8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWODBIODBWNjBaIiBmaWxsPSIjODdDRUVCIi8+CjxwYXRoIGQ9Ik04MCA5MEgxMjBWMTIwSDgwVjkwWiIgZmlsbD0iIzg3Q0VFQiIvPgo8cGF0aCBkPSJNODAgMTIwSDEyMFYxNDBIODBWMTIwWiIgZmlsbD0iIzg3Q0VFQiIvPgo8L3N2Zz4K';
        };
        // Try .png extension as fallback
        const pngPath = imagePath.replace('.jpg', '.png').replace('.jpeg', '.png');
        this.src = pngPath;
    };
}

// Update image navigation UI
function updateImageNavigation() {
    const prevBtn = document.getElementById('prevImageBtn');
    const nextBtn = document.getElementById('nextImageBtn');
    const pageIndicator = document.getElementById('imagePageIndicator');
    
    if (currentHymnImages.length > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        pageIndicator.textContent = `${currentImageIndex + 1} / ${currentHymnImages.length}`;
        pageIndicator.style.display = 'block';
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        pageIndicator.style.display = 'none';
    }
}

// Navigate to previous image
function previousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        loadCurrentImage();
        updateImageNavigation();
    }
}

// Navigate to next image
function nextImage() {
    if (currentImageIndex < currentHymnImages.length - 1) {
        currentImageIndex++;
        loadCurrentImage();
        updateImageNavigation();
    }
}

// Close hymn modal
function closeHymnModal() {
    hymnModal.classList.add('hidden');
    audioPlayer.pause();
    audioPlayer.src = '';
    currentAudio = null;
    isPlaying = false;
    document.body.style.overflow = 'auto';
}

// Toggle play/pause
function togglePlayPause() {
    if (!audioPlayer.src) return;
    
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
    updatePlayButton();
}

// Update play button
function updatePlayButton() {
    const icon = playBtn.querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

// Seek audio
function seekAudio(e) {
    if (!audioPlayer.src) return;
    
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
}

// Update progress
function updateProgress() {
    if (!audioPlayer.src) return;
    
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = percent + '%';
    
    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(audioPlayer.currentTime % 60).toString().padStart(2, '0');
    const durationMinutes = Math.floor(audioPlayer.duration / 60) || 0;
    const durationSeconds = Math.floor(audioPlayer.duration % 60).toString().padStart(2, '0') || '00';
    
    timeDisplay.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
}

// Update duration
function updateDuration() {
    if (!audioPlayer.src) return;
    updateProgress();
}

// Update counts
function updateCounts() {
    // Counts are now displayed in the stats section
    document.querySelector('.lectures-total').textContent = filteredLectures.length;
    document.querySelector('.hymns-total').textContent = filteredHymns.length;
}

// Update stats
function updateStats() {
    document.querySelector('.lectures-total').textContent = filteredLectures.length;
    document.querySelector('.hymns-total').textContent = filteredHymns.length;
}

// Semester Navigation Functions
function showSemesterSelection() {
    document.getElementById('semesterSelection').classList.remove('hidden');
    document.getElementById('contentScreen').classList.add('hidden');
    document.body.classList.add('semester-selection-active');
    currentSemester = null;
    // Hide search bar on landing page
    document.querySelector('.mobile-search').style.display = 'none';
}

function selectSemester(semester) {
    currentSemester = semester;
    
    // Filter data by semester
    filteredLectures = lectures.filter(lecture => lecture.semester === semester);
    filteredHymns = hymns.filter(hymn => hymn.semester === semester);
    
    // Update UI
    document.getElementById('semesterSelection').classList.add('hidden');
    document.getElementById('contentScreen').classList.remove('hidden');
    document.body.classList.remove('semester-selection-active');
    
    // Show search bar on content pages
    document.querySelector('.mobile-search').style.display = 'block';
    
    // Update title
    const semesterTitle = document.getElementById('semesterTitle');
    if (semester === 1) {
        semesterTitle.textContent = 'إحصائيات الترم الأول';
    } else if (semester === 2) {
        semesterTitle.textContent = 'إحصائيات الترم الثاني';
    }
    
    // Show content or coming soon
    if (filteredLectures.length === 0 && filteredHymns.length === 0) {
        showComingSoon();
    } else {
        hideComingSoon();
        displayLectures();
        displayHymns();
        updateStats();
        // Reset to lectures section and set active state
        navigateToSection('lectures');
    }
}

function backToHome() {
    showSemesterSelection();
}

function showComingSoon() {
    // Hide sections
    document.getElementById('lecturesSection').classList.add('hidden');
    document.getElementById('hymnsSection').classList.add('hidden');
    document.querySelector('.mobile-search').style.display = 'none';
    
    // Show coming soon message
    let comingSoonDiv = document.getElementById('comingSoonMessage');
    if (!comingSoonDiv) {
        comingSoonDiv = document.createElement('div');
        comingSoonDiv.id = 'comingSoonMessage';
        comingSoonDiv.className = 'coming-soon';
        comingSoonDiv.innerHTML = `
            <i class="fas fa-clock"></i>
            <h3>قريباً</h3>
            <p>محتوى الترم الثاني قيد الإعداد<br>سيتم إضافته قريباً في 2026</p>
        `;
        document.getElementById('contentScreen').appendChild(comingSoonDiv);
    }
}

function hideComingSoon() {
    const comingSoonDiv = document.getElementById('comingSoonMessage');
    if (comingSoonDiv) {
        comingSoonDiv.remove();
    }
    
    // Show sections and search
    document.getElementById('lecturesSection').classList.remove('hidden');
    document.querySelector('.mobile-search').style.display = 'block';
}
