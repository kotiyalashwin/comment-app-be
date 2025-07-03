import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/security/guard/auth.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
  constructor(private notificationService: NotificationsService) {}

  @Get()
  getNotifications(@Req() req: any) {
    return this.notificationService.getUserNotifications(req.user.sub);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @Req() req: any) {
    return this.notificationService.markAsRead(id, req.user.sub);
  }

  @Patch(':id/unread')
  markAsUnRead(@Param('id') id: string, @Req() req: any) {
    return this.notificationService.markAsUnRead(id, req.user.sub);
  }
}
