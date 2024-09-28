export default function useInteractionType() {
  const isTouchEvent = ref<boolean>(false);

  const onTouchStart = () => {
    isTouchEvent.value = true;
  };

  const onMouseDown = () => {
    isTouchEvent.value = false;
  };

  onMounted(() => {
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('mousedown', onMouseDown);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('mousedown', onMouseDown);
  });

  return { isTouchEvent };
}
