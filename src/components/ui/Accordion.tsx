'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  defaultOpenId,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={twMerge('divide-y divide-peach-soft/60 border-y border-peach-soft/60', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-3.5">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-start text-sm font-semibold text-cocoa-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-warm rounded"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={clsx(
                  'w-4 h-4 text-cocoa-muted transition-transform duration-200 shrink-0 ms-2',
                  isOpen && 'rotate-180 text-coral-warm'
                )}
              />
            </button>
            {isOpen && (
              <div className="pt-2.5 pb-1 text-xs text-cocoa-muted leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
