const apis = (require as any).context("./modules", false, /\.js$/);
const api = Object.create(null);

apis.keys().forEach((m: any) => {
  let moduleName = m.replace(/(.*\/)*([^.]+).*/gi, "$2");
  api[moduleName] = apis(m);
});
export { api };
