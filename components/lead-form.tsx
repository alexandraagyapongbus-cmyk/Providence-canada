'use client';

import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, LoaderCircle, Send, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { markets, type MarketName } from '@/lib/content';

type FormState = 'idle' | 'sending' | 'success' | 'error';
export type LeadFormMode = 'general' | 'organization' | 'worker';

const roleOptions = ['Personal support worker (PSW)', 'Registered practical nurse (RPN)', 'Registered nurse (RN)', 'Support worker', 'Other healthcare or care-support role'];
const settingOptions = ['Retirement or long-term care', 'Hospice or hospital', 'Home or community care', 'Open to suitable settings'];

export function LeadForm({ market, mode = 'general' }: { market: MarketName; mode?: LeadFormMode }) {
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const content = markets[market];
  const requestedInterest = searchParams.get('interest') || '';
  const initialInterest = content.contactOptions.some((option) => option === requestedInterest) ? requestedInterest : '';

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');
    setError('');
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, market, consent: payload.consent === 'on' }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || 'We could not send your request.');
      form.reset();
      setState('success');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'We could not send your request. Please try again.');
      setState('error');
    }
  }

  if (state === 'success') {
    const success = mode === 'organization'
      ? { eyebrow: 'Staffing inquiry received', title: 'Thank you. We have your staffing details.', copy: 'Providence will review the role, location, schedule, and timing you shared, then follow up about a practical next step.' }
      : mode === 'worker'
        ? { eyebrow: 'Interest received', title: 'Thank you. We have your details.', copy: 'Providence will review your qualifications, availability, and work interests. Submitting this form does not guarantee a role or placement.' }
        : { eyebrow: 'Request received', title: 'Thank you. We have your details.', copy: `Providence can now follow up about your ${market === 'ghana' ? 'TV box or service request' : 'Canada inquiry'}.` };

    return (
      <section className="form-success" aria-live="polite">
        <CheckCircle2 />
        <p className="kicker">{success.eyebrow}</p>
        <h2>{success.title}</h2>
        <p>{success.copy}</p>
        <Button type="button" variant="outline" onClick={() => setState('idle')}>Send another request</Button>
      </section>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <input type="hidden" name="submissionType" value={mode} />
      {mode === 'organization' && <input type="hidden" name="interest" value="Find staff for a care organization" />}
      {mode === 'worker' && <input type="hidden" name="interest" value="Explore healthcare work opportunities" />}

      {mode === 'organization' && <>
        <div className="form-row">
          <label>Organization name<span aria-hidden="true">*</span><Input name="organizationName" autoComplete="organization" required maxLength={140} placeholder="Organization or care provider" /></label>
          <label>Your name<span aria-hidden="true">*</span><Input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Primary contact" /></label>
        </div>
        <div className="form-row">
          <label>Work email<Input name="email" type="email" autoComplete="email" maxLength={160} placeholder="you@organization.ca" /></label>
          <label>Phone number<Input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+1…" /></label>
        </div>
        <div className="form-row">
          <label>Role needed<span aria-hidden="true">*</span><NativeSelect name="role" required defaultValue=""><option value="" disabled>Select a role</option>{roleOptions.map((option) => <option key={option}>{option}</option>)}</NativeSelect></label>
          <label>Location<span aria-hidden="true">*</span><Input name="location" required maxLength={120} placeholder="City or Ontario region" /></label>
        </div>
        <div className="form-row">
          <label>Schedule or shift pattern<NativeSelect name="availability" defaultValue=""><option value="">Not sure yet</option><option>Days</option><option>Evenings</option><option>Nights</option><option>Weekends</option><option>Mixed or rotating</option></NativeSelect></label>
          <label>When do you need support?<NativeSelect name="timing" defaultValue=""><option value="">Select timing</option><option>As soon as possible</option><option>Within 2–4 weeks</option><option>Within 1–3 months</option><option>Planning ahead</option></NativeSelect></label>
        </div>
        <label className="form-full">Staffing need<Textarea name="message" rows={4} maxLength={1500} placeholder="Approximate number of workers, shift details, duration, and anything important about the setting." /></label>
      </>}

      {mode === 'worker' && <>
        <div className="form-row">
          <label>Full name<span aria-hidden="true">*</span><Input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your name" /></label>
          <label>Your role<span aria-hidden="true">*</span><NativeSelect name="role" required defaultValue=""><option value="" disabled>Select your role</option>{roleOptions.map((option) => <option key={option}>{option}</option>)}</NativeSelect></label>
        </div>
        <div className="form-row">
          <label>Email address<Input name="email" type="email" autoComplete="email" maxLength={160} placeholder="you@example.com" /></label>
          <label>Phone number<Input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+1…" /></label>
        </div>
        <div className="form-row">
          <label>Ontario location<span aria-hidden="true">*</span><Input name="location" required maxLength={120} placeholder="City or region" /></label>
          <label>Availability<NativeSelect name="availability" defaultValue=""><option value="">Tell us your availability</option><option>Full-time</option><option>Part-time</option><option>Casual or relief</option><option>Flexible</option></NativeSelect></label>
        </div>
        <div className="form-row">
          <label>Preferred setting<NativeSelect name="preferredSetting" defaultValue=""><option value="">No preference</option>{settingOptions.map((option) => <option key={option}>{option}</option>)}</NativeSelect></label>
          <label>When could you start?<Input name="timing" maxLength={100} placeholder="For example, immediately or October" /></label>
        </div>
        <label className="form-full">Qualifications and experience<span aria-hidden="true">*</span><Textarea name="qualifications" required rows={4} maxLength={1500} placeholder="Summarize your credentials, relevant experience, and any current registrations or certifications." /></label>
        <label className="form-full">Anything else we should know?<Textarea name="message" rows={3} maxLength={1000} placeholder="Work preferences, scheduling notes, or questions." /></label>
      </>}

      {mode === 'general' && <>
        <div className="form-row">
          <label>Full name<span aria-hidden="true">*</span><Input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your name" /></label>
          <label>Email address<Input name="email" type="email" autoComplete="email" maxLength={160} placeholder="you@example.com" /></label>
        </div>
        <div className="form-row">
          <label>Phone number<Input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder={market === 'ghana' ? '+233…' : '+1…'} /></label>
          <label>How can we help?<span aria-hidden="true">*</span><NativeSelect name="interest" required defaultValue={initialInterest}><option value="" disabled>Select an option</option>{content.contactOptions.map((option) => <option key={option} value={option}>{option}</option>)}</NativeSelect></label>
        </div>
        <label className="form-full">Tell us a little more<Textarea name="message" rows={5} maxLength={1500} placeholder="Add any helpful details, timing, or questions." /></label>
      </>}

      <label className="honeypot" aria-hidden="true">Company website<Input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent-row">
        <input type="checkbox" name="consent" required />
        <span>I consent to Providence using these details to respond to my inquiry. I understand that submitting this form does not create a service, staffing, employment, or placement agreement.</span>
      </label>
      <div className="form-submit-row">
        <Button type="submit" disabled={state === 'sending'}>{state === 'sending' ? <><LoaderCircle className="spin" /> Sending…</> : <>Send request <Send /></>}</Button>
        <small>Please include either an email address or phone number so we can respond.</small>
      </div>
      {state === 'error' && <p className="form-error" role="alert"><TriangleAlert />{error}</p>}
    </form>
  );
}
