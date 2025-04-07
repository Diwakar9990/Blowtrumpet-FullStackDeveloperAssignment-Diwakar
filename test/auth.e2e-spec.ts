// test/auth.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe()); // if used globally in app
        await app.init();
    });

    afterAll(async () => {
        await app.close();
        await disconnect(); // important if using Mongoose
    });

    it('/api/auth/login (POST) - success', async () => {
        const response = await request(app.getHttpServer())
            .post('/api/auth/login')
            .send({
                email: 'ravi@example.com',
                password: 'Test@1234',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('/api/auth/login (POST) - failure (wrong password)', async () => {
        const response = await request(app.getHttpServer())
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword',
            });

        expect(response.status).toBe(401); // or 400 based on your logic
        expect(response.body.message).toBeDefined();
    });
});
