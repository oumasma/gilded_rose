const { Shop, Item } = require('../src/gilded_rose.js');

describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisse de 1 la qualité et le sellIn des items normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const results = gildedRose.updateQuality();

    const  expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, index) {
      expect(results[index].quality).toBe(testCase.quality);
      expect(results[index].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmente la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const results = gildedRose.updateQuality();

    const expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, index) {
      expect(results[index].quality).toBe(testCase.quality);
      expect(results[index].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmente de 3 la qualité quand il reste 5 jours ou moins pour Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 5, 45));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 45));

    const gildedRose = new Shop(listItems);
    const results = gildedRose.updateQuality();

    const expected = [
      { sellIn: 4, quality: 46 },
      { sellIn: 4, quality: 48 },
    ];
    expected.forEach(function (testCase, index) {
      expect(results[index].quality).toBe(testCase.quality);
      expect(results[index].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmente par 2 la qualité quand il reste 10 jours ou moins pour Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 10, 45));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 45));

    const gildedRose = new Shop(listItems);
    const results = gildedRose.updateQuality();

    const expected = [
      { sellIn: 9, quality: 46 },
      { sellIn: 9, quality: 47 },
    ];
    expected.forEach(function (testCase, index) {
      expect(results[index].quality).toBe(testCase.quality);
      expect(results[index].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Ne modifie pas la qualité et la péremption de Sulfuras ", function () {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 1, 80));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const results = gildedRose.updateQuality();

    const  expected = [
      { sellIn: 1, quality: 80 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, index) {
      expect(results[index].quality).toBe(testCase.quality);
      expect(results[index].sellIn).toBe(testCase.sellIn);
    });
  });

  it("dégrade deux fois plus rapidement la qualité quand la date de préremption passe", function () {
    listItems.push(new Item("+5 Dexterity Vest", 0, 20));
    listItems.push(new Item("Mana Cake", 0, 6));

    const gildedRose = new Shop(listItems);
    const results = gildedRose.updateQuality();

    const expected = [
      { sellIn: -1, quality: 18 },
      { sellIn: -1, quality: 4 },
    ];
    expected.forEach(function (testCase, index) {
      expect(results[index].quality).toBe(testCase.quality);
      expect(results[index].sellIn).toBe(testCase.sellIn);
    });
  });

  it("ne peut pas rendre la qualité négative", function () {
    listItems.push(new Item("+5 Dexterity Vest", 0, 0));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 6));
    listItems.push(new Item("Aged Brie", 0, 30));

    const gildedRose = new Shop(listItems);
    const results = gildedRose.updateQuality();

    const expected = [
      { sellIn: -1, quality: 0 },
      { sellIn: -1, quality: 0 },
      { sellIn: -1, quality: 31 },
    ];
    expected.forEach(function (testCase, index) {
      expect(results[index].quality).toBe(testCase.quality);
      expect(results[index].sellIn).toBe(testCase.sellIn);
    });
  });

  it("ne peut pas augmenter la qualité à plus de 50", function () {
    listItems.push(new Item("Aged Brie", 10, 50));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50));

    const gildedRose = new Shop(listItems);
    const results = gildedRose.updateQuality();

    const expected = [
      { sellIn: 9, quality: 50 },
      { sellIn: 9, quality: 50 },
    ];
    expected.forEach(function (testCase, index) {
      expect(results[index].quality).toBe(testCase.quality);
      expect(results[index].sellIn).toBe(testCase.sellIn);
    });
  });

  it("retourne un tableau vide si aucun item de passé", function () {
    const gildedRose = new Shop();
    const results = gildedRose.updateQuality();

      expect(results).toBeInstanceOf(Array);
      expect(results).toHaveSize(0);
      
  });

  it("Baisse de 2 la qualité de Conjured", function () {
    listItems.push(new Item("Conjured Applepie", 10, 20));
    listItems.push(new Item("Conjured Banana", 3, 6));

    const gildedRose = new Shop(listItems);
    const results = gildedRose.updateQuality();

    const  expected = [
      { sellIn: 9, quality: 18 },
      { sellIn: 2, quality: 4 }
    ];
    expected.forEach(function (testCase, index) {
      expect(results[index].quality).toBe(testCase.quality);
      expect(results[index].sellIn).toBe(testCase.sellIn);
    });
  });
  
});