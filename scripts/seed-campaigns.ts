import { connect, model } from 'mongoose';
import { Campaign, CampaignSchema } from '../src/campaigns/schemas/campaign.schema';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
    if (!process.env.DB_URI) {
        console.error('MONGODB_URI is not defined in .env');
        process.exit(1);
    }

    await connect(process.env.DB_URI);

    const campaigns = [
        {
            name: 'Green Earth',
            status: 'active',
            type: 'awareness',
            startDate: new Date(),
            budget: 5000,
            category: 'environment',
        },
        {
            name: 'Health Matters',
            status: 'upcoming',
            type: 'medical',
            startDate: new Date(),
            budget: 3000,
            category: 'health',
        },
    ];

    const CampaignModel = model<Campaign>('Campaign', CampaignSchema);
    await CampaignModel.insertMany(campaigns);

    console.log('Campaigns seeded!');
    process.exit();
}

seed();
