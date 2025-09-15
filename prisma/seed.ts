import { Role } from '@prisma/client';
import prisma from '../libs/prisma'
import bcrypt from 'bcryptjs'

async function main() {
    console.log('🌱 Starting database seed process...');
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD
    if(!adminEmail ||!adminPassword){
        throw new Error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set for seeding.');
    }
    const existingAdmin = await prisma.user.findFirst({where : {role : Role.ADMIN}})
    if(existingAdmin) {
        console.log('✅ Admin user already exists. Skipping creation.');
        return;
    }
    console.log(' Admin user not found. Creating one...');
  const passwordHash = await bcrypt.hash(adminPassword, 12);
   await prisma.user.create({
    data: {
      email: adminEmail,
      passwordHash,
      name: 'Platform Admin',
      role: Role.ADMIN,
      // The institutionId is simply omitted, and will be NULL by default.
      // No placeholder institution needed!
    },
  });
console.log('✅ Successfully created the first admin user.');
  console.log('🌱 Seeding finished.');
}
main()
  .catch((e) => {
    console.error('❌ An error occurred during the seed process:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
