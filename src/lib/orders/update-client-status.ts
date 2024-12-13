import supabase from "../supabase";

export async function updateClientStatus(clientId: string | undefined){
  const { error } = await supabase
    .from('orders')
    .update({ status : true })
    .eq('id', clientId)

  if(error){
    console.error('Error to update client status: ', error.message)
    throw error
  }
}