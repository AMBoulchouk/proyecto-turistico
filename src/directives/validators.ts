import type { Directive } from 'vue'

// Permite solo números (0-9)
export const onlyNumbers: Directive = {
  mounted(el: HTMLInputElement) {
    el.addEventListener('keypress', (e: KeyboardEvent) => {
      if (!/[0-9]/.test(e.key)) e.preventDefault()
    })

    el.addEventListener('keydown', (e: KeyboardEvent) => {
      // Permitir borrar, flechas, tab, enter
      if (['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)) {
        return
      }
      if (!/[0-9]/.test(e.key)) e.preventDefault()
    })
  }
}

// Permite solo letras (útil para nombres, etc.)
export const onlyLetters: Directive = {
  mounted(el: HTMLInputElement) {
    el.addEventListener('keypress', (e: KeyboardEvent) => {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(e.key)) e.preventDefault()
    })
  }
}

// Evitar símbolos peligrosos o emojis
export const noSpecialChars: Directive = {
  mounted(el: HTMLInputElement) {
    el.addEventListener('keypress', (e: KeyboardEvent) => {
      if (/[^a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]/.test(e.key)) {
        e.preventDefault()
      }
    })
  }
}
