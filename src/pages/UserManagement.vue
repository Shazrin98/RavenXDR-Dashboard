<template>
  <div>
    <card>
      <!-- <h5 slot="header" class="title">Create User</h5>
      <div class="row">
        <div class="col-md-8 pr-md-12">
          <base-input label="Full Name" placeholder="Full Name" v-model="newUser.fullname"></base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 pr-md-12">
          <base-input label="Username" placeholder="Username" v-model="newUser.username"></base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 pr-md-12">
          <base-input label="Email address" placeholder="example@email.com" type="email" v-model="newUser.email"></base-input>
        </div>
      </div>
      <base-button slot="footer" type="primary" fill @click="createUser">Create</base-button> -->
      <!-- /////////////////////////////////////////////////////////// -->
      <div>
        <form @submit.prevent="createUser">
          <input v-model="username" placeholder="Username" required />
          <input v-model="fullname" placeholder="Fullname" required />
          <input v-model="email" type="email" placeholder="Email" required />
          <button type="submit">Create User</button>
        </form>
      </div>
      <!-- ///////////////////////////////////////////////////////// -->
    </card>
    <!-- //////////////////////////////////////////////////////// -->
    <card>
      <div class="table-container">
        <base-table :data="tableData" :columns="columns">
          <template slot="columns">
            <th class="text-left">ID</th>
            <th class="text-left">Username</th>
            <th class="text-left">Full Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Actions</th>
          </template>
          <template slot-scope="{ row }">
            <td>{{ row.id }}</td>
            <td>{{ row.username }}</td>
            <td>{{ row.fullname }}</td>
            <td>{{ row.email }}</td>
            <td class="td-actions text-left">
              <base-button type="success" size="sm" icon @click="editPassword(row)">
                <i class="tim-icons icon-pencil"></i>
              </base-button>
              <base-button type="danger" size="sm" icon @click="deleteUser(row)">
                <i class="tim-icons icon-trash-simple"></i>
              </base-button>
            </td>
          </template>
        </base-table>
      </div>
    </card>
  </div>
</template>

<script>
import { BaseTable } from "@/components";
import * as apiService from "@/services/api.service";
import emailjs from 'emailjs-com';/////////////////

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      username: '',
      fullname: '',
      email: '',
      tableData: [],
      columns: ["id", "username", "fullname", "email", "actions"]
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await apiService.getUsers();
        if (Array.isArray(response)) {
          this.tableData = response.map(user => ({
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            actions: null
          }));
        } else {
          console.error("Unexpected API response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    //////////////////////////////////////////////////
    async createUser() {
      console.log("Creating users");
      const token = Math.random().toString(36).substr(2); // Generate a simple token

      try {
        // Save user to the database
        await apiService.saveUser({
          username: this.username,
          fullname: this.fullname,
          email: this.email,
          token: token
        });

        // Send email
        const templateParams = {
          to_email: this.email,
          to_name: this.fullname,
          token: token
        };

        emailjs.send('service_k21537h', 'template_uck59h8', templateParams, 'etRxWIKBZbd9ORoKs')
          .then(response => {
            console.log('Email sent successfully!', response.status, response.text);
            alert('User created and email sent.');
          }, error => {
            console.error('Failed to send email:', error);
          });
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
    ////////////////////////////////////////////
    async editPassword(user) {
      const token = Math.random().toString(36).substr(2); // Generate a simple token

      try {
        // Save token in the database for the user
        await apiService.saveResetToken(user.id, token);

        // Send email with password reset link
        const templateParams = {
          to_email: user.email,
          to_name: user.fullname,
          token: token
        };

        emailjs.send('service_k21537h', 'template_05y0a1o', templateParams, 'etRxWIKBZbd9ORoKs')
          .then(response => {
            console.log('Email sent successfully!', response.status, response.text);
            alert('Password reset email sent.');
          }, error => {
            console.error('Failed to send email:', error);
          });
      } catch (error) {
        console.error('Error sending password reset email:', error);
      }
    },
    /////////////////////////////////////////////////////////////////////////////
    async deleteUser(user) {
      try {
        await apiService.deleteUser(user.id);
        alert('User deleted successfully!');
        this.fetchUsers(); // Refresh the list of users
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.table-container {
  margin-top: 20px;
}
</style>
