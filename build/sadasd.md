```js
let a = 1
```

# 啊撒大声地

asdasdasdas 啊实打实阿萨德阿萨德

```vue
<template>
  <n-space>
    <n-button v-for="item in list">{{ item }}</n-button>
  </n-space>
</template>
<script setup>
const list = ref(['1', '2'])
</script>
```



# ASkdjhalkjsdh






```vue code
<template>
  <n-space vertical :size="12">
    <n-space>
      <n-button @click="sortName">Sort By Name (Ascend)</n-button>
      <n-button @click="filterAddress">Filter Address (London)</n-button>
      <n-button @click="clearFilters">Clear Filters</n-button>
      <n-button @click="clearSorter">Clear Sorter</n-button>
    </n-space>
    <n-data-table ref="table" :columns="columns" :data="data" :pagination="pagination" />
  </n-space>
</template>

<script>
import { defineComponent, ref } from 'vue'

const columns = [
  {
    title: 'Name',
    key: 'name',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Age',
    key: 'age',
    sorter: (row1, row2) => row1.age - row2.age
  },
  {
    title: 'Address',
    key: 'address',
    defaultFilterOptionValues: ['London', 'New York'],
    filterOptions: [
      {
        label: 'London',
        value: 'London'
      },
      {
        label: 'New York',
        value: 'New York'
      }
    ],
    filter(value, row) {
      return ~row.address.indexOf(value)
    }
  }
]

export default defineComponent({
  setup() {
    const tableRef = ref(null)

    return {
      table: tableRef,
      data,
      columns,
      pagination: { pageSize: 5 },
      filterAddress() {
        tableRef.value.filter({
          address: ['London']
        })
      },
      sortName() {
        tableRef.value.sort('name', 'ascend')
      },
      clearFilters() {
        tableRef.value.filter(null)
      },
      clearSorter() {
        tableRef.value.sort(null)
      }
    }
  }
})
</script>
```
