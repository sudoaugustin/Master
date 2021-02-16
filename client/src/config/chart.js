export const stepChartConfig = {
  options:{
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "50%",
          position: "front"
        },
        track: {
          background: "#f1f3f6",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            formatter: function(val) {
              val=Math.round(val/33);
              return val+"/3";
            },
            offsetY:10,
            color: "#111",
            fontSize: "28px",
            fontFamily:"Google Sans"
          }
        }
      }
    },
    colors:["#00E676"]
  }
};
