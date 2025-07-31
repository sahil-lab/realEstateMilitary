// Simple test script to verify the API is working
const API_BASE = 'http://localhost:3001';

async function testAPI() {
    console.log('🧪 Testing Military Veteran Real Estate API...\n');

    try {
        // Test 1: Check if server is running
        console.log('1. Testing server connection...');
        const response = await fetch(`${API_BASE}/api/properties`);
        if (response.ok) {
            console.log('✅ Server is running and responding');
            const properties = await response.json();
            console.log(`📊 Found ${properties.length} properties in database\n`);
        } else {
            console.log('❌ Server connection failed');
            return;
        }

        // Test 2: Test super admin registration
        console.log('2. Testing super admin registration...');
        try {
            const superAdminResponse = await fetch(`${API_BASE}/api/auth/superAdminRegister`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Super Admin',
                    email: 'superadmin@gmail.com',
                    password: 'abCD123@'
                })
            });

            if (superAdminResponse.ok) {
                const result = await superAdminResponse.json();
                console.log('✅ Super admin registered successfully');
                console.log(`🔑 Token received: ${result.token.substring(0, 20)}...\n`);
            } else {
                const error = await superAdminResponse.json();
                console.log(`⚠️  ${error.message || 'Super admin registration failed'}\n`);
            }
        } catch (err) {
            console.log(`⚠️  Super admin might already exist: ${err.message}\n`);
        }

        // Test 3: Test frontend files
        console.log('3. Testing frontend files...');
        const indexResponse = await fetch(`${API_BASE}/index.html`);
        if (indexResponse.ok) {
            console.log('✅ Frontend files are being served correctly');
            console.log(`🌐 Main website: ${API_BASE}/index.html`);
            console.log(`📝 Registration: ${API_BASE}/registration.html\n`);
        } else {
            console.log('❌ Frontend files not accessible\n');
        }

        console.log('🎉 API testing complete!');
        console.log('\n📋 Next Steps:');
        console.log('1. Open http://localhost:3001/index.html in your browser');
        console.log('2. Test the registration and login features');
        console.log('3. Use the WhatsApp and contact form functionality');
        console.log('4. Deploy to Vercel when ready');

    } catch (error) {
        console.log('❌ Error testing API:', error.message);
        console.log('\n💡 Make sure to:');
        console.log('1. Start the server: cd backend && npm start');
        console.log('2. Check your .env file has the correct MongoDB URI');
        console.log('3. Ensure Node.js and npm are installed');
    }
}

// Run the test
testAPI(); 