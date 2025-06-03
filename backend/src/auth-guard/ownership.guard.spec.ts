import { OwnershipGuard } from "./ownership.guard";

describe('AuthGuardGuard', () => {
  it('should be defined', () => {
    expect(new OwnershipGuard()).toBeDefined();
  });
});
