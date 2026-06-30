import { useState } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { TabBar } from '../../ui/TabBar';

export function SolutionsSection() {
  const { solutions } = useSiteContent();
  const [activeTab, setActiveTab] = useState(solutions.tabs[0].id);

  const activePanel = solutions.panels.find(p => p.id === activeTab);

  return (
    <section id="solutions" className="border-t border-border grid grid-cols-[280px_1fr] max-md:grid-cols-1">
      <TabBar
        tabs={solutions.tabs}
        activeId={activeTab}
        onSelect={setActiveTab}
        className="ai-tabs border-b border-border max-md:border-r-0 max-md:grid max-md:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1"
      />
      <div className="p-16 min-h-[480px] max-md:p-6 max-md:min-h-0">
        {activePanel && (
          <SolutionPanel
            key={activePanel.id}
            tag={activePanel.tag}
            heading={activePanel.heading}
            body={activePanel.body}
            mockupLines={activePanel.mockupLines}
          />
        )}
      </div>
    </section>
  );
}

function SolutionPanel({ tag, heading, body, mockupLines }: {
  tag: string;
  heading: string;
  body: string;
  mockupLines: { speaker: string; text: string; highlight?: boolean; dim?: boolean }[];
}) {
  return (
    <div>
      <div className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase mb-5">{tag}</div>
      <h3 className="font-heading font-black text-[clamp(36px,4vw,56px)] uppercase leading-[0.95] mb-6">{heading}</h3>
      <p className="text-sm leading-[1.8] text-muted max-w-[480px] mb-10">{body}</p>
      <div className="ai-mockup bg-bg-3 border border-border-bright p-6 font-mono text-[11px] leading-[1.8] text-muted relative overflow-hidden">
        <div className="text-muted-2 mb-4 tracking-widest">&bull; &bull; &bull;</div>
        {mockupLines.map((line, i) => (
          <div key={i}>
            {line.speaker && (
              <span className={line.highlight ? 'text-accent' : ''}>{line.speaker}</span>
            )}
            {' '}
            <span className={
              line.dim ? 'text-muted-2' :
              line.highlight ? 'text-accent' : ''
            }>
              {line.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
