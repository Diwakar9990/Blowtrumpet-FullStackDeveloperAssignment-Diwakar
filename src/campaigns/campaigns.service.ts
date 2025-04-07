import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Campaign } from './schemas/campaign.schema';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class CampaignsService {
    constructor(
        @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async findAll(query): Promise<Campaign[]> {
        return this.campaignModel.find(query).exec();
    }

    async findById(id: string): Promise<Campaign> {
        const campaign = await this.campaignModel.findById(id);
        if (!campaign) throw new NotFoundException('Campaign not found');
        return campaign;
    }

    async joinCampaign(userId: string, campaignId: string) {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found');
        const campaignObjectId = new Types.ObjectId(campaignId);
        if (user.joinedCampaigns.includes(campaignObjectId)) {
            throw new BadRequestException('Already joined this campaign');
        }

        user.joinedCampaigns.push(campaignObjectId);
        await user.save();

        return { success: true, message: 'Joined campaign' };
    }

    async leaveCampaign(userId: string, campaignId: string) {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found');

        user.joinedCampaigns = user.joinedCampaigns.filter(
            (id) => id.toString() !== campaignId,
        );
        await user.save();
        return { success: true, message: 'Left campaign' };
    }
}
