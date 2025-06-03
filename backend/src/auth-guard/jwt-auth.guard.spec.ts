import { JwtAuthGuard } from './jwt-auth.guard';

describe('AuthGuardGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
