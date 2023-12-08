<template>
  <div> 
    <header>
      <h1 style="color:rgb(254, 255, 255);">Welcome to UCONN Student Admin</h1>
      <div class="header-buttons">
        <router-link to="/login">
          <button class="login-button">
            Login
          </button>
        </router-link>

        <div class="search-icon" @click="openSearch">
          <i class="fas fa-search"></i>
        </div>
      </div>

    </header>
    <body>
      <div id="slides">
      <div class="overlay"></div>

      <div class="slides-container">
        <img class="slide" src="/images/campus.jpeg" alt="Campus 1">
        <img class="slide" src="/images/students.jpeg" alt="Campus 3">
        <img class="slide" src="/images/winter.jpeg" alt="Campus 2">
      </div>
      </div>
    </body>
  </div>
    <div class="copyrightSection">
      <p>&copy;University of Connecticut</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlideIndex: 0,
    };
  },
  mounted() {
    this.startSlideshow();
    
  },
  methods: {
    startSlideshow() {
      setInterval(() => {
        this.showSlide(this.currentSlideIndex);
        this.currentSlideIndex =
          (this.currentSlideIndex + 1) % document.querySelectorAll('.slide').length;}, 5000); // Change slides every 5 seconds (adjust as needed)
    },
    showSlide(index) {
      const slides = document.querySelectorAll('.slide');
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      slides[index].style.display = 'block';
    },
    
  },
  //methods: {
    //openSearch() {
      // Implement your search functionality here
      // This function could show a search bar or open a search modal.
    //}
  //}
};

</script>

<style>
/* Add your CSS styles here */
header {
  background-color: #0074bf;
  background-image: linear-gradient(#000E2F, #0074bf);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  font-weight: bolder;

}

.login-button {
  background-color: #ef620b;
  color: white;
  border: none;
  padding: 10px 30px;
  cursor: pointer;
  border-radius: 30px;
}

a {
    text-decoration: none;
}

.login-button:hover {
  background-color: #f23c0a;
}

.header-buttons {
  display: flex;
  align-items: center;
}

.search-icon {
  cursor: pointer;
  padding: 10px 20px;
}

#slides {
  position: relative;
}

.slides-container {
  position: relative;
  overflow:hidden;
  width: 100%; 
  height: 100%;
  max-height: 600px; 
}

.slide {
  display: none;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: fadeIn 2s ease-out forwards; 
  object-fit: cover;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 2;
  }
}

.overlay {
  /* Style your overlay as needed */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.copyrightSection {
	background-color: #000;
	color: #ffffff;
	padding: 30px 5px;
  text-align: center;
  background-image: linear-gradient( #0074bf,#000E2F);
}

.copyrightSection p {
	margin: 0;
  color: #ffffff;
}
</style>
