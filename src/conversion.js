function convertToPt(size) {

    var dpi = 74.999943307122;

    const pointsPerInch = 72; // 1 inch = 72 points
    // const pointsPerInch = dpi; // 1 inch = 72 points
    const conversionFactors = {
        pt: 1,                         // 1 pt = 1 pt
//        px: pointsPerInch / dpi,       // px to pt depends on DPI
        px: dpi / 100,       // px to pt depends on DPI
        mm: 3.7795275591 * dpi / 100,  // 1 mm = 1 inch / 25.4
        // mm: pointsPerInch / 25.4,   // 1 mm = 1 inch / 25.4
        cm: pointsPerInch / 2.54,      // 1 cm = 1 inch / 2.54
        in: 96 * dpi / 100,            // 1 inch = 72 pt
        // in: pointsPerInch,          // 1 inch = 72 pt
        pc: 16 * dpi,                  // 1 pica (pc) = 12 pt
        em: 16 * dpi,                  // Assuming 1 em ≈ 12 pt (adjust if needed)
        rem: 16 * dpi                  // Assuming 1 rem ≈ 12 pt (adjust if needed)
    };

    // Extract the numeric value and the unit from the size string
    // const match = size.match(/^([\d.]+)([a-z%]*)$/i);
    // const match = size.match(/^-?([\d.]+)([a-z%]*)$/i);
    const match = size.match(/^(-?[\d.]+)([a-z%]*)$/i);

    if (!match) {
        throw new Error("Invalid size format: " + size);
    }

    const value = parseFloat(match[1]);
    let unit = match[2].toLowerCase();

    // If no unit is provided, assume 'px' by default
    if (!unit) {
        unit = "px";
    }

    if (!conversionFactors[unit]) {
        throw new Error("Unsupported unit: " + unit);
    }

    // logInfo("IN: " + size);
    // logInfo("OUT: " + value * conversionFactors[unit]);

    return value * conversionFactors[unit];

}

export default convertToPt;