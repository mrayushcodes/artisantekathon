import React, { useState } from 'react';
import {
  Users,
  MapPin,
  Package,
  Calendar,
  IndianRupee,
  CheckCircle2,
  X,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BuyerLead } from '@/types';

export const BuyersPage: React.FC = () => {
  const { buyerLeads, sendProposal, marketplaces, t, language } = useApp();
  const [selectedBuyer, setSelectedBuyer] = useState<BuyerLead | null>(null);
  const [proposalSentSuccess, setProposalSentSuccess] = useState(false);

  const handleOpenBuyerModal = (buyer: BuyerLead) => {
    setSelectedBuyer(buyer);
    setProposalSentSuccess(buyer.status === 'proposal_sent');
  };

  const handleSendProposal = (leadId: string) => {
    sendProposal(leadId);
    setProposalSentSuccess(true);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
          <Users size={14} /> Direct B2B Wholesale Market
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          {t('findBuyersTitle')}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-2xl">
          {t('findBuyersSubtitle')} Match with verified corporate buyers, export houses, and boutique retailers.
        </p>
      </div>

      {/* Buyer Leads Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-stone-900 tracking-tight">
            Matching Buyer Inquiries ({buyerLeads.length})
          </h3>
          <span className="text-xs font-semibold text-stone-500">
            Updated daily via Indian Handicraft Network
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {buyerLeads.map((buyer) => {
            const isSent = buyer.status === 'proposal_sent';
            return (
              <div
                key={buyer.id}
                className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                        {buyer.category}
                      </span>
                      <h4 className="text-lg font-black text-stone-900 mt-2">
                        {buyer.organization}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-emerald-600">
                        {buyer.matchScore}%
                      </span>
                      <span className="block text-[9px] font-bold uppercase text-stone-400">
                        Match
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                    <div>
                      <span className="text-stone-400 block font-semibold">Looking for:</span>
                      <strong className="text-stone-900">{buyer.lookingFor}</strong>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="rounded-xl bg-stone-50 p-2">
                        <span className="text-stone-400 block text-[10px]">Required Qty</span>
                        <strong className="text-stone-800">{buyer.quantity}</strong>
                      </div>
                      <div className="rounded-xl bg-stone-50 p-2">
                        <span className="text-stone-400 block text-[10px]">Location</span>
                        <strong className="text-stone-800 truncate block">{buyer.location}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-stone-100 pt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700">
                    {buyer.preferredPrice}
                  </span>

                  {isSent ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 size={13} /> Proposal Sent
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenBuyerModal(buyer)}
                      className="rounded-full bg-stone-900 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500 hover:text-stone-950 transition"
                    >
                      {t('viewInterest')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Government & Open Marketplaces Section */}
      <div className="rounded-3xl border border-stone-200 bg-stone-100/80 p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            {t('expandMarketTitle')}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
            Government & Open Commerce Networks
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-2xl">
            {t('expandMarketSub')}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {marketplaces.map((partner) => (
            <div
              key={partner.id}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{partner.logo}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                      partner.status === 'Integration Ready'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {partner.status}
                  </span>
                </div>
                <h4 className="font-black text-base text-stone-900">
                  {partner.name}
                </h4>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                  {partner.description}
                </p>

                <div className="mt-4 space-y-1 text-[11px] text-stone-500">
                  {partner.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-amber-500">✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-stone-100 pt-3">
                <span className="text-xs font-bold text-stone-400">
                  {partner.status === 'Integration Ready'
                    ? 'Active on KarigarSetu'
                    : 'Pilot Underway'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================== */}
      {/* BUYER INQUIRY MODAL */}
      {/* ========================================================== */}
      {selectedBuyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedBuyer(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-amber-700">
                <Building2 size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  {selectedBuyer.badge || 'Verified Buyer'}
                </span>
                <h3 className="text-xl font-black text-stone-900">
                  {selectedBuyer.organization}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
              {selectedBuyer.description}
            </p>

            {/* Inquiries Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-6">
              <div className="rounded-xl bg-stone-50 p-3">
                <span className="text-stone-400 block text-[10px]">Contact Person</span>
                <strong className="text-stone-900">{selectedBuyer.contactPerson}</strong>
              </div>
              <div className="rounded-xl bg-stone-50 p-3">
                <span className="text-stone-400 block text-[10px]">Target Requirement</span>
                <strong className="text-stone-900">{selectedBuyer.lookingFor}</strong>
              </div>
              <div className="rounded-xl bg-stone-50 p-3">
                <span className="text-stone-400 block text-[10px]">Required Quantity</span>
                <strong className="text-stone-900">{selectedBuyer.quantity}</strong>
              </div>
              <div className="rounded-xl bg-stone-50 p-3">
                <span className="text-stone-400 block text-[10px]">Target Purchase Price</span>
                <strong className="text-amber-700 font-black">{selectedBuyer.preferredPrice}</strong>
              </div>
              <div className="rounded-xl bg-stone-50 p-3">
                <span className="text-stone-400 block text-[10px]">Delivery Location</span>
                <strong className="text-stone-900">{selectedBuyer.location}</strong>
              </div>
              <div className="rounded-xl bg-stone-50 p-3">
                <span className="text-stone-400 block text-[10px]">Procurement Deadline</span>
                <strong className="text-stone-900">{selectedBuyer.deadline}</strong>
              </div>
            </div>

            {/* Action State */}
            {proposalSentSuccess ? (
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-center">
                <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-emerald-600 text-white">
                  <CheckCircle2 size={22} />
                </div>
                <h4 className="text-sm font-black text-emerald-900">
                  {t('proposalSent')}
                </h4>
                <p className="mt-1 text-xs text-emerald-700">
                  Your Phulkari catalog and wholesale quote have been transmitted to {selectedBuyer.organization}. The buyer will review and contact you within 24 hours.
                </p>
              </div>
            ) : (
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedBuyer(null)}
                  className="rounded-full border border-stone-300 px-5 py-2.5 text-xs font-bold text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSendProposal(selectedBuyer.id)}
                  className="flex items-center gap-2 rounded-full bg-stone-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-amber-500 hover:text-stone-950 transition shadow-md"
                >
                  <Send size={14} />
                  <span>{t('sendProduct')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
