const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const usersToDelete = ["UserA", "UserB", "Test"];

const newDemoUsers = [
  {
    email: "emma.davis@demo.com",
    password: "$2b$12$dummyHashForDemoUser123456789012345678901234567890",
    firstName: "Emma",
    lastName: "Davis",
    gender: "FEMALE",
    bio: "Digital artist & traveler.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    birthDate: new Date("1995-06-15"),
    preference: "EVERYONE",
  },
  {
    email: "ryan.cooper@demo.com",
    password: "$2b$12$dummyHashForDemoUser123456789012345678901234567890",
    firstName: "Ryan",
    lastName: "Cooper",
    gender: "MALE",
    bio: "Entrepreneur & coffee lover.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    birthDate: new Date("1992-03-22"),
    preference: "EVERYONE",
  },
];

async function finalizeDemoUsers() {
  console.log("🧹 Starting demo user cleanup and finalization...\n");

  // Step 1: Delete test users
  console.log("Step 1: Deleting test users...");
  for (const firstName of usersToDelete) {
    try {
      const deleted = await prisma.user.deleteMany({
        where: {
          firstName: firstName,
        },
      });

      if (deleted.count > 0) {
        console.log(
          `✅ Deleted ${deleted.count} user(s) with firstName: ${firstName}`,
        );
      } else {
        console.log(`⚠️  No user found with firstName: ${firstName}`);
      }
    } catch (error) {
      console.error(`❌ Error deleting ${firstName}:`, error.message);
    }
  }

  console.log("\n");

  // Step 2: Create new demo users
  console.log("Step 2: Creating new demo users...");
  for (const user of newDemoUsers) {
    try {
      // Check if user already exists
      const existing = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existing) {
        console.log(
          `⚠️  User ${user.firstName} ${user.lastName} already exists (${user.email})`,
        );
        continue;
      }

      const created = await prisma.user.create({
        data: user,
      });

      console.log(
        `✅ Created user: ${created.firstName} ${created.lastName} (${created.email})`,
      );
    } catch (error) {
      console.error(
        `❌ Error creating ${user.firstName} ${user.lastName}:`,
        error.message,
      );
    }
  }

  console.log("\n✨ Demo user finalization completed!");
  console.log("\n📊 Summary:");
  console.log(`   - Deleted test users: ${usersToDelete.join(", ")}`);
  console.log(`   - Added new demo users: Emma Davis, Ryan Cooper`);
}

finalizeDemoUsers()
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
