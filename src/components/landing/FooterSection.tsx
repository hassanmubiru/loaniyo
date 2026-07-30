'use client';

import React, { useState, FormEvent } from 'react';
import { Twitter, Github, Linkedin, Send } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COMPANY_LINKS = [
  { label: 'About', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Careers', href: '#' },
];

const SUPPORT_LINKS = [
  { label: 'Help Center', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Contact', href: '#' },
];

const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com/loaniyo', icon: Twitter },
  { label: 'GitHub', href: 'https://github.com/loaniyo', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/loaniyo', icon: Linkedin },
];

/**
 * Footer Section — comprehensive footer with logo, link groups,
 * newsletter signup, social icons, and copyright.
 *
 * Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7
 */
export function FooterSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setError('');
    setSubscribed(true);
  };

  return (
    <footer
      id="footer"
      className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo + Tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md shadow-green-600/25">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </span>
              <span className="font-heading font-bold text-2xl bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-emerald-500 bg-clip-text text-transparent">
                Loaniyo
              </span>
            </div>
            <p className="mt-4 text-muted dark:text-slate-400 text-sm leading-relaxed">
              Empowering individuals and businesses with fast, transparent digital lending solutions.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted dark:text-slate-400 hover:text-primary dark:hover:text-primary
                      transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted dark:text-slate-400 hover:text-primary dark:hover:text-primary
                      transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
              Newsletter
            </h3>
            {subscribed ? (
              <p className="text-success font-medium text-sm">
                Thank you for subscribing!
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-label="Newsletter subscription"
                noValidate
              >
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter your email"
                      aria-label="Email address"
                      aria-invalid={!!error}
                      aria-describedby={error ? 'newsletter-error' : undefined}
                      className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-slate-600
                        bg-white dark:bg-slate-800 text-gray-900 dark:text-white
                        placeholder:text-muted dark:placeholder:text-slate-500
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                        text-sm"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white font-semibold rounded-r-lg
                        hover:bg-primary/90 transition-colors
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                        text-sm"
                    >
                      Subscribe
                    </button>
                  </div>
                  {error && (
                    <p id="newsletter-error" className="text-red-500 text-xs" role="alert">
                      {error}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-gray-200 dark:border-slate-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-muted dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Loaniyo. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted dark:text-slate-400 hover:text-primary dark:hover:text-primary
                    transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
