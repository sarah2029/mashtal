// أسماء عربية لأشهر النباتات والعائلات — تُستخدم إذا ما توفر Gemini، حتى يبقى كل شي بالعربي.
const SPECIES = {
  'tabernaemontana divaricata': 'الياسمين الهندي (تبرنامونتانا)',
  'dracaena braunii': 'بامبو الحظ', 'dracaena sanderiana': 'بامبو الحظ',
  'dracaena trifasciata': 'لسان الحماة (سانسيفيريا)', 'sansevieria trifasciata': 'لسان الحماة (سانسيفيريا)',
  'dracaena marginata': 'دراسينا مارجيناتا', 'dracaena fragrans': 'دراسينا العطرية',
  'epipremnum aureum': 'البوتس الذهبي', 'monstera deliciosa': 'مونستيرا',
  'zamioculcas zamiifolia': 'زاميا (نبات ZZ)', 'aloe vera': 'الصبر (الألوفيرا)',
  'ficus lyrata': 'تين الكمان', 'ficus elastica': 'فيكس المطاط', 'ficus benjamina': 'فيكس بنجامينا',
  'chlorophytum comosum': 'النبتة العنكبوتية', 'jasminum sambac': 'الفل', 'nerium oleander': 'الدفلة',
  'phoenix dactylifera': 'نخلة التمر', 'hibiscus rosa-sinensis': 'الهبسكس (الخطمية الصينية)',
  'ocimum basilicum': 'الريحان', 'ziziphus spina-christi': 'السدر', 'lawsonia inermis': 'الحناء',
  'catharanthus roseus': 'الونكا (عين القطة)', 'portulaca oleracea': 'الرجلة', 'portulaca grandiflora': 'بنت الساعة',
  'petroselinum crispum': 'البقدونس', 'coriandrum sativum': 'الكزبرة', 'solanum lycopersicum': 'الطماطم',
  'citrus limon': 'الليمون', 'citrus aurantiifolia': 'الليمون البنزهير', 'crassula ovata': 'شجرة اليشم',
  'dypsis lutescens': 'نخلة الأريكا', 'chamaedorea elegans': 'نخلة الصالون', 'codiaeum variegatum': 'الكروتون',
  'euphorbia milii': 'تاج الشوك', 'euphorbia pulcherrima': 'بنت القنصل', 'gardenia jasminoides': 'الجاردينيا',
  'lantana camara': 'اللانتانا', 'duranta erecta': 'الدورانتا', 'salvia rosmarinus': 'إكليل الجبل',
  'rosmarinus officinalis': 'إكليل الجبل', 'hedera helix': 'اللبلاب', 'cycas revoluta': 'السيكاس',
  'moringa oleifera': 'المورينجا', 'tecoma stans': 'التيكوما', 'murraya paniculata': 'الموريا',
  'conocarpus erectus': 'الكينوكاربس', 'conocarpus lancifolius': 'الكينوكاربس',
  'aglaonema commutatum': 'الأجلونيما', 'opuntia ficus-indica': 'التين الشوكي', 'mentha spicata': 'النعناع',
  'spathiphyllum wallisii': 'زنبق السلام', 'strelitzia reginae': 'عصفور الجنة',
};
const GENUS = {
  jasminum: 'الياسمين', bougainvillea: 'الجهنمية', rosa: 'الورد', mentha: 'النعناع', citrus: 'الحمضيات',
  capsicum: 'الفلفل', aglaonema: 'الأجلونيما', dieffenbachia: 'الديفنباخيا', philodendron: 'الفيلوديندرون',
  calathea: 'الكالاثيا', goeppertia: 'الكالاثيا', maranta: 'نبتة الصلاة (المارانتا)', peperomia: 'البيبروميا',
  schefflera: 'الشفليرا', heptapleurum: 'الشفليرا', echeveria: 'الإيشيفيريا', opuntia: 'التين الشوكي',
  plumeria: 'الفتنة (البلوميريا)', ixora: 'الإكسورا', pelargonium: 'العطرة (الجيرانيوم)', lavandula: 'الخزامى',
  anthurium: 'الأنثوريوم', phalaenopsis: 'الأوركيد', begonia: 'البيغونيا', kalanchoe: 'الكلانشو',
  tradescantia: 'الترادسكانتيا', syngonium: 'السينجونيوم', alocasia: 'الألوكاسيا', strelitzia: 'عصفور الجنة',
  dracaena: 'الدراسينا', ficus: 'الفيكس', washingtonia: 'نخلة الواشنطونيا', spathiphyllum: 'زنبق السلام',
  sansevieria: 'لسان الحماة', aloe: 'الصبر', hibiscus: 'الهبسكس', euphorbia: 'الفربيون', portulaca: 'الرجلة',
  ocimum: 'الريحان', crassula: 'الكراسولا', haworthia: 'الهاورثيا', gardenia: 'الجاردينيا', nerium: 'الدفلة',
};
const FAMILY = {
  araceae: 'القلقاسية', asparagaceae: 'الهليونية', apocynaceae: 'الدفلية', moraceae: 'التوتية',
  lamiaceae: 'الشفوية', rosaceae: 'الوردية', arecaceae: 'النخيلية', cactaceae: 'الصبارية',
  crassulaceae: 'المخلدية', euphorbiaceae: 'الفربيونية', malvaceae: 'الخبازية', solanaceae: 'الباذنجانية',
  rutaceae: 'السذبية', oleaceae: 'الزيتونية', asphodelaceae: 'البروقية', begoniaceae: 'البيغونية',
  orchidaceae: 'السحلبية', marantaceae: 'المرنتية', piperaceae: 'الفلفلية', araliaceae: 'الأرالية',
  fabaceae: 'البقولية', asteraceae: 'النجمية', poaceae: 'النجيلية', apiaceae: 'الخيمية',
  rhamnaceae: 'السدرية', lythraceae: 'الحنائية', geraniaceae: 'الغرنوقية', bignoniaceae: 'البيغنونية',
  portulacaceae: 'الرجلية', nyctaginaceae: 'الشبية', cycadaceae: 'السيكادية', moringaceae: 'المورينجية',
};

export function arabicName(scientific) {
  const s = String(scientific || '').toLowerCase().trim();
  if (SPECIES[s]) return SPECIES[s];
  const genus = s.split(/\s+/)[0];
  if (GENUS[genus]) return 'نوع من ' + GENUS[genus];
  return 'نبتة تعرّفنا عليها';
}
export function arabicFamily(family) {
  const f = FAMILY[String(family || '').toLowerCase().trim()];
  return f ? 'العائلة ' + f : '';
}
