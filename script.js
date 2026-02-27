// Configuration
const CONFIG = {
    lecturesPath: './Mo7drat/',
    hymnsPath: './al7an/',
    supportedAudioFormats: ['.ogg', '.mp3'],
    supportedImageFormats: ['.jpg', '.jpeg', '.png']
};

// Hardcoded data map for lectures
const LECTURES_DATA = [
    { id: 1, title: 'الصوم - لاهوت مقارن', path: 'Mo7drat/1.pdf' },
    { id: 2, title: 'العصر الرسولي - عصر الإستشهاد', path: 'Mo7drat/2.pdf' },
    { id: 3, title: 'المعمودية - لاهوت مقارن', path: 'Mo7drat/3.pdf' },
    { id: 4, title: 'المنهج إعداد خدام - سنة أولى 2026', path: 'Mo7drat/4.pdf' },
    { id: 5, title: 'تعريف الكتاب المقدس', path: 'Mo7drat/5.pdf' },
    { id: 6, title: 'حساب الأبقطي', path: 'Mo7drat/6.pdf' },
    { id: 7, title: 'خيمة الاجتماع', path: 'Mo7drat/7.pdf' },
    { id: 8, title: 'سر التجسد الإلهى ل 2026', path: 'Mo7drat/8.pdf' },
    { id: 9, title: 'سر التوبة والاعتراف - لاهوت مقارن-1', path: 'Mo7drat/9.pdf' },
    { id: 10, title: 'طبيعة السيد المسيح', path: 'Mo7drat/10.pdf' },
    { id: 11, title: 'عقيده الثالوث', path: 'Mo7drat/11.pdf' },
    { id: 12, title: 'مجمع القسطنطينية 2026', path: 'Mo7drat/12.pdf' },
    { id: 13, title: 'مجمع نيقية 2026', path: 'Mo7drat/13.pdf' },
    { id: 14, title: 'مصداقية الكتاب المقدس', path: 'Mo7drat/14.pdf' },
    { id: 15, title: 'مقدمة عامة فى الطقوس', path: 'Mo7drat/15.pdf' },
    { id: 16, title: 'مهارات الكتاب المقدس 2026', path: 'Mo7drat/16.pdf' }
];

// Hardcoded data map for hymns (using actual existing files)
const HYMNS_DATA = [
    { 
        id: 1, 
        title: 'أمين أمين طون ثاناطون', 
        audioPath: 'al7an/أمين أمين طون ثاناطون.ogg', 
        imagePath: 'al7an/أمين أمين طون ثاناطون.jpg' 
    },
    { 
        id: 2, 
        title: 'ارباع الناقوس آدام', 
        audioPath: 'al7an/ارباع الناقوس آدام.ogg', 
        imagePath: 'al7an/ارباع الناقوس آدام.jpg' 
    },
    { 
        id: 3, 
        title: 'ارباع الناقوس واطس', 
        audioPath: 'al7an/ارباع الناقوس واطس.ogg', 
        imagePath: 'al7an/ارباع الناقوس واطس.jpg' 
    },
    { 
        id: 4, 
        title: 'الليلويا فاى بيبى (1)', 
        audioPath: 'al7an/الليلويا فاى بيبى (1).ogg', 
        imagePath: 'al7an/الليلويا فاى بيبى.jpg' 
    },
    { 
        id: 5, 
        title: 'الليلويا فاى بيبى (2)', 
        audioPath: 'al7an/الليلويا فاى بيبى (2).ogg', 
        imagePath: 'al7an/الليلويا فاى بيبى.jpg' 
    },
    { 
        id: 6, 
        title: 'الهيتنات السنوى', 
        audioPath: 'al7an/الهيتنات السنوى.ogg', 
        imagePath: 'al7an/الهيتنات السنوى1.jpg' 
    },
    { 
        id: 7, 
        title: 'تى شورى', 
        audioPath: 'al7an/تى شورى.ogg', 
        imagePath: 'al7an/تى شورى.jpg' 
    },
    { 
        id: 8, 
        title: 'ذوكصولوجية السيدة العذراء رفع بخور باكر', 
        audioPath: 'al7an/ذوكصولوجية السيدة العذراء رفع بخور باكر.ogg', 
        imagePath: 'al7an/ذوكصولوجية السيدة العذراء رفع بخور باكر1.jpg' 
    },
    { 
        id: 9, 
        title: 'مرد أنجيل عيد الميلاد', 
        audioPath: 'al7an/مرد أنجيل عيد الميلاد.ogg', 
        imagePath: 'al7an/مرد أنجيل عيد الميلاد.jpg' 
    },
    { 
        id: 10, 
        title: 'مرد انجيل الاحد الاول والثانى', 
        audioPath: 'al7an/مرد انجيل الاحد الاول والثانى.ogg', 
        imagePath: 'al7an/مرد انجيل الاحد الاول والثانى.jpg' 
    },
    { 
        id: 11, 
        title: 'مرد انجيل الاحد الثالث والرابع لشهر كيهك', 
        audioPath: 'al7an/مرد انجيل الاحد الثالث والرابع لشهر كيهك.ogg', 
        imagePath: 'al7an/مرد انجيل الاحد الثالث والرابع لشهر كيهك.jpg' 
    }
];

// Data storage
let lectures = [];
let hymns = [];
let currentAudio = null;
let isPlaying = false;

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const searchInput = document.getElementById('searchInput');
const pdfModal = document.getElementById('pdfModal');
const hymnModal = document.getElementById('hymnModal');
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const timeDisplay = document.getElementById('timeDisplay');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadLectures();
    loadHymns();
    setupEventListeners();
    updateStats();
});

// Load lectures data
async function loadLectures() {
    try {
        // Use hardcoded data map
        lectures = LECTURES_DATA.map(lecture => ({
            id: lecture.id,
            name: lecture.title,
            filename: lecture.path.split('/').pop(),
            path: lecture.path
        }));

        console.log('Loaded lectures:', lectures);
        displayLectures();
    } catch (error) {
        console.error('Error loading lectures:', error);
    }
}

// Load hymns data
async function loadHymns() {
    try {
        // Use hardcoded data map
        hymns = HYMNS_DATA.map(hymn => ({
            id: hymn.id,
            name: hymn.title,
            audioPath: hymn.audioPath,
            imagePath: hymn.imagePath
        }));

        console.log('Loaded hymns:', hymns);
        displayHymns();
    } catch (error) {
        console.error('Error loading hymns:', error);
    }
}

// Display lectures
function displayLectures(searchTerm = '') {
    const lecturesList = document.getElementById('lecturesList');
    const filteredLectures = lectures.filter(lecture => 
        lecture.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    lecturesList.innerHTML = filteredLectures.map(lecture => `
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
    const filteredHymns = hymns.filter(hymn => 
        hymn.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    hymnsList.innerHTML = filteredHymns.map(hymn => `
        <div class="hymn-card" onclick="openHymnModal('${hymn.name}', '${hymn.audioPath}', '${hymn.imagePath}')">
            <div class="flex items-center space-x-reverse space-x-3">
                <div class="mary-blue p-3 rounded-full">
                    <i class="fas fa-music light-blue-accent text-lg"></i>
                </div>
                <div class="flex-1">
                    <h3 class="lecture-title">${highlightSearchTerm(hymn.name, searchTerm)}</h3>
                    <div class="lecture-meta">
                        <i class="fas fa-headphones ml-2 text-xs gold-accent"></i>
                        اضغط للاستماع والمشاهدة
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
    // Bottom navigation
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            switchSection(section);
        });
    });

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

// Switch between sections
function switchSection(section) {
    // Update navigation items
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === section) {
            item.classList.add('active');
        }
    });

    // Update content sections
    contentSections.forEach(content => {
        content.classList.add('hidden');
    });

    if (section === 'lectures') {
        document.getElementById('lecturesSection').classList.remove('hidden');
    } else if (section === 'hymns') {
        document.getElementById('hymnsSection').classList.remove('hidden');
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
function openHymnModal(title, audioPath, imagePath) {
    console.log('Attempting to open hymn:', { title, audioPath, imagePath });
    document.getElementById('hymnTitle').textContent = title;
    
    // Load audio with proper encoding
    const encodedAudioPath = encodeURI(audioPath);
    console.log('Encoded audio path:', encodedAudioPath);
    audioPlayer.src = encodedAudioPath;
    currentAudio = encodedAudioPath;
    
    // Load image with proper encoding
    const hymnImage = document.getElementById('hymnImage');
    if (imagePath) {
        const encodedImagePath = encodeURI(imagePath);
        console.log('Encoded image path:', encodedImagePath);
        hymnImage.src = encodedImagePath;
        hymnImage.style.display = 'block';
    } else {
        hymnImage.style.display = 'none';
    }
    
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
    document.querySelector('.lectures-total').textContent = lectures.length;
    document.querySelector('.hymns-total').textContent = hymns.length;
}

// Update stats
function updateStats() {
    document.querySelector('.lectures-total').textContent = lectures.length;
    document.querySelector('.hymns-total').textContent = hymns.length;
}
