import supabase from "../supabase";

export async function removeOrderById(orderId: string | undefined){
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId)

  if(error){
    console.error('Error to remove order: ', error.message)
  }
}