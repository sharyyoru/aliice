import { createClient } from "@supabase/supabase-js";
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

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Insert registration into Supabase
    const { error: dbError } = await supabase.from("registrations").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
      clinic_name: clinicName,
      clinic_size: clinicSize || null,
      message: message || null,
    });

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save registration" },
        { status: 500 }
      );
    }

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
