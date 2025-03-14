import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ username: string } | null>(null);
  const isAuthenticated = ref(false);

  function login(username: string, password: string) {
    // Simulate API call
    if (username && password) {
      user.value = { username };
      isAuthenticated.value = true;
      return true;
    }
    return false;
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  };
});