import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(data): Promise<User> {
        return this.userModel.create(data);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email });
    }

    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async updateProfile(id: string, data): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(id, data, { new: true });
    }
}
