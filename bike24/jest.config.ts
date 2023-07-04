module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx|jsx|js)$": "babel-jest",
  },
};
