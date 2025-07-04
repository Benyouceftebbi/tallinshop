"use client";

import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const total = searchParams.get("total");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4 py-12">
      <h1 className="text-3xl font-bold text-green-600 mb-4">✅ شكرا على طلبك!</h1>
      <p className="text-lg text-gray-700 mb-6">
        تم تسجيل طلبك بنجاح. سنتصل بك لتأكيد الطلب في أقرب وقت.
      </p>

      <div className="text-gray-600 space-y-2">
        <p><strong>📛 الاسم:</strong> {name}</p>
        <p><strong>📞 الهاتف:</strong> {phone}</p>
        <p><strong>💰 السعر الإجمالي:</strong> {total} دج</p>
      </div>
    </div>
  );
}