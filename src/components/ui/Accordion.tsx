"use client";

import { useId, useState } from "react";
import { Icon } from "./Icon";

export interface AccordionItem {
  id: string;
  q: string;
  a: string;
}

/** WAI-ARIA accordion pattern: buttons with aria-expanded + aria-controls, regions labelled by their header. */
export function Accordion({ items, light = false }: { items: AccordionItem[]; light?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const uid = useId();
  const border = light ? "border-ink/12" : "border-graphite";

  return (
    <div className={`border-t ${border}`}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const btnId = `${uid}-${item.id}-btn`;
        const panelId = `${uid}-${item.id}-panel`;
        return (
          <div key={item.id} className={`border-b ${border}`}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className={`text-[1.0625rem] font-semibold leading-snug transition-colors ${light ? "group-hover:text-deep-teal" : "group-hover:text-turquoise"}`}>
                  {item.q}
                </span>
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    light ? "border-ink/20 text-deep-teal" : "border-champagne/50 text-champagne"
                  } ${isOpen ? "rotate-45" : ""}`}
                >
                  <Icon name="plus" className="h-3.5 w-3.5" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-7 pr-12"
            >
              <p className={`max-w-[68ch] leading-relaxed ${light ? "text-slate" : "text-mist"}`}>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
