import { CartItem } from './cart-item';

const mockProduct = {
  id: '123',
  name: 'Example Product',
  imageUrl: 'https://example.com/product.jpg',
  unitPrice: 19.99,
  sku: 'ABC123',
  description: 'A brief description',
  active: true,
  unitsInStock: 10,
  dateCreated: new Date(), // Can be any date or mocked value
  lastUpdate: new Date(), // Can be any date or mocked value (assuming string format)
};

describe('CartItem', () => {
  it('should create an instance', () => {
    expect(new CartItem(mockProduct)).toBeTruthy();
  });
});
