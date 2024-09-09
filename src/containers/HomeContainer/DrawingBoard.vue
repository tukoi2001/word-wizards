<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import useInteractionType from 'hooks/use-interaction-type';
import { KeyCode } from 'enums/app';

const { isTouchEvent } = useInteractionType();
const isDrawing = ref<boolean>(false);
const isErasing = ref<boolean>(false);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const container = ref<HTMLDivElement | null>(null);
const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
const undoStack = ref<ImageData[]>([]);
const redoStack = ref<ImageData[]>([]);
const savedImage = ref<ImageData | null>(null);
const lineWidth = ref<number>(10);
const lineCap = ref<CanvasLineCap>('round');

onMounted(() => {
  canvas.value = document.getElementById('canvas') as HTMLCanvasElement;
  ctx.value = canvas.value.getContext('2d', { willReadFrequently: true })!;
  ctx.value.strokeStyle = colors[0];
  resizeCanvas();
  window.addEventListener('keydown', handleKeyDown);
  canvas.value.addEventListener('touchstart', startDrawing);
  canvas.value.addEventListener('touchmove', draw);
  canvas.value.addEventListener('touchend', stopDrawing);
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
  canvas.value?.removeEventListener('touchstart', startDrawing);
  canvas.value?.removeEventListener('touchmove', draw);
  canvas.value?.removeEventListener('touchend', stopDrawing);
  window.removeEventListener('resize', handleResize);
});

const handleResize = (): void => {
  if (canvas.value && ctx.value) {
    savedImage.value = ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height);
    resizeCanvas();
    if (savedImage.value) {
      ctx.value.putImageData(savedImage.value, 0, 0);
    }
  }
};

const resizeCanvas = (): void => {
  nextTick(() => {
    if (canvas.value && container.value) {
      canvas.value.height = container.value.clientHeight - 110;
      canvas.value.width = container.value.clientWidth - 48;
    }
  });
};

const saveState = (): void => {
  if (ctx.value && canvas.value) {
    undoStack.value.push(ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height));
    redoStack.value = [];
  }
};

const handleKeyDown = (event: KeyboardEvent): void => {
  event.preventDefault();
  const isMacDevice = navigator.userAgent?.toUpperCase().includes('MAC') ?? false;
  const isUndoStep =
    (isMacDevice && event.metaKey && event.code === KeyCode.KEYZ) ||
    (!isMacDevice && event.ctrlKey && event.key === KeyCode.KEYZ);
  if (isUndoStep) {
    if (event.shiftKey) {
      redo();
    } else {
      undo();
    }
  }
};

const startDrawing = (event: MouseEvent | TouchEvent): void => {
  saveState();
  isDrawing.value = true;
  if (isErasing.value) {
    ctx.value!.globalCompositeOperation = 'destination-out';
  } else {
    ctx.value!.globalCompositeOperation = 'source-over';
  }
  if (!isTouchEvent.value) {
    draw(event);
  }
};

const draw = (event: MouseEvent | TouchEvent) => {
  if (!isDrawing.value) return;
  const clientX = event instanceof TouchEvent ? event.touches[0].clientX : event.clientX;
  const clientY = event instanceof TouchEvent ? event.touches[0].clientY : event.clientY;
  ctx.value!.lineWidth = lineWidth.value;
  ctx.value!.lineCap = lineCap.value;
  ctx.value!.lineTo(clientX - canvas.value!.offsetLeft, clientY - canvas.value!.offsetTop);
  ctx.value!.stroke();
  ctx.value!.beginPath();
  ctx.value!.moveTo(clientX - canvas.value!.offsetLeft, clientY - canvas.value!.offsetTop);
};

const stopDrawing = (): void => {
  isDrawing.value = false;
  ctx.value!.globalCompositeOperation = 'source-over';
  ctx.value!.beginPath();
};

const changeColor = (color: string): void => {
  ctx.value!.strokeStyle = color;
};

const clearCanvas = (): void => {
  saveState();
  ctx.value!.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
};

const undo = (): void => {
  if (undoStack.value.length > 0 && ctx.value && canvas.value) {
    redoStack.value.push(ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height));
    const lastState = undoStack.value.pop();
    if (lastState) {
      ctx.value.putImageData(lastState, 0, 0);
    }
  }
};

const redo = (): void => {
  if (redoStack.value.length > 0 && ctx.value && canvas.value) {
    undoStack.value.push(ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height));
    const nextState = redoStack.value.pop();
    if (nextState) {
      ctx.value.putImageData(nextState, 0, 0);
    }
  }
};

const startErasing = (): void => {
  lineWidth.value = 20;
  lineCap.value = 'square';
  isErasing.value = true;
};

const stopErasing = (): void => {
  lineWidth.value = 10;
  lineCap.value = 'round';
  isErasing.value = false;
};
</script>

<template>
  <div class="drawing-board">
    <div class="color-picker">
      <div
        v-for="(color, index) in colors"
        :key="index"
        class="color-box"
        :style="{ backgroundColor: color }"
        @click="changeColor(color)"
      ></div>
    </div>
    <div class="canvas-container" ref="container">
      <div class="drawing-board-title">
        <span>D</span>
        <span>r</span>
        <span>a</span>
        <span>w</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>&nbsp;</span>
        <span>B</span>
        <span>o</span>
        <span>a</span>
        <span>r</span>
        <span>d</span>
      </div>
      <canvas
        id="canvas"
        :class="{ 'is-drawing': !isErasing, 'is-erasing': isErasing }"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseout="stopDrawing"
      ></canvas>
    </div>
    <button @click="startErasing">Erase</button>
    <button @click="stopErasing">Paint</button>
    <a class="clear-button" @click.prevent="clearCanvas">Clear</a>
    <a class="undo-button" @click.prevent="undo">Undo</a>
    <a class="redo-button" @click.prevent="redo">Redo</a>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 500px;
  padding: 10px 24px 24px;
  gap: 6px;
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  border-radius: 15px;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.15),
    inset 0 0 15px rgba(0, 0, 0, 0.1);
}

canvas {
  display: block;
  background: radial-gradient(circle, #ffffff, #f5f5f5);
  border: 4px solid #4caf50;
  border-radius: 15px;
  box-shadow: none;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow:
      0 0 30px rgba(0, 0, 0, 0.2),
      0 0 60px rgba(76, 175, 80, 0.5),
      inset 0 0 15px rgba(255, 255, 255, 0.4);
  }

  &:active {
    box-shadow:
      0 0 15px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(76, 175, 80, 0.6),
      inset 0 0 20px rgba(255, 255, 255, 0.5);
  }

  &.is-drawing {
    cursor:
      url('assets/pencil.svg') 0 18,
      auto;
  }

  &.is-erasing {
    cursor:
      url('assets/eraser.svg') 0 18,
      auto;
  }
}

.color-box {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 50%;
}

.color-picker {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.control-buttons {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.clear-button,
.undo-button,
.redo-button {
  margin: 0 10px;
  padding: 0.5rem 1rem;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}

.clear-button:hover,
.undo-button:hover,
.redo-button:hover {
  background-color: #444;
}

.drawing-board-title {
  font-family: 'Pacifico', cursive;
  font-size: 46px;
  font-weight: 600;
  letter-spacing: 7px;
  padding: 20px;
  animation: gradientFlow 8s ease infinite;
  text-shadow:
    0 0 10px hsla(120, 100%, 25%, 0.5),
    0 0 10px hsla(120, 100%, 25%, 0.5),
    0 0 10px hsla(120, 100%, 25%, 0.5),
    0 0 5px hsla(120, 100%, 25%, 1),
    0 0 5px hsla(120, 100%, 25%, 1),
    0 0 5px hsla(120, 100%, 25%, 1);
}

.drawing-board-title span {
  display: inline-block;
  animation:
    colorChange 8s infinite,
    wavyText 2s ease-in-out infinite;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes wavyText {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes colorChange {
  0%,
  100% {
    color: #ff6b6b;
  }
  25% {
    color: #4ecdc4;
  }
  50% {
    color: #45b7d1;
  }
  75% {
    color: #f7d354;
  }
}

.drawing-board-title span:nth-child(2n) {
  animation-delay: 0.1s;
}

.drawing-board-title span:nth-child(3n) {
  animation-delay: 0.2s;
}

.drawing-board-title span:nth-child(4n) {
  animation-delay: 0.3s;
}

.drawing-board-title span:nth-child(5n) {
  animation-delay: 0.4s;
}
</style>
