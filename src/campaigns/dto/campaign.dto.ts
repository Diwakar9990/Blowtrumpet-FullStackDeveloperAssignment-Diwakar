// src/campaigns/dto/filter-campaigns.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class FilterCampaignsDto {
    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    category?: string;
}
