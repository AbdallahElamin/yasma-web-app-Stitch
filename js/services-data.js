/**
 * YASMA Services Data
 * Centralized data structure for all service offerings
 * Dynamically loaded from images/Services folder structure
 */

const servicesData = [
    // ==================== CONSTRUCTION SERVICES ====================
    {
        id: "service-construction-01",
        category: "Construction",
        title: "Roofing Works",
        description: "Professional roofing installation and repair services using high-quality materials and modern techniques. Our experienced team ensures durable, weather-resistant roofing solutions that protect your property for years to come, meeting all safety standards and architectural requirements.",
        thumbnail: "images/Services/Construction/work01/Thumbnail.jpg",
        images: [
            "images/Services/Construction/work01/1.jpg",
            "images/Services/Construction/work01/2.jpg",
            "images/Services/Construction/work01/3.jpg",
            "images/Services/Construction/work01/4.jpg"
        ]
    },
    {
        id: "service-construction-02",
        category: "Construction",
        title: "Column Works",
        description: "Expert column construction and reinforcement services for structural integrity. We specialize in precision concrete pouring, steel reinforcement, and formwork design to create load-bearing columns that meet stringent engineering specifications and ensure long-term stability.",
        thumbnail: "images/Services/Construction/work02/Thumbnail.jpg",
        images: [
            "images/Services/Construction/work02/1.jpg",
            "images/Services/Construction/work02/2.jpg",
            "images/Services/Construction/work02/3.jpg",
            "images/Services/Construction/work02/4.jpg"
        ]
    },
    {
        id: "service-construction-03",
        category: "Construction",
        title: "Foundation Works",
        description: "Comprehensive foundation engineering and installation for buildings of all sizes. Our foundation services include soil analysis, excavation, reinforcement placement, and concrete casting, ensuring a solid base that provides optimal load distribution and structural longevity.",
        thumbnail: "images/Services/Construction/work03/Thumbnail.jpg",
        images: [
            "images/Services/Construction/work03/1.jpg",
            "images/Services/Construction/work03/2.jpg",
            "images/Services/Construction/work03/3.jpg",
            "images/Services/Construction/work03/4.jpg"
        ]
    },
    {
        id: "service-construction-04",
        category: "Construction",
        title: "Building Works",
        description: "Full-scale building construction services from groundwork to completion. We deliver turnkey construction solutions including structural work, masonry, concrete casting, and framework installation, utilizing advanced construction methodologies to ensure quality, safety, and timely project delivery.",
        thumbnail: "images/Services/Construction/work04/Thumbnail.jpg",
        images: [
            "images/Services/Construction/work04/1.jpg",
            "images/Services/Construction/work04/2.jpg",
            "images/Services/Construction/work04/3.jpg",
            "images/Services/Construction/work04/4.jpg"
        ]
    },
    {
        id: "service-construction-05",
        category: "Construction",
        title: "Tank Works",
        description: "Specialized construction of water storage tanks and underground reservoirs. Our tank construction services include structural design, waterproofing, reinforcement installation, and quality testing to ensure leak-proof, durable water storage solutions for residential, commercial, and industrial applications.",
        thumbnail: "images/Services/Construction/work05/Thumbnail.jpg",
        images: []
    },
    {
        id: "service-construction-06",
        category: "Construction",
        title: "Tie Beams Works",
        description: "Professional tie beam construction to connect and stabilize structural elements. We provide expert formwork design, steel reinforcement placement, and precision concrete pouring for tie beams that effectively distribute loads, prevent differential settlement, and enhance overall structural integrity.",
        thumbnail: "images/Services/Construction/work06/Thumbnail.jpg",
        images: []
    },

    // ==================== EXTERIOR SERVICES ====================
    {
        id: "service-exterior-01",
        category: "Exterior",
        title: "General Site Finishing Works",
        description: "Complete exterior site development and finishing services including landscaping, paving, and utilities installation. We transform construction sites into functional, aesthetically pleasing environments through professional grading, drainage solutions, hardscaping, and outdoor amenities that enhance property value.",
        thumbnail: "images/Services/Exterior/work01/Thumbnail.jpg",
        images: [
            "images/Services/Exterior/work01/1.jpg",
            "images/Services/Exterior/work01/2.jpg",
            "images/Services/Exterior/work01/3.jpg",
            "images/Services/Exterior/work01/4.jpg"
        ]
    },
    {
        id: "service-exterior-02",
        category: "Exterior",
        title: "Facade Finishing Works",
        description: "Premium facade finishing and cladding services to enhance building aesthetics and protection. Our expertise includes modern cladding systems, decorative finishes, weather-resistant coatings, and architectural detailing that create striking building exteriors while providing superior weather protection and thermal efficiency.",
        thumbnail: "images/Services/Exterior/work02/Thumbnail.jpg",
        images: [
            "images/Services/Exterior/work02/1.jpg",
            "images/Services/Exterior/work02/2.jpg",
            "images/Services/Exterior/work02/3.jpg",
            "images/Services/Exterior/work02/4.jpg"
        ]
    },

    // ==================== FIRE SAFETY SERVICES ====================
    {
        id: "service-firesafety-01",
        category: "Fire Safety",
        title: "Fire Suppression and Alarm Systems, and Pumps",
        description: "Comprehensive fire protection system installation including suppression equipment, alarm networks, and fire pump systems. We design and implement code-compliant fire safety solutions with advanced detection technology, automatic sprinkler systems, and emergency response infrastructure to safeguard lives and property.",
        thumbnail: "images/Services/Fire Safety/work01/Thumbnail.jpg",
        images: [
            "images/Services/Fire Safety/work01/1.jpg",
            "images/Services/Fire Safety/work01/2.jpg",
            "images/Services/Fire Safety/work01/3.jpg",
            "images/Services/Fire Safety/work01/4.jpg"
        ]
    },

    // ==================== INFRASTRUCTURE SERVICES ====================
    {
        id: "service-infrastructure-01",
        category: "Infrastructure",
        title: "Excavation and Replacement, Surveying, Fill and Compaction Works",
        description: "Professional earthwork and site preparation services including precision surveying, excavation, backfilling, and soil compaction. Our infrastructure team utilizes advanced equipment and techniques to prepare sites according to engineering specifications, ensuring proper grading, drainage, and soil stability for construction projects.",
        thumbnail: "images/Services/Infrastructure/work01/Thumbnail.jpg",
        images: [
            "images/Services/Infrastructure/work01/1.jpg",
            "images/Services/Infrastructure/work01/2.jpg",
            "images/Services/Infrastructure/work01/3.jpg",
            "images/Services/Infrastructure/work01/4.jpg"
        ]
    },

    // ==================== INTERIOR SERVICES ====================
    {
        id: "service-interior-01",
        category: "Interior",
        title: "Door and Window Works",
        description: "Expert installation of doors and windows with precision fitting and finishing. We provide comprehensive services for all types of door and window systems including frames, hardware, sealing, and finishing touches that ensure functionality, security, energy efficiency, and aesthetic appeal.",
        thumbnail: "images/Services/Interior/work01/Thumbnail.jpg",
        images: [
            "images/Services/Interior/work01/1.jpg",
            "images/Services/Interior/work01/2.jpg",
            "images/Services/Interior/work01/3.jpg",
            "images/Services/Interior/work01/4.jpg"
        ]
    },
    {
        id: "service-interior-02",
        category: "Interior",
        title: "Wood, Ceramic, and Marble Cladding Works",
        description: "Premium interior cladding installation using wood, ceramic, and marble materials. Our skilled craftsmen deliver exceptional wall and floor cladding with meticulous attention to pattern alignment, jointing, and finishing, creating elegant interior spaces that combine durability with timeless aesthetic appeal.",
        thumbnail: "images/Services/Interior/work02/Thumbnail.jpg",
        images: [
            "images/Services/Interior/work02/Thumbnail.jpg"
        ]
    },
    {
        id: "service-interior-03",
        category: "Interior",
        title: "Painting, Plastering, Gypsum Board, and Flooring Works",
        description: "Comprehensive interior finishing services including plastering, gypsum board installation, professional painting, and flooring solutions. We deliver smooth wall surfaces, decorative ceiling systems, high-quality paint finishes, and durable flooring that transform interior spaces into polished, comfortable environments.",
        thumbnail: "images/Services/Interior/work03/Thumbnail.jpg",
        images: [
            "images/Services/Interior/work03/1.jpg",
            "images/Services/Interior/work03/2.jpg",
            "images/Services/Interior/work03/3.jpg"
        ]
    },
    {
        id: "service-interior-04",
        category: "Interior",
        title: "Elevators Works",
        description: "Professional elevator installation, maintenance, and modernization services. Our team handles complete elevator systems including shaft construction, mechanical installation, electrical integration, and safety testing to provide reliable, code-compliant vertical transportation solutions for buildings of all heights.",
        thumbnail: "images/Services/Interior/work04/Thumbnail.jpg",
        images: [
            "images/Services/Interior/work04/1.jpg"
        ]
    },
    {
        id: "service-interior-05",
        category: "Interior",
        title: "Stair Finishing and Handrail Works",
        description: "Expert staircase finishing and handrail installation combining safety with elegant design. We provide complete stair solutions including tread finishing, riser work, balustrade installation, and custom handrail fabrication using premium materials to create safe, visually striking vertical circulation elements.",
        thumbnail: "images/Services/Interior/work05/Thumbnail.jpg",
        images: [
            "images/Services/Interior/work05/1.jpg",
            "images/Services/Interior/work05/2.jpg",
            "images/Services/Interior/work05/3.jpg",
            "images/Services/Interior/work05/4.jpg"
        ]
    },
    {
        id: "service-interior-06",
        category: "Interior",
        title: "Furnishings with Decorative Works",
        description: "Bespoke interior furnishing and decorative finishing services that bring spaces to life. We offer custom cabinetry, built-in furniture, decorative millwork, and artistic finishing touches that reflect your style while maximizing functionality, creating unique interior environments that inspire and delight.",
        thumbnail: "images/Services/Interior/work06/Thumbnail.jpg",
        images: [
            "images/Services/Interior/work06/1.jpg",
            "images/Services/Interior/work06/2.jpg",
            "images/Services/Interior/work06/3.jpg",
            "images/Services/Interior/work06/4.jpg",
            "images/Services/Interior/work06/5.jpg"
        ]
    },

    // ==================== MEP SERVICES ====================
    {
        id: "service-mep-01",
        category: "MEP",
        title: "Plumbing and Air Conditioning Works",
        description: "Complete MEP solutions for plumbing and HVAC systems in residential and commercial buildings. Our certified technicians install efficient water supply networks, drainage systems, and climate control equipment that ensure comfort, hygiene, and energy efficiency while meeting all regulatory standards.",
        thumbnail: "images/Services/MEP/work01/Thumbnail.jpg",
        images: [
            "images/Services/MEP/work01/1.jpg",
            "images/Services/MEP/work01/2.jpg",
            "images/Services/MEP/work01/3.jpg",
            "images/Services/MEP/work01/4.jpg"
        ]
    }
];

// ==================== HELPER FUNCTIONS ====================

/**
 * Get all services
 * @returns {Array} All service objects
 */
function getAllServices() {
    return servicesData;
}

/**
 * Get services by category
 * @param {string} category - Category name (e.g., "Construction", "Interior")
 * @returns {Array} Services in the specified category
 */
function getServicesByCategory(category) {
    if (!category || category.toLowerCase() === 'all') {
        return servicesData;
    }
    return servicesData.filter(service =>
        service.category.toLowerCase() === category.toLowerCase()
    );
}

/**
 * Get all unique service categories
 * @returns {Array} Array of unique category names
 */
function getServiceCategories() {
    const categories = [...new Set(servicesData.map(service => service.category))];
    return categories.sort();
}

/**
 * Get a service by ID
 * @param {string} id - Service ID
 * @returns {Object|null} Service object or null if not found
 */
function getServiceById(id) {
    return servicesData.find(service => service.id === id) || null;
}

/**
 * Get total count of services
 * @returns {number} Total number of services
 */
function getServiceCount() {
    return servicesData.length;
}

/**
 * Get count of services by category
 * @returns {Object} Object with categories as keys and counts as values
 */
function getServiceCountByCategory() {
    const counts = {};
    servicesData.forEach(service => {
        counts[service.category] = (counts[service.category] || 0) + 1;
    });
    return counts;
}
