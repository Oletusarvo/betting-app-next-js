export enum GameError {
  INVALID_GAME_ID = 0x1,
  INVALID_MIN_BID = 0x2,
  INVALID_MIN_RAISE = 0x4,
  INVALID_MAX_RAISE = 0x8,
  INVALID_BID_CURRENCY = 0x10,
  CONTESTED = 0x20,
  NO_BID = 0x40,
  MIN_MAX_DIFF = 0x80,
  INVALID_MAX_BID = 0x100,
}
