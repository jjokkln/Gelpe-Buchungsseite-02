import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";

// Load .env from root
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
// Try .env.local as fallback
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// We need SERVICE_ROLE_KEY to bypass RLS and update roles if regular client fails, 
// BUT typically client-side update of role is blocked by RLS.
// We must check if user has SERVICE_ROLE_KEY in env, otherwise we can't force update easily server-side.
// The user likely only has ANON_KEY.
// If so, we might need to use an RPC or SQL via Dashboard.
// Let's assume they might have SUPABASE_SERVICE_ROLE_KEY in .env
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL");
    process.exit(1);
}

if (!supabaseServiceKey) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY. You need the Service Role Key to update user roles securely bypassing RLS.");
    console.log("Please add SUPABASE_SERVICE_ROLE_KEY to your .env file or run this SQL in your Supabase Dashboard:");
    console.log(`
    UPDATE profiles 
    SET role = 'admin' 
    WHERE email = 'YOUR_EMAIL@EXAMPLE.COM';
    `);
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
    const email = process.argv[2];
    if (!email) {
        console.error("Usage: npx tsx scripts/make-admin.ts <email>");
        process.exit(1);
    }

    console.log(`Promoting user ${email} to admin...`);

    // 1. Find user ID (optional, we can update by filtering profiles directly if joined, but profiles usually has ID matching Auth)
    // Actually profiles table usually is keyed by ID. We can't query profiles by email easily if email is not in profiles (it is in our schema).

    // Check if email exists in profiles
    const { data: profiles, error: findError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .single();

    if (findError || !profiles) {
        console.error("User not found in profiles table.", findError?.message);
        // Try to look up in auth.users? Service role can do that.
        const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
        const authUser = users.find(u => u.email === email);
        if (authUser) {
            console.log("Found in Auth but not Profiles. Creating profile/updating...");
            // Upsert profile
            const { error: upsertError } = await supabase.from("profiles").upsert({
                id: authUser.id,
                email: email,
                role: "admin",
                updated_at: new Date().toISOString()
            });
            if (upsertError) {
                console.error("Failed to upsert profile:", upsertError.message);
                process.exit(1);
            }
            console.log("Created/Updated profile with Admin role.");
            process.exit(0);
        }
        process.exit(1);
    }

    // 2. Update Role
    const { error: updateError } = await supabase
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", profiles.id);

    if (updateError) {
        console.error("Failed to update role:", updateError.message);
        process.exit(1);
    }

    console.log(`Success! User ${email} is now an Admin.`);
}

main();
