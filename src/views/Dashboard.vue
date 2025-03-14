<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold">Product Dashboard</h1>
          </div>
          <div class="flex items-center">
            <button @click="$router.push('/login')" class="btn btn-primary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex flex-col sm:flex-row justify-between mb-6">
          <input
            type="text"
            placeholder="Search products..."
            class="input mb-4 sm:mb-0 sm:w-64"
            v-model="searchQuery"
          />
          
          <div class="flex gap-4">
            <select class="input" v-model="selectedCategory">
              <option value="">All Categories</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
            </select>
            
            <select class="input" v-model="sortBy">
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in displayedProducts" :key="product.name">
                <td class="px-6 py-4 whitespace-nowrap">{{ product.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">${{ product.price }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ product.category }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ product.stock }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 flex justify-center">
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                currentPage === page
                  ? 'z-10 bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
          </nav>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
const products = [
  { name: 'Laptop', price: 999.99, category: 'Electronics', stock: 50 },
  { name: 'Smartphone', price: 699.99, category: 'Electronics', stock: 100 },
  { name: 'Headphones', price: 99.99, category: 'Electronics', stock: 200 },
  { name: 'T-Shirt', price: 29.99, category: 'Clothing', stock: 300 },
  { name: 'Jeans', price: 79.99, category: 'Clothing', stock: 150 },
  { name: 'Novel', price: 19.99, category: 'Books', stock: 80 },
  { name: 'Textbook', price: 149.99, category: 'Books', stock: 40 },
  { name: 'Tablet', price: 499.99, category: 'Electronics', stock: 75 },
  { name: 'Dress', price: 89.99, category: 'Clothing', stock: 120 },
  { name: 'Comic Book', price: 9.99, category: 'Books', stock: 200 }
];

export default {
  data() {
    return {
      products,
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'name',
      currentPage: 1,
      itemsPerPage: 5
    };
  },
  computed: {
    filteredProducts() {
      let result = [...this.products];
      
      if (this.searchQuery) {
        result = result.filter(product => 
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      if (this.selectedCategory) {
        result = result.filter(product => 
          product.category === this.selectedCategory
        );
      }
      
      result.sort((a, b) => {
        if (this.sortBy === 'price') {
          return a.price - b.price;
        }
        return a.name.localeCompare(b.name);
      });
      
      return result;
    },
    displayedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    }
  }
};
</script>