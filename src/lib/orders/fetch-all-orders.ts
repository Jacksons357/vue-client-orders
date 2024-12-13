import type { Orders } from "@/@types/orders";
import supabase from "../supabase";

export async function fetchAllOrders(): Promise<Orders[]>{
  const { data } = await supabase
    .from('orders')
    .select()

  return data as Orders[]
}