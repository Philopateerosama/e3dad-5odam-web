// Data structure with semester classification
// Semester 1 content (existing)
// Semester 2 content (newly added)

const LECTURES_DATA = [
    // Semester 1 Lectures
    { id: 1, title: 'الصوم - لاهوت مقارن', path: 'Mo7drat_S1/1.pdf', semester: 1 },
    { id: 2, title: 'العصر الرسولي - عصر الإستشهاد', path: 'Mo7drat_S1/2.pdf', semester: 1 },
    { id: 3, title: 'المعمودية - لاهوت مقارن', path: 'Mo7drat_S1/3.pdf', semester: 1 },
    { id: 4, title: 'المنهج إعداد خدام - سنة أولى 2026', path: 'Mo7drat_S1/4.pdf', semester: 1 },
    { id: 5, title: 'تعريف الكتاب المقدس', path: 'Mo7drat_S1/5.pdf', semester: 1 },
    { id: 6, title: 'حساب الأبقطي', path: 'Mo7drat_S1/6.pdf', semester: 1 },
    { id: 7, title: 'خيمة الاجتماع', path: 'Mo7drat_S1/7.pdf', semester: 1 },
    { id: 8, title: 'سر التجسد الإلهى ل 2026', path: 'Mo7drat_S1/8.pdf', semester: 1 },
    { id: 9, title: 'سر التوبة والاعتراف - لاهوت مقارن-1', path: 'Mo7drat_S1/9.pdf', semester: 1 },
    { id: 10, title: 'طبيعة السيد المسيح', path: 'Mo7drat_S1/10.pdf', semester: 1 },
    { id: 11, title: 'عقيده الثالوث', path: 'Mo7drat_S1/11.pdf', semester: 1 },
    { id: 12, title: 'مجمع القسطنطينية 2026', path: 'Mo7drat_S1/12.pdf', semester: 1 },
    { id: 13, title: 'مجمع نيقية 2026', path: 'Mo7drat_S1/13.pdf', semester: 1 },
    { id: 14, title: 'مصداقية الكتاب المقدس', path: 'Mo7drat_S1/14.pdf', semester: 1 },
    { id: 15, title: 'مقدمة عامة فى الطقوس', path: 'Mo7drat_S1/15.pdf', semester: 1 },
    { id: 16, title: 'مهارات الكتاب المقدس 2026', path: 'Mo7drat_S1/16.pdf', semester: 1 },
    
    // Semester 2 Lectures
    { id: 17, title: 'الجزء الثانى من القداس', path: 'Mo7drat_S2/el goz2 el tane mn el odas.pdf', semester: 2 }
];

const HYMNS_DATA = [
    // Semester 1 Hymns
    { 
        id: 1, 
        title: 'أمين أمين طون ثاناطون',
        audioFile: 'amen amen.ogg',
        images: ['amen amen.jpg'],
        semester: 1
    },
    { 
        id: 2, 
        title: 'ارباع الناقوس آدام',
        audioFile: 'arba3 el na2os adam.ogg',
        images: ['arba3 el na2os adam.jpg'],
        semester: 1
    },
    { 
        id: 3, 
        title: 'ارباع الناقوس واطس',
        audioFile: 'arba3 el na2os watos.ogg',
        images: ['arba3 el na2os watos.jpg'],
        semester: 1
    },
    { 
        id: 4, 
        title: 'الليلويا فاي بيبى',
        audioFile: 'aleloya.ogg',
        images: ['aleloya.jpg'],
        semester: 1
    },
    { 
        id: 5, 
        title: 'الهيتنات السنوى',
        audioFile: 'el hetnyat el snawya.ogg',
        images: [
            'el hetnyat el snawya 1.jpg',
            'el hetnyat el snawya 2.jpg',
            'el hetnyat el snawya 3.jpg',
            'el hetnyat el snawya 4.jpg',
            'el hetnyat el snawya 5.jpg',
            'el hetnyat el snawya 6.jpg',
            'el hetnyat el snawya 7.jpg'
        ],
        semester: 1
    },
    { 
        id: 6, 
        title: 'تى شورى',
        audioFile: 'te shory.ogg',
        images: ['te shory.jpg'],
        semester: 1
    },
    { 
        id: 7, 
        title: 'ذوكصولوجية السيدة العذراء رفع بخور باكر',
        audioFile: 'zocsologya.ogg',
        images: [
            'zocsologya 1.jpg',
            'zocsologya 2.jpg',
            'zocsologya 3.jpg'
        ],
        semester: 1
    },
    { 
        id: 8, 
        title: 'مرد أنجيل عيد الميلاد',
        audioFile: '3ed el melad.ogg',
        images: ['3ed el melad.jpg'],
        semester: 1
    },
    { 
        id: 9, 
        title: 'مرد انجيل الاحد الاول والثانى',
        audioFile: 'mard engeal awle 7aden.ogg',
        images: ['mard engeal awel 7aden.jpg'],
        semester: 1
    },
    { 
        id: 10, 
        title: 'مرد انجيل الاحد الثالث والرابع لشهر كيهك',
        audioFile: 'mard engeal tane 7adean.ogg',
        images: ['mard engeal tane 7adean.jpg'],
        semester: 1
    },
    
    // Semester 2 Hymns
    { 
        id: 11, 
        title: 'لحن جي بينيوت الاحاد',
        audioFile: 'la7n jabnyot.ogg',
        images: ['la7n jabnyot.jpeg'],
        semester: 2
    }
];
