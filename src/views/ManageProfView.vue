<template>
    <div>
      <header>
        <h1>Class Sections</h1>
      </header>  
      <table class="class-table">
        <thead>
          <tr>
            
            <th>Class</th>
            <th>Days and Times</th>
            <th>Room</th>
            <th>Seats</th>
            <th>Waitlist</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="section in classSections" :key="section.id">
            <td>{{ section.class }}</td>
            <td>{{ section.daysAndTimes }}</td>
            <td>{{ section.room }}</td>
            <td>{{ section.seats }}</td>
            <td>{{ section.waitlist }}</td>
            <td>
                <button @click="manageWaitlist(section)">Manage Waitlist</button>
                <button @click="manageWaitlist(section)">Generate Permission Numbers</button>
                
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ClassSections',
    props: ['classSections'],
    data() {
      return {
        classSections: [
          {
            id: 1,
            class: 'Section 001-Class# 6840',
            daysAndTimes: '\nTuesday Thursday\n8:00AM to 9:55AM\n',
            room: 'ITE 138',
            seats: 'Open Seats 16 of 54',
            waitlist: '5 of 15 full'
          },

          {
            id: 2,
            class: 'Section 002-Class# 6940',
            daysAndTimes: '\nWednesday Friday\n 8:00AM to 9:55AM\n',
            room: 'ITE 138',
            seats: 'Open Seats 1 of 54',
            waitlist: '0 of 15 full'
          },

          {
            id: 3,
            class: 'Section 003-Class# 7940',
            daysAndTimes: '\nMonday\n 8:00AM to 11:00AM\n',
            room: 'ITE 138',
            seats: 'Open Seats 0 of 54',
            waitlist: '10 of 15 full'
          },
          // Add more sections as needed
        ]
      };
    },
  };
  </script>
  
  <style scoped>

     body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    header {
      background-color: #002D62;
      color: white;
      padding: 10px;
      text-align: center;
    }

    header h1{
      font-size: 35px;
      color: white;
    }

    section {
      margin: 20px;
      color: #002D62
    }

    .class-list {
      list-style: none;
      padding: 0;
    }

    .class-item {
      background-color: #e3efff;
      color: #002D62;
      border: 1px solid #ddd;
      margin: 10px 0;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .class-table {
        border-collapse: collapse;
        width: 100%;
      }
      
      .class-table th, .class-table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      
      .class-table th {
        background-color: #f2f2f2;
      }
      
      .class-table th, .class-table td:nth-child(6), .class-table td:nth-child(7) {
        text-align: center;
      }

  </style> 
  