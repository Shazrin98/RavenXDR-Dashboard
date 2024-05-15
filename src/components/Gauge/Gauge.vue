<template>
    <div ref="gaugeContainer" class="gauge-container">
        <p class="gauge-title">{{ title }}</p>
        <vue-gauge :options="gaugeOptions" />
        <p class="gauge-value">{{ value }} %</p>
    </div>
</template>

<script>
import VueGauge from "vue-gauge";

export default {
    components: { VueGauge },
    props: {
        title: String,
        value: Number,
    },
    data() {
        return {
            gaugeOptions: {
                // Customize gauge options here
                needleValue: this.value,
                needleColor: "orange", // Bright orange needle color
                arcColors: ["green", "yellow", "red"], // Green, yellow, and red arc colors
                arcDelimiters: [10, 30], // Arc delimiter values
                rangeLabel: ["0%", "100%"],
            },
        };
    },
    watch: {
        value(newValue) {
            // Update needle value when the prop changes
            this.gaugeOptions.needleValue = newValue;
        },
    },
    mounted() {
        // Dynamically adjust gauge width based on container width
        const gaugeContainerWidth = this.$refs.gaugeContainer.clientWidth;
        this.gaugeOptions.chartWidth = gaugeContainerWidth;
    },
};
</script>

<style scoped>
.gauge-container {
    /* Add styling for gauge container */
    text-align: center;
    color: #fff;
    padding: 20px;
    /* background-color: rgb(57, 58, 126); */
}

.gauge-title {
    /* Add styling for gauge title */
    text-align: center;
    color: #fff;
    font-size: 16px;
    margin-bottom: 10px;
}

.gauge-value {
    color: white;
    font-size: 24px;
    text-align: center;
    margin-top: 10px;
    /* Adjust as needed */
}

</style>