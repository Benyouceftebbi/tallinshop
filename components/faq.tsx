import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = [
  {
    question: "كيف يمكنني الطلب؟",
    answer:
      "يمكنك الطلب بسهولة عن طريق ملء نموذج الطلب في الأعلى. اختاري المقاس واللون، ثم أدخلي معلومات التوصيل الخاصة بك واضغطي على زر 'اطلبي الآن'.",
  },
  {
    question: "كم يستغرق التوصيل؟",
    answer: "يستغرق التوصيل عادة من 2 إلى 5 أيام عمل، حسب ولايتك. سنتواصل معك لتأكيد موعد التوصيل.",
  },
  {
    question: "هل يمكنني الدفع عند الاستلام؟",
    answer: "نعم، نوفر خدمة الدفع عند الاستلام في جميع الولايات. يمكنك الدفع لمندوب التوصيل عند استلام طلبك.",
  },
  {
    question: "هل يمكنني الاستبدال أو الإرجاع؟",
    answer:
      "بالتأكيد. إذا لم يكن المقاس مناسبًا أو في حالة وجود أي مشكلة، يمكنك طلب الاستبدال أو الإرجاع خلال 7 أيام من تاريخ الاستلام. يرجى مراجعة سياسة الاستبدال والإرجاع لمزيد من التفاصيل.",
  },
]

export function Faq() {
  return (
    <section className="py-20">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">أسئلة شائعة</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-right font-semibold text-lg">{item.question}</AccordionTrigger>
              <AccordionContent className="text-right text-gray-600 leading-relaxed">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
