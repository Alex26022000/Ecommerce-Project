import { CartItem } from './cart-item';
import { OrderItem } from './order-item';

const mockCartItem: CartItem = {
  id: '123', // Assuming CartItem has an 'id' property
  name: 'Example Product',
  imageUrl: 'https://example.com/product.jpg',
  unitPrice: 19.99,
  quantity: 2,
};

describe('OrderItem', () => {
  it('should create an instance', () => {
    expect(new OrderItem(mockCartItem)).toBeTruthy();
  });
});
