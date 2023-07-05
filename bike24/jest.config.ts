module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    "next/font": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(jest-)?@babel)"],
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
};
