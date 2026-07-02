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
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    fill="none"
    viewBox="0 0 11 11"
  >
    <g clip-path="url(#clip0_17_1108)">
      <path
        fill="#6e2fe7"
        d="M10.067 4.935 8.134 6.603 8.723 9.1a.705.705 0 0 1-1.053.765L5.5 8.53 3.329 9.864A.705.705 0 0 1 2.277 9.1l.592-2.496L.935 4.935a.707.707 0 0 1 .4-1.24l2.536-.204.978-2.367a.703.703 0 0 1 1.3 0l.978 2.367 2.535.204a.707.707 0 0 1 .402 1.24z"
      />
    </g>
    <defs>
      <clipPath id="clip0_17_1108"><path fill="#fff" d="M0 0h11v11H0z" /></clipPath>
    </defs>
  </svg>
</template>
