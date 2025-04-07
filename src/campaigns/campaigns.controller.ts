// src/campaigns/campaigns.controller.ts
import {
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    Req,
    Query,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('api/campaigns')
export class CampaignsController {
    constructor(private readonly campaignsService: CampaignsService) { }

    @Get()
    async findAll(@Query() query: any) {
        return this.campaignsService.findAll(query);
    }

    @Get(':campaignId')
    async findOne(@Param('campaignId') campaignId: string) {
        const campaign = await this.campaignsService.findById(campaignId);
        if (!campaign) {
            throw new NotFoundException('Campaign not found');
        }
        return campaign;
    }

    @UseGuards(JwtAuthGuard)
    @Post(':campaignId/join')
    async joinCampaign(@Param('campaignId') campaignId: string, @Req() req: Request) {
        const userId = (req.user as any)['userId'];
        const result = await this.campaignsService.joinCampaign(userId, campaignId);
        if (!result.success) {
            throw new BadRequestException(result.message);
        }
        return { message: 'Joined campaign successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Post(':campaignId/leave')
    async leaveCampaign(@Param('campaignId') campaignId: string, @Req() req: Request) {
        const userId = (req.user as any)['userId'];
        const result = await this.campaignsService.leaveCampaign(userId, campaignId);
        if (!result.success) {
            throw new BadRequestException(result.message);
        }
        return { message: 'Left campaign successfully' };
    }
}
