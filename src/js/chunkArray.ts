/**
 * Découpe un tableau en plusieurs tableaux de taille donnée
 * @see https://stackoverflow.com/a/10456644/3133038
 * @param {Array} items
 * @param {number} itemsPerChunk
 * @returns {Array}
 */
export default function (items: any[], itemsPerChunk: number): any[][] {
    let R = [];
    for (let i = 0; i < items.length; i += itemsPerChunk) {
        R.push(items.slice(i, i + itemsPerChunk));
    }
    return R;
}
