import "@testing-library/jest-dom";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

configure({
  testIdAttribute: "data-testid",
});
