import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { ArchitectureSecurity } from './components/ArchitectureSecurity';
import { EducatorAcademy } from './components/EducatorAcademy';
import { CaseStudies } from './components/CaseStudies';
import { CostCalculator } from './components/CostCalculator';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';
import { ClientPortalModal } from './components/ClientPortalModal';
import { PortalRole } from './types';

export default function App() {
  const [portalOpen, setPortalOpen] = useState<boolean>(false);
  const [portalRole, setPortalRole] = useState<PortalRole>('enterprise_client');
  const [prefilledScope, setPrefilledScope] = useState<string>('');

  const handleOpenPortal = (role: PortalRole = 'enterprise_client') => {
    setPortalRole(role);
    setPortalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectScope = (scopeSummary: string) => {
    setPrefilledScope(scopeSummary);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Primary Navigation Bar */}
      <Navbar 
        onOpenPortal={handleOpenPortal} 
        onNavigate={handleNavigate} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero 
          onOpenPortal={handleOpenPortal} 
          onNavigate={handleNavigate} 
        />

        {/* Core Capabilities & Asymmetric Bento */}
        <ServicesBento 
          onOpenPortal={handleOpenPortal} 
          onNavigate={handleNavigate} 
        />

        {/* Educator Academy: Primary & Secondary Teacher Training */}
        <EducatorAcademy 
          onOpenPortal={handleOpenPortal} 
          onNavigate={handleNavigate} 
        />

        {/* Architecture & Zero-Trust Cybersecurity */}
        <ArchitectureSecurity 
          onOpenPortal={handleOpenPortal} 
          onNavigate={handleNavigate} 
        />

        {/* Case Studies & Audited Results */}
        <CaseStudies 
          onOpenPortal={handleOpenPortal} 
          onNavigate={handleNavigate} 
        />

        {/* Scope & Cost Estimator */}
        <CostCalculator 
          onSelectScope={handleSelectScope} 
          onNavigate={handleNavigate} 
        />

        {/* Direct Consultation & Discovery Form */}
        <ConsultationForm 
          prefilledScope={prefilledScope} 
        />

      </main>

      {/* Structured Footer */}
      <Footer 
        onOpenPortal={handleOpenPortal} 
        onNavigate={handleNavigate} 
      />

      {/* Secure Client & Educator Portal Window */}
      <ClientPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        initialRole={portalRole}
      />

    </div>
  );
}
