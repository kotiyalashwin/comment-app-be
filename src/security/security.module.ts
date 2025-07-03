import { Module, Global } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule.register({})], // required so JwtService works
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class SecurityModule {}
