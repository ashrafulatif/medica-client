import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Do I need an account to buy medicine?",
    answer:
      "You can browse without an account, but you need to sign in to add items to cart and place orders.",
  },
  {
    question: "What payment method is available?",
    answer:
      "Currently Medica supports Cash on Delivery (COD) at checkout for customer orders.",
  },
  {
    question: "How do I track my order?",
    answer:
      "After placing an order, you can view order details and status from your customer dashboard.",
  },
  {
    question: "Can I cancel an order?",
    answer:
      "Yes, cancellation is available for eligible orders from your dashboard before dispatch.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Use the Contact page form or email support@medica.com and our team will assist you.",
  },
];

export default function FAQSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="py-2 text-5xl font-bold">
          Frequently Asked <span className="text-muted-foreground">Questions</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Quick answers to the most common questions about Medica, orders, and
          support.
        </p>
      </div>

      <div className="mx-auto max-w-3xl rounded-xl border bg-card px-5 py-3 shadow-sm sm:px-6">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
