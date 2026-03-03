const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function testUpdate() {
  try {
    console.log("=== Testing Database Update ===");

    // First, get a user
    const users = await prisma.user.findMany({ take: 1 });

    if (users.length === 0) {
      console.log("No users found in database");
      return;
    }

    const user = users[0];
    console.log("Found user:", user.id, user.email);
    console.log("Current bio:", user.bio);

    // Update the bio
    const newBio = `Test bio updated at ${new Date().toISOString()}`;
    console.log("Updating bio to:", newBio);

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { bio: newBio },
    });

    console.log("Update successful!");
    console.log("New bio:", updated.bio);

    // Verify by reading again
    const verified = await prisma.user.findUnique({
      where: { id: user.id },
    });

    console.log("Verified bio from DB:", verified.bio);

    if (verified.bio === newBio) {
      console.log("✅ Database update is working correctly!");
    } else {
      console.log("❌ Database update failed - bio does not match");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testUpdate();
