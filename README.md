
# Campaigns Backend API

A backend service built with **NestJS** and **MongoDB**, providing secure authentication and campaign participation functionality for users.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Diwakar9990/Blowtrumpet-FullStackDeveloperAssignment-Diwakar.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root:

```env
JWT_EXPIRE=1d
JWT_SECRET=your_jwt_secret
DB_URI=mongodb://localhost:27017/assignment
```

> Ensure MongoDB is running locally or replace `DB_URI` with your Mongo Atlas connection string.

### 4. Run the App

```bash
npm run start:dev
```

The app will be live on: `http://localhost:4000`

---

## Seed Campaigns

To insert sample campaign data:

```bash
npm run seed
```

---

## Authentication

Use JWT-based authentication. On login, a token is issued which must be sent in the `Authorization` header for protected routes:

```
Authorization: Bearer <token>
```

---

## API Usage Examples

### 1. Register a New User

```bash
curl -X POST http://localhost:3000/auth/signup   -H "Content-Type: application/json"   -d '{"name": "Ravi", "email": "ravi@example.com", "password": "Pass@123"}'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/auth/login   -H "Content-Type: application/json"   -d '{"email": "ravi@example.com", "password": "Pass@123"}'
```

### 3. Get User Profile (Protected)

```bash
curl http://localhost:3000/user/profile   -H "Authorization: Bearer <your_jwt_token>"
```

### 4. Update User Profile (Protected)

```bash
curl -X POST http://localhost:3000/user/profile   -H "Authorization: Bearer <your_jwt_token>" -d '{ "name": "Ravi Kumar Singh", "bio": "Volunteer, coder, and tree hugger"}'
```

### 5. List All Campaigns

```bash
curl http://localhost:3000/campaigns
```

### 6. Get Campaign by Id

```bash
curl http://localhost:3000/campaigns/<campaignId>
```

### 7. Join a Campaign (Protected)

```bash
curl -X POST http://localhost:3000/campaigns/<campaignId>/join   -H "Authorization: Bearer <your_jwt_token>"
```
### 8. Leave a Campaign (Protected)

```bash
curl -X POST http://localhost:3000/campaigns/<campaignId>/leave   -H "Authorization: Bearer <your_jwt_token>"
```

---

## Folder Structure

```
src/
├── auth/         # Authentication (register, login, JWT strategy)
├── user/         # User model, service, controller
├── campaigns/    # Campaign model, controller, join logic
├── app.module.ts # main module
├── main.ts       # App entrypoint
scripts/
├── seed-campaigns.ts
.env
```

---

## Design Decisions

### NestJS for Modular Structure  
- Clear separation of concerns using `Modules`, `Services`, `Controllers`.
- Scalable and maintainable architecture.

### Mongoose ODM for MongoDB  
- Schema validation using `@Schema` decorators.
- References between User and Campaigns for join logic.

### JWT Auth Guard  
- Protect routes with `@UseGuards(JwtAuthGuard)`.
- Decouple auth logic from business logic.

### Error Handling  
- Use of NestJS’s `HttpException`, `NotFoundException`, `BadRequestException`.

### Testable Service Logic  
- DTOs for validation.
- Services are unit-test friendly with dependency injection.

---

## License

MIT

---

> For questions or suggestions, feel free to reach out or open an issue.
