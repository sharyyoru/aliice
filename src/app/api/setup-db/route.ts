import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Create the registrations table using raw SQL
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS registrations (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          clinic_name VARCHAR(255) NOT NULL,
          clinic_size VARCHAR(50),
          message TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    if (error) {
      // Try direct insert to check if table exists
      const { error: checkError } = await supabase
        .from('registrations')
        .select('id')
        .limit(1);
      
      if (checkError && checkError.code === '42P01') {
        return NextResponse.json({ 
          error: "Table doesn't exist. Please create it manually in Supabase SQL Editor.",
          sql: `CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  clinic_name VARCHAR(255) NOT NULL,
  clinic_size VARCHAR(50),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
        }, { status: 400 });
      }
      
      return NextResponse.json({ message: "Table already exists or was created", checkError });
    }

    return NextResponse.json({ success: true, message: "Table created successfully" });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json({ error: "Setup failed" }, { status: 500 });
  }
}
