import { test, expect } from '@playwright/test'
import { CheckersPage } from '../pages/CheckersPage'
import { testData } from '../utils/testData'
import { clickUntilVisible } from '../utils/helpers'

test.describe.parallel.only('Checkers Game Test', () => {
  let checkersPage: CheckersPage

  test.beforeEach(async ({ page }) => {
    checkersPage = new CheckersPage(page);
    await checkersPage.goTo();
    await expect(page).toHaveURL(testData.checkersUrl);
  })

  test('E2E Test Flow', async ({ page }) => {

    await test.step('The first move', async () => {
        await clickUntilVisible(page, checkersPage, testData.firstMoveBoardSquareIndex1, testData.firstMoveBoardSquareIndex2);
        await expect(checkersPage.makeMoveMessage).toHaveText('Make a move.');
    });

    await test.step('The second move', async () => {
        await clickUntilVisible(page, checkersPage, testData.secondMoveBoardSquareIndex1, testData.secondMoveBoardSquareIndex2);
        await expect(checkersPage.makeMoveMessage).toHaveText('Make a move.');
    });

    await test.step('The third move', async () => {
        await clickUntilVisible(page, checkersPage, testData.thirdMoveBoardSquareIndex1, testData.thirdMoveBoardSquareIndex2);
        await expect(checkersPage.makeMoveMessage).toHaveText('Make a move.');
    });

    await test.step('The fourth move', async () => {
        await clickUntilVisible(page, checkersPage, testData.fourthMoveBoardSquareIndex1, testData.fourthMoveBoardSquareIndex2);
        await expect(checkersPage.makeMoveMessage).toHaveText('Make a move.');
    });

    await test.step('The fifth move', async () => {
        await clickUntilVisible(page, checkersPage, testData.fifthMoveBoardSquareIndex1, testData.fifthMoveBoardSquareIndex2);
        await expect(checkersPage.makeMoveMessage).toHaveText('Make a move.');
    });

    await test.step('Restart and verify there is a staring game message', async () => {
        await checkersPage.restart.click();
        await expect(checkersPage.selectAnOrangePieceToMove).toHaveText('Select an orange piece to move.');
    });
    
  })

});
