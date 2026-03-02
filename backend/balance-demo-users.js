const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const usersToDelete = ["UserC"];

const newMaleUsers = [
  {
    email: "ethan.walker@demo.com",
    password: "$2b$12$dummyHashForDemoUser123456789012345678901234567890",
    firstName: "Ethan",
    lastName: "Walker",
    gender: "MALE",
    bio: "Travel blogger & adventure seeker.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3",
    birthDate: new Date("1993-08-12"),
    preference: "EVERYONE",
  },
  {
    email: "lucas.bennett@demo.com",
    password: "$2b$12$dummyHashForDemoUser123456789012345678901234567890",
    firstName: "Lucas",
    lastName: "Bennett",
    gender: "MALE",
    bio: "Tech enthusiast & gym lover.",
    profileImageUrl:
      "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f",
    birthDate: new Date("1994-11-03"),
    preference: "EVERYONE",
  },
];

async function balanceDemoUsers() {
  console.log("⚖️  Starting demo user balancing...\n");

  // Step 1: Delete UserC
  console.log("Step 1: Deleting test user...");
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

  // Step 2: Create new male demo users
  console.log("Step 2: Creating new male demo users...");
  for (const user of newMaleUsers) {
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

  console.log("\n");

  // Step 3: Verify balance
  console.log("Step 3: Verifying gender balance...");
  try {
    const maleCount = await prisma.user.count({
      where: { gender: "MALE", deletedAt: null },
    });

    const femaleCount = await prisma.user.count({
      where: { gender: "FEMALE", deletedAt: null },
    });

    console.log(`👨 Male users: ${maleCount}`);
    console.log(`👩 Female users: ${femaleCount}`);
  } catch (error) {
    console.error("❌ Error verifying balance:", error.message);
  }

  console.log("\n✨ Demo user balancing completed!");
  console.log("\n📊 Summary:");
  console.log(`   - Deleted: ${usersToDelete.join(", ")}`);
  console.log(`   - Added: Ethan Walker, Lucas Bennett`);
  console.log(`   - Goal: 3 women + 3 men for balanced explore page`);
}

balanceDemoUsers()
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
