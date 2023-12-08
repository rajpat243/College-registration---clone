<!-- AdvisorInfo.vue -->
<template>
    <div class="advisor-info">
      <div class="info-box">
        <h2>Your Current Advisor</h2>
        <div class="advisor-details">
          <p class="advisor-name">{{ advisor.name }}</p>
          <a :href="'mailto:' + advisor.email" class="advisor-email">{{ advisor.email }}</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdvisorInfo',
    data() {
      return {
        advisor: {
          name: 'John Doe', 
          email: 'john.doe@uconn.edu', 
        },
      };
    },
  };
  </script>
  
<style>

.advisor-info {
  text-align: center;
}

.info-box {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  width: 1400px ; 
  margin: 20px auto;
  align-content: center;
  background-color: aliceblue;
}
.info-box h2{
    text-decoration: underline;
}
.advisor-name {
  font-size: 1.5em;
  font-weight: bold;
  color:black;
}
.advisor-email {
  color: rgb(0, 162, 255);
  font-size: 0.9em;
}

</style>
