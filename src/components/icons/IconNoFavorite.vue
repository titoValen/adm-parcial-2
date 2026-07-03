<script setup>
defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: '#7F7F7F',
  },
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 26 26"
    fill="none"
  >
    <path
      d="M18.0771 5.0625C19.4817 5.06412 20.8281 5.62302 21.8213 6.61621C22.8145 7.6094 23.3734 8.95577 23.375 10.3604C23.3745 13.4466 21.0515 16.4032 18.3896 18.7344C15.9766 20.8476 13.5085 22.25 13 22.5293C12.4915 22.25 10.0234 20.8476 7.61035 18.7344C4.94851 16.4032 2.62549 13.4466 2.625 10.3604C2.62662 8.95577 3.18552 7.6094 4.17871 6.61621C5.17167 5.62325 6.51765 5.06438 7.92188 5.0625C9.72676 5.0625 11.2575 5.83349 12.2002 7.08887L13 8.1543L13.7998 7.08887C14.7424 5.83372 16.2727 5.06278 18.0771 5.0625Z"
      :stroke="color"
      stroke-width="2"
    />
  </svg>
</template>
