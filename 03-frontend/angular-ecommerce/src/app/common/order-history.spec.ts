import { OrderHistory } from './order-history';

const mockOrderItem: OrderHistory = {
  id: '123',
  orderTrackingNumber: '324324',
  totalPrice: 19.99,
  totalQuantity: 2,
  dateCreated: new Date(),
};

describe('OrderHistory', () => {
  it('should create an instance', () => {
    expect(
      new OrderHistory(
        mockOrderItem.id,
        mockOrderItem.orderTrackingNumber,
        mockOrderItem.totalPrice,
        mockOrderItem.totalQuantity,
        mockOrderItem.dateCreated
      )
    ).toBeTruthy();
  });
});
