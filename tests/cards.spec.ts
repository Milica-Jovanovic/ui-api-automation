import { test } from '@playwright/test';
import { testData } from '../utils/testData';
import { apiHelpers, dealcardsAndCheckIfThePlayerGotBlackjack, isBlackjack, isTwentyOne, verifyDeckCount } from '../utils/apiHelpers';


test.describe('Cards Game Test', () => {
 
  test('E2E Test Flow', async ({ request }) => {

    let deckId: number;

    await test.step('Navigate to Deck of Cards and confirm that site is up', async () => {
        try {
            const response = await request.get(testData.deckOfCardsUrl);
            await apiHelpers.verifyStatusCode(response);
        } catch (error) {
            console.error(`Error during GET request to ${testData.deckOfCardsUrl}:`, error);
        }
    });

    await test.step('Get a new deck', async () => {
        try {
            const response = await apiHelpers.getNewDeck(testData.deckCount)
            const body = await response.json(); 

            // console.log("Endpoint URL:", response.url());
            // console.log("Response Body:", body);

            await apiHelpers.verifyStatusCode(response);
            await verifyDeckCount(testData.deckCount, body.remaining);
            deckId = body.deck_id;

        } catch (error) {
            console.error(`Error during GET request to ${testData.deckOfCardsUrl}:`, error);
        }
    });

    await test.step('Get call to shuffle cards', async () => {
        try {
            const response = await apiHelpers.shuffleCards(deckId);
            const body = await response.json(); 

            // console.log("Endpoint URL:", response.url());
            // console.log("Response Body:", body);

            await apiHelpers.verifyStatusCode(response);

        } catch (error) {
            console.error(`Error during GET request to ${testData.deckOfCardsUrl}:`, error);
        }
    });

    await test.step('Deal three cards to each of two players and check whether either has blackjack', async () => {
        let player1 = await dealcardsAndCheckIfThePlayerGotBlackjack(deckId, testData.cardCount);
        let player2 = await dealcardsAndCheckIfThePlayerGotBlackjack(deckId, testData.cardCount);
        console.log(player1);
        console.log(player2);
    });
    
  })

});
