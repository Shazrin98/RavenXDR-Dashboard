<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <card>
      <h5 slot="header" class="title">RavenXDR Dashboard Report</h5>
      <!-- ////////////////////////////////////////////////////// -->
      <div class="row">
        <div class="col-md-8 pr-md-12">
          <base-input label="Report Receiver's Email" placeholder="Your Email Here" type="email">
          </base-input>
        </div>
      </div>
      <!-- /////////////////////////////////////////////////////// -->
      <base-button slot="footer" type="primary" fill>Send Report</base-button>
    </card>
  </div>
</template>
<script>
export default {
  /////////////////////////////////////
  data() {
    return {
    }
  }
}
</script>
<style></style>
