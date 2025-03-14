<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="$router.push('/')">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              type="text"
              required
              class="input w-full mb-4"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              required
              class="input w-full"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button type="submit" class="btn btn-primary w-full">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>