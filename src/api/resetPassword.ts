"use server";

export async function resetPasswordApi(email: string, newPassword: string) {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });

  const data = await res.json();

  if (!res.ok || data.status !== "success") {
    throw new Error(data.message || "Reset failed");
  }

  return data;
}
