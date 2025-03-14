import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 50 },
    { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics', stock: 100 },
    { id: 3, name: 'Headphones', price: 99.99, category: 'Electronics', stock: 200 },
    // Add more mock products...
  ]);

  const searchQuery = ref('');
  const selectedCategory = ref('');
  const sortBy = ref('name');
  const currentPage = ref(1);
  const itemsPerPage = ref(5);

  const filteredProducts = computed(() => {
    let filtered = [...products.value];

    if (searchQuery.value) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }

    if (selectedCategory.value) {
      filtered = filtered.filter(product => 
        product.category === selectedCategory.value
      );
    }

    filtered.sort((a, b) => {
      if (sortBy.value === 'price') {
        return a.price - b.price;
      }
      return a.name.localeCompare(b.name);
    });

    return filtered;
  });

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredProducts.value.slice(start, end);
  });

  const totalPages = computed(() => 
    Math.ceil(filteredProducts.value.length / itemsPerPage.value)
  );

  return {
    products,
    searchQuery,
    selectedCategory,
    sortBy,
    currentPage,
    paginatedProducts,
    totalPages,
  };
});