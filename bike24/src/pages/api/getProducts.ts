import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const jsonDirectory = path.join(process.cwd(), "/public/data");
    //Read the json data file data.json
    const fileContents = await fs.readFile(
      jsonDirectory + "/products.json",
      "utf8"
    );
    res.status(200).json(fileContents);
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
