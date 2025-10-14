import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '~/components/ui/accordion';
import { Section } from '~/components/layout/Section';
import { Container } from '~/components/layout/Container';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
  multiple?: boolean;
  className?: string;
}

export function FAQSection({
  title = 'Frequently Asked Questions',
  faqs,
  multiple = false,
  className = '',
}: FAQSectionProps) {
  return (
    <Section className={className}>
      <Container maxWidth="desktop">
        <div className="mx-auto max-w-3xl">
          {title && (
            <h2 className="mb-8 text-center font-big-caslon text-3xl font-medium tracking-wide md:text-4xl">
              {title}
            </h2>
          )}
          <Accordion type={multiple ? 'multiple' : 'single'} collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-gray-600">{faq.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  );
}
