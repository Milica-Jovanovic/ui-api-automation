import { test, expect } from '@playwright/test'
import { CheckersPage } from '../pages/CheckersPage'
import { testData } from '../utils/testData'
import { clickUntilVisible } from '../utils/helpers'

test.describe('Checkers Game Test', () => {
  let checkersPage: CheckersPage

  test.beforeEach(async ({ page }) => {
    checkersPage = new CheckersPage(page);
    await checkersPage.goTo();
    await expect(page).toHaveURL(testData.checkersUrl);
  })

  test('E2E Test Flow', async ({ page }) => {

    const moves = [
        [testData.firstMoveBoardSquareIndex1, testData.firstMoveBoardSquareIndex2],
        [testData.secondMoveBoardSquareIndex1, testData.secondMoveBoardSquareIndex2],
        [testData.thirdMoveBoardSquareIndex1, testData.thirdMoveBoardSquareIndex2],
        [testData.fourthMoveBoardSquareIndex1, testData.fourthMoveBoardSquareIndex2],
        [testData.fifthMoveBoardSquareIndex1, testData.fifthMoveBoardSquareIndex2],
    ];

    for (let i = 0; i < moves.length; i++) {
        await test.step(`Move ${i + 1}`, async () => {
            const [from, to] = moves[i];
            await clickUntilVisible(page, checkersPage, from, to);
            await expect(checkersPage.makeMoveMessage).toHaveText('Make a move.');
        });
    }

    await test.step('Restart and verify there is a staring game message', async () => {
        await checkersPage.restart.click();
        await expect(checkersPage.selectAnOrangePieceToMove).toHaveText('Select an orange piece to move.');
    });
    
  })

});
