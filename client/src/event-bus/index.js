import { ref, onMounted, onBeforeUnmount } from 'vue';

// Создаем реактивную переменную для хранения подписчиков событий
const eventSubscribers = ref({});

// Создаем функции для подписки и отписки от событий
const on = (eventName, callback) => {
  if (!eventSubscribers.value[eventName]) {
    eventSubscribers.value[eventName] = [];
  }
  eventSubscribers.value[eventName].push(callback);
};

const off = (eventName, callback) => {
  if (eventSubscribers.value[eventName]) {
    const index = eventSubscribers.value[eventName].indexOf(callback);
    if (index !== -1) {
      eventSubscribers.value[eventName].splice(index, 1);
    }
  }
};

// Создаем функцию для отправки событий
const emit = (eventName, ...args) => {
  if (eventSubscribers.value[eventName]) {
    eventSubscribers.value[eventName].forEach((callback) => {
      callback(...args);
    });
  }
};

// Экспортируем объект EventBus
export const EventBus = {
  on,
  off,
  emit,
};
