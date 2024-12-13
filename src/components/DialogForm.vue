<script lang="ts" setup>
import { insertClientOrder } from '@/lib/orders/insert-client-order';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { z } from 'zod';

const queryClient = useQueryClient()

const dialog = ref(false)

const formSchema = toTypedSchema(
  z.object({
    client: z.string().min(1, { message: 'Deve informar o nome '}),
    contact: z.coerce.string().min(8, { message: 'Deve informar telefone para contato '}),
    product: z.string().min(2, { message: 'Deve informar o produto para encomenda'})
  })
)

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: formSchema
})

const client = useField('client')
const contact = useField('contact')
const product = useField('product')

const { mutate } = useMutation({
  mutationFn: insertClientOrder,
  onSuccess: () => {
    resetForm()
    dialog.value = false

    queryClient.invalidateQueries({ queryKey: ['orders'] })
  }
})

const onSubmit = handleSubmit(values => {
  mutate(values)
})
</script>

<template>
  <VDialog
    v-model="dialog"
    max-width="400"
  >
    <template #activator="{ props: activatorProps }">
      <VBtn 
        class="text-none font-weight-bold"
        prepend-icon="mdi-plus-circle"
        text="NOVA ENCOMENDA"
        variant="tonal"
        v-bind="activatorProps"
      />
    </template>
    <VForm @submit.prevent="onSubmit">
      <VCard
        prepend-icon="mdi-account"
        title="DADOS DO CLIENTE"
      >
        <VCardText>
          <VRow dense>
            <VCol
              cols="12"
              md="12"
              sm="6"
            >
              <VTextField
                v-model="client.value.value"
                :error-messages="errors.client"
                label="Nome do cliente"
                required
              />
            </VCol>
  
            <VCol
              cols="12"
              md="12"
              sm="6"
            >
              <VTextField
                v-model="contact.value.value"
                :error-messages="errors.contact"
                label="Telefone"
                required
              />
            </VCol>
  
            <VCol
              cols="12"
              md="12"
              sm="6"
            >
              <VTextField
                v-model="product.value.value"
                :error-messages="errors.product"
                label="Produto"
                required
              />
            </VCol>
          </VRow>
        </VCardText>
  
        <v-divider />
  
        <VCardActions>
          <VSpacer />
  
          <VBtn
            text="Close"
            variant="plain"
            @click="dialog = false"
          />
  
          <VBtn
            type="submit"
            color="primary"
            text="Save"
            variant="tonal"
          />
        </VCardActions>
      </VCard>
    </VForm>
  </VDialog>
</template>