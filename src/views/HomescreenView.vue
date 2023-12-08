<template>
  <div>
    <div class="header">
      <h1 style="color: rgb(254, 255, 255);">UCONN Student Homepage</h1>
    </div>
    <div class="dashboard">
      <router-link to="/managescreen">
        <div class="box">
          <div class="box-content">
            <h2>Manage Classes</h2>
            <img src="/images/home1.jpeg" alt="Example 1" />
          </div>
        </div>
      </router-link>

      <router-link to="/viewschedule">
      <div class="box">
        <div class="box-content">
          <h2>View Schedule</h2>
          <img src="/images/home2.jpeg" alt="Example 2" />
        </div>
      </div>
      </router-link>

      <router-link to="/advisingcreen">
      <div class="box">
        <div class="box-content">
          <h2>Advising</h2>
          <img src="/images/home3.jpeg" alt="Example 2" />
        </div>
      </div>
    </router-link>
    </div>
    <router-link to="/">
      <button class="logout-button">Logout</button>
    </router-link>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-image: url(./images/campus.jpeg);
  background-repeat: no-repeat;
  background-size:cover;
}
.header {
  background: #002D62;
  color: #ffffff;
  text-align: center;
  font-size: 35px;
  padding: 10px;
  font-weight: bold;
  text-decoration: none;
}
.dashboard {
  text-align: center;
  margin: 10px;
  display: flex;
  justify-content: center; 
}
.box {
  width: 300px;
  height: 200px;
  background: #fff;
  color: #002D62;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px;
  cursor: pointer;
}
.box:hover {
  background: #d8f7ff;
}
.box-content {
  padding: 20px;
  font-weight: bold;
}
.box h2 {
  padding-bottom: 10px;
}
.box img {
  max-width: 175px;
  height: 125px;
  margin-left: auto;
  margin-right: auto;
}
.logout-button {
  width: 120px;
  padding: 10px;
  background: #007BFF;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
}
.logout-button:hover {
  background: #0056b3;
}
</style>
