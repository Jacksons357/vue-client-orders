<script lang="ts" setup>
import type { Orders } from '@/@types/orders'
import { fetchAllOrders } from '@/lib/orders/fetch-all-orders'
import {  useQuery } from '@tanstack/vue-query'

const { data, isLoading } = useQuery<Orders[]>({
  queryKey: ['orders'],
  queryFn: fetchAllOrders
})

</script>

<template>
  <VContainer>
    <VToolbar>
      <VToolbarTitle>ENCOMENDAS</VToolbarTitle>

      <VDivider
        class="mx-4"
        inset
        vertical
      />
      <VSpacer />
  
      <DialogForm />
    </VToolbar>


    <DataTable
      :is-loading="isLoading"
      :data="data || []"
    />
  </VContainer>
</template>
