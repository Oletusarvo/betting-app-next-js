export default jest.fn(() => ({
  select: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  increment: jest.fn(),
  decrement: jest.fn(),
}));
