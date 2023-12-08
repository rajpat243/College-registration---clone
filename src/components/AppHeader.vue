<template>
  <header class="app-header">
    <div>
      <h1>{{ title }}</h1>
      <nav>
        <ul>
          <li> <RouterLink to="/">Home</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <img src= "/images/seal.jpeg"/>
    </div>
  </header>
</template>

<script setup>
// import the <RouterLink> component so that we can use it in the template above
import { RouterLink } from "vue-router";

// give this component a title property so that the parent component (app.vue) can set whatever title it wants
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* give the header itself a background color, a border, and add some padding to the content */
.app-header {
  background-image: linear-gradient(black, #000f31);
  font-size: 20px;
  float:none;
  text-align: left;
}
.app-header img{
  width: 90px;
  margin-right: 15px;
}

/* make the title within the header a larger and bolder font */
.app-header h1 {
  font-size: 40px;
  font-weight: bold;
  color: white;
  text-align: left;
}
.list-item {
  margin-right: 20px;
}
li a {
    text-decoration: none;
}
</style>
