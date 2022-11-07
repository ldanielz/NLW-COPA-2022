import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://github.com/ldanielz.png'
    }
  })
  const pool = await prisma.pool.create({
    data:{
      title:'Example Pool',
      code:'BOL123',
      ownerId: user.id,

      participants:{
        create:{
          userId:user.id
        }
      }
    }
  })

  await prisma.game.create({
    data:{
      date: '2022-11-06T20:11:06.733Z',
      firstTeamCountryCode: 'GB',
      secondTeamCountryCode: 'US',
    }
  })
  await prisma.game.create({
    data:{
      date: '2022-11-08T12:11:06.733Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'AR',

      guesses:{
        create:{
          firstTeamPoints:7,
          secondTeamPoints:1,
          participant:{
            connect:{
              userId_poolId:{
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })

}

main()