'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type LeadType = 'custom_order' | 'advertise_inquiry' | 'general_contact';
export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'closed';

export interface CRMLead {
  id: string;
  type: LeadType;
  name: string;
  phone: string;
  email: string;
  details: string;
  fabricPreference?: string;
  occasionDate?: string;
  budgetQAR?: number;
  companyName?: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  reminderDate?: string;
}

export interface CRMCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalSpentQAR: number;
  ordersCount: number;
  isRepeat: boolean;
  tags: string[];
  notes: string;
  lastOrderDate: string;
  followUpReminder?: string;
}

const SEED_LEADS: CRMLead[] = [
  {
    id: 'lead-001',
    type: 'custom_order',
    name: 'مها الكواري (Maha Al-Kuwari)',
    phone: '+974 5511 2233',
    email: 'maha.alkuwari@example.qa',
    details: 'طلب تفصيل ثوب حرير مرسوم يدوياً لحفل زفاف في اللؤلؤة قطر، تفضيل درجات البيرغندي مع لمسات ذهبية عاجية.',
    fabricPreference: 'حرير طبيعي خالص (Silk)',
    occasionDate: '2026-11-20',
    budgetQAR: 2200,
    status: 'new',
    notes: 'تم استلام الطلب من نموذج التفصيل الخاص عبر الموقع.',
    createdAt: '2026-11-01T18:45:00Z',
    reminderDate: '2026-11-03',
  },
  {
    id: 'lead-002',
    type: 'advertise_inquiry',
    name: 'مريم السليطي - بوتيك العود القطري',
    phone: '+974 6622 3344',
    email: 'contact@oudboutique.qa',
    companyName: 'Boutique Al-Oud Qatar',
    details: 'الرغبة في حجز مساحة إعلانية برعاية (شريط الصفحة الرئيسية وسلوت المتجر) لمدة شهرين.',
    status: 'contacted',
    notes: 'تم الاتصال بالعميلة وإرسال باقة الرعايات.',
    createdAt: '2026-11-01T15:20:00Z',
    reminderDate: '2026-11-04',
  },
];

const SEED_CUSTOMERS: CRMCustomer[] = [
  {
    id: 'cust-001',
    name: 'سارة الدوسري',
    phone: '+974 5012 3456',
    email: 'sara.d@example.qa',
    totalSpentQAR: 4450,
    ordersCount: 3,
    isRepeat: true,
    tags: ['VIP', 'عميلة دائمة', 'محبة للحرير'],
    notes: 'تفضل الألوان الداكنة، طلبت التوصيل دائماً في الفترة المسائية بالريان.',
    lastOrderDate: '2026-10-28',
    followUpReminder: '2026-11-10',
  },
  {
    id: 'cust-002',
    name: 'ريم المنصوري',
    phone: '+974 5599 8877',
    email: 'reem.m@example.qa',
    totalSpentQAR: 1650,
    ordersCount: 1,
    isRepeat: false,
    tags: ['مناسبة خاصة', 'طلب جديد'],
    notes: 'أشادت بجودة خامة الفوال السويسري وسرعة الشحن في الدوحة.',
    lastOrderDate: '2026-11-01',
  },
];

const LEADS_STORAGE_KEY = 'burgundy_crm_leads';
const CUSTOMERS_STORAGE_KEY = 'burgundy_crm_customers';

interface CRMContextValue {
  leads: CRMLead[];
  customers: CRMCustomer[];
  addLead: (lead: Omit<CRMLead, 'id' | 'createdAt' | 'status' | 'notes'>) => void;
  updateLeadStatus: (id: string, status: LeadStatus, notes?: string) => void;
  updateLeadReminder: (id: string, reminderDate: string) => void;
  updateCustomerNotes: (id: string, notes: string, tags?: string[]) => void;
  exportCRMToCSV: () => void;
}

const CRMContext = createContext<CRMContextValue | null>(null);

export function CRMProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<CRMLead[]>(SEED_LEADS);
  const [customers, setCustomers] = useState<CRMCustomer[]>(SEED_CUSTOMERS);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedLeads = localStorage.getItem(LEADS_STORAGE_KEY);
        if (storedLeads) {
          const parsed = JSON.parse(storedLeads);
          if (Array.isArray(parsed) && parsed.length > 0) setLeads(parsed);
        }
        const storedCust = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
        if (storedCust) {
          const parsed = JSON.parse(storedCust);
          if (Array.isArray(parsed) && parsed.length > 0) setCustomers(parsed);
        }
      }
    } catch {}
  }, []);

  const saveLeads = (data: CRMLead[]) => {
    setLeads(data);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(data));
      }
    } catch {}
  };

  const saveCustomers = (data: CRMCustomer[]) => {
    setCustomers(data);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(data));
      }
    } catch {}
  };

  const addLead = useCallback(
    (newLeadInput: Omit<CRMLead, 'id' | 'createdAt' | 'status' | 'notes'>) => {
      const created: CRMLead = {
        ...newLeadInput,
        id: `lead-${Date.now().toString(36)}`,
        status: 'new',
        notes: 'طلب وارد جديد',
        createdAt: new Date().toISOString(),
      };
      saveLeads([created, ...leads]);
    },
    [leads]
  );

  const updateLeadStatus = useCallback(
    (id: string, status: LeadStatus, notes?: string) => {
      const updated = leads.map((lead) =>
        lead.id === id ? { ...lead, status, notes: notes !== undefined ? notes : lead.notes } : lead
      );
      saveLeads(updated);
    },
    [leads]
  );

  const updateLeadReminder = useCallback(
    (id: string, reminderDate: string) => {
      const updated = leads.map((lead) =>
        lead.id === id ? { ...lead, reminderDate } : lead
      );
      saveLeads(updated);
    },
    [leads]
  );

  const updateCustomerNotes = useCallback(
    (id: string, notes: string, tags?: string[]) => {
      const updated = customers.map((c) =>
        c.id === id ? { ...c, notes, tags: tags || c.tags } : c
      );
      saveCustomers(updated);
    },
    [customers]
  );

  const exportCRMToCSV = useCallback(() => {
    if (typeof window === 'undefined') return;
    const headers = ['ID', 'Type', 'Name', 'Phone', 'Email', 'Status', 'Date', 'Details', 'Notes'];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.type}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
      `"${(l.details || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `burgundy_crm_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [leads]);

  return (
    <CRMContext.Provider
      value={{
        leads,
        customers,
        addLead,
        updateLeadStatus,
        updateLeadReminder,
        updateCustomerNotes,
        exportCRMToCSV,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
}

export function useCRM(): CRMContextValue {
  const ctx = useContext(CRMContext);
  if (!ctx) {
    return {
      leads: SEED_LEADS,
      customers: SEED_CUSTOMERS,
      addLead: () => {},
      updateLeadStatus: () => {},
      updateLeadReminder: () => {},
      updateCustomerNotes: () => {},
      exportCRMToCSV: () => {},
    };
  }
  return ctx;
}
