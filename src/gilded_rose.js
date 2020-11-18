class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const calculateQualityNormalItem = ({ sellIn, quality }) => {
  const positiveQuality = quality > 0;
  const noDays = sellIn < 0;

  if (positiveQuality && noDays) return -2;
  if (positiveQuality) return -1;

  return 0;
};

const calculateQualityBackstagePasses = ({ sellIn, quality }) => {
  const tenDaysOrLess = sellIn <= 10;
  const fiveDaysOrLess = sellIn <= 5;
  const noDays = sellIn < 0;

  if (noDays) return - quality;
  if (fiveDaysOrLess) return +3;
  if (tenDaysOrLess) return +2;

  return +1;
};

const calculateSellin = ({ name }) => {
  const isSulfuras = name === "Sulfuras, Hand of Ragnaros";
  return !isSulfuras ? -1 : 0;
};

const calculateQuality = (item) => {
  const isSulfuras = item.name === "Sulfuras, Hand of Ragnaros";
  const isAgedBrie = item.name === "Aged Brie";
  const isConjuredItem = item.name.includes("Conjured");
  const isBackstagePasses =
    item.name === "Backstage passes to a TAFKAL80ETC concert";
  const isQualityLessThan50 = item.quality < 50;
  const isNormalItem =
    !isAgedBrie && !isBackstagePasses && !isSulfuras && !isConjuredItem;

  if (isNormalItem) return calculateQualityNormalItem(item);
  if (isBackstagePasses && isQualityLessThan50) return calculateQualityBackstagePasses(item);
  if (isAgedBrie && isQualityLessThan50) return +1;
  if (isConjuredItem) return calculateQualityNormalItem(item) * 2;

  return 0;
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    return this.items.map(item => {
      item.sellIn += calculateSellin(item);
      item.quality += calculateQuality(item);

      return item;
    });
  }
}
module.exports = {
  Item,
  Shop
}