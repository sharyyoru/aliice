import { sql } from "@vercel/postgres";
import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, clinicName, clinicSize, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !clinicName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create table if not exists
    await sql`
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
      )
    `;

    // Insert registration
    await sql`
      INSERT INTO registrations (first_name, last_name, email, phone, clinic_name, clinic_size, message)
      VALUES (${firstName}, ${lastName}, ${email}, ${phone || null}, ${clinicName}, ${clinicSize || null}, ${message || null})
    `;

    // Send notification email
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Aliice <onboarding@resend.dev>",
        to: "wilson@mutant.ae",
        subject: `New Demo Request from ${firstName} ${lastName}`,
        html: `
          <h2>New Demo Request</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Clinic Name:</strong> ${clinicName}</p>
          <p><strong>Clinic Size:</strong> ${clinicSize || "Not provided"}</p>
          <p><strong>Message:</strong> ${message || "No message"}</p>
          <hr />
          <p style="color: #666; font-size: 12px;">This email was sent from the Aliice landing page registration form.</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}
