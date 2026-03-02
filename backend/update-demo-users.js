const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const demoUsers = [
  {
    firstName: "Lily",
    gender: "FEMALE",
    bio: "Yoga lover & weekend traveler.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    firstName: "Anna",
    gender: "FEMALE",
    bio: "Coffee addict & book reader.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
  {
    firstName: "Olivia",
    gender: "FEMALE",
    bio: "Music & art enthusiast.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
  },
  {
    firstName: "Daniel",
    gender: "MALE",
    bio: "Fitness & coding.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    firstName: "James",
    gender: "MALE",
    bio: "Hiking & photography.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    firstName: "Michael",
    gender: "MALE",
    bio: "Startup founder.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
  },
];

async function updateDemoUsers() {
  console.log("Starting demo user updates...\n");

  for (const user of demoUsers) {
    try {
      const updated = await prisma.user.updateMany({
        where: {
          firstName: user.firstName,
        },
        data: {
          gender: user.gender,
          bio: user.bio,
          profileImageUrl: user.profileImageUrl,
        },
      });

      if (updated.count > 0) {
        console.log(
          `✅ Updated ${updated.count} user(s) with firstName: ${user.firstName}`,
        );
      } else {
        console.log(`⚠️  No user found with firstName: ${user.firstName}`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${user.firstName}:`, error.message);
    }
  }

  console.log("\n✨ Demo user update completed!");
}

updateDemoUsers()
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
