import { Page } from "@playwright/test";
import { CheckersPage } from "../pages/CheckersPage";

export async function clickUntilVisible(page: Page, checkersPage: CheckersPage, boardSquare1: string, boardSquare2: string ) {
  let maxAttempts = 10;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await checkersPage.getBoardSquare(boardSquare1).click({ force: true });
      await checkersPage.getBoardSquare(boardSquare2).click({ force: true });
      await page.getByText("Make a move").waitFor({ state: 'visible' });
      console.log(`Target element is now visible on attempt ${attempt}.`);
      return;
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error.message}`);
    }
  }
  throw new Error(`Target element did not become visible after ${maxAttempts} attempts.`);
}
