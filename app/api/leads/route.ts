import { env } from 'cloudflare:workers';

type LeadPayload = {
  market?: string;
  submissionType?: string;
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  organizationName?: string;
  role?: string;
  location?: string;
  availability?: string;
  timing?: string;
  preferredSetting?: string;
  qualifications?: string;
  consent?: boolean;
  website?: string;
};

const allowedInterests = {
  canada: ['Find staff for a care organization', 'Explore healthcare work opportunities', 'Healthcare staffing question', 'Internet or telecom inquiry', 'Telecom sales or marketing partnership', 'General inquiry'],
  ghana: ['Order a TV box', 'Request installation', 'Choose or renew a plan', 'Equipment support', 'General inquiry'],
};

export async function POST(request: Request) {
  try {
    const payload = await request.json() as LeadPayload;
    if (payload.website) return Response.json({ ok: true });

    const market = payload.market === 'canada' || payload.market === 'ghana' ? payload.market : '';
    const submissionType = payload.submissionType === 'organization' || payload.submissionType === 'worker' ? payload.submissionType : 'general';
    const name = String(payload.name || '').trim();
    const email = String(payload.email || '').trim().toLowerCase();
    const phone = String(payload.phone || '').trim();
    const interest = String(payload.interest || '').trim();
    const organizationName = String(payload.organizationName || '').trim();
    const role = String(payload.role || '').trim();
    const location = String(payload.location || '').trim();
    const availability = String(payload.availability || '').trim();
    const timing = String(payload.timing || '').trim();
    const preferredSetting = String(payload.preferredSetting || '').trim();
    const qualifications = String(payload.qualifications || '').trim();
    const originalMessage = String(payload.message || '').trim();

    if (!market) return Response.json({ error: 'Please choose a valid market.' }, { status: 400 });
    if (name.length < 2 || name.length > 100) return Response.json({ error: 'Please enter your full name.' }, { status: 400 });
    if (!email && !phone) return Response.json({ error: 'Please include an email address or phone number.' }, { status: 400 });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    if (email.length > 160 || phone.length > 40 || originalMessage.length > 1500 || organizationName.length > 140 || role.length > 120 || location.length > 120 || availability.length > 120 || timing.length > 120 || preferredSetting.length > 140 || qualifications.length > 1500) return Response.json({ error: 'One or more fields are too long.' }, { status: 400 });
    if (!allowedInterests[market].includes(interest)) return Response.json({ error: 'Please choose a valid inquiry type.' }, { status: 400 });
    if (market === 'ghana' && submissionType !== 'general') return Response.json({ error: 'Please choose a valid inquiry type.' }, { status: 400 });
    if (submissionType === 'organization' && (!organizationName || !role || !location)) return Response.json({ error: 'Please include the organization, role, and location.' }, { status: 400 });
    if (submissionType === 'worker' && (!role || !location || !qualifications)) return Response.json({ error: 'Please include your role, Ontario location, and qualifications.' }, { status: 400 });
    if (payload.consent !== true) return Response.json({ error: 'Please confirm that Providence may respond to your inquiry.' }, { status: 400 });

    const detailLines = [
      submissionType !== 'general' ? `Inquiry path: ${submissionType}` : '',
      organizationName ? `Organization: ${organizationName}` : '',
      role ? `Role: ${role}` : '',
      location ? `Location: ${location}` : '',
      availability ? `Availability or schedule: ${availability}` : '',
      timing ? `Timing: ${timing}` : '',
      preferredSetting ? `Preferred setting: ${preferredSetting}` : '',
      qualifications ? `Qualifications and experience: ${qualifications}` : '',
      originalMessage ? `Additional details: ${originalMessage}` : '',
    ].filter(Boolean);
    const message = detailLines.join('\n');

    const db = env.DB;
    if (!db) return Response.json({ error: 'The request service is temporarily unavailable.' }, { status: 503 });
    await db.batch([
      db.prepare(`CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        market TEXT NOT NULL CHECK (market IN ('canada', 'ghana')),
        name TEXT NOT NULL,
        email TEXT NOT NULL DEFAULT '',
        phone TEXT NOT NULL DEFAULT '',
        interest TEXT NOT NULL,
        message TEXT NOT NULL DEFAULT '',
        consent INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL
      )`),
      db.prepare('CREATE INDEX IF NOT EXISTS idx_leads_market_created_at ON leads (market, created_at)'),
    ]);
    await db.prepare('INSERT INTO leads (market, name, email, phone, interest, message, consent, created_at) VALUES (?, ?, ?, ?, ?, ?, 1, ?)')
      .bind(market, name, email, phone, interest, message, new Date().toISOString())
      .run();

    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: 'We could not save your request. Please try again.' }, { status: 500 });
  }
}
