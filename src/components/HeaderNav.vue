<template>
  <header>
    <div
      class="header-nav flex items-center justify-between bg-gray-800 px-6 py-3 border-b-4 border-amber-400"
    >
      <div class="py-2">
        <img
          src="../img/832_435.jpg"
          alt="Logo"
          class="size-20 rounded-full hover:border-amber-400 border-4 transition-all duration-300"
        />
      </div>
      <nav class="nav-links flex gap-6 ml-6 text-amber-300">
        <router-link to="/" exact>Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/services">Services</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </div>
  </header>
</template>
