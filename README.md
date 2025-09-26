🏋️ Gym Class Scheduling and Membership Management System
📌 Project Overview

The Gym Class Scheduling and Membership Management System is designed to streamline gym operations with three distinct roles: Admin, Trainer, and Trainee.

Admin: Creates trainers, manages schedules (max 5 per day), and assigns trainers.

Trainer: Can only view assigned schedules.

Trainee: Manages own profile, books/cancels class schedules (max 10 trainees per class, no overlapping bookings).

This system enforces strict business rules with role-based access using JWT authentication and Prisma ORM.

🗂️ Relational Diagram

(Replace with your actual diagram image or link)

🛠️ Technology Stack

Programming Language: TypeScript

Web Framework: Express.js

ORM: Prisma

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

Password Hashing: bcryptjs

🔑 Admin Credentials (for testing)
{
"email": "admin@gmail.com",
"password": "123456"
}

📌 API Endpoints
🔹 User
Create User

POST https://job-task-nu.vercel.app/api/v1/users/register

{
"name": "user islam",
"email": "user@gmail.com",
"password": "123456"
}

Login User

POST https://job-task-nu.vercel.app/api/v1/auth/login

{
"email": "user@gmail.com",
"password": "123456"
}

🔹 Trainer (Admin only)
Create Trainer

POST https://job-task-nu.vercel.app/api/v1/api/trainers

{
"userId": "68d661d9838aac62ecc114e2",
"bio": "swimer",
"specialties": ["swim", "train"]
}

Get All Trainers

GET https://job-task-nu.vercel.app/api/v1/trainers

🔹 Class Schedules (Admin only)
Create Class Schedule

POST https://job-task-nu.vercel.app/api/v1/schedules

{
"trainerId": "68d687d0cb8fced01f687be0",
"date": "2025-09-26",
"startTime": "2025-09-26T12:00:00.000Z",
"createdById": "68d68cdebc8f6142a25f18b3"
}

Get All Schedules

GET https://job-task-nu.vercel.app/api/v1/schedules

🔹 Booking (Trainee only)
Book aschedules Class

POST https://job-task-nu.vercel.app/api/v1/bookings

{
"classId": "68d68e7838439ca0aaafce10"
}

Cancel Booking

PATCH https://job-task-nu.vercel.app/api/v1/bookings/cencel/:bookingId

Get My Bookings

GET https://job-task-nu.vercel.app/api/v1/bookings/my

🗄️ Database Schema (Prisma Models – simplified)
model User {
id String @id @default(auto()) @map("\_id") @db.ObjectId
name String
email String @unique
password String
role Role @default(TRAINEE)
trainer Trainer?
bookings Booking[]
}

model Trainer {
id String @id @default(auto()) @map("\_id") @db.ObjectId
userId String @unique
bio String?
specialties String[]
user User @relation(fields: [userId], references: [id])
schedules Schedule[]
}

model Schedule {
id String @id @default(auto()) @map("\_id") @db.ObjectId
trainerId String
createdById String
date DateTime
startTime DateTime
endTime DateTime
capacity Int @default(10)
trainer Trainer @relation(fields: [trainerId], references: [id])
bookings Booking[]
}

model Booking {
id String @id @default(auto()) @map("\_id") @db.ObjectId
scheduleId String
traineeId String
status Status @default(CONFIRMED)
schedule Schedule @relation(fields: [scheduleId], references: [id])
trainee User @relation(fields: [traineeId], references: [id])
}

enum Role {
ADMIN
TRAINER
TRAINEE
}

enum Status {
CONFIRMED
CANCELLED
}

⚙️ Instructions to Run Locally

Clone Repository

git clone https://github.com/yourusername/gym-management.git
cd gym-management

Install Dependencies

npm install

Setup Environment Variables
Create .env file:

DATABASE_URL="mongodb+srv://..."
JWT_SECRET="your-secret-key"
BCRYPT_SALT_ROUND=10

Run Prisma Migration

npx prisma generate
npx prisma db push

Start Server

npm run dev

🚀 Live Hosting Link : https://job-task-nu.vercel.app

