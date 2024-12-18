import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
    for(let i = 0; i < 1000; i++){
        const wasGood = faker.datatype.boolean();
        await prisma.kids.create({
            data: {
                name: faker.person.fullName(),
                address: faker.location.country(),
                wasGood: wasGood,
                wantedGame: wasGood ? faker.commerce.product() : null,
            }
        })
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })