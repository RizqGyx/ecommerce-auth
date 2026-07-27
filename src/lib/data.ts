export const CLASS_TYPES = [
  {
    id: "1",
    name: "Zumba",
    slug: "zumba",
    description:
      "Kelas dance fitness yang memadukan ritme Latin dengan gerakan kardio penuh energi. Bakar kalori sambil bersenang-senang.",
    duration: 60,
    color: "from-pink-500 to-rose-600",
    colorSolid: "text-pink-400",
    icon: "🕺",
    benefits: ["Bakar 400-600 kalori", "Melatih koordinasi", "Mengurangi stres", "Latihan sosial yang seru"],
  },
  {
    id: "2",
    name: "Poundfit",
    slug: "poundfit",
    description:
      "Latihan kardio full-body menggunakan stik ringan untuk pound, squat, lunge, dan jump. Tempat fitness bertemu musik.",
    duration: 45,
    color: "from-yellow-500 to-orange-600",
    colorSolid: "text-yellow-400",
    icon: "🥁",
    benefits: ["Menguatkan otot core", "Membentuk tubuh bagian atas", "Ritme & koordinasi", "Membakar energi tinggi"],
  },
  {
    id: "3",
    name: "Muay Thai",
    slug: "muay-thai",
    description:
      "Seni Delapan Anggota Tubuh — olahraga bela diri yang menggunakan tinju, siku, lutut, dan tulang kering. Kondisioning full-body maksimal.",
    duration: 90,
    color: "from-red-500 to-red-700",
    colorSolid: "text-red-400",
    icon: "🥊",
    benefits: ["Kekuatan full-body", "Kemampuan bela diri", "Ketangguhan mental", "Bakar kalori tinggi"],
  },
  {
    id: "4",
    name: "Calisthenics",
    slug: "calisthenics",
    description:
      "Kuasai berat tubuhmu sendiri. Dari gerakan dasar hingga skill tingkat lanjut — bangun kekuatan, fleksibilitas, dan kontrol.",
    duration: 90,
    color: "from-cyan-500 to-blue-600",
    colorSolid: "text-cyan-400",
    icon: "💪",
    benefits: ["Kekuatan fungsional", "Definisi otot", "Mobilitas sendi", "Tanpa perlu alat"],
  },
  {
    id: "5",
    name: "Yoga",
    slug: "yoga",
    description:
      "Satukan pikiran, tubuh, dan napas. Kelas yoga kami meningkatkan fleksibilitas, mengurangi stres, dan membangun kekuatan batin.",
    duration: 60,
    color: "from-green-500 to-emerald-600",
    colorSolid: "text-green-400",
    icon: "🧘",
    benefits: ["Fleksibilitas & keseimbangan", "Mengurangi stres", "Tidur lebih nyenyak", "Ketenangan pikiran"],
  },
];

export const FACILITIES = [
  {
    icon: "🏋️",
    name: "Area Latihan Beban",
    desc: "1000+ m² free weight, mesin, dan alat functional training.",
    size: "large",
    image: "/gym/interior-wide.jpg",
  },
  {
    icon: "💃",
    name: "Studio A — Dance & Kardio",
    desc: "Studio berkaca khusus untuk kelas Zumba, Poundfit, dan aerobik.",
    size: "large",
    image: "/gym/dance-studio.jpg",
  },
  {
    icon: "🥊",
    name: "Zona Tempur",
    desc: "Ring lengkap, heavy bag, dan alat pukul untuk latihan Muay Thai.",
    size: "medium",
    image: "/gym/boxing-ring.jpg",
  },
  {
    icon: "🤸",
    name: "Area Calisthenics",
    desc: "Rig indoor & outdoor, parallette, dan stasiun latihan skill.",
    size: "medium",
    image: "/classes/calisthenics.jpg",
  },
  {
    icon: "🧘",
    name: "Yoga Studio",
    desc: "Ruang tenang kedap suara dengan matras dan props premium.",
    size: "medium",
    image: "/gym/yoga-studio.jpg",
  },
  {
    icon: "🔥",
    name: "Sauna Premium",
    desc: "Sauna kering ala Finlandia, 80-90°C, muat 8 orang.",
    size: "medium",
  },
  {
    icon: "🚿",
    name: "Ruang Loker",
    desc: "Loker aman, shower, dan perlengkapan mandi untuk member Premium & Elite.",
    size: "small",
  },
  {
    icon: "☕",
    name: "S-One Café Corner",
    desc: "Protein shake, jus, dan camilan sehat setelah sesi latihanmu.",
    size: "small",
  },
];

export const COACHES = [
  {
    id: "1",
    name: "Rina Sari",
    slug: "rina-sari",
    title: "Instruktur Zumba & Poundfit",
    bio: "Dengan 8 tahun pengalaman sebagai instruktur Zumba dan Poundfit bersertifikat, Rina telah membantu lebih dari 500 member mentransformasi kebugaran mereka lewat kekuatan tari dan ritme. Kelasnya yang penuh energi dikenal sebagai sesi paling seru di S-One Gym.",
    imageUrl: "/coaches/rina.jpg",
    specialties: ["Zumba", "Poundfit", "Dance Fitness", "Weight Loss"],
    certifications: ["Zumba International Licensed", "Poundfit Certified", "ACE Group Fitness"],
    experience: 8,
    instagram: "@rina.sari.fit",
    featured: true,
    isPersonalTrainer: false,
    classes: ["Zumba", "Poundfit"],
    achievements: "Penghargaan Instruktur Terbaik 2023",
  },
  {
    id: "2",
    name: "Budi Santoso",
    slug: "budi-santoso",
    title: "Head Coach Muay Thai",
    bio: "Mantan juara nasional Muay Thai dengan 12 tahun pengalaman kompetitif dan 6 tahun melatih. Budi membawa keahlian bertarung yang nyata ke setiap sesi, memadukan teknik dengan functional fitness untuk semua level kemampuan.",
    imageUrl: "/coaches/budi.jpg",
    specialties: ["Muay Thai", "Kickboxing", "Self-Defense", "Strength & Conditioning"],
    certifications: ["WMF Certified Coach", "IFMA Level 2", "Sports Nutrition Certified"],
    experience: 12,
    instagram: "@budi.muaythai",
    featured: true,
    isPersonalTrainer: true,
    pricePerSession: 250000,
    classes: ["Muay Thai"],
    achievements: "Juara Nasional Muay Thai 2015-2018",
  },
  {
    id: "3",
    name: "Ahmad Rizky",
    slug: "ahmad-rizky",
    title: "Spesialis Calisthenics & PT",
    bio: "Ahmad mengubah kecintaannya pada penguasaan bodyweight menjadi karier membantu orang lain membentuk fisik luar biasa tanpa alat sama sekali. Pendekatan programnya yang progresif memastikan hasil baik untuk pemula total maupun atlet tingkat lanjut.",
    imageUrl: "/coaches/ahmad.jpg",
    specialties: ["Calisthenics", "Street Workout", "Muscle Hypertrophy", "Movement Training"],
    certifications: ["NSCA-CPT", "Calisthenics Academy Certified", "FMS Level 2"],
    experience: 7,
    instagram: "@rizki.calisthenics",
    featured: true,
    isPersonalTrainer: true,
    pricePerSession: 200000,
    classes: ["Calisthenics"],
    achievements: "Finalis World Street Workout Championship",
  },
  {
    id: "4",
    name: "Sari Dewi",
    slug: "sari-dewi",
    title: "Coach Yoga & Mindfulness",
    bio: "Pendekatan Sari terhadap yoga yang lembut namun menantang menjadikan kelasnya tempat pelarian bagi member yang mencari keseimbangan. Dengan pelatihan dari Bali dan Mysore, India, ia memadukan kearifan tradisional dengan ilmu fitness modern.",
    imageUrl: "/coaches/sari.jpg",
    specialties: ["Hatha Yoga", "Vinyasa Flow", "Meditation", "Flexibility Training"],
    certifications: ["RYT-500 Yoga Alliance", "Yin Yoga Certified", "Mindfulness-Based Stress Reduction"],
    experience: 9,
    instagram: "@sari.yoga",
    featured: true,
    isPersonalTrainer: false,
    classes: ["Yoga"],
    achievements: "Bersertifikat dari Mysore, India — Ashtanga Yoga",
  },
  {
    id: "5",
    name: "Doni Prasetyo",
    slug: "doni-prasetyo",
    title: "Kepala Trainer & Strength Coach",
    bio: "Doni mengawasi seluruh program fitness di S-One Gym. Dengan latar belakang sports science dan powerlifting kompetitif, ia menyusun program cerdas yang memberikan hasil konsisten — baik tujuanmu kekuatan, estetika, maupun performa.",
    imageUrl: "/coaches/doni.jpg",
    specialties: ["Strength Training", "Powerlifting", "Body Recomposition", "Sports Performance"],
    certifications: ["CSCS (NSCA)", "ACSM-CPT", "Precision Nutrition Level 2"],
    experience: 10,
    instagram: "@doni.strength",
    featured: true,
    isPersonalTrainer: true,
    pricePerSession: 300000,
    classes: ["Strength Training"],
    achievements: "Perak IPF National Powerlifting Championship 2019",
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
    tagline: "Mulai Perjalananmu",
    price: 150000,
    duration: "month",
    color: "from-slate-600 to-slate-700",
    borderColor: "border-slate-500/30",
    popular: false,
    features: [
      { text: "Akses gym (06.00–22.00)", included: true },
      { text: "2 kelas grup per minggu", included: true },
      { text: "Akses ruang loker", included: true },
      { text: "Asesmen kebugaran dasar", included: true },
      { text: "Kelas tanpa batas", included: false },
      { text: "Akses sauna", included: false },
      { text: "Sesi personal training", included: false },
      { text: "Konsultasi nutrisi", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Pilihan Paling Populer",
    price: 300000,
    duration: "month",
    color: "from-primary/80 to-accent/80",
    borderColor: "border-primary/50",
    popular: true,
    features: [
      { text: "Akses gym 24/7", included: true },
      { text: "Kelas grup tanpa batas", included: true },
      { text: "Ruang loker + layanan handuk", included: true },
      { text: "Asesmen kebugaran bulanan", included: true },
      { text: "Akses sauna (3x/minggu)", included: true },
      { text: "1 sesi PT per bulan", included: true },
      { text: "Booking kelas prioritas", included: true },
      { text: "Konsultasi nutrisi", included: false },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    tagline: "Pengalaman Terbaik",
    price: 500000,
    duration: "month",
    color: "from-yellow-500/80 to-amber-600/80",
    borderColor: "border-yellow-500/50",
    popular: false,
    features: [
      { text: "Akses gym 24/7", included: true },
      { text: "Kelas grup tanpa batas", included: true },
      { text: "Ruang loker premium + layanan handuk", included: true },
      { text: "Asesmen kebugaran mingguan", included: true },
      { text: "Akses sauna tanpa batas", included: true },
      { text: "4 sesi PT per bulan", included: true },
      { text: "Booking kelas prioritas", included: true },
      { text: "Konsultasi nutrisi bulanan", included: true },
    ],
  },
];

export const PRODUCTS = [
  // Supplements
  { id: "p1", name: "Whey Protein Gold Standard", category: "Supplements", price: 450000, originalPrice: 520000, description: "24g protein per sajian. Whey protein terlaris untuk pemulihan dan pertumbuhan otot.", imageUrl: "/products/p1.jpg", rating: 4.8, reviews: 128, badge: "Terlaris" },
  { id: "p2", name: "BCAA Recovery Boost", category: "Supplements", price: 185000, originalPrice: null, description: "Asam amino esensial untuk pemulihan otot. Rasa cherry lime.", imageUrl: null, rating: 4.6, reviews: 87, badge: null },
  { id: "p3", name: "Multivitamin Sport", category: "Supplements", price: 120000, originalPrice: 140000, description: "Formula multivitamin lengkap yang dirancang untuk individu aktif.", imageUrl: null, rating: 4.7, reviews: 203, badge: "Diskon" },
  { id: "p4", name: "Creatine Monohydrate", category: "Supplements", price: 160000, originalPrice: null, description: "Kreatin monohidrat murni untuk kekuatan dan power. 300g tanpa rasa.", imageUrl: null, rating: 4.9, reviews: 156, badge: null },
  // Food
  { id: "p5", name: "Protein Bar Chocolate", category: "Food", price: 35000, originalPrice: null, description: "Protein tinggi, gula rendah. 20g protein, 3g gula. Cocok untuk pre/post workout.", imageUrl: null, rating: 4.5, reviews: 74, badge: null },
  { id: "p6", name: "Energy Drink S-One Boost", category: "Food", price: 25000, originalPrice: null, description: "Perpaduan kafein alami + elektrolit. Tetap terhidrasi dan berenergi.", imageUrl: null, rating: 4.4, reviews: 91, badge: "S-One Exclusive" },
  { id: "p7", name: "Oat + Banana Snack Pack", category: "Food", price: 28000, originalPrice: null, description: "Oat siap santap dengan pisang asli. Karbohidrat bersih untuk energi tahan lama.", imageUrl: null, rating: 4.3, reviews: 42, badge: null },
  // Merchandise
  { id: "p8", name: "S-One Gym Performance Tee", category: "Merchandise", price: 180000, originalPrice: 220000, description: "Kaos performa penyerap keringat dengan logo neon S-One. Ukuran S–XXL.", imageUrl: null, rating: 4.7, reviews: 63, badge: "Diskon" },
  { id: "p9", name: "S-One Gym Shorts", category: "Merchandise", price: 145000, originalPrice: null, description: "Celana latihan flex-fit dengan kantong ponsel. Gelap dengan aksen neon.", imageUrl: null, rating: 4.6, reviews: 38, badge: null },
  { id: "p10", name: "S-One Water Bottle 750ml", category: "Merchandise", price: 95000, originalPrice: null, description: "Botol stainless steel berinsulasi. Tahan dingin 24 jam, tahan panas 12 jam.", imageUrl: "/products/p10.jpg", rating: 4.8, reviews: 114, badge: "Baru" },
  { id: "p11", name: "S-One Gym Bag Pro", category: "Merchandise", price: 320000, originalPrice: 380000, description: "Tas gym luas dengan kompartemen basah, kantong sepatu, dan port USB charging.", imageUrl: null, rating: 4.9, reviews: 29, badge: "Diskon" },
  // Equipment
  { id: "p12", name: "Resistance Band Set (5 levels)", category: "Equipment", price: 135000, originalPrice: null, description: "5 level resistensi dari ringan hingga berat. Cocok untuk latihan di rumah.", imageUrl: "/products/p12.jpg", rating: 4.6, reviews: 82, badge: null },
  { id: "p13", name: "Jump Rope Speed Cable", category: "Equipment", price: 85000, originalPrice: null, description: "Tali lompat speed dengan ball-bearing untuk double-unders dan latihan kardio.", imageUrl: null, rating: 4.7, reviews: 55, badge: null },
  { id: "p14", name: "MMA Training Gloves", category: "Equipment", price: 245000, originalPrice: null, description: "Sarung tangan kelas profesional untuk Muay Thai dan latihan bag. Kulit asli.", imageUrl: "/products/p14.jpg", rating: 4.8, reviews: 47, badge: "Baru" },
];

export const BLOG_POSTS = [
  {
    id: "1",
    title: "5 Tips Memaksimalkan Setiap Sesi Gym",
    slug: "5-tips-maximize-gym-session",
    excerpt: "Berhenti menyia-nyiakan progres. Lima strategi berbasis bukti ini akan mengubah efisiensi dan hasil latihanmu mulai hari ini.",
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
    title: "Zumba: Lebih dari Sekadar Menari — Sains di Balik Keseruannya",
    slug: "zumba-science-behind-the-fun",
    excerpt: "Kenapa Zumba bisa memberi hasil sedramatis itu? Kami bedah mekanisme fisiologis yang membuat dance fitness jadi salah satu modalitas kardio paling efektif.",
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
    title: "Nutrisi Pre & Post Workout: Panduan Lengkap",
    slug: "pre-post-workout-nutrition-guide",
    excerpt: "Apa yang kamu makan di sekitar sesi latihan sama pentingnya dengan latihan itu sendiri. Ini strategi nutrisi berbasis sains untuk pemulihan maksimal.",
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
    title: "S-One Gym Buka Kelas Kickboxing Baru — Mulai Juli 2025",
    slug: "s-one-gym-new-kickboxing-classes-2025",
    excerpt: "Kabar besar untuk komunitas S-One! Kami meluncurkan kelas Kickboxing mingguan bersama Coach Budi, terbuka untuk semua level. Pendaftaran sudah dibuka.",
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
    title: "Cara Memilih Suplemen yang Tepat untuk Tujuan Fitnessmu",
    slug: "how-to-choose-right-supplement",
    excerpt: "Industri suplemen penuh gimmick pemasaran. Coach nutrisi bersertifikat kami membedah kebisingannya dan membantumu memilih hanya yang benar-benar dibutuhkan tujuanmu.",
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
    title: "Sorotan Member: Cara Sarah Turun 18kg dalam 6 Bulan di S-One",
    slug: "member-spotlight-sarah-transformation",
    excerpt: "Sarah datang dengan gugup dan ragu. Enam bulan kemudian ia berlari 10K pertamanya. Ini kisahnya — dengan kata-katanya sendiri — dan coach yang mengubah segalanya.",
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
  { value: "2.000+", label: "Member Aktif", icon: "👥" },
  { value: "15+", label: "Jenis Kelas", icon: "🏃" },
  { value: "20+", label: "Coach Ahli", icon: "🏆" },
  { value: "5+", label: "Tahun Pengalaman", icon: "⭐" },
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
      "4 × sesi PT 60 menit",
      "Asesmen kebugaran awal",
      "Panduan nutrisi dasar",
      "Program latihan kustom",
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
      "8 × sesi PT 60 menit",
      "Asesmen kebugaran lengkap",
      "Rencana nutrisi personal",
      "Program latihan kustom",
      "Dukungan WhatsApp",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    sessions: 16,
    price: 2400000,
    validDays: 60,
    features: [
      "16 × sesi PT 60 menit",
      "Analisis komposisi tubuh lengkap",
      "Coaching nutrisi lanjutan",
      "Program periodisasi 8 minggu",
      "Dukungan WhatsApp harian",
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

