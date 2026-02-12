import postgres from 'postgres';

const sql = postgres('postgres://postgres.npvohdynptkzmaetvrni:ahAiWaQP9MnHYkq2@aws-0-us-east-1.pooler.supabase.com:5432/postgres', {
  ssl: 'require'
});

async function createTable() {
  try {
    console.log('Connecting to database...');
    
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
    
    console.log('Table created successfully!');
    
    // Verify table exists
    const result = await sql`SELECT COUNT(*) FROM registrations`;
    console.log('Table verified, row count:', result[0].count);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sql.end();
  }
}

createTable();
