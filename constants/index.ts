
export const plans = [
  {
    _id: 1,
    name: "Free",
    icon: "/assets/icons/free-plan.svg",
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: "20 Free Credits",
        isIncluded: true,
      },
      {
        label: "Basic Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: false,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Pro Package",
    icon: "/assets/icons/free-plan.svg",
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: "120 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/assets/icons/free-plan.svg",
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: "2000 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: true,
      },
    ],
  },
];

export const headerLinks = [
  {
    label: 'Home',
    route: '/',

  },
  {
    label: 'My Orders',
    route: '/orders',

  },
  {
    label: 'Favorite',
    route: '/bookmark',
    
  },
  {
    label: 'Settings',
    route: '/settings',
    
  },{
    label: 'Admin',
    route: '/home',
    
  },
]


export const adminLinks = [
  {
    label: 'Home',
    route: '/home',

  },
  {
    label: 'Categories',
    route: '/categories',
    
  },
  {
    label: 'Products',
    route: '/products',
    
  },
  {
    label: 'Orders',
    route: '/orders',
    
  },{
    label: 'Delivery Methods',
    route: '/delivery',
    
  },{
    label: 'Users Profile',
    route: '/users',
    
  },{
    label: 'Communication',
    route: '/communication',
    
  },
]
export const GENDERAGEGROUP = ["Men", "Women", "Kids"];
export const GENDER_AGE_GROUP = [
  { category: "Men" },
  { category: "Women" },
  { category: "Kids", subOptions: ["Boys", "Girls", "Baby"] },
];
export const COLORS = [
  { 
    title: "Red", 
    code: "#FF0000",
    subcolors: [
      { title: "Crimson Red", code: "#DC143C" },
      { title: "Scarlet Red", code: "#FF2400" },
      { title: "Maroon Red", code: "#800000" },
      { title: "Red Wine", code: "#722F37" },
      { title: "Burgundy Red", code: "#800020" },
      { title: "Rose Red", code: "#C21E56" },
      { title: "Ruby Red", code: "#9B111E" },
      { title: "Cherry Red", code: "#D2042D" },
      { title: "Firebrick Red", code: "#B22222" },
      { title: "Candy Apple Red", code: "#FF0800" },
      { title: "Salmon Red", code: "#FA8072" },
      { title: "Coral Red", code: "#FF4040" },
      { title: "Blood Red", code: "#660000" },
      { title: "Dark Red", code: "#8B0000" },
      { title: "Pinkish Red", code: "#FF69B4" },
    ],
  },
  {
    title: "Green",
    code: "#00FF00",
    subcolors: [
      { title: "Mint Green", code: "#98FF98" },
      { title: "Forest Green", code: "#228B22" },
      { title: "Olive Green", code: "#808000" },
      { title: "Lime Green", code: "#32CD32" },
      { title: "Emerald Green", code: "#50C878" },
      { title: "Sea Green", code: "#2E8B57" },
      { title: "Dark Green", code: "#006400" },
      { title: "Jade Green", code: "#00A86B" },
      { title: "Teal Green", code: "#008080" },
      { title: "Kelly Green", code: "#4CBB17" },
      { title: "Chartreuse Green", code: "#7FFF00" },
      { title: "Pine Green", code: "#01796F" },
      { title: "Hunter Green", code: "#355E3B" },
      { title: "Spring Green", code: "#00FF7F" },
      { title: "Sage Green", code: "#9DC183" },
      { title: "Grass Green", code: "#7CFC00" },
      { title: "Apple Green", code: "#8DB600" },
      { title: "Neon Green", code: "#39FF14" },
      { title: "Avocado Green", code: "#568203" },
      { title: "Moss Green", code: "#8A9A5B" },
      { title: "Fern Green", code: "#4F7942" },
      { title: "Pea Green", code: "#8EBA42" },
      { title: "Pistachio Green", code: "#93C572" },
      { title: "Lawn Green", code: "#7CFC00" },
      { title: "Bright Green", code: "#66FF00" },
      { title: "Asparagus Green", code: "#87A96B" },
      { title: "Clover Green", code: "#009E60" },
    
    ],
  },
  {
    title: "Blue",
    code: "#0000FF",
    subcolors: [
      { title: "Navy Blue", code: "#000080" },
      { title: "Sky Blue", code: "#87CEEB" },
      { title: "Teal Blue", code: "#008080" },
      { title: "Royal Blue", code: "#4169E1" },
      { title: "Dodger Blue", code: "#1E90FF" },
      { title: "Deep Sky Blue", code: "#00BFFF" },
      { title: "Light Blue", code: "#ADD8E6" },
      { title: "Steel Blue", code: "#4682B4" },
      { title: "Powder Blue", code: "#B0E0E6" },
      { title: "Cornflower Blue", code: "#6495ED" },
      { title: "Turquoise Blue", code: "#40E0D0" },
      { title: "Aqua Blue", code: "#00FFFF" },
      { title: "Cyan Blue", code: "#00FFFF" },
      { title: "Midnight Blue", code: "#191970" },
      { title: "Slate Blue", code: "#6A5ACD" },
      { title: "Electric Blue", code: "#7DF9FF" },
      { title: "Cerulean Blue", code: "#007BA7" },
      { title: "Indigo Blue", code: "#4B0082" },
      { title: "Azure Blue", code: "#007FFF" },
      { title: "Prussian Blue", code: "#003153" },
      { title: "Baby Blue", code: "#89CFF0" },
      { title: "Periwinkle Blue", code: "#CCCCFF" },
      { title: "Carolina Blue", code: "#56A0D3" },
      { title: "Ice Blue", code: "#99FFFF" },
      { title: "Electric Indigo Blue", code: "#6F00FF" },
    ],
  },
  {
    title: "Yellow",
    code: "#FFFF00",
    subcolors: [
      { title: "Golden Yellow", code: "#FFD700" },
      { title: "Amber Yellow", code: "#FFBF00" },
      { title: "Lemon Yellow", code: "#FFF44F" },
      { title: "Mustard Yellow", code: "#FFDB58" },
      { title: "Canary Yellow", code: "#FFEF00" },
      { title: "Gold Yellow", code: "#FFD700" },
      { title: "Banana Yellow", code: "#FFE135" },
      { title: "Flaxen Yellow", code: "#EEDC82" },
      { title: "Pale Yellow", code: "#FFFFE0" },
      { title: "Light Yellow", code: "#FFFFE0" },
      { title: "Mellow Yellow", code: "#F8DE7E" },
      { title: "School Bus Yellow", code: "#FFD800" },
      { title: "Safety Yellow", code: "#EED202" },
      { title: "Butter Yellow", code: "#F6EABE" },
      { title: "Daffodil Yellow", code: "#FFFF31" },
      { title: "Royal Yellow", code: "#FADA5E" },
      { title: "Sunny Yellow", code: "#FFF700" },
      { title: "Citrine Yellow", code: "#E4D00A" },
      { title: "Neon Yellow", code: "#FFFF33" },
    ],
  },
  {
    title: "Black",
    code: "#000000",
    subcolors: [
      { title: "Charcoal Black", code: "#36454F" },
      { title: "Jet Black", code: "#343434" },
      { title: "Ebony Black", code: "#555D50" },
      { title: "Onyx Black", code: "#353839" },
      { title: "Coal Black", code: "#2C2C2C" },
      { title: "Pitch Black", code: "#0C0C0C" },
      { title: "Ink Black", code: "#222222" },
      { title: "Raven Black", code: "#151515" },
      { title: "Obsidian Black", code: "#0B0B0B" },
      { title: "Graphite Black", code: "#1C1C1C" },
      { title: "Matte Black", code: "#282828" },
      { title: "Shadow Black", code: "#1A1A1A" },
      { title: "Soot Black", code: "#101010" },
      { title: "Ash Black", code: "#3B3B3B" },
    ],
  },
  {
    title: "White",
    code: "#FFFFFF",
    subcolors: [
      { title: "Ivory White", code: "#FFFFF0" },
      { title: "Eggshell White", code: "#F0EAD6" },
      { title: "Pearl White", code: "#FDFD96" },
      { title: "Snow White", code: "#FFFAFA" },
      { title: "Alabaster White", code: "#FAEBD7" },
      { title: "Cream White", code: "#FFFDD0" },
      { title: "Bone White", code: "#E3DAC9" },
      { title: "Floral White", code: "#FFFAF0" },
      { title: "Antique White", code: "#FAEBD7" },
      { title: "Seashell White", code: "#FFF5EE" },
      { title: "Chalk White", code: "#FBFBF5" },
      { title: "Platinum White", code: "#E5E4E2" },
      { title: "Ghost White", code: "#F8F8FF" },
      { title: "Vanilla White", code: "#F3E5AB" },
      { title: "Off White", code: "#F8F8F8" },
    ],
  },
  {
    title: "Brown",
    code: "#A52A2A",
    subcolors: [
      { title: "Beige Brown", code: "#F5F5DC" },
      { title: "Chocolate Brown", code: "#D2691E" },
      { title: "Coffee Brown", code: "#6F4E37" },
      { title: "Caramel Brown", code: "#AF6E4D" },
      { title: "Taupe Brown", code: "#483C32" },
      { title: "Tan Brown", code: "#D2B48C" },
      { title: "Cinnamon Brown", code: "#D2691E" },
      { title: "Walnut Brown", code: "#5C4033" },
      { title: "Mahogany Brown", code: "#C04000" },
      { title: "Chestnut Brown", code: "#954535" },
      { title: "Sienna Brown", code: "#882D17" },
      { title: "Umber Brown", code: "#635147" },
      { title: "Rust Brown", code: "#B7410E" },
      { title: "Copper Brown", code: "#996666" },
      { title: "Espresso Brown", code: "#4B3621" },
      { title: "Amber Brown", code: "#AB8043" },
      { title: "Desert Sand Brown", code: "#EDC9AF" },
      { title: "Wood Brown", code: "#C19A6B" },
      { title: "Burnt Umber Brown", code: "#8A3324" },
    ],
  },
  {
    title: "Pink",
    code: "#FFC0CB",
    subcolors: [
      { title: "Light Pink", code: "#FFB6C1" },
      { title: "Hot Pink", code: "#FF69B4" },
      { title: "Deep Pink", code: "#FF1493" },
      { title: "Fuchsia Pink", code: "#FF00FF" },
      { title: "Baby Pink", code: "#F4C2C2" },
      { title: "Salmon Pink", code: "#FF91A4" },
      { title: "Rose Pink", code: "#F4A6C3" },
      { title: "Mauve Pink", code: "#E0B0FF" },
      { title: "Blush Pink", code: "#F9D1D1" },
      { title: "Peach Pink", code: "#FFCC99" },
      { title: "Coral Pink", code: "#FF7F50" },
      { title: "Cherry Blossom Pink", code: "#FFB7C5" },
      { title: "Pale Pink", code: "#FADADD" },
      { title: "Carnation Pink", code: "#FFA6C9" },
      { title: "Tea Rose Pink", code: "#F4C8C3" },
    ],
  },
  {
    title: "Orange",
    code: "#FFA500",
    subcolors: [
      { title: "Dark Orange", code: "#FF8C00" },
      { title: "Coral Orange", code: "#FF7F50" },
      { title: "Peach Orange", code: "#FFDAB9" },
      { title: "Tangerine Orange", code: "#FF6347" },
      { title: "Amber Orange", code: "#FFBF00" },
      { title: "Burnt Orange", code: "#CC5500" },
      { title: "Cantaloupe Orange", code: "#FFA07A" },
      { title: "Marmalade Orange", code: "#FF9F00" },
      { title: "Persimmon Orange", code: "#EC5800" },
      { title: "Apricot Orange", code: "#FBCEB1" },
      { title: "Melon Orange", code: "#FDBD8B" },
      { title: "Golden Orange", code: "#FFB84D" },
      { title: "Carrot Orange", code: "#ED9121" },
      { title: "Sunset Orange", code: "#FD5E53" },
      { title: "Papaya Orange", code: "#FFEFD5" },
      { title: "Marigold Orange", code: "#F7B500" },
      { title: "Amber Orange", code: "#FF8C00" },
    ],
  },
  {
    title: "Purple",
    code: "#800080",
    subcolors: [
      { title: "Lavender Purple", code: "#E6E6FA" },
      { title: "Violet Purple", code: "#8A2BE2" },
      { title: "Indigo Purple", code: "#4B0082" },
      { title: "Plum Purple", code: "#8E4585" },
      { title: "Orchid Purple", code: "#DA70D6" },
      { title: "Magenta Purple", code: "#FF00FF" },
      { title: "Amethyst Purple", code: "#9966CC" },
      { title: "Wisteria Purple", code: "#C9A0DC" },
      { title: "Mauve Purple", code: "#E0B0FF" },
      { title: "Eggplant Purple", code: "#614051" },
      { title: "Pale Purple", code: "#D8B7DD" },
      { title: "Purple-Gray", code: "#6C4F94" },
      { title: "Heliotrope Purple", code: "#DF73FF" },
      { title: "Grape Purple", code: "#6F2DA8" },
      { title: "Thistle Purple", code: "#D8BFD8" },
      { title: "Purple-Red", code: "#9B1B30" },
    ],
  },
  {
    title: "Gray",
    code: "#808080",
    subcolors: [
      { title: "Light Gray", code: "#D3D3D3" },
      { title: "Dark Gray", code: "#A9A9A9" },
      { title: "Slate Gray", code: "#708090" },
      { title: "Charcoal Gray", code: "#36454F" },
      { title: "Ash Gray", code: "#B2BEB5" },
      { title: "Gunmetal Gray", code: "#2A3439" },
      { title: "Steel Gray", code: "#4682B4" },
      { title: "Silver Gray", code: "#C0C0C0" },
      { title: "Platinum Gray", code: "#E5E4E2" },
      { title: "Smoke Gray", code: "#5F5F5F" },
      { title: "Dove Gray", code: "#6D6D6D" },
      { title: "Iron Gray", code: "#484848" },
      { title: "Pebble Gray", code: "#DCDCDC" },
      { title: "Shadow Gray", code: "#8B8B8B" },
      { title: "Cement Gray", code: "#B4B4B4" },
      { title: "Graphite Gray", code: "#3A3A3A" },
    ],
  },
  { 
    title: "Olive", 
    code: "#808000",
    subcolors: [
      { title: "Khaki Olive", code: "#F0E68C" },
    ],
  }
  
];

  
 
  
export const OCCASIONS = ["Casual Wear", "Formal Wear", "Party Wear","Sports Wear","Work Wear"];


export const MATERIALS = [
  "Cotton",
  "Linen",
  "Wool",
  "Silk",
  "Denim",
  "Polyester",
  "Blends"
];
export const STOCK = [
  "In Stock",
  "Out of Stock"
];
export const CATEGORIES = {
  Clothes: {
   
    Women: [
      "Abayas & Modest Wear",
      "Blouses & Tops",
      "Dresses",
      "Skirts",
      "Skirtset",
      "Suits",
      "Trousers",
      "Activewear",
      "Jackets & Coats",
      "Outerwear",
      "Seasonal Wear",
      "Sportswear",
      "Swimwear",
      "T-shirts",
      "Sleepwear",
      "Underwear",
    ],
    Men: [
      "Shirts",
      "Suits",
      "Trousers",
      "Activewear",
      "Jackets & Coats",
      "Outerwear",
      "Seasonal Wear",
      "Sportswear",
      "Swimwear",
      "T-shirts",
      "Sleepwear",
      "Underwear",
    ],
    Kids: {
      Girls: [
        "Dresses",
        "Blouses & Tops",
        "Skirts",
        "Activewear",
        "Jackets & Coats",
        "T-shirts",
        "Sleepwear",
        "Swimwear",
      ],
      Boys: [
        "Shirts",
        "T-shirts",
        "Trousers",
        "Activewear",
        "Jackets & Coats",
        "Sleepwear",
        "Swimwear",
      ],
      Babies: [
        "Sleepwear",
        "Underwear",
        "Seasonal Wear",
        "Swimwear",
      ],
    },
  },
  Accessories: {
   
    Women: [
      "Jewelry",
      "Handbags",
      "Shoes",
      "Bags",
      "Belts",
      "Hats",
      "Socks",
      "Sunglasses",
      "Watches",
    
    ],
    Men: [
      "Belts",
      "Watches",
      "Shoes",
      "Bags",
      "Belts",
      "Hats",
      "Jewelry",
      "Socks",
      "Sunglasses",
      "Watches",
      
    ],
    Kids: {
      Girls: [
        "Hats",
        "Jewelry",
        "Bags",
        "Shoes",
      ],
      Boys: [
        "Hats",
        "Bags",
        "Shoes",
      ],
      Babies: [
        "Hats",
        "Socks",
        "Bags (diaper bags)",
        "Shoes",
      ],
    },
  },
};



export const trendingStatusOptions = [
  "Recommended",
  "New Arrivals",
  "Bestsellers",
  "Trending Now",
  "Lowest Price", 
  "Highest Price",
];
export const shippingClassOptions = [
  "Express",
  "Standard",
  "International",
  "Local",
];
export const DeliveryDefaultValues = {
  method: "",
  location: "",
  areas: [],
  price: "",
  note: "",
}
export const ProductDefaultValues = {
  productName: "",
  description: "",
  category: "",
  subCategory: "",
  occasion: "",
  genderAgeGroup: "",
  features: [] as Feature[],
  color: [],
  buyprice: 0,
  price: 0,
  discount: "",
  featuredInDeals: "Sale",
  customizationOptions: "Made-to-Measure",
  imageUrls: [],
  fabricCareInstructions: "",
  sku: "",
 
};
const deliveryMethods = [
  
  {
    method: "Shop Pickup - Tom Mboya Street",
    location: "Beba beba Trade Center ground Floor, Shop A9",
    price: "Free",
  },
  {
    method: "Door Step Delivery (400)",
    areas: ["Kahawa West", "Kahawa Wendani"],
    price: "Ksh 400.00",
  },
  {
    method: "Door Step Delivery (450)",
    areas: ["Ruaka"],
    price: "Ksh 450.00",
  },
  {
    method: "Door Step Delivery (590)",
    areas: [
      "Rongai",
      "Nyayo Estate",
      "Syokimau",
      "Karen",
      "Ruiru",
      "Kikuyu",
      "Bomas",
      "Muthiga",
      "Utawala",
      "Njiru",
      "Uthiru",
      "Banana",
    ],
    price: "Ksh 590.00",
  },
  {
    method: "Door Step Delivery - Nairobi and environs",
    price: "Ksh 300.00",
  },
  {
    method: "2NK Sacco (200)",
    price: "Ksh 200.00",
  },
  {
    method: "4NTE Sacco (200)",
    price: "Ksh 200.00",
  },
  {
    method: "Chania Genesis (250) - Coast, excluding Nyali",
    price: "Ksh 250.00",
  },
  {
    method: "Classic Shuttle",
    price: "Ksh 300.00",
  },
  {
    method: "County Link (150)",
    price: "Ksh 150.00",
  },
  {
    method: "Dreamline (400) - Coast",
    price: "Ksh 400.00",
  },
  {
    method: "Easy Coach (300) - Siaya, Bondo, Kisumu, Kakamega, Migori, Kericho",
    price: "Ksh 300.00",
  },
  {
    method: "Ena Coach (300)",
    price: "Ksh 300.00",
  },
  {
    method: "G-Coach",
    price: "Ksh 600.00",
  },
  {
    method: "Guardian (250)",
    price: "Ksh 250.00",
  },
  {
    method: "JPEE Travellers (300)",
    price: "Ksh 300.00",
  },
  {
    method: "Kaka Travellers (100)",
    price: "Ksh 100.00",
  },
  {
    method: "KamT Sacco (200)",
    price: "Ksh 200.00",
  },
  {
    method: "Kijabe Line (200)",
    price: "Ksh 200.00",
  },
  {
    method: "Kinatwa (200)",
    price: "Ksh 200.00",
  },
  {
    method: "Kukena (200)",
    note: "May vary based on weight",
    price: "Ksh 200.00",
  },
  {
    method: "Liban",
    price: "Ksh 600.00",
  },
  {
    method: "Libera",
    price: "Ksh 100.00",
  },
  {
    method: "Likana (200)",
    price: "Ksh 200.00",
  },
  {
    method: "Lopha",
    price: "Ksh 150.00",
  },
  {
    method: "Meiso",
    price: "Ksh 300.00",
  },
  {
    method: "Metro Trans (100)",
    price: "Ksh 100.00",
  },
  {
    method: "Mololine",
    price: "Ksh 250.00",
  },
  {
    method: "MTN (200)",
    price: "Ksh 200.00",
  },
  {
    method: "Naekana (300)",
    price: "Ksh 300.00",
  },
  {
    method: "Nairobi CBD",
    price: "Ksh 100.00",
  },
  {
    method: "Narokline (200)",
    price: "Ksh 200.00",
  },
  {
    method: "Neno (200)",
    price: "Ksh 200.00",
  },
  {
    method: "NNUS (200)",
    price: "Ksh 200.00",
  },
  {
    method: "Northrift (250)",
    price: "Ksh 250.00",
  },
  {
    method: "Nuclear (300)",
    price: "Ksh 300.00",
  },
  {
    method: "Orokise",
    price: "Ksh 150.00",
  },
  {
    method: "Pickup Mtaani (120)",
    note: "Confirm on their website if they deliver to a convenient place near you",
    price: "Ksh 120.00",
  },
  {
    method: "Raha (200)",
    price: "Ksh 200.00",
  },
  {
    method: "Rembo Shuttle (100)",
    price: "Ksh 100.00",
  },
  {
    method: "Runa Sacco",
    price: "Ksh 100.00",
  },
  {
    method: "Satima (200)",
    price: "Ksh 200.00",
  },
  {
    method: "South Rift (250)",
    price: "Ksh 250.00",
  },
  {
    method: "Super Metro (150)",
    price: "Ksh 150.00",
  },
  {
    method: "Teamswat",
    price: "Ksh 300.00",
  },
  {
    method: "Z. 😢 Delivery Method not provided",
    note: "Contact 0705084684, or select this and we'll contact you",
    price: "Free",
  },
];

export const AdDefaultValues = {
  title: '',
  description: '',
  imageUrls:[],
  negotiable: false,
  enableMap: false,
  youtube: '',
  phone: '',
  subcategory: '',
  latitude: '',
  longitude: '',
  address: '',
  views: '0',
  categoryId: '',
  price: 0,
  make:'',
  vehiclemodel:'',
  vehicleyear:'',
  vehiclecolor:'',//Black,Blue,Gray,Silver,White,Beige,Brown,Burgundy,Gold,Green,Ivory,Matt Black,Off white,Orange, Pearl, Pink,Purple ,Red,Teal,Yellow,Others
  vehicleinteriorColor:'',
  vehiclecondition:'',//Brand New, Foreign Used, Local Used
  vehiclesecordCondition:'',//After crash,Engine Issue,First Owner,First registration, Gear issue,Need body repair,Need body repainting, Need repair,Original parts,Unpainted,Wiring problem, No fault
  vehicleTransmissions:'',
  vehiclemileage:'',
  vehiclekeyfeatures:[],
  vehiclechassis:'',//VIN Chassis Number
  vehicleregistered:'',//yes,no
  vehicleexchangeposible:'',//yes,no
  vehicleFuelTypes:'',//petrol,disel,Electricity
  vehicleBodyTypes:'',
  vehicleSeats:'',
  vehicleEngineSizesCC:'',
Types:'',
bedrooms:'',
bathrooms:'',
furnishing:'',
amenities:[],
toilets:'',
parking:'',
status:'',
area:'',
landuse:'',
propertysecurity:'',
floors:'',
estatename:'',
houseclass:'',
listedby:'',
fee:'',
  geometry: {
    type: 'Point',
    coordinates: []
  }
}


export const propertyType = [
  { type: "Apartment", },
  { type: "Bedsitter", },
  { type: "Bungalow", },
  { type: "House", },
  { type: "Maisonette", },
  { type: "Block of Flats", },
  { type: "Chalet", },
  { type: "Condo", },
  { type: "Duplex", },
  { type: "Farm House", },
  { type: "Mansion", },
  { type: "Mini Flat", },
  { type: "Penthouse", },
  { type: "Room & Parlour", },
  { type: "Shared Apartment", },
  { type: "Studio Apartment", },
  { type: "Townhouse / Terrace", },
  { type: "Villa", }
];

export const constructionStatus = [
  "Commissioning",
  "Completed",
  "Facade Finished",
  "Foundation",
  "Frame Finished"
];

export const propertyCondition = [
  "Fairly Used",
  "Newly-Built",
  "Off-Plan",
  "Old",
  "Renovated",
  "Uncompleted Building",
  "Under construction"
];

export const furnishing = [
  "Furnished",
  "Semi-Furnished",
  "Unfurnished"
 
];
export const propertysecurity = [
  "Yes",
  "No"
];
export const propertyTerritory = [
  "Closed",
  "Closed Only for Cars",
  "Open"
];
export const businessType = [
  "Business",
  "Comfort",
  "Economy",
  "Premium"
];
export const landTypes = [
  "Commercial Land",
  "Farmland",
  "Industrial Land",
  "Mixed-Use Land",
  "Quarry",
  "Residential Land"
];
export const landUse = [
  "Commercial",
  "Mixed",
  "Residential"
];
export const landfacility = [
  "Car Parking",
  "Domestic Sewage",
  "Electric Supply",
  "Gas Supply",
  "Rain Water Drainage",
  "Water Supply"
];
export const spaceCommersial = [
  "Apartment",
  "Open Space",
  "Church Space",
  "Complex",
  "Filling Station",
  "Garage",
  "Hall",
  "Hotel",
  "Maisonette",
  "Mall",
  "Pharmacy",
  "Plaza",
  "Restaurant",
  "Salon",
  "School",
  "Showroom",
  "Supermarket",
  "Terraced Duplex",
  "Villa",
  "Workshop"
];

export const propertyFeature = [
  "24-hour Electricity",
  "Hot Water",
  "Kitchen Cabinets",
  "Wardrobe",
  "Wi-Fi",
  "Air Conditioning",
  "Apartment",
  "Balcony",
  "Chandelier",
  "Dining Area",
  "Dishwasher",
  "Kitchen Shelf",
  "Microwave",
  "Pop Ceiling",
  "Pre-Paid Meter",
  "Refrigerator",
  "Tiled Floor",
  "TV"
];
export const floors = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "Others"
];
export const bedrooms = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "Others"
];
export const bathrooms = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "Others"
];
export const yesno=[
  "Yes","No"
];
export const amenities = [
  "BBQ Zone",
  "Elevator",
  "Gym",
  "Office Space",
  "Swimming Pool",
  "Other"
];
export const units=[
  "KM","Miles"
];
export const vehicleRegistered=[
  "Yes","No"
];
export const vehicleConditions = [
  "Brand New",
  "Foreign Used",
  "Local Used"
];

export const drivetrains = [
  "Front-Wheel (FWD)",
  "Rear-Wheel (RWD)",
  "All-Wheel (AWD)",
  "Four-Wheel (4WD)"
];

export const vehicleSubcategories = {
  "Cars": [
      "Sedans",
      "Coupes",
      "Convertibles",
      "Hatchbacks",
      "Station Wagons",
      "SUVs",
      "Crossovers",
      "Minivans",
      "Pickup Trucks",
      "Vans"
  ],
  "Motorcycles": [
      "Standard",
      "Cruiser",
      "Sportbike",
      "Touring",
      "Dual-Sport",
      "Off-Road",
      "Scooters"
  ],
  "Trucks": [
      "Light Trucks",
      "Medium Trucks",
      "Heavy Trucks",
      "Pickup Trucks",
      "Dump Trucks",
      "Box Trucks",
      "Tow Trucks"
  ],
  "Commercial Vehicles": [
      "Delivery Vans",
      "Refrigerated Trucks",
      "Flatitudebed Trucks",
      "Cargo Vans",
      "Buses",
      "Taxis",
      "Limousines"
  ],
  "Specialty Vehicles": [
      "RVs",
      "Motorhomes",
      "Trailers",
      "ATVs",
      "UTVs",
      "Golf Carts",
      "Snowmobiles"
  ],
  "Watercraft": [
      "Motorboats",
      "Sailboats",
      "Yachts",
      "Jet Skis",
      "Kayaks",
      "Canoes"
  ],
  "Aircraft": [
      "Airplanes",
      "Helicopters",
      "Gliders",
      "Ultralights",
      "Hot Air Balloons"
  ]
};


export const vehicleSeats = [
  "2 Seats",
  "4 Seats",
  "5 Seats",
  "6 Seats",
  "7 Seats",
  "8 Seats",
  "9 Seats",
  "10 Seats",
  "11 Seats",
  "12 Seats",
  "13 Seats",
  "14 Seats",
  "15 Seats",
  "16 Seats",
  "17 Seats",
  "18 Seats",
  "19 Seats",
  "20 Seats",
  "Other"
];
export const vehicleBodyTypes = [
  { type: "SUV" },
  { type: "Saloon"},
  { type: "Hatchback" },
  { type: "Sedan" },
  { type: "Minivan" },
  { type: "Station Wagon" },
  { type: "Pickup" },
  { type: "Coupe" },
  { type: "Convertible" },
  { type: "Crossover" },
  { type: "Van" }
];
export const vehicleBodyTypes_ = [
  "Sedan",
  "SUV",
  "Truck",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Van",
  "Wagon",
  "Minivan",
  "Pickup",
  "Crossover",
  "Compact",
  "Sports Car",
  "Limousine",
  "Off-road",
  "Bus",
  "Motorcycle",
  "RV (Recreational Vehicle)",
  "Trailer",
  "Other"
];

export const vehicleFuelTypes = [
  "Petrol",
  "Diesel",
  "Hybrid",
  "Electric",
  "Gasoline",
  "Flex Fuel (E85)",
  "Natural Gas",
  "Hydrogen",
  "Biodiesel",
  "Propane",
  "Other"
];


export const vehicleTransmissions = [
  "Automatic",
  "Manual",
  "AMT",
  "CVT",
  "Other"
];
export const vehicleFeatures = [
  "Air Conditioning",
  "Power Windows",
  "Power Door Locks",
  "Power Steering",
  "Anti-Lock Braking System (ABS)",
  "Airbags",
  "Traction Control",
  "Stability Control",
  "Cruise Control",
  "Leather Seats",
  "Heated Seats",
  "Navigation System",
  "Bluetooth Connectivity",
  "Backup Camera",
  "Sunroof/Moonroof",
  "Keyless Entry",
  "Remote Start",
  "Parking Sensors",
  "Fog Lights",
  "Towing Package",
  "Alloy Wheels",
  "Roof Rails",
  "Third Row Seating",
  "DVD Player",
  "Satellite Radio",
  "USB Ports",
  "Wireless Charging",
  "Smartphone Integration",
  "Lane Departure Warning",
  "Blind Spot Monitoring",
  "Adaptive Cruise Control",
  "Automatic Emergency Braking",
  "Other"
];

export const vehicleSecondConditions = [
  "After crash",
  "Engine issue",
  "First owner",
  "First registration",
  "Gear issue",
  "Need body repair",
  "Need body repainting",
  "Need repair",
  "Original parts",
  "Unpainted",
  "Wiring problem",
  "No fault"
];



export const vehicleModels = [
  { make: "Toyota", models: [
    "4Runner", "86", "Avalon", "C-HR", "Camry", "Corolla", "Corolla Cross", 
    "GR Supra", "Highlander", "Land Cruiser", "Mirai", "Prius", "Rav4", 
    "Sequoia", "Sienna", "Tacoma", "Tundra", "Venza", "Wish", "Yaris"
  ] },
  {
    make: "Nissan",
    models: [
      "370Z",
      "Sylphy",
      "Altima",
      "Armada",
      "Note",
      "Frontier",
      "GT-R",
      "Kicks",
      "Leaf",
      "Maxima",
      "Murano",
      "NV",
      "NV200",
      "Pathfinder",
      "Rogue",
      "Rogue Sport",
      "Sentra",
      "Titan",
      "Versa",
      "Juke",        // Added model
      "Xterra",      // Added model
      "Quest",       // Added model
      "Juke NISMO",  // Added model
      "GT-R NISMO",  // Added model
      "X-Trail"      // Added model
    ]
  }
,  
  { make: "Mazda", models: ["CX-3", "CX-30", "CX-5", "CX-9", "MAZDA3", "MAZDA6", "MX-5 Miata"] },
  { make: "Subaru", models: ["Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX", "XV Crosstrek"] },
  { make: "Mercedes-Benz", models: ["A-Class", "C-Class", "CLA-Class", "CLS-Class", "E-Class", "G-Class", "GLA-Class", "GLB-Class", "GLC-Class", "GLE-Class", "GLS-Class", "S-Class", "SL-Class", "SLC-Class"] },
  { make: "BMW", models: ["2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i8"] },
  { make: "Suzuki", models: ["Swift", "Vitara", "Jimny", "Baleno", "Celerio"] },
  { make: "Volkswagen", models: ["Arteon", "Atlas", "Atlas Cross Sport", "Golf", "Jetta", "Passat", "Tiguan"] },
 
  { make: "Lexus", models: ["ES", "GX", "IS", "LC", "LS", "LX", "NX", "RC", "RX", "UX"] },
  { make: "Honda", models: ["Accord", "Civic", "CR-V", "Fit", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Ridgeline"] },
  { make: "Hyundai", models: ["Accent", "Elantra", "Ioniq", "Kona", "Nexo", "Palisade", "Santa Fe", "Sonata", "Tucson", "Veloster"] },
  { make: "Mitsubishi", models: ["3000GT", "ASX", "Attrage", "Carisma", "Colt", "Eclipse", "Eclipse Cross", "Endeavor", "Galant", "Grandis", "i-MiEV", "L200", "Lancer", "Mirage", "Montero", "Outlander", "Pajero", "Space Star", "Fuso Canter", "Fuso Fighter", "Fuso Super Great"] },
  { make: "Ford", models: ["Bronco", "EcoSport", "Edge", "Escape", "Expedition", "Explorer", "F-150", "Fiesta", "Flex", "Focus", "Fusion", "GT", "Mustang", "Ranger", "Transit"] },
  { make: "Land Rover", models: ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"] },
  { make: "Peugeot", models: ["208", "308", "3008", "5008", "508"] },
  { make: "Isuzu", models: ["D-Max", "MU-X", "Trooper", "Rodeo", "Ascender", "VehiCROSS", "Amigo", "Axiom", "Gemini", "P'up", "Faster", "Hombre"] },
  { make: "Volvo", models: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"] },
  { make: "Jeep", models: ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wrangler"] },
  { make: "Kia", models: ["Forte", "K5", "Niro", "Optima", "Rio", "Sedona", "Seltos", "Sorento", "Soul", "Sportage", "Stinger", "Telluride"] },
  { make: "Audi", models: ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "R8", "TT"] },
  { make: "Porsche", models: ["911", "Boxster", "Cayenne", "Cayman", "Macan", "Panamera", "Taycan"] },
  { make: "Jaguar", models: ["E-PACE", "F-PACE", "F-TYPE", "XE", "XF", "XJ"] },
  { make: "Mini", models: ["Clubman", "Convertible", "Countryman", "Hardtop 2 Door", "Hardtop 4 Door"] },
  { make: "Chevrolet", models: ["Blazer", "Camaro", "Colorado", "Corvette", "Equinox", "Impala", "Malibu", "Silverado", "Suburban", "Tahoe", "Trailblazer", "Traverse", "Trax", "Volt"] },
  { make: "Daihatsu", models: ["Charade", "Copen", "Mira", "Terios", "Sirion"] },
  { make: "Acura", models: ["ILX", "MDX", "NSX", "RDX", "RLX", "TLX"] },
  { make: "Alfa Romeo", models: ["4C", "Giulia", "Stelvio"] },
  { make: "Bentley", models: ["Bentayga", "Continental GT", "Flying Spur"] },
  { make: "Cadillac", models: ["CT4", "CT5", "CT6", "Escalade", "XT4", "XT5", "XT6"] },
  { make: "Chery", models: ["Arrizo", "Tiggo", "QQ", "E5"] },
  { make: "Chrysler", models: ["300", "Pacifica", "Voyager"] },
  { make: "Citroen", models: ["C3", "C4", "C5 Aircross", "Berlingo", "Spacetourer"] },
  { make: "Datsun", models: ["Go", "Go+", "Redi-Go", "On-Do"] },
  { make: "Dodge", models: ["Challenger", "Charger", "Durango", "Grand Caravan", "Journey"] },
  { make: "Dongfeng", models: ["AX7", "Rich", "S30", "H30"] },
  { make: "Ferrari", models: ["812 Superfast", "F8 Tributo", "Portofino", "Roma", "SF90 Stradale"] },
  { make: "Fiat", models: ["500", "500L", "500X", "124 Spider"] },
  { make: "Genesis", models: ["G70", "G80", "G90"] },
  { make: "GMC", models: ["Acadia", "Canyon", "Sierra", "Terrain", "Yukon"] },
  { make: "Infiniti", models: ["Q50", "Q60", "Q70", "QX50", "QX60", "QX80"] },
  { make: "Koenigsegg", models: ["Gemera", "Jesko", "Regera"] },
  { make: "Lamborghini", models: ["Aventador", "Huracan", "Urus"] },
  { make: "Lincoln", models: ["Aviator", "Continental", "Corsair", "MKZ", "Nautilus", "Navigator"] },
  { make: "Lotus", models: ["Evora", "Exige"] },
  { make: "Mahindra", models: ["XUV500", "Scorpio", "Thar", "Bolero", "KUV100"] },
  { make: "Maruti Suzuki", models: ["Alto", "Swift", "Baleno", "Vitara Brezza"] },
  { make: "Maserati", models: ["Ghibli", "Levante", "Quattroporte"] },
  { make: "McLaren", models: ["570S", "600LT", "720S"] },
  { make: "Morris", models: ["Minor", "Oxford", "Eight"] },
  { make: "Opel", models: ["Astra", "Corsa", "Insignia", "Mokka", "Zafira"] },
  { make: "Proton", models: ["Saga", "Persona", "X70", "Iriz"] },
  { make: "Ram", models: ["1500", "2500", "3500", "Chassis Cab", "ProMaster", "ProMaster City"] },
  { make: "Rolls-Royce", models: ["Cullinan", "Dawn", "Ghost", "Phantom", "Wraith"] },
  { make: "Rover", models: ["200", "400", "600", "75", "800"] },
  { make: "Scion", models: ["FR-S", "iA", "iM", "tC", "xB", "xD"] },
  { make: "Seat", models: ["Ibiza", "Leon", "Ateca", "Arona", "Tarraco"] },
  { make: "Skoda", models: ["Fabia", "Octavia", "Superb", "Kodiaq", "Kamiq"] },
  { make: "Smart", models: ["Fortwo", "Forfour"] },
  { make: "SsangYong", models: ["Tivoli", "Korando", "Rexton", "Musso"] },
  { make: "Tata", models: ["Nexon", "Harrier", "Safari", "Tiago", "Tigor"] },
  { make: "Tesla", models: ["Model 3", "Model S", "Model X", "Model Y", "Roadster"] },
];
export const commonVehicleMakesInKenya = [
  {
      make: 'Toyota',
      iconPath: '/assets/icons/toyota-icon.jpg'
  },
  {
      make: 'Nissan',
      iconPath: '/assets/icons/nissan-icon.jpg'
  },
  {
      make: 'Honda',
      iconPath: '/assets/icons/honda-icon.jpg'
  },
  {
      make: 'Subaru',
      iconPath: '/assets/icons/subaru-icon.jpg'
  },
  {
      make: 'Isuzu',
      iconPath: '/assets/icons/isuzu-icon.jpg'
  },
  {
      make: 'Volkswagen',
      iconPath: '/assets/icons/volkswagen-icon.jpg'
  },
  {
      make: 'Mercedes-Benz',
      iconPath: '/assets/icons/mercedes-benz-icon.jpg'
  },
  {
      make: 'BMW',
      iconPath: '/assets/icons/bmw-icon.jpg'
  }
  // Add more as needed
];

export const BusesMake = [
  { make: "Toyota", iconPath: '/assets/icons/toyota-icon.jpg' },
  { make: "Nissan",  iconPath: '/assets/icons/nissan-icon.jpg' },
  { make: "Isuzu",iconPath: '/assets/icons/isuzu-icon.jpg' },
  { make: "Mazda", iconPath: '/assets/icons/mazda-icon.png' },
  { make: "Mitsubishi" ,iconPath:'/assets/icons/mitsubishi-icon.jpg'},
  { make: "Ashok Leyland" ,iconPath:'/assets/icons/ashok-leyland-icon.png'},
  { make: "Daihatsu",iconPath: '/assets/icons/daihatsu-icon.png' },
  { make: "Ford", iconPath: '/assets/icons/ford-icon.jpg' },
  { make: "Foton" },
  { make: "GMC" },
  { make: "Hino" },
  { make: "Honda" },
  { make: "Hyundai" },
  { make: "King Long" },
  { make: "Mercedes-Benz" },
  { make: "Peugeot" },
  { make: "Scania" },
  { make: "Suzuki" },
  { make: "Tata" },
  { make: "Volkswagen" },
  { make: "Yutong" },
  { make: "Other Make" }
];

export const equipmentTypes = [
  { type: "Tractors", iconPath: "/assets/icons/tractor.png" },
  { type: "Crushers", iconPath: "/assets/icons/crusher.jpg" },
  { type: "Excavators", iconPath: "/assets/icons/excuvator.jpg" },
  { type: "Forklifts", iconPath: "/assets/icons/forklifts.png" },
  { type: "Wheel Loaders", iconPath: "/assets/icons/wheel-loaders.png" },
  { type: "Backhoe Loaders", iconPath: "/assets/icons/backhoe-loaders.jpg" },
  { type: "Boom Lifts", iconPath: "/assets/icons/boom-lifts.jpg" },
  { type: "Bulldozers", iconPath: "/assets/icons/bulldozers.jpg" },

  { type: "Car Lifts", iconPath: "path/to/car-lift-icon" },
  { type: "Compactors", iconPath: "path/to/compactor-icon" },
  { type: "Compressors", iconPath: "path/to/compressor-icon" },
  { type: "Concrete Mixers", iconPath: "path/to/concrete-mixer-icon" },
  { type: "Concrete Pumps", iconPath: "path/to/concrete-pump-icon" },
  { type: "Crane Forks", iconPath: "path/to/crane-fork-icon" },
  { type: "Cranes", iconPath: "path/to/crane-icon" },
  { type: "Drilling Rigs", iconPath: "path/to/drilling-rig-icon" },
  { type: "Dumpers", iconPath: "path/to/dumper-icon" },
  { type: "Farm Machines", iconPath: "path/to/farm-machine-icon" },
  { type: "Graders", iconPath: "path/to/grader-icon" },
  { type: "Loaders", iconPath: "path/to/loader-icon" },
  { type: "Mobile Crusher", iconPath: "path/to/mobile-crusher-icon" },
  { type: "Pallet Stackers", iconPath: "path/to/pallet-stacker-icon" },
  { type: "Pipe Layers", iconPath: "path/to/pipe-layer-icon" },
  { type: "Pneumatic Rollers", iconPath: "path/to/pneumatic-roller-icon" },
  { type: "Road Roller", iconPath: "path/to/road-roller-icon" },
  { type: "Vibratory Rollers", iconPath: "path/to/vibratory-roller-icon" },
  { type: "Other", iconPath: "path/to/other-icon" }
];

export const equipmentMakes = [
  { make: "Case" },
  { make: "Caterpillar" },
  { make: "JCB" },
  { make: "Massey Ferguson" },
  { make: "New Holland" },
  { make: "ABG" },
  { make: "Baumann" },
  { make: "BBA" },
  { make: "Bitelli" },
  { make: "Bobcat" },
  { make: "Bomag" },
  { make: "Boxer" },
  { make: "BT" },
  { make: "Claas" },
  { make: "Cummins" },
  { make: "Demag" },
  { make: "Deutz" },
  { make: "Doosan" },
  { make: "Dynapac" },
  { make: "Faun" },
  { make: "Fiat" },
  { make: "Ford" },
  { make: "Hamm" },
  { make: "Hangcha" },
  { make: "Hatz" },
  { make: "Hitachi" },
  { make: "Hyster" },
  { make: "Hyundai" },
  { make: "Iseki" },
  { make: "JLG" },
  { make: "John Deere" },
  { make: "Kato" },
  { make: "Kobelco" },
  { make: "Komatsu" },
  { make: "Kubota" },
  { make: "LGMG" },
  { make: "Mecalac" },
  { make: "Mitsubishi" },
  { make: "Nissan" },
  { make: "O&K" },
  { make: "Olympian" },
  { make: "Sany" },
  { make: "SDMO" },
  { make: "Terex" },
  { make: "Toyota" },
  { make: "Unic" },
  { make: "Volvo" },
  { make: "XCMG" },
  { make: "Zoomlion" },
  { make: "Other" }
];

export const motorcycleMakes = [
  { make: "Honda", iconPath: "/assets/icons/honda-logo.png"},
  { make: "Piaggio", iconPath: "/assets/icons/piaggio-logo.png" },
  { make: "Bajaj", iconPath: "/assets/icons/bajaj-logo.png" },
  { make: "TVS" , iconPath: "/assets/icons/TVS-logo.png"},
  { make: "Captain" , iconPath: "/assets/icons/captain-logo.png"},
  { make: "Aprilia", iconPath: "/assets/icons/aprilia-logo.png" },
  { make: "Benelli" , iconPath: "/assets/icons/benelli-logo.png"},
  { make: "Beth" , iconPath: "/assets/icons/beth-logo.png"},
  { make: "BMW" },
  { make: "Bomba" },
  { make: "BSA" },
  { make: "CFMoto" },
  { make: "CityCoco" },
  { make: "Cushman" },
  { make: "Custom Built Motorcycles" },
  { make: "Dayun" },
  { make: "Ducati" },
  { make: "Evalast" },
  { make: "Flyjet" },
  { make: "Focin" },
  { make: "Haojin" },
  { make: "Haojue" },
  { make: "Harley-Davidson" },
  { make: "Hero" },
  { make: "Hunter" },
  { make: "Hyosung" },
  { make: "Ilisan" },
  { make: "Jincheng" },
  { make: "Kawasaki" },
  { make: "Keeway" },
  { make: "Kibo" },
  { make: "Kingbird" },
  { make: "KTM" },
  { make: "Levhart" },
  { make: "Lifan" },
  { make: "Premier" },
  { make: "Raleigh" },
  { make: "Ranger" },
  { make: "Royal" },
  { make: "SanLG" },
  { make: "Sanya" },
  { make: "Senke" },
  { make: "Shineray" },
  { make: "Skygo" },
  { make: "Sonlink" },
  { make: "Strong 1" },
  { make: "Suzuki" },
  { make: "Tekken" },
  { make: "Toprich" },
  { make: "Tricycle" },
  { make: "Tris" },
  { make: "Ural" },
  { make: "Yamaha" },
  { make: "Zongshen" },
  { make: "Zontes" },
  { make: "Other" }
];

export const truckTypes = [
  { type: "Mini Truck" },
  { type: "Heavy-Duty Trucks" },
  { type: "Rigid Trucks" },
  { type: "Food Trucks" },
  { type: "Dump Trucks" },
  { type: "Crane Trucks" },
  { type: "Garbage Compactors" },
  { type: "Garbage Trucks" },
  { type: "Low-Bed Trucks" },
  { type: "Manlift Trucks" },
  { type: "Refrigerator Truck" },
  { type: "Self-Loader Trucks" },
  { type: "Semi-Trailers" },
  { type: "Tank Trucks" },
  { type: "Tow Trucks" },
  { type: "Tractor Units" },
  { type: "Trailers" },
  { type: "Other" }
];
export const truckMakes = [
  "Isuzu",
  "Mitsubishi",
  "Toyota",
  "Mercedes-Benz",
  "Tata",
  "Ashok Leyland",
  "C&C",
  "Changan",
  "CNHTC Howo",
  "DAF",
  "Daihatsu",
  "Dongfeng",
  "Eicher",
  "ERF",
  "FAW",
  "Fiat",
  "Ford",
  "Foton",
  "Hino",
  "Honda",
  "Hyundai",
  "International",
  "Iveco",
  "Kia",
  "MAN",
  "Mazda",
  "Nissan",
  "Peugeot",
  "Renault",
  "Scania",
  "Shacman",
  "Sinotruk",
  "Suzuki",
  "T-King",
  "Tatra",
  "UD Trucks",
  "Volkswagen",
  "Volvo",
  "XCMG",
  "Other"
];
export const automotivePartsCategories = [
  {
    name: "Audio Parts",
    type: "Electronics",
    iconPath: "/assets/icons/audio.jpg"
  },
  {
    name: "Brakes, Suspension & Steering",
    type: "Mechanical",
    iconPath: "/assets/icons/brakes-suspension.png"
  },
  {
    name: "Car Care",
    type: "Maintenance",
    iconPath: "/assets/icons/car_care.png"
  },
  {
    name: "Engine & Drivetrain",
    type: "Mechanical",
    iconPath: "/assets/icons/engine_drivetrain.jpg"
  },
  {
    name: "Exterior Accessories",
    type: "Accessories",
    iconPath: "/assets/icons/exterior_accessories.png"
  },
  {
    name: "Headlights & Lighting",
    type: "Electronics",
    iconPath: "/assets/icons/headlights_lighting.jpg"
  },
  {
    name: "Interior Accessories",
    type: "Accessories",
    iconPath: "/assets/icons/interior_accessories.png"
  },
  {
    name: "Motorcycle Parts",
    type: "Vehicle Parts",
    iconPath: "/assets/icons/motorcycle_parts.jpg"
  },
  {
    name: "Oils & Fluids",
    type: "Maintenance",
    iconPath: "/icons/oils_fluids.jpg"
  },
  {
    name: "Safety & Security",
    type: "Safety",
    iconPath: "/icons/safety_security.png"
  },
  {
    name: "Watercraft & Boat Parts",
    type: "Vehicle Parts",
    iconPath: "/icons/watercraft_boat_parts.png"
  },
  {
    name: "Wheels & Parts",
    type: "Mechanical",
    iconPath: "/icons/wheels_parts.png"
  },
  {
    name: "Other",
    type: "Miscellaneous",
    iconPath: "/icons/other.png"
  }
];

export const automotivePartsMakes = [
  { make: "Toyota" },
  { make: "Nissan" },
  { make: "Mazda" },
  { make: "Subaru" },
  { make: "Honda" },
  { make: "Acura" },
  { make: "Alfa Romeo" },
  { make: "Ashok Leyland" },
  { make: "Aston Martin" },
  { make: "Audi" },
  { make: "Bajaj" },
  { make: "BAW" },
  { make: "Bentley" },
  { make: "BMW" },
  { make: "Brilliance" },
  { make: "Buick" },
  { make: "Cadillac" },
  { make: "Changan" },
  { make: "Chery" },
  { make: "Chevrolet" },
  { make: "Chrysler" },
  { make: "Citroen" },
  { make: "Daewoo" },
  { make: "DAF" },
  { make: "Daihatsu" },
  { make: "Datsun" },
  { make: "Denstar" },
  { make: "Dentools" },
  { make: "Dodge" },
  { make: "Dongfeng" },
  { make: "Drom Power" },
  { make: "Ducati" },
  { make: "Ferrari" },
  { make: "Fiat" },
  { make: "Ford" },
  { make: "Foton" },
  { make: "GAC" },
  { make: "Geely" },
  { make: "GMC" },
  { make: "Great Wall" },
  { make: "Haojue" },
  { make: "Hummer" },
  { make: "Hyundai" },
  { make: "Infiniti" },
  { make: "Isuzu" },
  { make: "Iveco" },
  { make: "IVM" },
  { make: "JAC" },
  { make: "Jaguar" },
  { make: "Jeep" },
  { make: "Jincheng" },
  { make: "JMC" },
  { make: "Kawasaki" },
  { make: "Keeway" },
  { make: "Kenworth" },
  { make: "Kia" },
  { make: "Kymco" },
  { make: "Kymstone" },
  { make: "Lamborghini" },
  { make: "Land Rover" },
  { make: "Lexus" },
  { make: "Lincoln" },
  { make: "Mack" },
  { make: "Mahindra" },
  { make: "MAN" },
  { make: "Maserati" },
  { make: "Mercedes-Benz" },
  { make: "Mercury" },
  { make: "MG" },
  { make: "Mini" },
  { make: "Mitsubishi" },
  { make: "Morris" },
  { make: "Nord" },
  { make: "Opel" },
  { make: "Peugeot" },
  { make: "Polaris" },
  { make: "Porsche" },
  { make: "Qlink" },
  { make: "Renault" },
  { make: "Rover" },
  { make: "Saab" },
  { make: "Samsung" },
  { make: "Saturn" },
  { make: "Scania" },
  { make: "Scion" },
  { make: "Seat" },
  { make: "Senke" },
  { make: "Shacman" },
  { make: "Sinotruk" },
  { make: "Skoda" },
  { make: "Smart" },
  { make: "SsangYong" },
  { make: "Steyr" },
  { make: "Suzuki" },
  { make: "T-King" },
  { make: "Tata" },
  { make: "Volkswagen" },
  { make: "Volvo" },
  { make: "Yamaha" },
  { make: "ZX Auto" },
  { make: "Other Make" }
];
export const boatTypes = [
  { type: "Banana Boats" ,  iconPath: "/assets/icons/banana-boat.jpg"},
  { type: "Bass Boat",  iconPath: "/assets/icons/bass-boat.png" },
  { type: "Bow Rider Boats",  iconPath: "/assets/icons/bow-rider.png" },
  { type: "Canoe" ,  iconPath: "/assets/icons/Canoe.jpg"},
  { type: "Cargo Ships",  iconPath: "/assets/icons/cargo-ship.png"},
  { type: "Catamaran Boats",  iconPath: "/assets/icons/catamaran.png" },
  { type: "Centre Console Boats" ,  iconPath: "/assets/icons/centre-console.jpg"},
  { type: "Fishing Boats",  iconPath: "/assets/icons/fishing-boats.png" },
  { type: "Dinghy Boats" },
  
  { type: "Other" }
];

export const VerifiesDefaultValues = {
  fee: ''
}
export const UserDefaultValues = {
  clerkId: '',
  email: '',
  firstName: '',
  lastName: '',
  photo: '',
  status: '',
  businessname: '',
  aboutbusiness: '',
  businessaddress: '',
  latitudeitude:'',
  longitude:'',
  businesshours: [] as Businesshours[],
  businessworkingdays:[],
  phone: '',
  whatsapp:'',
  website:'',
  facebook:'',
  twitter:'',
  instagram:'',
  tiktok:'',
 // verified: [] as Verified[],
  imageUrl: ''

}
export interface Verified {
  accountverified: boolean
  verifieddate: Date
}
export interface Businesshours {
  openHour: string;
  openMinute: string;
  closeHour: string;
  closeMinute: string;
}
export interface Subcategory {
  title: string;
}
export const CategoryDefaultValues = {
  name: '',
  subcategory: [] as Subcategory[],
  imageUrl: ''
}
// Define the Feature interface
export interface Feature {
  size: string;
  stock: number;
 // checked: boolean;
}
export interface Price {
  period: string;
  amount: number;
}
export const PackagesDefaultValues = {
  name: '',
  description: '',
  imageUrl:'',
  features: [] as Feature[],
  price: [] as Price[],
  color:'',
  priority:0,
  list:0,
}
export const propertyReferralsInfo = [
  {
      title: "Social Media",
      percentage: 64,
      color: "#6C5DD3",
  },
  {
      title: "Marketplace",
      percentage: 40,
      color: "#7FBA7A",
  },
  {
      title: "Websites",
      percentage: 50,
      color: "#FFCE73",
  },
  {
      title: "Digital Ads",
      percentage: 80,
      color: "#FFA2C0",
  },
  {
      title: "Others",
      percentage: 15,
      color: "#F45252",
  },
];