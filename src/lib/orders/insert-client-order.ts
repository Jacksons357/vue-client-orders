import type { Orders } from "@/@types/orders";
import supabase from "../supabase";

export async function insertClientOrder(data: Orders){
  const { error } = await supabase
    .from('orders')
    .insert({
      client: data.client,
      contact: data.contact,
      product: data.product,
      status: false
    })

  if (error){
    console.error('Error to insert data: ', error.message)
  }
}