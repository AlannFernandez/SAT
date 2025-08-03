import { supabase } from "@/supabaseClient";
import sha256 from "crypto-js/sha256";

export async function loginUser(email: string, password: string) {
  const password_hash = sha256(password).toString();
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email")
    .eq("email", email)
    .eq("password_hash", password_hash)
    .single();
  return { data, error };
}

export async function registerUser(name: string, email: string, password: string) {
  const password_hash = sha256(password).toString();
  const { error } = await supabase.from("users").insert({
    name,
    email,
    password_hash,
  });
  return { error };
}
