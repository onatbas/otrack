export const environment = {
  production: true,
  version: "1.1." + process.env['COMMIT_NUMBER'] || "NA"
};
