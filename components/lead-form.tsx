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

export function LeadForm({ market }: { market: MarketName }) {
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
    return (
      <section className="form-success" aria-live="polite">
        <CheckCircle2 />
        <p className="kicker">Request received</p>
        <h2>Thank you. We have your details.</h2>
        <p>Providence can now follow up about your {market === 'ghana' ? 'TV box or service request' : 'telecom or business inquiry'}.</p>
        <Button type="button" variant="outline" onClick={() => setState('idle')}>Send another request</Button>
      </section>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <label>Full name<span aria-hidden="true">*</span><Input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your name" /></label>
        <label>Email address<Input name="email" type="email" autoComplete="email" maxLength={160} placeholder="you@example.com" /></label>
      </div>
      <div className="form-row">
        <label>Phone number<Input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder={market === 'ghana' ? '+233…' : '+1…'} /></label>
        <label>How can we help?<span aria-hidden="true">*</span>
          <NativeSelect name="interest" required defaultValue={initialInterest}>
            <option value="" disabled>Select an option</option>
            {content.contactOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </NativeSelect>
        </label>
      </div>
      <label className="form-full">Tell us a little more<Textarea name="message" rows={5} maxLength={1500} placeholder="Add any helpful details, timing, or questions." /></label>
      <label className="honeypot" aria-hidden="true">Company website<Input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent-row">
        <input type="checkbox" name="consent" required />
        <span>I consent to Providence using these details to respond to my inquiry. I understand that submitting this form does not create a service agreement.</span>
      </label>
      <div className="form-submit-row">
        <Button type="submit" disabled={state === 'sending'}>{state === 'sending' ? <><LoaderCircle className="spin" /> Sending…</> : <>Send request <Send /></>}</Button>
        <small>Please include either an email address or phone number so we can respond.</small>
      </div>
      {state === 'error' && <p className="form-error" role="alert"><TriangleAlert />{error}</p>}
    </form>
  );
}
