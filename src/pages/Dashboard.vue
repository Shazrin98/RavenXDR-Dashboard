<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">
                  {{ $t("dashboard.totalCombination") }}
                  Traffic
                </h5>
                <h2 class="card-title text-warning">
                  {{ $t("dashboard.traffic") }}
                  Activity
                </h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle" :class="isRTL ? 'float-left' : 'float-right'"
                  data-toggle="buttons">
                  <label v-for="(option, index) in bigLineChartCategories" :key="option"
                    class="btn btn-sm btn-primary btn-simple" :class="{ active: selectedOption === option }"
                    :id="index">
                    <input type="radio" @click="initBigChart(option)" name="options" autocomplete="off"
                      :checked="selectedOption === option" />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%" ref="bigChart" chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData" :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops" :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              {{ $t("dashboard.allowedTraffic") }}
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              {{ formatNumber(allowedTraffic) }}
            </h3>
          </template>
        </card>
      </div>
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              {{ $t("dashboard.droppedTraffic") }}
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              {{ formatNumber(droppedTraffic) }}
            </h3>
          </template>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              {{ $t("dashboard.droppedTrafficSeverityGovNet") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="severityData in droppedTrafficSeverityGovNet" :key="severityData.key">
                {{ severityData.key }}:
                {{ formatNumber(severityData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-delivery-fast text-success"></i>
              {{ $t("dashboard.droppedTrafficSeverityInternet") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="severityData in droppedTrafficSeverityInternet" :key="severityData.key">
                {{ severityData.key }}:
                {{ formatNumber(severityData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-globe-2 text-success"></i>
              {{ $t("dashboard.top5CountryTrafficAllowed") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="countryData in top5CountryTrafficAllowed" :key="countryData.key">
                {{ countryData.key }}: {{ formatNumber(countryData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-globe-2 text-success"></i>
              {{ $t("dashboard.top5CountryTrafficBlocked") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="countryData in top5CountryTrafficBlocked" :key="countryData.key">
                {{ countryData.key }}: {{ formatNumber(countryData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12" :class="{ 'text-right': isRTL }">
        <card>
          <h5 class="card-category text-info">
            <i class="tim-icons icon-single-02 text-success"></i>
            {{ $t("dashboard.vpnUsersConnected") }}
          </h5>
          <ul class="list-group list-group-flush list-unstyled">
            <li v-for="vpnUserData in vpnUsersConnected" :key="vpnUserData.key">
              <i class="tim-icons icon-single-02 text-success"></i>
              {{ vpnUserData.key }}: {{ formatNumber(vpnUserData.docCount) }}
            </li>
          </ul>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card style="width: 20rem">
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ $t("dashboard.successfulReceivedEmail") }}
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ formatNumber(successfulReceivedEmail) }}
            </h3>
          </template>
        </card>
      </div>
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card style="width: 20rem">
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ $t("dashboard.quarantinedReceivedEmail") }}
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ formatNumber(quarantinedReceivedEmail) }}
            </h3>
          </template>
        </card>
      </div>
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card style="width: 20rem">
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ $t("dashboard.failedReceivedEmail") }}
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-email-85 text-success"></i>
              {{ formatNumber(failedReceivedEmail) }}
            </h3>
          </template>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-app text-success"></i>
              {{ $t("dashboard.top10AppsUsedInternally") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="appData in top10AppsUsedInternally" :key="appData.key">
                {{ appData.key }}: {{ formatNumber(appData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-app text-success"></i>
              {{ $t("dashboard.top10RequestedAppsGovNet") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="appData in top10RequestedAppsGovNet" :key="appData.key">
                {{ appData.key }}: {{ formatNumber(appData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-app text-success"></i>
              {{ $t("dashboard.top10RequestedAppsInternet") }}
            </h5>
            <ul class="list-group list-group-flush">
              <li v-for="appData in top10RequestedAppsInternet" :key="appData.key">
                {{ appData.key }}: {{ formatNumber(appData.docCount) }}
              </li>
            </ul>
          </template>
        </card>
      </div>
    </div>
    <!-- ////////////////////////////////////////////////////////////////////////////// -->
    <div class="row">
      <!-- /////////////////////////////////////////////////////////////////////// -->
      <div class="col-lg-6 col-md-12">
        <card>
          <gauge :title="'Risk Scale Meter'" :value="riskyEventPercentage" />
        </card>
      </div>
      <!-- /////////////////////////////////////////////////////////////////// -->
      <div class="col-lg-6 col-md-12" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Endpoint Severity Counts</h5>
          </template>
          <div class="chart-area">
            <bar-chart style="height: 100%" chart-id="blue-bar-chart" :chart-data="blueBarChart.chartData"
              :gradient-stops="blueBarChart.gradientStops" :extra-options="blueBarChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div>
      <!-- //////////////////////////////////////////////////////////////////////// -->
    </div>
    <!-- <div class="row">
      <div class="col-lg-12 col-md-12" :class="{ 'text-right': isRTL }">
        <card>
          <template slot="header">
            <h5 class="card-category text-info">
              <i class="tim-icons icon-alert-circle-exc text-success"></i>
              Endpoint Operation Count
            </h5>
            <h3 class="card-title">
              <i class="tim-icons icon-alert-circle-exc text-success"></i>
              {{ formatNumber(endpointOperationCount) }}
            </h3>
          </template>
        </card>
      </div>
    </div> -->
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import Gauge from "@/components/Gauge/Gauge.vue";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import * as apiService from "@/services/api.service";

export default {
  components: {
    LineChart,
    BarChart,
    Gauge,
  },
  data() {
    return {
      //////////////////////////////////////////////////////////
      endpointOperationCount: 0,
      /////////////////////////////////////////////////////////
      riskyEventPercentage: 0,
      timeRange: {},
      allowedTraffic: 0,
      droppedTraffic: 0,
      droppedTrafficSeverityGovNet: 0,
      droppedTrafficSeverityInternet: 0,
      top5CountryTrafficAllowed: 0,
      top5CountryTrafficBlocked: 0,
      vpnUsersConnected: 0,
      successfulReceivedEmail: 0,
      quarantinedReceivedEmail: 0,
      failedReceivedEmail: 0,
      top10AppsUsedInternally: 0,
      top10RequestedAppsGovNet: 0,
      top10RequestedAppsInternet: 0,
      selectedOption: "Allowed",
      bigLineChart: {
        allData: [],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: [
            "1 Week Ago",
            "2 Weeks Ago",
            "3 Weeks Ago",
            "4 Weeks Ago",
            "5 Weeks Ago",
            "6 Weeks Ago",
            "7 Weeks Ago",
          ],
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      //////////////////////////////////////////////////////////////////
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ['INFO', 'High', 'Low', 'Informational', 'Medium'],
          datasets: [
            {
              label: "Severity Counts",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              backgroundColor: "#5a8dee", // Bar color
              data: [0, 0, 0, 0, 0]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
      ///////////////////////////////////////////////////////////////////////
    };
  },
  computed: {
    ////////////////////////////////////////////////////////////////////////////
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return this.$t("dashboard.chartCategoriesTraffic");
    },
  },
  async created() {
    this.$root.$on("timeRangeChanged", this.fetchData);
  },

  destroyed() {
    this.$root.$off("timeRangeChanged", this.fetchData);
  },
  methods: {
    ////////////////////////////////////////////////////////////////////////////////
    async fetchData(timeRange) {
      try {
        if (!timeRange) {
          this.timeRange = {
            gte: this.$route.query.gte,
            lte: this.$route.query.lte,
            format: "yyyy-MM-dd",
          };
          timeRange = this.timeRange;
        } else {
          this.timeRange = timeRange;
        }

        // Allowed Traffic
        const allowedTrafficResponse = await apiService.getAllowedTraffic(
          timeRange
        );
        this.allowedTraffic =
          allowedTrafficResponse && allowedTrafficResponse.count
            ? allowedTrafficResponse.count
            : 0;

        // Dropped Traffic
        const droppedTrafficResponse = await apiService.getDroppedTraffic(
          timeRange
        );
        this.droppedTraffic =
          droppedTrafficResponse && droppedTrafficResponse.count
            ? droppedTrafficResponse.count
            : 0;

        // Successful Received Email
        const successfulReceivedEmailResponse =
          await apiService.getSuccessfulReceivedEmail(timeRange);
        this.successfulReceivedEmail =
          successfulReceivedEmailResponse &&
            successfulReceivedEmailResponse.count
            ? successfulReceivedEmailResponse.count
            : 0;

        // Quarantined Received Email
        const quarantinedReceivedEmailResponse =
          await apiService.getQuarantinedReceivedEmail(timeRange);
        this.quarantinedReceivedEmail =
          quarantinedReceivedEmailResponse &&
            quarantinedReceivedEmailResponse.count
            ? quarantinedReceivedEmailResponse.count
            : 0;

        // Failed Received Email
        const failedReceivedEmailResponse =
          await apiService.getFailedReceivedEmail(timeRange);
        this.failedReceivedEmail =
          failedReceivedEmailResponse && failedReceivedEmailResponse.count
            ? failedReceivedEmailResponse.count
            : 0;

        // Dropped Traffic Severity By GovNet Source
        const droppedTrafficSeverityGovNetResponse =
          await apiService.getDroppedTrafficSeverityGovNet(timeRange);
        const DTSGNbuckets =
          droppedTrafficSeverityGovNetResponse.aggregations.top_attacks.buckets;
        const droppedTrafficSeverityGovNetData = DTSGNbuckets.map((bucket) => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.droppedTrafficSeverityGovNet = droppedTrafficSeverityGovNetData;

        // Dropped Traffic Severity By Internet Source
        const droppedTrafficSeverityInternetResponse =
          await apiService.getDroppedTrafficSeverityInternet(timeRange);
        const DTSIbuckets =
          droppedTrafficSeverityInternetResponse.aggregations.top_attacks
            .buckets;
        const droppedTrafficSeverityInternetData = DTSIbuckets.map(
          (bucket) => ({
            key: bucket.key,
            docCount: bucket.doc_count,
          })
        );
        this.droppedTrafficSeverityInternet =
          droppedTrafficSeverityInternetData;

        // Top 5 Country Traffic Allowed
        const top5CountryTrafficAllowedResponse =
          await apiService.getTop5CountryTrafficAllowed(timeRange);
        const T5CTAbuckets =
          top5CountryTrafficAllowedResponse.aggregations.top_countries.buckets;
        const top5CountryTrafficAllowedData = T5CTAbuckets.map((bucket) => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.top5CountryTrafficAllowed = top5CountryTrafficAllowedData;

        // Top 5 Country Traffic Blocked
        const top5CountryTrafficBlockedResponse =
          await apiService.getTop5CountryTrafficBlocked(timeRange);
        const T5CTBbuckets =
          top5CountryTrafficBlockedResponse.aggregations.top_countries.buckets;
        const top5CountryTrafficBlockedData = T5CTBbuckets.map((bucket) => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.top5CountryTrafficBlocked = top5CountryTrafficBlockedData;

        // VPN Users Connected
        const vpnUsersConnectedResponse = await apiService.getVpnUsersConnected(
          timeRange
        );
        const VUCbuckets =
          vpnUsersConnectedResponse.aggregations.top_users.buckets;
        const vpnUsersConnectedData = VUCbuckets.map((bucket) => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.vpnUsersConnected = vpnUsersConnectedData;

        // Top 10 Apps Used Internally
        const top10AppsUsedInternallyResponse =
          await apiService.getTop10AppsUsedInternally(timeRange);
        const T10AUIbuckets =
          top10AppsUsedInternallyResponse.aggregations.top_websites.buckets;
        const top10AppsUsedInternallyData = T10AUIbuckets.map((bucket) => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.top10AppsUsedInternally = top10AppsUsedInternallyData;

        // Top 10 Requested Apps By GovNet
        const top10RequestedAppsGovNetResponse =
          await apiService.getTop10RequestedAppsGovNet(timeRange);
        const T10RAGNbuckets =
          top10RequestedAppsGovNetResponse.aggregations.top_websites.buckets;
        const top10RequestedAppsGovNetData = T10RAGNbuckets.map((bucket) => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.top10RequestedAppsGovNet = top10RequestedAppsGovNetData;

        // Top 10 Requested Apps By Internet
        const top10RequestedAppsInternetResponse =
          await apiService.getTop10RequestedAppsInternet(timeRange);
        const T10RAIbuckets =
          top10RequestedAppsInternetResponse.aggregations.top_websites.buckets;
        const top10RequestedAppsInternetData = T10RAIbuckets.map((bucket) => ({
          key: bucket.key,
          docCount: bucket.doc_count,
        }));
        this.top10RequestedAppsInternet = top10RequestedAppsInternetData;

        // Risky Event Percentage
        const totalEventResponse = await apiService.getTotalEventNumbers();
        const totalEventCount = totalEventResponse.aggregations.total_count.doc_count;
        const riskyEventResponse = await apiService.getRiskyEventNumbers();
        const riskyEventCount = riskyEventResponse.count;
        const rawPercentage = (riskyEventCount / totalEventCount) * 100;
        this.riskyEventPercentage = Number(rawPercentage.toFixed(2));

        // // Endpoint Operation Count
        // const endpointOperationCountResponse = await apiService.getEndpointOperationCount(timeRange);
        // this.endpointOperationCount =
        //   endpointOperationCountResponse && endpointOperationCountResponse.count
        //     ? endpointOperationCountResponse.count
        //     : 0;
        // console.log("endpointOperationCount:", endpointOperationCountResponse.count);

        ////////////////////////////////////////////////////////////////////////////////////////
        // Endpoint Severity Numbers
        const endpointSeverityNumbersResponse = await apiService.getEndpointSeverityNumbers(timeRange);
        const endpointSeverityNumbersBuckets = endpointSeverityNumbersResponse.aggregations.severity_counts.buckets;

        // Extract keys and counts from buckets
        const labels = endpointSeverityNumbersBuckets.map(bucket => bucket.key);
        const counts = endpointSeverityNumbersBuckets.map(bucket => bucket.doc_count);

        console.log("endpointSeverityNumbersBuckets:", endpointSeverityNumbersBuckets);/////////////

        // Create a new chart data object with non-reactive arrays
        const newChartData = {
          labels: [...labels],
          datasets: [
            {
              label: "Severity Counts",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [...counts],
              backgroundColor: labels.map(label => {
                switch (label.toLowerCase()) {
                  case "info":
                  case "informational":
                    return "green";
                  case "low":
                  case "medium":
                    return "yellow";
                  case "high":
                  case "critical":
                    return "red";
                  default:
                    return "#5a8dee"; // Default color
                }
              })
            }
          ]
        };

        // Assign the new chart data object to blueBarChart
        this.blueBarChart.chartData = newChartData;
        ////////////////////////////////////////////////////////////////////////////////////////

      } catch (error) {
        console.error("Error fetching data from APIs:", error);
      }
    },
    async fetchDataForWeek(weekNumber, selectedOption) {
      try {
        const allowedTrafficResponse = await apiService[
          `getAllowedTrafficWeek${weekNumber}`
        ]();
        const droppedTrafficResponse = await apiService[
          `getDroppedTrafficWeek${weekNumber}`
        ]();

        const allowedTrafficCount = allowedTrafficResponse.count;
        const droppedTrafficCount = droppedTrafficResponse.count;

        let weekTraffic;

        if (selectedOption === "Allowed") {
          weekTraffic = allowedTrafficCount;
        } else if (selectedOption === "Dropped") {
          weekTraffic = droppedTrafficCount;
        }

        return {
          weekTraffic: weekTraffic,
        };
      } catch (error) {
        console.error("Error fetching traffic data:", error);
        throw new Error(
          `Failed to fetch traffic data for week ${weekNumber}: ${error.message}`
        );
      }
    },
    async initBigChart(selectedOption) {
      let index = 1;
      const weekNumber = index;

      try {
        const promises = [];
        let chartData = {
          datasets: [],
          labels: [
            "1 Week Ago",
            "2 Weeks Ago",
            "3 Weeks Ago",
            "4 Weeks Ago",
            "5 Weeks Ago",
            "6 Weeks Ago",
            "7 Weeks Ago",
          ],
        };

        for (let i = 1; i <= 7; i++) {
          promises.push(this.fetchDataForWeek(i, selectedOption));
        }

        const results = await Promise.all(promises);

        const allowedData = [];
        const droppedData = [];

        results.forEach((result, i) => {
          if (selectedOption === "Allowed") {
            allowedData.push(result.weekTraffic);
          } else if (selectedOption === "Dropped") {
            droppedData.push(result.weekTraffic);
          }
        });

        const allowedDataset = {
          data: allowedData,
          fill: true,
          borderColor: config.colors.primary,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: config.colors.primary,
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: config.colors.primary,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
        };

        const droppedDataset = {
          data: droppedData,
          fill: true,
          borderColor: config.colors.danger,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: config.colors.danger,
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: config.colors.danger,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
        };

        if (selectedOption === "Allowed") {
          chartData.datasets.push(allowedDataset);
        } else if (selectedOption === "Dropped") {
          chartData.datasets.push(droppedDataset);
        }

        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
        this.selectedOption = selectedOption;
      } catch (error) {
        console.error(
          `Error initializing chart for week ${weekNumber}:`,
          error
        );
      }
    },
    formatNumber(number) {
      if (Number.isInteger(number)) {
        return number.toLocaleString();
      } else {
        return number.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
    },
  },
  async mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    await this.initBigChart(this.selectedOption);
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>
<style>
@import "~@fortawesome/fontawesome-free/css/all.css";
</style>
