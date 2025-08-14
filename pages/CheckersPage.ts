import { Locator, Page } from '@playwright/test'

import { BasePage } from '../pages/BasePage'
import { testData } from '../utils/testData'

export class CheckersPage extends BasePage {
  readonly makeMoveMessage: Locator;
  readonly restart: Locator;
  readonly selectAnOrangePieceToMove;

  constructor(page: Page) {
    super(page)
    this.makeMoveMessage = page.locator('#message');
    this.restart = page.getByRole('link', { name: 'Restart...' });
    this.selectAnOrangePieceToMove = page.getByText('Select an orange piece to move.');
  }

  async goTo() {
    //await this.page.goto(testData.checkersUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    try {
        await this.page.goto(testData.checkersUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    } catch (error) {
        console.warn('Page load took too long ...');
    }
  }

  getBoardSquare(squareIndex: string) {
    return this.page.locator(`img[name=space${squareIndex}]`);
  }

}
