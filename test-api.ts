// Test API endpoints
const API_BASE = "http://localhost:5000";

async function testAPI() {
  console.log("🧪 Testing API endpoints...\n");

  try {
    // Test RSVPs
    console.log("1. Testing /api/rsvps...");
    const rsvpsRes = await fetch(`${API_BASE}/api/rsvps`);
    const rsvps = await rsvpsRes.json();
    console.log(`   ✅ RSVPs: ${rsvps.length} items`);
    if (rsvps.length > 0) {
      console.log("   Sample:", JSON.stringify(rsvps[0], null, 2));
    }

    // Test Guestbook
    console.log("\n2. Testing /api/guestbook...");
    const guestbookRes = await fetch(`${API_BASE}/api/guestbook`);
    const guestbook = await guestbookRes.json();
    console.log(`   ✅ Guestbook: ${guestbook.length} items`);
    if (guestbook.length > 0) {
      console.log("   Sample:", JSON.stringify(guestbook[0], null, 2));
    }

    // Test Gallery
    console.log("\n3. Testing /api/gallery...");
    const galleryRes = await fetch(`${API_BASE}/api/gallery`);
    const gallery = await galleryRes.json();
    console.log(`   ✅ Gallery: ${gallery.length} items`);
    if (gallery.length > 0) {
      console.log("   Sample:", JSON.stringify(gallery[0], null, 2));
    }

    console.log("\n✅ All API tests completed!");
  } catch (error) {
    console.error("❌ Error testing API:", error);
    if (error instanceof Error) {
      console.error("   Message:", error.message);
    }
  }
}

testAPI();

