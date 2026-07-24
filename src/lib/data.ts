export const CLASS_TYPES = [
  {
    id: "1",
    name: "Zumba",
    slug: "zumba",
    description:
      "Dance fitness class that combines Latin rhythms with energetic cardio moves. Burn calories while having the time of your life.",
    duration: 60,
    color: "from-pink-500 to-rose-600",
    colorSolid: "text-pink-400",
    icon: "🕺",
    benefits: ["Burns 400-600 calories", "Improves coordination", "Reduces stress", "Fun social workout"],
  },
  {
    id: "2",
    name: "Poundfit",
    slug: "poundfit",
    description:
      "Full-body cardio jam using lightweight drumsticks to pound, squat, lunge, and jump. Where fitness meets music.",
    duration: 45,
    color: "from-yellow-500 to-orange-600",
    colorSolid: "text-yellow-400",
    icon: "🥁",
    benefits: ["Core strength", "Upper body toning", "Rhythm & coordination", "High energy burn"],
  },
  {
    id: "3",
    name: "Muay Thai",
    slug: "muay-thai",
    description:
      "The Art of Eight Limbs — a combat sport using fists, elbows, knees, and shins. Ultimate full-body conditioning.",
    duration: 90,
    color: "from-red-500 to-red-700",
    colorSolid: "text-red-400",
    icon: "🥊",
    benefits: ["Full-body strength", "Self-defense skills", "Mental toughness", "High calorie burn"],
  },
  {
    id: "4",
    name: "Calisthenics",
    slug: "calisthenics",
    description:
      "Master your own bodyweight. From basic movements to advanced skills — build strength, flexibility, and control.",
    duration: 90,
    color: "from-cyan-500 to-blue-600",
    colorSolid: "text-cyan-400",
    icon: "💪",
    benefits: ["Functional strength", "Muscle definition", "Joint mobility", "No equipment needed"],
  },
  {
    id: "5",
    name: "Yoga",
    slug: "yoga",
    description:
      "Unite mind, body, and breath. Our yoga classes improve flexibility, reduce stress, and build inner strength.",
    duration: 60,
    color: "from-green-500 to-emerald-600",
    colorSolid: "text-green-400",
    icon: "🧘",
    benefits: ["Flexibility & balance", "Stress reduction", "Better sleep", "Mental clarity"],
  },
];

export const COACHES = [
  {
    id: "1",
    name: "Rina Sari",
    slug: "rina-sari",
    title: "Zumba & Poundfit Instructor",
    bio: "With 8 years of experience as a certified Zumba and Poundfit instructor, Rina has helped over 500 members transform their fitness through the power of dance and rhythm. Her high-energy classes are known for being the most fun sessions at S-One Gym.",
    imageUrl: "/coaches/rina.jpg",
    specialties: ["Zumba", "Poundfit", "Dance Fitness", "Weight Loss"],
    certifications: ["Zumba International Licensed", "Poundfit Certified", "ACE Group Fitness"],
    experience: 8,
    instagram: "@rina.sari.fit",
    featured: true,
    isPersonalTrainer: false,
    classes: ["Zumba", "Poundfit"],
    achievements: "Best Instructor Award 2023",
  },
  {
    id: "2",
    name: "Budi Santoso",
    slug: "budi-santoso",
    title: "Head Muay Thai Coach",
    bio: "Former national Muay Thai champion with 12 years of competitive experience and 6 years of coaching. Budi brings real fighting expertise to every session, combining technique with functional fitness for all skill levels.",
    imageUrl: "/coaches/budi.jpg",
    specialties: ["Muay Thai", "Kickboxing", "Self-Defense", "Strength & Conditioning"],
    certifications: ["WMF Certified Coach", "IFMA Level 2", "Sports Nutrition Certified"],
    experience: 12,
    instagram: "@budi.muaythai",
    featured: true,
    isPersonalTrainer: true,
    pricePerSession: 250000,
    classes: ["Muay Thai"],
    achievements: "National Muay Thai Champion 2015-2018",
  },
  {
    id: "3",
    name: "Ahmad Rizky",
    slug: "ahmad-rizky",
    title: "Calisthenics & PT Specialist",
    bio: "Ahmad turned his passion for bodyweight mastery into a career helping others achieve incredible physiques with zero equipment. His progressive programming approach ensures results for complete beginners through advanced athletes.",
    imageUrl: "/coaches/ahmad.jpg",
    specialties: ["Calisthenics", "Street Workout", "Muscle Hypertrophy", "Movement Training"],
    certifications: ["NSCA-CPT", "Calisthenics Academy Certified", "FMS Level 2"],
    experience: 7,
    instagram: "@ahmad.calisthenics",
    featured: true,
    isPersonalTrainer: true,
    pricePerSession: 200000,
    classes: ["Calisthenics"],
    achievements: "World Street Workout Championship Finalist",
  },
  {
    id: "4",
    name: "Sari Dewi",
    slug: "sari-dewi",
    title: "Yoga & Mindfulness Coach",
    bio: "Sari's gentle yet challenging approach to yoga has made her classes a sanctuary for members seeking balance. With training from Bali and Mysore, India, she weaves traditional wisdom with modern fitness science.",
    imageUrl: "/coaches/sari.jpg",
    specialties: ["Hatha Yoga", "Vinyasa Flow", "Meditation", "Flexibility Training"],
    certifications: ["RYT-500 Yoga Alliance", "Yin Yoga Certified", "Mindfulness-Based Stress Reduction"],
    experience: 9,
    instagram: "@sari.yoga",
    featured: true,
    isPersonalTrainer: false,
    classes: ["Yoga"],
    achievements: "Certified in Mysore, India — Ashtanga Yoga",
  },
  {
    id: "5",
    name: "Doni Prasetyo",
    slug: "doni-prasetyo",
    title: "Head Trainer & Strength Coach",
    bio: "Doni oversees all fitness programming at S-One Gym. With a background in sports science and competition powerlifting, he builds intelligent programs that deliver consistent results — whether your goal is strength, aesthetics, or performance.",
    imageUrl: "/coaches/doni.jpg",
    specialties: ["Strength Training", "Powerlifting", "Body Recomposition", "Sports Performance"],
    certifications: ["CSCS (NSCA)", "ACSM-CPT", "Precision Nutrition Level 2"],
    experience: 10,
    instagram: "@doni.strength",
    featured: true,
    isPersonalTrainer: true,
    pricePerSession: 300000,
    classes: ["Strength Training"],
    achievements: "IPF National Powerlifting Championship Silver 2019",
  },
];

export const SCHEDULE: Record<string, Array<{
  id: string;
  time: string;
  endTime: string;
  class: string;
  coach: string;
  room: string;
  capacity: number;
  enrolled: number;
  price: number;
  color: string;
}>> = {
  Monday: [
    { id: "m1", time: "06:00", endTime: "07:00", class: "Yoga", coach: "Sari Dewi", room: "Studio A", capacity: 20, enrolled: 15, price: 50000, color: "from-green-500 to-emerald-600" },
    { id: "m2", time: "08:00", endTime: "09:00", class: "Zumba", coach: "Rina Sari", room: "Studio B", capacity: 25, enrolled: 22, price: 45000, color: "from-pink-500 to-rose-600" },
    { id: "m3", time: "10:00", endTime: "11:30", class: "Calisthenics", coach: "Ahmad Rizky", room: "Outdoor Area", capacity: 15, enrolled: 10, price: 60000, color: "from-cyan-500 to-blue-600" },
    { id: "m4", time: "16:00", endTime: "17:30", class: "Muay Thai", coach: "Budi Santoso", room: "Ring Area", capacity: 20, enrolled: 18, price: 75000, color: "from-red-500 to-red-700" },
    { id: "m5", time: "19:00", endTime: "20:00", class: "Zumba", coach: "Rina Sari", room: "Studio B", capacity: 25, enrolled: 20, price: 45000, color: "from-pink-500 to-rose-600" },
  ],
  Tuesday: [
    { id: "t1", time: "07:00", endTime: "07:45", class: "Poundfit", coach: "Rina Sari", room: "Studio B", capacity: 20, enrolled: 16, price: 45000, color: "from-yellow-500 to-orange-600" },
    { id: "t2", time: "09:00", endTime: "10:30", class: "Calisthenics", coach: "Ahmad Rizky", room: "Outdoor Area", capacity: 15, enrolled: 14, price: 60000, color: "from-cyan-500 to-blue-600" },
    { id: "t3", time: "17:00", endTime: "18:30", class: "Muay Thai", coach: "Budi Santoso", room: "Ring Area", capacity: 20, enrolled: 19, price: 75000, color: "from-red-500 to-red-700" },
    { id: "t4", time: "19:30", endTime: "20:30", class: "Yoga", coach: "Sari Dewi", room: "Studio A", capacity: 20, enrolled: 12, price: 50000, color: "from-green-500 to-emerald-600" },
  ],
  Wednesday: [
    { id: "w1", time: "06:00", endTime: "07:00", class: "Yoga", coach: "Sari Dewi", room: "Studio A", capacity: 20, enrolled: 18, price: 50000, color: "from-green-500 to-emerald-600" },
    { id: "w2", time: "08:00", endTime: "09:00", class: "Zumba", coach: "Rina Sari", room: "Studio B", capacity: 25, enrolled: 24, price: 45000, color: "from-pink-500 to-rose-600" },
    { id: "w3", time: "10:00", endTime: "10:45", class: "Poundfit", coach: "Rina Sari", room: "Studio B", capacity: 20, enrolled: 15, price: 45000, color: "from-yellow-500 to-orange-600" },
    { id: "w4", time: "16:00", endTime: "17:30", class: "Muay Thai", coach: "Budi Santoso", room: "Ring Area", capacity: 20, enrolled: 17, price: 75000, color: "from-red-500 to-red-700" },
    { id: "w5", time: "19:00", endTime: "20:30", class: "Calisthenics", coach: "Ahmad Rizky", room: "Outdoor Area", capacity: 15, enrolled: 13, price: 60000, color: "from-cyan-500 to-blue-600" },
  ],
  Thursday: [
    { id: "th1", time: "07:00", endTime: "07:45", class: "Poundfit", coach: "Rina Sari", room: "Studio B", capacity: 20, enrolled: 20, price: 45000, color: "from-yellow-500 to-orange-600" },
    { id: "th2", time: "09:00", endTime: "10:30", class: "Calisthenics", coach: "Ahmad Rizky", room: "Outdoor Area", capacity: 15, enrolled: 11, price: 60000, color: "from-cyan-500 to-blue-600" },
    { id: "th3", time: "17:00", endTime: "18:30", class: "Muay Thai", coach: "Budi Santoso", room: "Ring Area", capacity: 20, enrolled: 16, price: 75000, color: "from-red-500 to-red-700" },
  ],
  Friday: [
    { id: "f1", time: "06:00", endTime: "07:00", class: "Yoga", coach: "Sari Dewi", room: "Studio A", capacity: 20, enrolled: 20, price: 50000, color: "from-green-500 to-emerald-600" },
    { id: "f2", time: "08:00", endTime: "09:00", class: "Zumba", coach: "Rina Sari", room: "Studio B", capacity: 25, enrolled: 21, price: 45000, color: "from-pink-500 to-rose-600" },
    { id: "f3", time: "16:00", endTime: "17:30", class: "Muay Thai", coach: "Budi Santoso", room: "Ring Area", capacity: 20, enrolled: 20, price: 75000, color: "from-red-500 to-red-700" },
    { id: "f4", time: "19:00", endTime: "19:45", class: "Poundfit", coach: "Rina Sari", room: "Studio B", capacity: 20, enrolled: 18, price: 45000, color: "from-yellow-500 to-orange-600" },
  ],
  Saturday: [
    { id: "s1", time: "07:00", endTime: "08:00", class: "Zumba", coach: "Rina Sari", room: "Studio B", capacity: 30, enrolled: 29, price: 45000, color: "from-pink-500 to-rose-600" },
    { id: "s2", time: "08:30", endTime: "10:00", class: "Calisthenics", coach: "Ahmad Rizky", room: "Outdoor Area", capacity: 20, enrolled: 18, price: 60000, color: "from-cyan-500 to-blue-600" },
    { id: "s3", time: "10:00", endTime: "11:30", class: "Muay Thai", coach: "Budi Santoso", room: "Ring Area", capacity: 25, enrolled: 24, price: 75000, color: "from-red-500 to-red-700" },
    { id: "s4", time: "15:00", endTime: "16:00", class: "Yoga", coach: "Sari Dewi", room: "Studio A", capacity: 20, enrolled: 15, price: 50000, color: "from-green-500 to-emerald-600" },
    { id: "s5", time: "16:30", endTime: "17:15", class: "Poundfit", coach: "Rina Sari", room: "Studio B", capacity: 20, enrolled: 20, price: 45000, color: "from-yellow-500 to-orange-600" },
  ],
  Sunday: [
    { id: "su1", time: "08:00", endTime: "09:00", class: "Yoga", coach: "Sari Dewi", room: "Studio A", capacity: 25, enrolled: 22, price: 50000, color: "from-green-500 to-emerald-600" },
    { id: "su2", time: "09:30", endTime: "10:30", class: "Zumba", coach: "Rina Sari", room: "Studio B", capacity: 25, enrolled: 20, price: 45000, color: "from-pink-500 to-rose-600" },
    { id: "su3", time: "11:00", endTime: "11:45", class: "Poundfit", coach: "Rina Sari", room: "Studio B", capacity: 20, enrolled: 17, price: 45000, color: "from-yellow-500 to-orange-600" },
  ],
};

export const MEMBERSHIP_PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Begin Your Journey",
    price: 150000,
    duration: "month",
    color: "from-slate-600 to-slate-700",
    borderColor: "border-slate-500/30",
    popular: false,
    features: [
      { text: "Gym floor access (6AM–10PM)", included: true },
      { text: "2 group classes per week", included: true },
      { text: "Locker room access", included: true },
      { text: "Basic fitness assessment", included: true },
      { text: "Unlimited classes", included: false },
      { text: "Sauna access", included: false },
      { text: "Personal training session", included: false },
      { text: "Nutrition consultation", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Most Popular Choice",
    price: 300000,
    duration: "month",
    color: "from-primary/80 to-accent/80",
    borderColor: "border-primary/50",
    popular: true,
    features: [
      { text: "24/7 Gym floor access", included: true },
      { text: "Unlimited group classes", included: true },
      { text: "Locker room + towel service", included: true },
      { text: "Monthly fitness assessment", included: true },
      { text: "Sauna access (3x/week)", included: true },
      { text: "1 PT session per month", included: true },
      { text: "Priority class booking", included: true },
      { text: "Nutrition consultation", included: false },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    tagline: "The Ultimate Experience",
    price: 500000,
    duration: "month",
    color: "from-yellow-500/80 to-amber-600/80",
    borderColor: "border-yellow-500/50",
    popular: false,
    features: [
      { text: "24/7 Gym floor access", included: true },
      { text: "Unlimited group classes", included: true },
      { text: "Premium locker + towel service", included: true },
      { text: "Weekly fitness assessment", included: true },
      { text: "Unlimited sauna access", included: true },
      { text: "4 PT sessions per month", included: true },
      { text: "Priority class booking", included: true },
      { text: "Monthly nutrition consultation", included: true },
    ],
  },
];

export const PRODUCTS = [
  // Supplements
  { id: "p1", name: "Whey Protein Gold Standard", category: "Supplements", price: 450000, originalPrice: 520000, description: "24g protein per serving. Best-selling whey protein for muscle recovery and growth.", imageUrl: null, rating: 4.8, reviews: 128, badge: "Best Seller" },
  { id: "p2", name: "BCAA Recovery Boost", category: "Supplements", price: 185000, originalPrice: null, description: "Essential amino acids for muscle recovery. Cherry lime flavor.", imageUrl: null, rating: 4.6, reviews: 87, badge: null },
  { id: "p3", name: "Multivitamin Sport", category: "Supplements", price: 120000, originalPrice: 140000, description: "Complete multivitamin formula designed for active individuals.", imageUrl: null, rating: 4.7, reviews: 203, badge: "Sale" },
  { id: "p4", name: "Creatine Monohydrate", category: "Supplements", price: 160000, originalPrice: null, description: "Pure creatine monohydrate for strength and power. 300g unflavored.", imageUrl: null, rating: 4.9, reviews: 156, badge: null },
  // Food
  { id: "p5", name: "Protein Bar Chocolate", category: "Food", price: 35000, originalPrice: null, description: "High protein, low sugar bar. 20g protein, 3g sugar. Perfect pre/post workout.", imageUrl: null, rating: 4.5, reviews: 74, badge: null },
  { id: "p6", name: "Energy Drink S-One Boost", category: "Food", price: 25000, originalPrice: null, description: "Natural caffeine + electrolytes blend. Stay hydrated and energized.", imageUrl: null, rating: 4.4, reviews: 91, badge: "S-One Exclusive" },
  { id: "p7", name: "Oat + Banana Snack Pack", category: "Food", price: 28000, originalPrice: null, description: "Ready-to-eat oats with real banana. Clean carbs for sustained energy.", imageUrl: null, rating: 4.3, reviews: 42, badge: null },
  // Merchandise
  { id: "p8", name: "S-One Gym Performance Tee", category: "Merchandise", price: 180000, originalPrice: 220000, description: "Moisture-wicking performance t-shirt with neon S-One logo. Sizes S–XXL.", imageUrl: null, rating: 4.7, reviews: 63, badge: "Sale" },
  { id: "p9", name: "S-One Gym Shorts", category: "Merchandise", price: 145000, originalPrice: null, description: "Flex-fit training shorts with phone pocket. Dark with neon accents.", imageUrl: null, rating: 4.6, reviews: 38, badge: null },
  { id: "p10", name: "S-One Water Bottle 750ml", category: "Merchandise", price: 95000, originalPrice: null, description: "Stainless steel insulated bottle. Keeps cold 24h, hot 12h.", imageUrl: null, rating: 4.8, reviews: 114, badge: "New" },
  { id: "p11", name: "S-One Gym Bag Pro", category: "Merchandise", price: 320000, originalPrice: 380000, description: "Spacious gym bag with wet compartment, shoe pocket, and USB charging port.", imageUrl: null, rating: 4.9, reviews: 29, badge: "Sale" },
  // Equipment
  { id: "p12", name: "Resistance Band Set (5 levels)", category: "Equipment", price: 135000, originalPrice: null, description: "5 resistance levels from light to heavy. Perfect for home workouts.", imageUrl: null, rating: 4.6, reviews: 82, badge: null },
  { id: "p13", name: "Jump Rope Speed Cable", category: "Equipment", price: 85000, originalPrice: null, description: "Ball-bearing speed rope for double-unders and cardio training.", imageUrl: null, rating: 4.7, reviews: 55, badge: null },
  { id: "p14", name: "MMA Training Gloves", category: "Equipment", price: 245000, originalPrice: null, description: "Professional grade gloves for Muay Thai and bag work. Genuine leather.", imageUrl: null, rating: 4.8, reviews: 47, badge: "New" },
];

export const BLOG_POSTS = [
  {
    id: "1",
    title: "5 Tips to Maximize Every Gym Session",
    slug: "5-tips-maximize-gym-session",
    excerpt: "Stop leaving gains on the table. These five evidence-based strategies will transform your workout efficiency and results starting today.",
    content: `Banyak orang menghabiskan waktu berjam-jam di gym tapi hasilnya minimal. Bukan karena mereka kurang keras — tapi karena mereka kurang cerdas dalam berlatih. Berikut lima strategi berbasis bukti ilmiah yang akan mengubah setiap sesi latihanmu menjadi lebih efektif dan efisien.

Tip 1 — Warm Up yang Benar, Bukan Sekadar Formalitas

Warm up bukan hanya berjalan pelan di treadmill selama 5 menit. Warm up yang efektif harus meningkatkan suhu inti tubuh, mengaktifkan otot yang akan bekerja, dan mempersiapkan sistem saraf pusat. Coba dynamic stretching selama 8–10 menit: leg swing, hip circle, arm circle, dan lateral lunge. Penelitian dari Journal of Strength and Conditioning Research menunjukkan bahwa warm up dinamis meningkatkan performa hingga 15% dibanding tanpa warm up.

Tip 2 — Terapkan Progressive Overload Secara Konsisten

Progressive overload adalah prinsip paling fundamental dalam fitness: tubuhmu hanya berkembang ketika diberi stimulus yang sedikit lebih berat dari biasanya. Catat setiap latihan di buku atau aplikasi — berapa kg, berapa reps, berapa sets. Setiap minggu, coba tingkatkan salah satunya. Bahkan peningkatan 2.5 kg per minggu akan membuat kamu jauh lebih kuat dalam 6 bulan.

Tip 3 — Istirahat Antar Set Itu Penting, Bukan Membuang Waktu

Banyak orang mempersingkat istirahat karena merasa membuang waktu. Padahal, sistem energi ATP-PC butuh sekitar 90–120 detik untuk pulih sepenuhnya setelah set berat. Jika istirahatmu terlalu pendek, performa di set berikutnya akan drop dan total volume latihanmu justru berkurang. Gunakan timer — ini bukan soal malas, ini soal efisiensi.

Tip 4 — Fokus pada Mind-Muscle Connection

Penelitian menunjukkan bahwa secara aktif memikirkan otot yang sedang kamu latih bisa meningkatkan aktivasi otot hingga 22%. Saat melakukan curl bicep, benar-benar rasakan kontraksi di lengan atasmu. Matikan handphone, lepas headphone sebentar, dan fokus penuh pada gerakan. Kualitas reps jauh lebih penting dari kuantitasnya.

Tip 5 — Cool Down dan Stretching Statis di Akhir

Jangan langsung duduk atau pulang setelah set terakhir. Luangkan 10 menit untuk cool down: jalan santai, diikuti stretching statis untuk otot-otot yang sudah bekerja keras. Ini mempercepat pembuangan asam laktat, mengurangi DOMS (delayed onset muscle soreness), dan membantu tubuh kembali ke kondisi istirahat dengan lebih mulus. Investasi 10 menit yang sangat worth it untuk performa sesi berikutnya.

Dengan menerapkan kelima strategi ini secara konsisten, kamu akan merasakan perbedaan yang signifikan dalam waktu 4–6 minggu. Ingat: hasil terbaik bukan dari berlatih lebih keras, tapi dari berlatih lebih cerdas.`,
    category: "TIPS",
    imageUrl: null,
    author: "Doni Prasetyo",
    publishedAt: "2025-06-15",
    readTime: 5,
    featured: true,
  },
  {
    id: "2",
    title: "Zumba: More Than Just Dancing — The Science Behind the Fun",
    slug: "zumba-science-behind-the-fun",
    excerpt: "Why does Zumba produce such dramatic results? We break down the physiological mechanisms that make dance fitness one of the most effective cardio modalities.",
    content: `Ketika orang pertama kali mendengar "Zumba", banyak yang langsung mengasosiasikannya dengan dansa santai yang menyenangkan. Tapi di balik musik Latin yang menggebu dan gerakan ritmis yang membuat peserta tersenyum, ada ilmu yang serius tentang kenapa Zumba begitu efektif sebagai modalitas kardio.

Apa yang Terjadi di Tubuhmu Selama Zumba

Selama sesi Zumba 60 menit, detak jantungmu rata-rata berada di zona 60–85% dari heart rate maksimal — ini adalah zona kardio ideal yang disebut "aerobic training zone." Berbeda dengan lari di treadmill yang monoton, Zumba menggunakan interval alami: gerakan cepat saat chorus, lebih lambat saat verse. Variasi intensitas inilah yang disebut HIIT alami — High Intensity Interval Training tanpa kamu sadari sedang melakukannya.

Kalori yang Terbakar

Penelitian dari American Council on Exercise (ACE) menemukan bahwa satu sesi Zumba rata-rata membakar 369 kalori — sebanding dengan jogging sedang selama satu jam. Yang membuat Zumba unggul adalah "the fun factor": peserta tidak merasa sedang "olahraga," sehingga mereka cenderung lebih konsisten hadir dan bergerak lebih lama tanpa sadar kelelahan.

Manfaat untuk Koordinasi dan Keseimbangan

Gerakan Zumba yang kompleks — menggabungkan langkah kaki, ayunan pinggul, dan gerakan lengan secara simultan — melatih koordinasi neuromuskular yang sering diabaikan dalam latihan konvensional. Ini sangat bermanfaat untuk keseimbangan jangka panjang, terutama bagi peserta usia 40 tahun ke atas.

Dampak Psikologis yang Nyata

Ini mungkin keuntungan terbesar Zumba: efek pada kesehatan mental. Musik berirama tinggi + gerakan ritmis + interaksi sosial menghasilkan gelombang endorfin, dopamin, dan serotonin. Penelitian di Journal of Health Psychology menunjukkan bahwa peserta Zumba melaporkan penurunan stres dan peningkatan mood yang signifikan dibanding kelompok kontrol yang beristirahat.

Kenapa Zumba di S-One Berbeda

Coach Rina Sari, instruktur Zumba kami yang telah bersertifikat selama 6 tahun, merancang setiap sesi dengan progression yang cermat: dari gerakan dasar di awal untuk peserta baru, hingga kombinasi kompleks di pertengahan sesi untuk yang sudah berpengalaman. Hasilnya adalah kelas yang inklusif namun tetap menantang bagi semua level.`,
    category: "WORKOUT",
    imageUrl: null,
    author: "Rina Sari",
    publishedAt: "2025-06-10",
    readTime: 7,
    featured: false,
  },
  {
    id: "3",
    title: "Pre & Post Workout Nutrition: The Complete Guide",
    slug: "pre-post-workout-nutrition-guide",
    excerpt: "What you eat around your training sessions matters as much as the workout itself. Here's the science-backed nutrition strategy for maximum recovery.",
    content: `Banyak orang berlatih keras di gym tapi mengabaikan satu faktor yang sama pentingnya: nutrisi di sekitar waktu latihan. Apa yang kamu makan sebelum dan sesudah latihan tidak hanya memengaruhi performa di sesi itu — tapi juga kecepatan pemulihan, pertumbuhan otot, dan hasil jangka panjangmu.

Nutrisi Pre-Workout: Bahan Bakar Sebelum Bertempur

Tujuan nutrisi pre-workout ada dua: menyediakan energi yang cukup untuk performa optimal, dan mencegah katabolisme otot (pemecahan otot sebagai sumber energi). Makan 60–90 menit sebelum latihan adalah window ideal bagi kebanyakan orang.

Pilih kombinasi karbohidrat kompleks + protein moderat + lemak minimal: oatmeal dengan pisang dan telur rebus, nasi dengan dada ayam, atau roti gandum dengan selai kacang. Karbohidrat mengisi kembali glikogen otot; protein menyiapkan asam amino; lemak minimal agar pencernaan tidak lambat saat berlatih.

Hidrasi juga masuk hitungan pre-workout: minum 400–600 ml air 2 jam sebelum latihan, lalu 200 ml lagi 15–20 menit sebelum mulai.

Nutrisi Post-Workout: Jendela Emas Pemulihan

45–60 menit pertama setelah latihan adalah "anabolic window" — periode di mana otot paling responsif terhadap nutrisi. Konsumsi protein 20–40 gram dalam window ini memaksimalkan muscle protein synthesis (MPS).

Kombinasi ideal post-workout: protein whey (cepat dicerna) + karbohidrat cepat (nasi putih, kentang, pisang). Rasio karbohidrat:protein yang optimal adalah sekitar 3:1 untuk latihan intensitas tinggi, 2:1 untuk latihan ringan.

Makanan yang Harus Dihindari

Hindari makanan tinggi lemak langsung setelah latihan — lemak memperlambat penyerapan protein. Alkohol harus benar-benar dihindari post-workout karena menghambat sintesis protein secara signifikan bahkan dalam jumlah kecil. Minuman bersoda tinggi gula memberikan spike glikemik yang tidak stabil.

Suplemen: Yang Benar-Benar Worth It

Dari ratusan suplemen di pasaran, hanya beberapa yang memiliki bukti ilmiah kuat: kreatin monohidrat (meningkatkan kekuatan dan daya tahan), protein whey (kemudahan asupan protein), kafein (performa pre-workout), dan vitamin D + magnesium (penting untuk fungsi otot dan pemulihan). Sisanya sebagian besar adalah marketing.

Konsultasikan kebutuhan nutrisimu dengan coach kami — kami menyediakan sesi konsultasi nutrisi gratis untuk member Premium dan Elite.`,
    category: "NUTRITION",
    imageUrl: null,
    author: "Doni Prasetyo",
    publishedAt: "2025-06-05",
    readTime: 8,
    featured: false,
  },
  {
    id: "4",
    title: "S-One Gym Opens New Kickboxing Classes — Starting July 2025",
    slug: "s-one-gym-new-kickboxing-classes-2025",
    excerpt: "Big news for the S-One community! We're launching weekly Kickboxing classes with Coach Budi, open to all levels. Registration now open.",
    content: `Kami dengan bangga mengumumkan program terbaru di S-One Gym: kelas Kickboxing mingguan yang akan resmi dimulai pada Juli 2025! Program ini hadir sebagai respons langsung dari antusiasme komunitas kami yang terus berkembang dan permintaan banyak member untuk program combat sport yang lebih variatif.

Tentang Program Kickboxing S-One

Kelas Kickboxing kami dirancang oleh Coach Budi Santoso — mantan juara Muay Thai regional yang kini memegang sertifikasi K-1 Kickboxing internasional. Program ini menggabungkan teknik striking dari Muay Thai dengan footwork dan kombinasi tangan ala boxing klasik, menghasilkan workout yang dinamis, efektif, dan sangat menyenangkan.

Jadwal & Format Kelas

Kelas Kickboxing akan tersedia 3x seminggu: Selasa dan Kamis pukul 19:00–20:00, serta Sabtu pukul 08:00–09:30 (sesi extended dengan sparring opsional). Kapasitas dibatasi 15 orang per kelas untuk memastikan setiap peserta mendapat perhatian personal dari coach.

Siapa yang Bisa Ikut?

Program ini terbuka untuk semua level — tidak perlu pengalaman combat sport sebelumnya. Untuk sesi Selasa dan Kamis, penekanan ada pada teknik dasar dan kondisi fisik. Sesi Sabtu dirancang untuk peserta yang sudah menjalani minimal 4 pertemuan dan siap untuk sparring ringan dengan proteksi penuh.

Fasilitas yang Disiapkan

Kami telah menambahkan 8 heavy bag baru, 4 double end bag, dan menyediakan sarung tangan pinjaman untuk peserta yang belum memiliki. Ring latihan di Combat Zone juga akan digunakan untuk sesi teknik dan sparring.

Cara Mendaftar

Pendaftaran dilakukan melalui fitur booking di aplikasi atau langsung di resepsionis S-One. Kelas ini tersedia untuk semua tier membership — member Starter dapat booking hingga 2 kelas per minggu, Premium dan Elite unlimited. Untuk non-member, tersedia paket trial 3 kelas seharga Rp 150.000.

Kami sangat excited untuk memulai perjalanan ini bersama komunitas S-One. Sampai jumpa di matras!`,
    category: "NEWS",
    imageUrl: null,
    author: "S-One Gym",
    publishedAt: "2025-06-01",
    readTime: 3,
    featured: false,
  },
  {
    id: "5",
    title: "How to Choose the Right Supplement for Your Fitness Goals",
    slug: "how-to-choose-right-supplement",
    excerpt: "The supplement industry is full of noise. Our certified nutrition coaches cut through the marketing and help you choose only what your goals actually need.",
    content: `Industri suplemen fitness adalah salah satu industri paling menguntungkan sekaligus paling menyesatkan. Dengan ribuan produk, klaim-klaim bombastis, dan endorsement selebriti, sangat mudah untuk membuang uang pada suplemen yang tidak benar-benar memberi manfaat — atau bahkan berbahaya. Mari kita bongkar mana yang benar-benar worth it.

Prinsip Dasar Sebelum Membeli Suplemen

Suplemen adalah tambahan, bukan pengganti. Jika pola makanmu belum baik, tidak ada suplemen yang akan memperbaiki hasilmu secara signifikan. Prioritaskan terlebih dahulu: tidur 7–9 jam per malam, makan cukup protein dari sumber makanan nyata (1.6–2.2g per kg berat badan), dan hidrasi yang baik. Baru setelah fondasi itu ada, suplemen bisa memberikan manfaat tambahan yang nyata.

Suplemen dengan Bukti Ilmiah Terkuat

Kreatin Monohidrat: Ini adalah suplemen yang paling banyak diteliti dalam sejarah olahraga — lebih dari 500 studi peer-reviewed. Efeknya jelas: meningkatkan kekuatan 5–15%, memperbaiki daya tahan anaerobik, dan mempercepat pemulihan. Dosis: 3–5 gram per hari, konsisten. Tidak perlu fase loading.

Protein Whey: Bukan karena "lebih baik" dari makanan, tapi karena kemudahan dan kecepatan penyerapannya. Ideal post-workout ketika appetite sering berkurang tapi kebutuhan protein harus terpenuhi. Pilih produk dengan minimal 20g protein per serving dan bahan sesederhana mungkin.

Kafein: Meningkatkan performa endurance, kekuatan, dan fokus. Dosis efektif: 3–6 mg/kg berat badan, 30–60 menit sebelum latihan. Hindari mengonsumsi kafein setelah pukul 14:00 agar tidak mengganggu kualitas tidur.

Suplemen yang Sering Dilebih-lebihkan

BCAA (jika kamu sudah cukup protein): Jika asupan proteinmu sudah mencapai target harian, BCAA tidak memberikan manfaat tambahan yang signifikan. Uangmu lebih baik digunakan untuk protein whey berkualitas.

Fat burner: Kebanyakan produk "fat burner" hanya berisi kafein dalam dosis tinggi plus bahan-bahan dengan bukti minimal. Efek pembakaran kalorinya sangat kecil dan tidak sebanding dengan harganya.

Cara Membaca Label Suplemen

Perhatikan: serving size (pastikan kamu tidak membandingkan harga per produk tapi per serving), daftar bahan (makin singkat makin baik), dan apakah ada third-party testing (seperti sertifikasi Informed Sport atau NSF). Hindari produk dengan proprietary blend yang tidak menyebutkan dosis masing-masing bahan.

Konsultasikan kebutuhanmu dengan tim nutrition coach kami. Kami menyediakan analisis kebutuhan nutrisi personal untuk membantu kamu memilih — atau menghindari — suplemen yang tepat.`,
    category: "NUTRITION",
    imageUrl: null,
    author: "Ahmad Rizky",
    publishedAt: "2025-05-25",
    readTime: 6,
    featured: false,
  },
  {
    id: "6",
    title: "Member Spotlight: How Sarah Lost 18kg in 6 Months at S-One",
    slug: "member-spotlight-sarah-transformation",
    excerpt: "Sarah walked in nervous and uncertain. Six months later she ran her first 10K. Here's her story — in her own words — and the coach who changed everything.",
    content: `Sarah Amelia, 34 tahun, mengingat dengan jelas hari pertama ia masuk ke S-One Gym. "Saya berdiri di depan pintu hampir 10 menit sebelum akhirnya masuk," ceritanya. "Saya pikir semua orang akan memandang saya — tubuh saya waktu itu 88 kilogram dan saya belum pernah olahraga serius dalam hidup saya."

Enam bulan kemudian, Sarah berdiri di garis finis lari 10K pertamanya dengan berat 70 kilogram, senyum lebar, dan air mata kebahagiaan.

Bulan Pertama: Yang Paling Berat

"Bulan pertama benar-benar menyiksa," Sarah mengakui. "Saya daftar kelas Zumba karena terdengar paling 'aman' — dan saya hampir tidak bisa menyelesaikan kelas pertama saya. Tapi Coach Rina tidak membiarkan saya menyerah. Setelah kelas, dia menghampiri saya dan bilang: 'Kamu sudah menyelesaikan hal tersulit — kamu mau datang.'"

Sarah menghadiri Zumba 3x seminggu di bulan pertama. Berat turun 2 kg — lambat, tapi stabil.

Perubahan Nyata di Bulan Ketiga

Di bulan ketiga, atas saran Coach Doni, Sarah mulai menambahkan sesi personal training 1x seminggu. "Coach Doni melihat bahwa saya butuh lebih dari sekadar kardio — saya butuh membangun kekuatan dasar." Program PT dirancang khusus: latihan fungsional, core strengthening, dan nutrisi yang disesuaikan.

"Saya baru benar-benar merasakan perubahan di bulan ketiga. Bukan hanya berat badan — tapi cara saya naik tangga, cara saya duduk, cara saya tidur. Semua lebih baik."

Dari Tidak Bisa Lari 100 Meter ke 10K

Di bulan kelima, Coach Doni mengajukan tantangan: ikut program couch-to-5K internal S-One. "Saya tertawa waktu dengarnya. Saya bilang saya tidak bisa lari. Dia bilang: 'Kamu bilang hal yang sama soal Zumba.'"

Sarah mengikuti program tersebut, lalu mendaftar 10K lokal di akhir bulan keenam. Waktu finishnya: 1 jam 12 menit. "Saya menangis saat melewati garis finish. Bukan karena kelelahan — tapi karena saya tidak percaya saya bisa sampai di sini."

Pesan untuk Member Baru

"Hal yang paling saya sesali hanyalah satu: kenapa tidak mulai lebih cepat. Jangan tunggu sampai kondisimu 'siap' atau sampai kamu merasa 'cukup langsing untuk pergi ke gym.' Justru itulah alasan kamu harus pergi ke gym. Komunitas di S-One tidak akan menghakimi kamu — mereka akan mendukungmu."

Sarah sekarang adalah anggota Elite dan menghadiri 5 sesi per minggu. Target berikutnya: half marathon akhir tahun ini.`,
    category: "NEWS",
    imageUrl: null,
    author: "S-One Gym",
    publishedAt: "2025-05-18",
    readTime: 4,
    featured: false,
  },
];

export const STATS = [
  { value: "2,000+", label: "Active Members", icon: "👥" },
  { value: "15+", label: "Class Types", icon: "🏃" },
  { value: "20+", label: "Expert Coaches", icon: "🏆" },
  { value: "5+", label: "Years of Excellence", icon: "⭐" },
];

// ─── E-Commerce / Checkout ────────────────────────────────────────────────────

export const PT_PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    sessions: 4,
    price: 700000,
    validDays: 30,
    features: [
      "4 × 60-min PT sessions",
      "Initial fitness assessment",
      "Basic nutrition guidelines",
      "Custom workout plan",
    ],
  },
  {
    id: "transform",
    name: "Transform",
    sessions: 8,
    price: 1300000,
    validDays: 30,
    popular: true,
    features: [
      "8 × 60-min PT sessions",
      "Full fitness assessment",
      "Personalized nutrition plan",
      "Custom workout program",
      "WhatsApp support",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    sessions: 16,
    price: 2400000,
    validDays: 60,
    features: [
      "16 × 60-min PT sessions",
      "Complete body composition analysis",
      "Advanced nutrition coaching",
      "Periodized 8-week program",
      "Daily WhatsApp support",
    ],
  },
];

export const COURIERS = [
  { id: "jne-reg", name: "JNE Reguler", estimasi: "3–5 hari kerja", cost: 15000 },
  { id: "jne-yes", name: "JNE YES (Esok Sampai)", estimasi: "1 hari kerja", cost: 35000 },
  { id: "jt-reg", name: "J&T Express", estimasi: "3–4 hari kerja", cost: 12000 },
  { id: "sicepat", name: "SiCepat Reguler", estimasi: "3–4 hari kerja", cost: 13000 },
  { id: "anteraja", name: "Anteraja", estimasi: "3–5 hari kerja", cost: 10000 },
  { id: "pos", name: "POS Indonesia", estimasi: "5–7 hari kerja", cost: 9000 },
];

export const PROVINCES = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi",
  "Sumatera Selatan", "Kepulauan Bangka Belitung", "Bengkulu", "Lampung",
  "DKI Jakarta", "Jawa Barat", "Banten", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur",
  "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara",
  "Maluku", "Maluku Utara", "Papua Barat", "Papua",
];

