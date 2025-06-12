export const binConfig = {
    home: ['general waste', 'recycling'],
    school: ['general waste', 'recycling', 'food compost'],
    park: ['general waste', 'food compost'],
  };
  
  // Function to get active bins with fallback
  export function getActiveBins(gameType) {
    return binConfig[gameType] || ['general waste', 'recycling', 'food compost'];
  }
  
  /**
   * Returns filtered items valid for the given gameType
   * @param {Array} items - array of all items
   * @param {string} gameType - e.g. "home", "school", "park"
   * @returns filtered array of items based on active bins
   */
  export function getValidItemsForGameType(items, gameType) {
    const activeBins = getActiveBins(gameType);
    return items.filter(item => activeBins.includes(item.bin));
  }
  