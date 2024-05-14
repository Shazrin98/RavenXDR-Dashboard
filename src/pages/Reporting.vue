<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <card>
      <h5 slot="header" class="title">Reporting</h5>
      <!-- ////////////////////////////////////////////////////// -->
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
        <card>
    <h5 slot="header" class="title">Edit Profile</h5>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input
          label="Company (disabled)"
          placeholder="Company"
          v-model="model.company"
          disabled
        >
        </base-input>
      </div>
      <div class="col-md-3 px-md-1">
        <base-input
          label="Username"
          placeholder="Username"
          v-model="model.username"
        >
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input
          label="Email address"
          type="email"
          placeholder="mike@email.com"
        >
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input
          label="First Name"
          v-model="model.firstName"
          placeholder="First Name"
        >
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input
          label="Last Name"
          v-model="model.lastName"
          placeholder="Last Name"
        >
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <base-input
          label="Address"
          v-model="model.address"
          placeholder="Home Address"
        >
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1">
        <base-input label="City" v-model="model.city" placeholder="City">
        </base-input>
      </div>
      <div class="col-md-4 px-md-1">
        <base-input
          label="Country"
          v-model="model.country"
          placeholder="Country"
        >
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input label="Postal Code" placeholder="ZIP Code"> </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <base-input>
          <label>About Me</label>
          <textarea
            rows="4"
            cols="80"
            class="form-control"
            placeholder="Here can be your description"
            v-model="model.about"
          >
          </textarea>
        </base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" fill>Save</base-button>
  </card>
       -->
      <base-button slot="footer" type="primary" fill>Reset</base-button>
    </card>
  </div>
</template>
<script>
export default {
  /////////////////////////////////////
  data() {
    return {
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
  }
}
</script>
<style></style>
