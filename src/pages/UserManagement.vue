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
      <base-button slot="footer" type="primary" fill>Create</base-button>
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
