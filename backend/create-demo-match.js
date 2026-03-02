const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createDemoMatch() {
  console.log("💕 Creating demo match...\n");

  try {
    // Step 1: Find Hasham user
    console.log("Step 1: Finding Hasham user...");
    const hashamUser = await prisma.user.findFirst({
      where: {
        firstName: "Hasham",
      },
    });

    if (!hashamUser) {
      console.error("❌ Hasham user not found");
      return;
    }
    console.log(
      `✅ Found Hasham: ${hashamUser.firstName} (${hashamUser.email})`,
    );

    // Step 2: Find Lily Johnson
    console.log("\nStep 2: Finding Lily Johnson...");
    const lilyUser = await prisma.user.findFirst({
      where: {
        firstName: "Lily",
        lastName: "Johnson",
      },
    });

    if (!lilyUser) {
      console.error("❌ Lily Johnson not found");
      return;
    }
    console.log(
      `✅ Found Lily: ${lilyUser.firstName} ${lilyUser.lastName} (${lilyUser.email})`,
    );

    // Step 3: Check if match already exists
    console.log("\nStep 3: Checking for existing match...");
    const [user1Id, user2Id] =
      hashamUser.id < lilyUser.id
        ? [hashamUser.id, lilyUser.id]
        : [lilyUser.id, hashamUser.id];

    const existingMatch = await prisma.match.findUnique({
      where: {
        user1Id_user2Id: {
          user1Id,
          user2Id,
        },
      },
    });

    if (existingMatch) {
      console.log("⚠️  Match already exists between Hasham and Lily Johnson");
      console.log(`   Match ID: ${existingMatch.id}`);
      console.log(`   Created at: ${existingMatch.createdAt}`);
      return;
    }

    // Step 4: Create the match
    console.log("\nStep 4: Creating match...");
    const match = await prisma.match.create({
      data: {
        user1Id,
        user2Id,
      },
    });

    console.log(`✅ Match created successfully!`);
    console.log(`   Match ID: ${match.id}`);
    console.log(`   User 1: ${hashamUser.firstName}`);
    console.log(`   User 2: ${lilyUser.firstName} ${lilyUser.lastName}`);
    console.log(`   Created at: ${match.createdAt}`);

    console.log("\n✨ Demo match creation completed!");
  } catch (error) {
    console.error("❌ Error creating demo match:", error.message);
  }
}

createDemoMatch()
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
