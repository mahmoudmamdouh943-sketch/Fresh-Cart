"use server";

export async function verifyCodeApi(resetCode: string) {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resetCode }),
  });

  const data = await res.json();

  if (!res.ok || data.status !== "success") {
    throw new Error(data.message || "Invalid code");
  }

  return data;
}
