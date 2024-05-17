<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <card>
      <h5 slot="header" class="title">Create User</h5>
      <!-- ////////////////////////////////////////////////////// -->
      <div class="row">
        <div class="col-md-8 pr-md-12">
          <base-input label="Full Name" placeholder="Full Name" :value="model.fullName">
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 pr-md-12">
          <base-input label="Username" placeholder="Username" :value="model.username">
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 pr-md-12">
          <base-input label="Email address" placeholder="example@email.com" type="email">
          </base-input>
        </div>
      </div>
      <!-- /////////////////////////////////////////////////////// -->
      <!-- <div class="row">
        <div class="col-md-8">
          <base-input>
            <label>About Me</label>
            <textarea rows="4" cols="80" class="form-control" placeholder="Here can be your description"
              :value="model.about">
          </textarea>
          </base-input>
        </div>
      </div> -->

      <!-- 
        PUT A TABLE OF EXISTING USERS

        COLUMNS FOR "fullname, username, email, RESET Password Button"
       -->

      <base-button slot="footer" type="primary" fill>Create</base-button>
    </card>
    <card>
      <!-- ////////////////////////////////////////////////////////////////////////// -->
      <div class="table-container">
        <base-table :data="tableData" :columns="columns">
          <template v-slot:columns>
            <th class="text-left">Full Name</th>
            <th class="text-left">Username</th>
            <th class="text-left">Email</th>
            <th class="text-left">Actions</th>
          </template>
          <template v-slot:default="{ row }">
              <td>{{ row.fullname }}</td>
              <td>{{ row.username }}</td>
              <td>{{ row.email }}</td>
              <td class="td-actions text-left">
                <base-button type="success" size="sm" icon @click="toggleDetailData(row)">
                  <i class="tim-icons icon-zoom-split"></i>
                </base-button>
              </td>
            <div v-if="row.showDetailData" class="detail-data">
              <pre>{{ row.actions }}</pre>
            </div>
          </template>
        </base-table>
      </div>
      <!-- ////////////////////////////////////////////////////////////////////////// -->
    </card>
  </div>
</template>
<script>
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import * as apiService from "@/services/api.service";
import { BaseTable } from "@/components";

export default {
  /////////////////////////////////////
  data() {
    return {
      ////////////////////////////////////////////////
      selectedTimeRange: '',
      customStartDate: null,
      customEndDate: null,
      tableData: [
        {
          id: 1,
          fullname: "Dakota Rice",
          username: "Dakota",
          email: "DakotaRice@email.com",
          showDetailData: false, // Add this field to manage detail view state
          actions: "Some action data"
        },
        {
          id: 2,
          fullname: "Minerva Hooper",
          username: "Minerva",
          email: "MinervaHooper@email.com",
          showDetailData: false, // Add this field to manage detail view state
          actions: "Some action data"
        }
      ],
      columns: ["Full Name", "Username", "Email", "Actions"],
      timeRange: {},
      ////////////////////////////////////////////////////////////
      model: {
        company: 'Creative Code Inc.',
        email: 'mike@email.com',
        username: 'michael23',
        fullName: 'Mike Andrew',
        firstName: 'Mike',
        lastName: 'Andrew',
        address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
        city: 'Melbourne',
        country: 'Australia',
        about: 'Lamborghini Mercy, Your chick she so thirsty, I\'m in that two seat Lambo.'
      },
    }
  },
  methods: {
    toggleDetailData(row) {
      row.showDetailData = !row.showDetailData;
    }
  },
}
</script>
<style></style>
