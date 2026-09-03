import { useState, FormEvent } from 'react';
import { useSiteContent } from '../hooks/useSiteContent';
import { sendBookingEmail, FALLBACK_EMAIL } from '../lib/web3forms';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { modal } = useSiteContent();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const botcheck = String(new FormData(e.currentTarget as HTMLFormElement).get('botcheck') ?? '');

    try {
      await sendBookingEmail(formData, botcheck);
      setStatus({ type: 'success', text: "Message sent! We'll be in touch within 24 hours." });
      setFormData({});
      setTimeout(onClose, 2500);
    } catch (err) {
      console.error('Web3Forms error:', err);
      setStatus({
        type: 'error',
        text: `Failed to send. Please email us directly at ${FALLBACK_EMAIL}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <button
        className="absolute top-5 right-5 text-3xl text-muted cursor-pointer transition-colors hover:text-white bg-transparent border-none w-10 h-10 flex items-center justify-center"
        onClick={onClose}
      >
        &times;
      </button>

      <div className="mb-8">
        <h2 className="font-heading text-[clamp(28px,5vw,42px)] font-black uppercase text-white leading-[1.1] mb-3">
          {modal.title}
        </h2>
        <p className="text-[13px] text-muted font-light leading-[1.6]">{modal.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Honeypot: hidden from humans, Web3Forms drops submissions that fill it. */}
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {modal.fields.map(field => {
          if (field.type === 'select' && field.options) {
            return (
              <Select
                key={field.id}
                label={field.label}
                options={field.options}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.id] || ''}
                onChange={e => handleChange(field.id, e.target.value)}
              />
            );
          }
          if (field.type === 'textarea') {
            return (
              <Textarea
                key={field.id}
                label={field.label}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={e => handleChange(field.id, e.target.value)}
              />
            );
          }
          return (
            <Input
              key={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.id] || ''}
              onChange={e => handleChange(field.id, e.target.value)}
            />
          );
        })}

        {status && (
          <div className={`font-mono text-[11px] p-3 tracking-[0.05em] ${
            status.type === 'success'
              ? 'bg-accent/10 border border-accent text-accent'
              : 'bg-red/8 border border-red text-red'
          }`}>
            {status.text}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-accent text-black py-3.5 font-heading font-bold text-[13px] tracking-[0.1em] uppercase cursor-pointer border-2 border-accent transition-all hover:bg-transparent hover:text-accent disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : modal.submitLabel}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-transparent text-muted py-3.5 font-heading font-semibold text-[13px] tracking-[0.1em] uppercase cursor-pointer border border-border-bright transition-all hover:border-white hover:text-white"
          >
            {modal.cancelLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}
