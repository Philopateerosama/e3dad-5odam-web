// Configuration
const CONFIG = {
    lecturesPath: './Mo7drat/',
    hymnsPath: './al7an/',
    supportedAudioFormats: ['.ogg', '.mp3'],
    supportedImageFormats: ['.jpg', '.jpeg', '.png']
};

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
        const lectureFiles = [
            'الصوم - لاهوت مقارن.pdf',
            'العصر الرسولي - عصر الإستشهاد.pdf',
            'المعمودية - لاهوت مقارن.pdf',
            'المنهج إعداد خدام - سنة أولى 2026.pdf',
            'تعريف الكتاب المقدس.pdf',
            'حساب الأبقطي.pdf',
            'خيمة الاجتماع.pdf',
            'سر التجسد الإلهى ل 2026.pdf',
            'سر التوبة والاعتراف - لاهوت مقارن-1.pdf',
            'طبيعة السيد المسيح.pdf',
            'عقيده الثالوث.pdf',
            'مجمع القسطنطينية 2026.pdf',
            'مجمع نيقية 2026.pdf',
            'مصداقية الكتاب المقدس.pdf',
            'مقدمة عامة فى الطقوس.pdf',
            'مهارات الكتاب المقدس 2026.pdf'
        ];

        lectures = lectureFiles.map(filename => ({
            name: filename.replace('.pdf', ''),
            filename: filename,
            path: CONFIG.lecturesPath + filename
        }));

        displayLectures();
    } catch (error) {
        console.error('Error loading lectures:', error);
    }
}

// Load hymns data
async function loadHymns() {
    try {
        const hymnFiles = [
            { name: 'أمين أمين طون ثاناطون', audio: 'أمين أمين طون ثاناطون.ogg', image: null },
            { name: 'ارباع الناقوس آدام', audio: 'ارباع الناقوس آدام.ogg', image: null },
            { name: 'ارباع الناقوس واطس', audio: 'ارباع الناقوس واطس.ogg', image: null },
            { name: 'الليلويا فاى بيبى (1)', audio: 'الليلويا فاى بيبى (1).ogg', image: null },
            { name: 'الليلويا فاى بيبى (2)', audio: 'الليلويا فاى بيبى (2).ogg', image: null },
            { name: 'الهيتنات السنوى', audio: 'الهيتنات السنوى.ogg', image: null },
            { name: 'تى شورى', audio: 'تى شورى.ogg', image: null },
            { name: 'ذوكصولوجية السيدة العذراء رفع بخور باكر', audio: 'ذوكصولوجية السيدة العذراء رفع بخور باكر.ogg', image: null },
            { name: 'مرد أنجيل عيد الميلاد', audio: 'مرد أنجيل عيد الميلاد.ogg', image: null },
            { name: 'مرد انجيل الاحد الاول والثانى', audio: 'مرد انجيل الاحد الاول والثانى.ogg', image: null },
            { name: 'مرد انجيل الاحد الثالث والرابع لشهر كيهك', audio: 'مرد انجيل الاحد الثالث والرابع لشهر كيهك.ogg', image: null },
            { name: 'تسبيحة 1', audio: '1.mp3', image: '1.jpg' }
        ];

        hymns = hymnFiles.map(hymn => ({
            name: hymn.name,
            audioPath: CONFIG.hymnsPath + hymn.audio,
            imagePath: hymn.image ? CONFIG.hymnsPath + hymn.image : null
        }));

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
    document.getElementById('pdfTitle').textContent = title;
    document.getElementById('pdfViewer').src = path;
    pdfModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Adjust for mobile viewport
    if (window.innerWidth < 768) {
        pdfModal.style.height = window.innerHeight + 'px';
    }
}

// Close PDF modal
function closePdfModal() {
    pdfModal.classList.add('hidden');
    document.getElementById('pdfViewer').src = '';
    document.body.style.overflow = 'auto';
}

// Open hymn modal
function openHymnModal(title, audioPath, imagePath) {
    document.getElementById('hymnTitle').textContent = title;
    
    // Load audio
    audioPlayer.src = audioPath;
    currentAudio = audioPath;
    
    // Load image
    const hymnImage = document.getElementById('hymnImage');
    if (imagePath) {
        hymnImage.src = imagePath;
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
