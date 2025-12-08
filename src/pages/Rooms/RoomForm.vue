<script setup lang="ts">
import { ref, watch } from 'vue'
import Input from '../../components/ui/Input.vue'
import Select from '../../components/ui/Select.vue'
import Button from '../../components/ui/Button.vue'
import type { RoomPayload } from '../../types/room'
import { required, isNumber, isPositive } from '../../utils/validators'

interface Props {
  initialData?: RoomPayload
}

const props = defineProps<Props>()
const emit = defineEmits(['submit'])

const number = ref('')
const type = ref('')
const price = ref('')

const errorMessage = ref('')

const roomTypes = [
  { label: 'Standard', value: 'Standard' },
  { label: 'Deluxe', value: 'Deluxe' },
  { label: 'Suite', value: 'Suite' }
]

watch(
  () => props.initialData,
  (data) => {
    if (data) {
      number.value = data.number
      type.value = data.type
      price.value = String(data.price)
    } else {
      // Si no hay datos → limpiar campos (modo crear)
      number.value = ''
      type.value = ''
      price.value = ''
    }
  },
  { immediate: true }
)

function validate() {
  if (!required(number.value)) return 'El número es obligatorio'
  if (!isNumber(number.value)) return 'El número debe ser numérico'

  if (!required(type.value)) return 'Debe seleccionar un tipo'

  if (!required(price.value)) return 'El precio es obligatorio'
  if (!isNumber(price.value)) return 'El precio debe ser numérico'
  if (!isPositive(price.value)) return 'El precio debe ser mayor a 0'

  return null
}

function submit() {
  const error = validate()
  if (error) {
    errorMessage.value = error
    return
  }

  emit('submit', {
    number: number.value,
    type: type.value,
    price: Number(price.value)
  })
}
</script>

<template>
  <div class="form">
    <Input label="Número" v-model="number" v-only-numbers />
    <Select label="Tipo" v-model="type" :options="roomTypes" />
    <Input label="Precio" v-model="price" type="number" v-only-numbers />

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <Button class="submit-btn" @click="submit">
      Guardar
    </Button>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}

.submit-btn {
  margin-top: var(--spacing-md);
}
</style>
