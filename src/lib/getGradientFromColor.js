export function getGradientFromColor(hex, factor = 0.85, direction = "to-b") {
    const lightenHex = (hex, amount) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        const lighten = (channel) =>
            Math.round(channel + (255 - channel) * amount)
                .toString(16)
                .padStart(2, "0");

        return `#${lighten(r)}${lighten(g)}${lighten(b)}`;
    };

    const lightColor = lightenHex(hex, factor);

    // Map tailwind directions to CSS directions
    const directions = {
        "to-t": "to top",
        "to-tr": "to top right",
        "to-r": "to right",
        "to-br": "to bottom right",
        "to-b": "to bottom",
        "to-bl": "to bottom left",
        "to-l": "to left",
        "to-tl": "to top left"
    };

    const cssDirection = directions[direction] || "to bottom";

    return {
        background: `linear-gradient(${cssDirection}, ${lightColor}, #ffffff)`
    };
}
