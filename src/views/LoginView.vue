<template>
    <div>
      <div class="header">
        <img src="/images/husky.jpeg" alt="University of Connecticut" />
        <h1>University of Connecticut</h1>
      </div>
      <div class="dashboard"></div>
      <div class="Net_Id">
        <h2>Netid Single Sign On</h2></div>
      <div class="login-container">
  
        <form @submit.prevent="login">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" placeholder="NetId" required v-model="username">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required v-model="password">
          <!-- <router-link to="/homescreen">
            <button type="submit">Login</button>
          </router-link> -->
          <button type="submit" @click="checkcreds">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        dbUsername: '',
        dbPassword: '',
        userRole: ''
      };  
    },
    methods: {
      async checkcreds() {
        if(this.username !== '' && this.password !== ''){
          console.log(`testing api calls with username ${this.username}`)
          const response = await fetch(`https://d3euzpxjia.execute-api.us-east-1.amazonaws.com/prod/login?username=${this.username}`, {
            method: "GET",
          })
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          // Parse the JSON content of the response
          const responseData = await response.json();
          // Log the parsed data
          console.log(responseData)
          
          this.dbPassword = responseData.body.Item.password
          // Down below is an example of how the password implementation should work
          if(this.dbPassword == this.password){
            console.log("match!")
            this.userRole = responseData.body.Item.role
            console.log(this.userRole)
            if(this.userRole == "professor"){
              // Take them to professor page
              this.$router.push('/professorscreen/:id') // Will change this when professor page is done
            }
            else if(this.userRole == "student"){
              // Take them to student page
              this.$router.push('/homescreen')
            }
            else{
              console.error("MISSING FIELD: role");
            }
          }
        }
        else{
          console.log("empty fields")
        }
      }
    }
  }
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    margin: 100px;
    padding: 100px;
  }
  
  .header {
    background: #002D62; /* Navy blue */
    text-align: center;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .header img {
    max-width: 70px; /* Adjust the image size as needed */
    height: auto;
    margin-right: 10px;
  }
  
  .header h1 {
    margin: 0;
    color: #ffffff;
    font-size: 40px;
    font-weight: bold;
  }
  
  .dashboard {
    text-align: center;
    margin: 30px;
  }
  .Net_Id {
    text-align: center;
    width: 300px;
    margin: 30px;
    background: #e3efff;
    color: #002D62;
    padding: 30px;
    margin: 0 auto;
    font-size: 25px;
    padding-bottom: 1px;
  }
  .login-container {
    width: 300px;
    margin: 0 auto; 
    background: #e3efff; /* Lighter shade of blue */
    color: #002D62;
    padding: 30px;
  }
  
  h2 {
    text-align: center;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 3px;
    display: block;
  }
  
  button {
    width: 175px;
    background: #007BFF;
    border: none;
    color: #fff;
    padding: 10px;
    border-radius: 100px;
    cursor: pointer;
    text-align: center;
    margin: 20px auto;
    display: block;
  }
  
  button:hover {
    background: #0056b3;
  }
  </style>

  
