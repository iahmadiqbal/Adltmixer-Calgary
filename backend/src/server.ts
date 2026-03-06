import { app } from "./app";
import { env } from "./config/env";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 Environment: ${env.NODE_ENV}`);
  console.log(
    `🔗 Frontend URL: ${env.FRONTEND_URL || "Not set (allowing all origins)"}`,
  );
  console.log(`✅ Server is ready to accept connections`);
});
