export const getWindRotation = (wd: any) => {
    if ((wd >= 348.75 && wd <= 360) || (wd >= 0 && wd < 11.25)) {
        return 0; // 0° North Wind (N)
    } else if (wd >= 11.25 && wd < 33.75) {
        return 22.5; // 22.5° North-Northeast Wind (NNE)
    } else if (wd >= 33.75 && wd < 56.25) {
        return 45; // 45° Northeast Wind (NE)
    } else if (wd >= 56.25 && wd < 78.75) {
        return 67.5; // 67.5° East-Northeast Wind (ENE)
    } else if (wd >= 78.75 && wd < 101.25) {
        return 90; // 90° East Wind (E)
    } else if (wd >= 101.25 && wd < 123.75) {
        return 112.5; // 112.5° East-Southeast Wind (ESE)
    } else if (wd >= 123.75 && wd < 146.25) {
        return 135; // 135° Southeast Wind (SE)
    } else if (wd >= 146.25 && wd < 168.75) {
        return 157.5; // 157.5° South-Southeast Wind (SSE)
    } else if (wd >= 168.75 && wd < 191.25) {
        return 180; // 180° South Wind (S)
    } else if (wd >= 191.25 && wd < 213.75) {
        return 202.5; // 202.5° South-Southwest Wind (SSW)
    } else if (wd >= 213.75 && wd < 236.25) {
        return 225; // 225° Southwest Wind (SW)
    } else if (wd >= 236.25 && wd < 258.75) {
        return 247.5; // 247.5° West-Southwest Wind (WSW)
    } else if (wd >= 258.75 && wd < 281.25) {
        return 270; // 270° West Wind (W)
    } else if (wd >= 281.25 && wd < 303.75) {
        return 292.5; // 292.5° West-Northwest Wind (WNW)
    } else if (wd >= 303.75 && wd < 326.25) {
        return 315; // 315° Northwest Wind (NW)
    } else if (wd >= 326.25 && wd < 348.75) {
        return 337.5; // 337.5° North-Northwest Wind (NNW)
    }
    return 0; // Default North Wind if out of range
}

