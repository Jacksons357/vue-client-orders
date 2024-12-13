<script setup lang="ts">
import type { Orders } from '@/@types/orders'
import { removeOrderById } from '@/lib/orders/remove-order-by-id';
import { updateClientStatus } from '@/lib/orders/update-client-status';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import dayjs from 'dayjs'
import type { VDataTable } from 'vuetify/components';

const dataTableProps = defineProps<{
  data: Orders[],
  isLoading: boolean
}>()

type HeadersType = InstanceType<typeof VDataTable>['$props']['headers']

const headers: HeadersType = [
  { key: 'created_at', title: 'Data', sortable: true, align: 'start' },
  { key: 'product', title: 'Produto', sortable: false, align: 'start' },
  { key: 'client', title: 'Cliente', sortable: false, align: 'start' },
  { key: 'contact', title: 'Contato', sortable: false, align: 'start' },
  { key: 'status', title: 'Status', sortable: true, align: 'start' },
  { key: 'actions', title: 'Ações', sortable: false, align: 'center' },
]

const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref<'success' | 'error'>('success')

const queryClient = useQueryClient()

const { mutate: updateSatusMutate } = useMutation({
  mutationFn: updateClientStatus,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] })

    showSuccessAlert('Status atualizado com sucesso!')
  },
  onError: () => {
    alertMessage.value = 'Erro ao atualizar o status!'
    alertType.value = 'error'
    showAlert.value = true
  }
})

const { mutate: removeOrderMutate } = useMutation({
  mutationFn: removeOrderById,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] })

    showSuccessAlert('Encomenda deletada com sucesso!')
  },
  onError: () => {
    showErrorAlert('Erro ao remover a encomenda')
  }
})

function closeAlert(){
  showAlert.value = false
}

function handleUpdateStatus(item: Orders){
  const currentClientId = item.id

  if(item.status === false){
    updateSatusMutate(currentClientId)
  }

  if(item.status === true){
    showErrorAlert('Encomenda já foi atualizada!')
  }
}

function handleDeleteOrder(item: Orders){
  const currentClientId = item.id

  removeOrderMutate(currentClientId)
}

function showSuccessAlert(message: string) {
  alertMessage.value = message
  alertType.value = 'success'
  showAlert.value = true
}

function showErrorAlert(message: string) {
  alertMessage.value = message
  alertType.value = 'error'
  showAlert.value = true
}
</script>

<template>
  <VAlert
    v-if="showAlert"
    :type="alertType"
    closable
    @click:close="closeAlert"
  >
    {{ alertMessage }}
  </VAlert>

  <VDataTable
    :headers="headers"
    :items="dataTableProps.data"
    :loading="isLoading"
    loading-text="Carregando... segura a barra ai parceiro(a)!"
    :sort-by="[{ key: 'status', order: 'asc' }]"
  >
    <template 
      #item.created_at="{ item }"
    >
      {{ dayjs(item.created_at).format('DD/MM') }}
    </template>

    <template 
      #item.status="{ item }"
    >
      <span
        :style="{ color: item.status ? 'green' : 'orange'}"
      >
        {{ item.status ? 'Realizado' : 'Pendente' }}
      </span>
    </template>

    <template #item.actions="{item}">
      <VIcon
        class="me-2"
        size="large"
        color="green"
        @click="handleUpdateStatus(item)"
      >
        mdi-check-circle
      </VIcon>

      <VIcon
        class="me-2"
        size="large"
        color="red"
        @click="handleDeleteOrder(item)"
      >
        mdi-delete
      </VIcon>
    </template>
  </VDataTable>
</template>