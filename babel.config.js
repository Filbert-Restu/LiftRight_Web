module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel"
    ],
    plugins: [
      // Tambahkan plugin inline-import untuk mendukung migrasi SQL Drizzle
      ["inline-import", { extensions: [".sql"] }],
      
      // Plugin Reanimated wajib ditaruh di bagian paling bawah
      "react-native-reanimated/plugin",
    ],
  };
};