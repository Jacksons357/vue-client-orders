<script setup lang="ts">
import type { Orders } from '@/@types/orders'
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
</script>

<template>
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
  </VDataTable>
</template>