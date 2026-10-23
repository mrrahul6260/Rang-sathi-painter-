export interface MPCityInfo {
  nameEn: string;
  nameHi: string;
  divisionEn: string;
  divisionHi: string;
  isMajorHub?: boolean;
  popularAreas: string[];
}

export const MP_DIVISIONS = [
  { id: 'all', nameEn: 'All MP Regions', nameHi: 'पूरा मध्य प्रदेश' },
  { id: 'malwa', nameEn: 'Malwa (Indore, Ujjain, Ratlam)', nameHi: 'मालवा अंचल' },
  { id: 'bhopal', nameEn: 'Bhopal Division', nameHi: 'भोपाल संभाग' },
  { id: 'mahakoshal', nameEn: 'Mahakoshal (Jabalpur, Chhindwara)', nameHi: 'महाकौशल अंचल' },
  { id: 'gwalior_chambal', nameEn: 'Gwalior-Chambal', nameHi: 'ग्वालियर-चंबल' },
  { id: 'vindhya', nameEn: 'Vindhya (Rewa, Satna, Singrauli)', nameHi: 'विंध्य अंचल' },
  { id: 'bundelkhand', nameEn: 'Bundelkhand (Sagar, Damoh, Chhatarpur)', nameHi: 'बुंदेलखंड' },
  { id: 'nimar', nameEn: 'Nimar (Khandwa, Khargone, Burhanpur)', nameHi: 'निमाड़ अंचल' },
];

export const MP_CITIES_DATA: MPCityInfo[] = [
  // --- MALWA ---
  {
    nameEn: 'Indore',
    nameHi: 'इंदौर',
    divisionEn: 'Malwa',
    divisionHi: 'मालवा',
    isMajorHub: true,
    popularAreas: ['Vijay Nagar', 'Palasia', 'Rajwada', 'Annapurna Road', 'Super Corridor', 'Bhawarkua', 'Bicholi Mardana', 'Scheme 78', 'Sudama Nagar', 'Rau'],
  },
  {
    nameEn: 'Ujjain',
    nameHi: 'उज्जैन',
    divisionEn: 'Malwa',
    divisionHi: 'मालवा',
    isMajorHub: true,
    popularAreas: ['Freeganj', 'Nanakheda', 'Madhav Nagar', 'Mahakal Corridor Area', 'Seti Nagar', 'Rishi Nagar', 'Agar Road'],
  },
  {
    nameEn: 'Ratlam',
    nameHi: 'रतलाम',
    divisionEn: 'Malwa',
    divisionHi: 'मालवा',
    isMajorHub: true,
    popularAreas: ['Do Batti', 'Station Road', 'Shastri Nagar', 'Alkapuri', 'Kasturba Nagar', 'Sailana Bus Stand'],
  },
  {
    nameEn: 'Dewas',
    nameHi: 'देवास',
    divisionEn: 'Malwa',
    divisionHi: 'मालवा',
    popularAreas: ['Civil Lines', 'Bhopal Road', 'Ujjain Road', 'Moti Bunglow', 'Ganga Nagar', 'Vikas Nagar'],
  },
  {
    nameEn: 'Dhar',
    nameHi: 'धार',
    divisionEn: 'Malwa',
    divisionHi: 'मालवा',
    popularAreas: ['Trimurti Nagar', 'Mandav Road', 'Civil Lines', 'Pithampur Industrial Area', 'Gwal Bagh'],
  },
  {
    nameEn: 'Mandsaur',
    nameHi: 'मंदसौर',
    divisionEn: 'Malwa',
    divisionHi: 'मालवा',
    popularAreas: ['Yashodharman Nagar', 'Station Road', 'Sanjeet Road', 'Nayi Abadi', 'Mhow-Neemuch Road'],
  },
  {
    nameEn: 'Neemuch',
    nameHi: 'नीमच',
    divisionEn: 'Malwa',
    divisionHi: 'मालवा',
    popularAreas: ['Vikas Nagar', 'Cantt Area', 'CRPF Campus Road', 'Tagore Marg', 'Baghahana'],
  },
  {
    nameEn: 'Shajapur',
    nameHi: 'शाजापुर',
    divisionEn: 'Malwa',
    divisionHi: 'मालवा',
    popularAreas: ['Bus Stand Road', 'Lal Ghati', 'Prabhu Nagar', 'Civil Lines'],
  },
  {
    nameEn: 'Agar Malwa',
    nameHi: 'आगर मालवा',
    divisionEn: 'Malwa',
    divisionHi: 'मालवा',
    popularAreas: ['Chawani', 'Barod Road', 'Ujjain Kota Highway', 'Bada Gav'],
  },
  {
    nameEn: 'Nagda',
    nameHi: 'नागदा',
    divisionEn: 'Malwa',
    divisionHi: 'मालवा',
    popularAreas: ['Birla Gram', 'Station Road', 'Padmavatee Colony', 'Ingoriya Road'],
  },

  // --- BHOPAL DIVISION ---
  {
    nameEn: 'Bhopal',
    nameHi: 'भोपाल',
    divisionEn: 'Bhopal Division',
    divisionHi: 'भोपाल संभाग',
    isMajorHub: true,
    popularAreas: ['Arera Colony', 'MP Nagar Zone 1 & 2', 'Kolar Road', 'TT Nagar', 'Hoshangabad Road', 'Shahpura', 'Ayodhya Bypass', 'Bairagarh / Sant Hirdaram Nagar', 'Govindpura', 'Katara Hills'],
  },
  {
    nameEn: 'Sehore',
    nameHi: 'सीहोर',
    divisionEn: 'Bhopal Division',
    divisionHi: 'भोपाल संभाग',
    popularAreas: ['Chanakyapuri', 'Housing Board Colony', 'Englishpura', 'Bhopal Naka', 'Mandi Road'],
  },
  {
    nameEn: 'Vidisha',
    nameHi: 'विदिशा',
    divisionEn: 'Bhopal Division',
    divisionHi: 'भोपाल संभाग',
    popularAreas: ['Civil Lines', 'Durga Nagar', 'Ahmedpur Road', 'Bheropura', 'Sanchi Road'],
  },
  {
    nameEn: 'Raisen',
    nameHi: 'रायसेन',
    divisionEn: 'Bhopal Division',
    divisionHi: 'भोपाल संभाग',
    popularAreas: ['Bhopal Road', 'Fort Road', 'Gopal Nagar', 'Mandideep Industrial Belt'],
  },
  {
    nameEn: 'Rajgarh',
    nameHi: 'राजगढ़ (ब्यावरा)',
    divisionEn: 'Bhopal Division',
    divisionHi: 'भोपाल संभाग',
    popularAreas: ['Biaora City', 'Civil Lines', 'Khilchipur Naka', 'Pachore'],
  },

  // --- MAHAKOSHAL ---
  {
    nameEn: 'Jabalpur',
    nameHi: 'जबलपुर',
    divisionEn: 'Mahakoshal',
    divisionHi: 'महाकौशल',
    isMajorHub: true,
    popularAreas: ['Civil Lines', 'Wright Town', 'Napier Town', 'Vijay Nagar', 'Gorakhpur', 'Madan Mahal', 'Ghamapur', 'Adhartal', 'Ranjhi', 'Tilhari / Bilhari'],
  },
  {
    nameEn: 'Chhindwara',
    nameHi: 'छिंदवाड़ा',
    divisionEn: 'Mahakoshal',
    divisionHi: 'महाकौशल',
    isMajorHub: true,
    popularAreas: ['Parasia Road', 'Mohan Nagar', 'Chandan Gaon', 'Gulabra', 'Khajri Road', 'Nagpur Road'],
  },
  {
    nameEn: 'Katni',
    nameHi: 'कटनी',
    divisionEn: 'Mahakoshal',
    divisionHi: 'महाकौशल',
    popularAreas: ['Civil Lines', 'Madhav Nagar', 'Bargawan', 'Shanti Nagar', 'Jhapin Ganj'],
  },
  {
    nameEn: 'Seoni',
    nameHi: 'सिवनी',
    divisionEn: 'Mahakoshal',
    divisionHi: 'महाकौशल',
    popularAreas: ['Barghat Road', 'Gandhi Chowk', 'Nagpur Road', 'Dalal Mohalla', 'Dunda Seoni'],
  },
  {
    nameEn: 'Balaghat',
    nameHi: 'बालाघाट',
    divisionEn: 'Mahakoshal',
    divisionHi: 'महाकौशल',
    popularAreas: ['Prem Nagar', 'Circuit House Area', 'Wardha Road', 'Gondia Road', 'Budhi'],
  },
  {
    nameEn: 'Mandla',
    nameHi: 'मंडला',
    divisionEn: 'Mahakoshal',
    divisionHi: 'महाकौशल',
    popularAreas: ['Civil Lines', 'Narmada Ghati Area', 'Lalipur', 'Raja Garden'],
  },
  {
    nameEn: 'Dindori',
    nameHi: 'डिंडोरी',
    divisionEn: 'Mahakoshal',
    divisionHi: 'महाकौशल',
    popularAreas: ['Bus Stand', 'Civil Lines', 'Amarkantak Road'],
  },
  {
    nameEn: 'Narmadapuram',
    nameHi: 'नर्मदापुरम (होशंगाबाद)',
    divisionEn: 'Mahakoshal',
    divisionHi: 'महाकौशल',
    popularAreas: ['Rasulia', 'Kothi Bazar', 'Sethani Ghat Area', 'ITI Road', 'Meenakshi Flyover'],
  },
  {
    nameEn: 'Itarsi',
    nameHi: 'इटारसी',
    divisionEn: 'Mahakoshal',
    divisionHi: 'महाकौशल',
    popularAreas: ['Suraj Ganj', 'Deshbandhu Pura', 'Railway Colony', 'Nyas Colony'],
  },
  {
    nameEn: 'Betul',
    nameHi: 'बैतूल',
    divisionEn: 'Mahakoshal',
    divisionHi: 'महाकौशल',
    popularAreas: ['Kothi Bazar', 'Ganj', 'Civil Lines', 'Badora', 'Link Road'],
  },
  {
    nameEn: 'Harda',
    nameHi: 'हरदा',
    divisionEn: 'Mahakoshal',
    divisionHi: 'महाकौशल',
    popularAreas: ['Koli Mohalla', 'Indore Road', 'Nehru Stadium Area', 'Civil Lines'],
  },
  {
    nameEn: 'Pandhurna',
    nameHi: 'पांढुर्णा',
    divisionEn: 'Mahakoshal',
    divisionHi: 'महाकौशल',
    popularAreas: ['Main Market', 'Bhandara Road', 'Civil Lines', 'Railway Station Area'],
  },

  // --- GWALIOR-CHAMBAL ---
  {
    nameEn: 'Gwalior',
    nameHi: 'ग्वालियर',
    divisionEn: 'Gwalior-Chambal',
    divisionHi: 'ग्वालियर-चंबल',
    isMajorHub: true,
    popularAreas: ['City Centre', 'Lashkar', 'Morar', 'Thatipur', 'Phoolbagh', 'Maharaj Bada', 'Pinto Park', 'Deen Dayal Nagar', 'Padav'],
  },
  {
    nameEn: 'Morena',
    nameHi: 'मुरैना',
    divisionEn: 'Gwalior-Chambal',
    divisionHi: 'ग्वालियर-चंबल',
    popularAreas: ['Station Road', 'Jaura Road', 'MS Road', 'Civil Lines', 'Jiwaji Ganj'],
  },
  {
    nameEn: 'Bhind',
    nameHi: 'भिंड',
    divisionEn: 'Gwalior-Chambal',
    divisionHi: 'ग्वालियर-चंबल',
    popularAreas: ['Lahar Road', 'Ater Road', 'Gwalior Road', 'Housing Board Colony'],
  },
  {
    nameEn: 'Shivpuri',
    nameHi: 'शिवपुरी',
    divisionEn: 'Gwalior-Chambal',
    divisionHi: 'ग्वालियर-चंबल',
    popularAreas: ['Madhav Chowk', 'Fatehpur', 'AB Road', 'Kamla Ganj', 'Physical College Area'],
  },
  {
    nameEn: 'Guna',
    nameHi: 'गुना',
    divisionEn: 'Gwalior-Chambal',
    divisionHi: 'ग्वालियर-चंबल',
    popularAreas: ['Cantt Area', 'AB Road', 'Hanuman Chauraha', 'Kasturba Nagar', 'Bazar Mohalla'],
  },
  {
    nameEn: 'Datia',
    nameHi: 'दतिया',
    divisionEn: 'Gwalior-Chambal',
    divisionHi: 'ग्वालियर-चंबल',
    popularAreas: ['Peetambara Temple Area', 'Civil Lines', 'Gwalior Road', 'Bara Bazar'],
  },
  {
    nameEn: 'Sheopur',
    nameHi: 'श्योपुर',
    divisionEn: 'Gwalior-Chambal',
    divisionHi: 'ग्वालियर-चंबल',
    popularAreas: ['Main Market', 'Pali Road', 'Shivpuri Road', 'Civil Lines'],
  },
  {
    nameEn: 'Ashoknagar',
    nameHi: 'अशोकनगर',
    divisionEn: 'Gwalior-Chambal',
    divisionHi: 'ग्वालियर-चंबल',
    popularAreas: ['Station Road', 'Guna Road', 'Nehru Colony', 'Sarafa Bazar'],
  },

  // --- VINDHYA ---
  {
    nameEn: 'Rewa',
    nameHi: 'रीवा',
    divisionEn: 'Vindhya',
    divisionHi: 'विंध्य',
    isMajorHub: true,
    popularAreas: ['Civil Lines', 'Bodabag', 'Saman Road', 'Nehru Nagar', 'University Road', 'Kothi Compound', 'Dhekaha'],
  },
  {
    nameEn: 'Satna',
    nameHi: 'सतना',
    divisionEn: 'Vindhya',
    divisionHi: 'विंध्य',
    isMajorHub: true,
    popularAreas: ['Civil Lines', 'Bharhut Nagar', 'Dhawari', 'Siddharth Nagar', 'Panna Naka', 'Semariya Chowk', 'Rajendra Nagar'],
  },
  {
    nameEn: 'Singrauli',
    nameHi: 'सिंगरौली',
    divisionEn: 'Vindhya',
    divisionHi: 'विंध्य',
    isMajorHub: true,
    popularAreas: ['Waidhan', 'Morwa', 'Jayant', 'Vindhyanagar', 'NTPC Township Area'],
  },
  {
    nameEn: 'Sidhi',
    nameHi: 'सीधी',
    divisionEn: 'Vindhya',
    divisionHi: 'विंध्य',
    popularAreas: ['Civil Lines', 'Samrat Chowk', 'Gopaldas Road', 'Karondiya'],
  },
  {
    nameEn: 'Shahdol',
    nameHi: 'शहडोल',
    divisionEn: 'Vindhya',
    divisionHi: 'विंध्य',
    popularAreas: ['Gandhi Chowk', 'Station Road', 'Pandav Nagar', 'Rewa Road', 'Burhar Road'],
  },
  {
    nameEn: 'Umaria',
    nameHi: 'उमरिया',
    divisionEn: 'Vindhya',
    divisionHi: 'विंध्य',
    popularAreas: ['Bandhavgarh Road', 'Camp Area', 'Civil Lines', 'Station Road'],
  },
  {
    nameEn: 'Anuppur',
    nameHi: 'अनूपपुर',
    divisionEn: 'Vindhya',
    divisionHi: 'विंध्य',
    popularAreas: ['Samatpur', 'Railway Colony', 'Amarkantak Road', 'Main Market'],
  },
  {
    nameEn: 'Maihar',
    nameHi: 'मैहर',
    divisionEn: 'Vindhya',
    divisionHi: 'विंध्य',
    popularAreas: ['Sharda Mandir Road', 'Station Road', 'Katni By-Pass', 'Galla Mandi'],
  },
  {
    nameEn: 'Mauganj',
    nameHi: 'मऊगंज',
    divisionEn: 'Vindhya',
    divisionHi: 'विंध्य',
    popularAreas: ['Main Market', 'Hanumana Road', 'Deotalab Road', 'Civil Lines'],
  },

  // --- BUNDELKHAND ---
  {
    nameEn: 'Sagar',
    nameHi: 'सागर',
    divisionEn: 'Bundelkhand',
    divisionHi: 'बुंदेलखंड',
    isMajorHub: true,
    popularAreas: ['Civil Lines', 'Makronia', 'Cantt Area', 'Gopal Ganj', 'Tili Road', 'Katra Bazar', 'Subhash Nagar'],
  },
  {
    nameEn: 'Damoh',
    nameHi: 'दमोह',
    divisionEn: 'Bundelkhand',
    divisionHi: 'बुंदेलखंड',
    popularAreas: ['Civil Lines', 'Jabalpur Naka', 'Hatta Road', 'Station Road', 'Kila Mohalla'],
  },
  {
    nameEn: 'Chhatarpur',
    nameHi: 'छतरपुर',
    divisionEn: 'Bundelkhand',
    divisionHi: 'बुंदेलखंड',
    popularAreas: ['Satai Road', 'Nowgong Road', 'Panna Road', 'Civil Lines', 'Bus Stand Area'],
  },
  {
    nameEn: 'Panna',
    nameHi: 'पन्ना',
    divisionEn: 'Bundelkhand',
    divisionHi: 'बुंदेलखंड',
    popularAreas: ['Dham Mohalla', 'Beni Sagar', 'Civil Lines', 'Kishore Ganj', 'Diamond Mines Road'],
  },
  {
    nameEn: 'Tikamgarh',
    nameHi: 'टीकमगढ़',
    divisionEn: 'Bundelkhand',
    divisionHi: 'बुंदेलखंड',
    popularAreas: ['Civil Lines', 'Jhansi Road', 'Nazarbagh', 'Kundeshwar Road'],
  },
  {
    nameEn: 'Niwari',
    nameHi: 'निवाड़ी (ओरछा)',
    divisionEn: 'Bundelkhand',
    divisionHi: 'बुंदेलखंड',
    popularAreas: ['Orchha Heritage Area', 'Station Road', 'Prithvipur Road', 'Main Bazar'],
  },

  // --- NIMAR ---
  {
    nameEn: 'Khandwa',
    nameHi: 'खंडवा (पूर्वी निमाड़)',
    divisionEn: 'Nimar',
    divisionHi: 'निमाड़',
    isMajorHub: true,
    popularAreas: ['Anand Nagar', 'Civil Lines', 'Jaswadi Road', 'Padawa', 'Kharadi Bazar', 'Indore Road'],
  },
  {
    nameEn: 'Khargone',
    nameHi: 'खरगोन (पश्चिमी निमाड़)',
    divisionEn: 'Nimar',
    divisionHi: 'निमाड़',
    isMajorHub: true,
    popularAreas: ['Navgraha Area', 'Bistan Road', 'Diversion Road', 'Gokul Dham', 'Khandwa Road'],
  },
  {
    nameEn: 'Burhanpur',
    nameHi: 'बुरहानपुर',
    divisionEn: 'Nimar',
    divisionHi: 'निमाड़',
    popularAreas: ['Lalbagh', 'Shikarpura', 'Daulatpura', 'Shanwara', 'Raja Jai Singh Ki Chhatri Area'],
  },
  {
    nameEn: 'Barwani',
    nameHi: 'बड़वानी',
    divisionEn: 'Nimar',
    divisionHi: 'निमाड़',
    popularAreas: ['Court Area', 'Palsud Road', 'Jhanda Chowk', 'Indore Road'],
  },
  {
    nameEn: 'Jhabua',
    nameHi: 'झाबुआ',
    divisionEn: 'Malwa-Tribal',
    divisionHi: 'मालवा अंचल',
    popularAreas: ['Rajwada Chowk', 'College Road', 'Indore-Ahmedabad Highway', 'Civil Lines'],
  },
  {
    nameEn: 'Alirajpur',
    nameHi: 'आलीराजपुर',
    divisionEn: 'Malwa-Tribal',
    divisionHi: 'मालवा अंचल',
    popularAreas: ['Cinema Road', 'Chhota Udaipur Road', 'Court Campus', 'Main Market'],
  },
];

export const ALL_MP_CITY_NAMES: string[] = MP_CITIES_DATA.map((c) => c.nameEn);

export const TOP_MP_HUBS = [
  'Indore',
  'Bhopal',
  'Jabalpur',
  'Gwalior',
  'Ujjain',
  'Sagar',
  'Rewa',
  'Satna',
  'Ratlam',
  'Chhindwara',
  'Dewas',
  'Khandwa',
  'Khargone',
  'Burhanpur',
  'Narmadapuram',
  'Katni',
  'Singrauli',
];

export function getMPCityAreas(cityName: string): string[] {
  const match = MP_CITIES_DATA.find((c) => c.nameEn.toLowerCase() === cityName.toLowerCase());
  return match?.popularAreas || ['Civil Lines', 'Main Market', 'Station Road', 'Housing Board', 'Vikas Nagar'];
}
