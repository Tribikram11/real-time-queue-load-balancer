const metricsEngine = require("./core/metricsEngine");

(async () => {
  const metrics = await metricsEngine.predictWaitTime();
  console.log(metrics);
})();
