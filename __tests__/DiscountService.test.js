import DiscountService from '../src/DiscountService.js';

describe('DiscountService', () => {
  let service;

  beforeEach(() => {
    service = new DiscountService();
  });

  test('step 1', () => {
    expect(() => service.getFinalPrice(1000)).toThrow('Стратегия скидок не установлена');
  });

  test('step 2', () => {
    const strategy = {
      apply: (price) => price * 0.8, // 20% скидка
    };
    service.setDiscountStrategy(strategy);
    expect(service.getFinalPrice(1000)).toBe(800);
  });

  test('step 3', () => {
    const strategy = {
      apply: (price) => price * 0.8,
    };
    service.setDiscountStrategy(strategy);
    service.getFinalPrice(1000);
    expect(service.getDiscountHistory()).toEqual([{ originalPrice: 1000, discountedPrice: 800 }]);
  });

  test('step 4', () => {
    const strategy = {
      apply: (price) => price * 0.8,
    };
    service.setDiscountStrategy(strategy);
    service.getFinalPrice(1000);
    service.clearHistory();
    expect(service.getDiscountHistory()).toEqual([]);
  });
});