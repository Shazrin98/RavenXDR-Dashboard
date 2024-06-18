<template>
  <div>
    <card>
      <h5 slot="header" class="title">Create User</h5>
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
      <base-button slot="footer" type="primary" fill @click="createUser">Create</base-button>
    </card>
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
              <base-button type="success" size="sm" icon @click="editUser(row)">
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

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      newUser: {
        fullname: '',
        username: '',
        email: ''
      },
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
    createUser() {
      // Implement create user functionality
    },
    editUser(user) {
      // Implement edit user functionality
    },
    deleteUser(user) {
      // Implement delete user functionality
    }
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
