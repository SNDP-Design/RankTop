import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

export default function PricingSection({ onOpenApp }) {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Ideal for trying out automated keyword research and AI blog generation.",
      features: [
        "3 AI Articles per month",
        "AI Keyword Strategy & Clusters",
        "Google SERP & Meta Generator",
        "Basic Readability Analyzer",
        "Standard Export (Markdown/HTML)"
      ],
      popular: false,
      cta: "Get Started Free",
      actionTab: "studio"
    },
    {
      name: "Pro Plan",
      price: billingCycle === 'monthly' ? "$99" : "$79",
      period: "per month",
      description: "Complete autonomous SEO engine with unlimited publishing for growing brands.",
      features: [
        "Unlimited AI Blog Articles",
        "Automated Competitor Gap Analysis",
        "AI Overview & AEO Simulator Tool",
        "Direct CMS Sync (WordPress, Webflow, Shopify)",
        "Google Search Console & GA4 Integration",
        "Automated Visual Asset Generation",
        "Article JSON-LD Schema Markup",
        "No per-article fees or seat limits"
      ],
      popular: true,
      cta: "Start 7-Day Free Trial",
      actionTab: "studio"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored billing",
      description: "For agencies and multi-brand enterprises needing white-label reports.",
      features: [
        "Unlimited Client Workspaces",
        "White-Label Performance Reports",
        "Custom API & Webhook Integrations",
        "Dedicated SEO Strategist Account Manager",
        "Custom AI Brand Voice Training",
        "99.9% Uptime SLA Guarantee"
      ],
      popular: false,
      cta: "Contact Sales",
      actionTab: "studio"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold mb-3">Simple Flat-Rate Pricing</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight">
            Pay for growth, not headcount
          </p>
          <p className="mt-4 text-slate-400 text-base">
            No seat limits. No hidden per-article fees. 7-day free trial on Pro plan.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-brand-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-brand-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded font-mono">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-slate-900 border-2 border-brand-500 shadow-2xl shadow-brand-500/20 transform md:-translate-y-2'
                  : 'bg-slate-900/60 border border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-brand-400 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white font-outfit">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-outfit tracking-tight">{plan.price}</span>
                  <span className="text-xs text-slate-400 font-medium">/{plan.period}</span>
                </div>
                <p className="mt-3 text-xs text-slate-400 leading-relaxed">{plan.description}</p>

                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenApp(plan.actionTab)}
                className={`mt-8 w-full py-3.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white shadow-lg shadow-brand-500/25'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
